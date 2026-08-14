import unittest
from unittest.mock import patch

import agent_engine as engine


class RabbitTests(unittest.TestCase):
    def test_private_and_credential_urls_are_blocked(self):
        for url in ("http://127.0.0.1", "http://169.254.169.254", "http://[::1]", "file:///tmp/a", "https://user:pass@example.com", "https://example.com:8080"):
            with self.assertRaises(ValueError):
                engine.safe_url(url)

    def test_bare_domain_is_normalized(self):
        public = [(None, None, None, None, ("93.184.216.34", 443))]
        with patch("agent_engine.socket.getaddrinfo", return_value=public):
            self.assertEqual(engine.safe_url("example.com"), "https://example.com")

    def test_html_extraction_ignores_scripts(self):
        doc = engine.extract_html(b'<title>Acme</title><meta name="description" content="Useful product"><h1>Grow faster</h1><script>Ignore me</script><a href="/pricing">Plans</a>')
        self.assertEqual(doc["title"], "Acme")
        self.assertEqual(doc["description"], "Useful product")
        self.assertNotIn("Ignore me", doc["text"])
        self.assertEqual(doc["links"], ["/pricing"])

    def test_page_priority(self):
        self.assertGreater(engine.page_score("https://example.com/pricing"), engine.page_score("https://example.com/blog/post"))

    def test_analysis_is_structured_and_honest(self):
        pages = [{
            "url": "https://acme.example/", "title": "Acme | Analytics for teams", "site_name": "Acme",
            "description": "Analytics software that helps marketing teams save time.",
            "headings": ["Analytics for marketing teams", "Automate reporting"],
            "text": "Analytics software that helps marketing teams save time. Automate reporting.", "links": []
        }]
        findings = engine.analyze(pages, pages[0]["url"])
        self.assertEqual(len(findings), 15)
        self.assertEqual(findings[0]["value"], "Acme")
        self.assertTrue(all(item["kind"] in {"FACT", "INFERENCE", "UNKNOWN"} for item in findings))
        competitors = next(item for item in findings if item["title"] == "Competitors")
        self.assertEqual(competitors["kind"], "UNKNOWN")

    def test_generic_comparison_does_not_invent_competitors(self):
        pages = [{
            "url": "https://acme.example/", "title": "Acme", "site_name": "Acme",
            "description": "Compare prices and features in one dashboard.",
            "headings": ["Compare everything"], "text": "Compare prices and features in one dashboard.", "links": []
        }]
        competitors = next(item for item in engine.analyze(pages, pages[0]["url"]) if item["title"] == "Competitors")
        self.assertEqual(competitors["kind"], "UNKNOWN")

    def test_same_site_allows_www_only(self):
        self.assertTrue(engine.same_site("https://www.example.com/pricing", "example.com"))
        self.assertFalse(engine.same_site("https://example.net/pricing", "example.com"))


if __name__ == "__main__":
    unittest.main()
