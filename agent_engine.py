#!/usr/bin/env python3
"""Rabbit: bounded, evidence-first public website intelligence."""

from __future__ import annotations

import argparse
import ipaddress
import json
import re
import socket
import time
from collections import deque
from datetime import datetime, timezone
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urldefrag, urljoin, urlparse
from urllib.request import HTTPRedirectHandler, Request, build_opener
from urllib.robotparser import RobotFileParser
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parent
USER_AGENT = "RabbitCompanyResearch/1.0 (+local evidence-first crawler)"
MAX_PAGES = 60
MAX_PAGE_BYTES = 900_000
MAX_TOTAL_TEXT = 3_200_000
TIMEOUT_SECONDS = 8
MAX_REDIRECTS = 5
KNOWLEDGE_ARCHITECTURE = {
    "version": "1.0",
    "memory_contract": "memory.md",
    "skill_contract": "skill.md",
    "agent_contract": "agent.md",
    "intelligence_contract": "intelligence.md",
    "stages": ["crawl", "luna_evidence", "terra_synthesis", "evidence_review", "memory_build"],
    "persistence": "browser-local MVP memory; server persistence requires a datastore binding",
}

PAGE_HINTS = {
    "pricing": 100,
    "product": 95,
    "features": 92,
    "feature": 92,
    "solutions": 88,
    "use-case": 86,
    "customers": 82,
    "case-stud": 82,
    "about": 78,
    "docs": 72,
    "documentation": 72,
    "learn": 70,
    "methodology": 66,
    "resources": 62,
    "integrations": 76,
    "industries": 87,
    "stories": 82,
    "security": 60,
    "blog": 55,
}


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def clean(value: str, limit: int = 1000) -> str:
    return re.sub(r"\s+", " ", value or "").strip()[:limit]


def safe_url(value: str) -> str:
    value = clean(value, 2048)
    if "://" not in value:
        value = "https://" + value
    parsed = urlparse(value)
    if parsed.scheme not in ("http", "https") or not parsed.hostname:
        raise ValueError("Enter a public website URL that begins with http:// or https://.")
    if parsed.username or parsed.password:
        raise ValueError("Website URLs containing usernames or passwords are not allowed.")
    try:
        port = parsed.port
    except ValueError as exc:
        raise ValueError("The website URL contains an invalid port.") from exc
    if port not in (None, 80, 443):
        raise ValueError("Only standard website ports are allowed.")
    host = parsed.hostname.lower().rstrip(".")
    if host == "localhost" or host.endswith(".localhost"):
        raise ValueError("Local and private websites are blocked.")
    try:
        addresses = socket.getaddrinfo(
            host,
            port or (443 if parsed.scheme == "https" else 80),
            type=socket.SOCK_STREAM,
        )
    except socket.gaierror as exc:
        raise ValueError("That website could not be found.") from exc
    for address in addresses:
        ip = ipaddress.ip_address(address[4][0])
        if not ip.is_global:
            raise ValueError("That website resolves to a private or protected network address and was blocked.")
    return parsed._replace(fragment="").geturl()


class SafeRedirectHandler(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.count = 0

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.count += 1
        if self.count > MAX_REDIRECTS:
            raise ValueError("The website redirected too many times.")
        safe_url(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


class PageParser(HTMLParser):
    SKIP = {"script", "style", "svg", "noscript", "template"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.capture = []
        self.text = []
        self.title = []
        self.headings = []
        self.links = []
        self.description = ""
        self.site_name = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in self.SKIP:
            self.skip += 1
        if tag in ("title", "h1", "h2", "h3"):
            self.capture.append(tag)
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "meta":
            key = (attrs.get("name") or attrs.get("property") or "").lower()
            content = attrs.get("content", "")
            if key in ("description", "og:description") and not self.description:
                self.description = content
            if key == "og:site_name":
                self.site_name = content

    def handle_endtag(self, tag):
        if tag in self.SKIP and self.skip:
            self.skip -= 1
        if self.capture and self.capture[-1] == tag:
            self.capture.pop()

    def handle_data(self, data):
        if self.skip:
            return
        value = clean(data, 5000)
        if not value:
            return
        self.text.append(value)
        if self.capture:
            if self.capture[-1] == "title":
                self.title.append(value)
            else:
                self.headings.append(value)


def extract_html(data: bytes) -> dict:
    parser = PageParser()
    parser.feed(data.decode("utf-8", "replace"))
    headings = list(dict.fromkeys(clean(x, 240) for x in parser.headings if clean(x, 240)))[:24]
    return {
        "title": clean(" ".join(parser.title), 240),
        "description": clean(parser.description, 500),
        "site_name": clean(parser.site_name, 120),
        "headings": headings,
        "text": clean(" ".join(parser.text), 70_000),
        "links": list(dict.fromkeys(parser.links))[:500],
    }


def _fetch(url: str, allowed_types: tuple[str, ...], byte_limit: int = MAX_PAGE_BYTES):
    url = safe_url(url)
    request = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml,application/xml,text/plain;q=0.8"})
    try:
        opener = build_opener(SafeRedirectHandler())
        with opener.open(request, timeout=TIMEOUT_SECONDS) as response:
            final_url = safe_url(response.geturl())
            content_type = (response.headers.get_content_type() or "").lower()
            if content_type not in allowed_types:
                raise ValueError("This page is not readable website content.")
            data = response.read(byte_limit + 1)
            if len(data) > byte_limit:
                raise ValueError("This page exceeded the safe reading limit.")
            return final_url, content_type, data
    except ValueError:
        raise
    except (HTTPError, URLError, TimeoutError) as exc:
        reason = clean(str(getattr(exc, "reason", exc)), 180)
        raise ValueError(f"The page could not be read: {reason}") from exc


def fetch_page(url: str) -> tuple[str, dict]:
    final, _, data = _fetch(url, ("text/html", "application/xhtml+xml"))
    return final, extract_html(data)


def same_site(url: str, host: str) -> bool:
    candidate = (urlparse(url).hostname or "").lower().removeprefix("www.")
    return candidate == host.lower().removeprefix("www.")


def page_score(url: str) -> int:
    path = urlparse(url).path.lower()
    score = max((value for hint, value in PAGE_HINTS.items() if hint in path), default=20)
    if path in ("", "/"):
        return 120
    return score - min(path.count("/") * 2, 12)


def discover_sitemap(root_url: str, host: str) -> list[str]:
    sitemap_url = urljoin(root_url, "/sitemap.xml")
    try:
        _, _, data = _fetch(sitemap_url, ("application/xml", "text/xml", "text/plain"), 500_000)
        tree = ElementTree.fromstring(data)
        found = []
        for node in tree.iter():
            if node.tag.lower().endswith("loc") and node.text:
                candidate = urldefrag(clean(node.text, 2048))[0]
                if candidate and same_site(candidate, host):
                    found.append(candidate)
        return sorted(set(found), key=page_score, reverse=True)[:80]
    except (ValueError, ElementTree.ParseError):
        return []


def robots_for(root_url: str) -> RobotFileParser | None:
    robots_url = urljoin(root_url, "/robots.txt")
    try:
        _, _, data = _fetch(robots_url, ("text/plain",), 200_000)
        parser = RobotFileParser()
        parser.set_url(robots_url)
        parser.parse(data.decode("utf-8", "replace").splitlines())
        return parser
    except ValueError:
        return None


def sentence_excerpt(text: str, keywords: tuple[str, ...], limit: int = 260) -> str:
    sentences = re.split(r"(?<=[.!?])\s+|\s+[•|]\s+", text)
    for sentence in sentences:
        low = sentence.lower()
        if any(keyword in low for keyword in keywords) and 24 <= len(sentence) <= 700:
            return clean(sentence, limit)
    return ""


def evidence(page: dict, excerpt: str) -> dict:
    return {"url": page["url"], "page": page["title"] or page["url"], "excerpt": clean(excerpt, 280)}


def best_page(pages: list[dict], hints: tuple[str, ...]) -> dict | None:
    ranked = []
    for page in pages:
        haystack = (page["url"] + " " + page["title"] + " " + page["description"] + " " + " ".join(page["headings"])).lower()
        rank = sum(3 for hint in hints if hint in urlparse(page["url"]).path.lower()) + sum(1 for hint in hints if hint in haystack)
        if rank:
            ranked.append((rank, page_score(page["url"]), page))
    return max(ranked, default=(0, 0, None), key=lambda item: (item[0], item[1]))[2]


def conclusion(title: str, value: str, kind: str, confidence: str, items: list[dict], note: str = "") -> dict:
    return {
        "title": title,
        "value": clean(value, 700) or "Not established from the pages reviewed.",
        "kind": kind if value else "UNKNOWN",
        "confidence": confidence if value else "low",
        "evidence": [item for item in items if item.get("excerpt")][:3],
        "note": note,
    }


def analyze(pages: list[dict], root_url: str) -> list[dict]:
    home = pages[0]
    company = home["site_name"] or re.split(r"[|—–:-]", home["title"])[0].strip() or (urlparse(root_url).hostname or "").split(".")[0].title()
    text_lead = next((clean(part, 500) for part in re.split(r"(?<=[.!?])\s+", home["text"]) if len(clean(part, 500)) > len(home["title"]) + 18), "")
    home_lead = home["description"] or text_lead or (home["headings"][0] if home["headings"] else home["title"])
    home_ev = evidence(home, home_lead)

    product_page = best_page(pages, ("product", "platform", "solution", "feature")) or home
    product_excerpt = product_page["description"] or (product_page["headings"][0] if product_page is not home and product_page["headings"] else "")
    problem_excerpt = sentence_excerpt(" ".join(p["text"] for p in pages), ("struggle", "problem", "challenge", "manual", "time-consuming", "difficult", "waste"))
    problem_page = next((p for p in pages if problem_excerpt and problem_excerpt in p["text"]), home)

    feature_page = best_page(pages, ("feature", "product", "platform", "capabilit")) or product_page
    generic = {clean(company).lower(), clean(home["title"]).lower(), clean(home["headings"][0]).lower() if home["headings"] else ""}
    capability_values = [h for h in feature_page["headings"] if 3 < len(h) < 110 and clean(h).lower() not in generic][:5]
    capabilities = "; ".join(capability_values)

    use_page = best_page(pages, ("use-case", "solution", "industr", "customer", "workflow", "how to", "guide"))
    use_values = [h for h in (use_page or {}).get("headings", []) if 3 < len(h) < 110][:5]
    use_cases = "; ".join(use_values)

    audience_terms = ("teams", "businesses", "companies", "founders", "marketers", "developers", "sales", "enterprise", "startups", "agencies", "creators", "leaders")
    audience_excerpt = sentence_excerpt(" ".join(p["text"] for p in pages), audience_terms)
    audience_page = next((p for p in pages if audience_excerpt and audience_excerpt in p["text"]), home)
    industry_terms = ("healthcare", "finance", "financial", "retail", "ecommerce", "education", "legal", "manufacturing", "saas", "real estate", "hospitality", "government")
    industries = sorted({term.title() for term in industry_terms if any(term in p["text"].lower() for p in pages)})

    pricing_page = best_page(pages, ("pricing", "plans"))
    pricing_excerpt = ""
    if pricing_page:
        pricing_excerpt = sentence_excerpt(pricing_page["text"], ("$", "₹", "free", "month", "year", "plan", "trial", "contact sales")) or pricing_page["description"] or (pricing_page["headings"][0] if pricing_page["headings"] else "")
    else:
        pricing_excerpt = sentence_excerpt(" ".join(p["text"] for p in pages), ("free to use", "free public", "free plan", "subscription", "commission"))
        pricing_page = next((p for p in pages if pricing_excerpt and pricing_excerpt in p["text"]), None)

    diff_excerpt = sentence_excerpt(" ".join(p["text"] for p in pages), ("unlike", "the only", "first-ever", "fastest", "built specifically", "unique", "proprietary"))
    diff_page = next((p for p in pages if diff_excerpt and diff_excerpt in p["text"]), home)
    competitor_excerpt = sentence_excerpt(" ".join(p["text"] for p in pages), ("alternative to", " versus ", " vs ", "competitor"))
    competitor_page = next((p for p in pages if competitor_excerpt and competitor_excerpt in p["text"]), home)

    market_excerpt = sentence_excerpt(home["description"] + " " + " ".join(home["headings"]), ("platform", "software", "tool", "solution", "service", "marketplace", "assistant", "infrastructure"))
    value_excerpt = sentence_excerpt(home["description"] + ". " + home["text"], ("help", "enable", "increase", "reduce", "save", "grow", "build", "automate")) or home_lead

    return [
        conclusion("Company", company, "FACT", "high", [home_ev]),
        conclusion("Product", product_excerpt, "FACT", "high" if product_page is not home else "medium", [evidence(product_page, product_excerpt)]),
        conclusion("Problem being solved", problem_excerpt, "INFERENCE", "medium", [evidence(problem_page, problem_excerpt)], "Inferred from problem-oriented website language."),
        conclusion("Product capabilities", capabilities, "FACT", "medium", [evidence(feature_page, "; ".join(capability_values[:3]))]),
        conclusion("Value proposition", value_excerpt, "FACT", "high", [evidence(home, value_excerpt)]),
        conclusion("Positioning", market_excerpt or home_lead, "INFERENCE", "medium", [evidence(home, market_excerpt or home_lead)], "Inferred from the homepage category and promise."),
        conclusion("Likely target customers", audience_excerpt, "INFERENCE", "medium", [evidence(audience_page, audience_excerpt)], "Audience language is treated as a likely target, not a confirmed sales segment."),
        conclusion("Likely ICP", audience_excerpt, "INFERENCE", "low" if audience_excerpt else "low", [evidence(audience_page, audience_excerpt)], "A true ICP also needs customer, deal, and retention data."),
        conclusion("Industries", ", ".join(industries[:8]), "INFERENCE", "medium", [evidence(use_page or home, ", ".join(industries[:8]))]),
        conclusion("Use cases", use_cases, "FACT", "medium", [evidence(use_page or home, "; ".join(use_values[:3]))]),
        conclusion("Pricing / business model", pricing_excerpt, "FACT", "high" if pricing_excerpt else "low", [evidence(pricing_page or home, pricing_excerpt)]),
        conclusion("Messaging", home_lead, "FACT", "high", [home_ev]),
        conclusion("Differentiators", diff_excerpt, "INFERENCE", "medium", [evidence(diff_page, diff_excerpt)], "Only explicit or strongly signalled differentiation is included."),
        conclusion("Competitors", competitor_excerpt, "FACT", "medium", [evidence(competitor_page, competitor_excerpt)], "Rabbit does not invent competitor names when the reviewed site does not mention comparisons."),
        conclusion("Market / category", market_excerpt, "INFERENCE", "medium", [evidence(home, market_excerpt)], "Inferred from how the company describes its product category."),
    ]


def crawl(company_url: str) -> dict:
    started = time.monotonic()
    root = safe_url(company_url)
    final_root, home_doc = fetch_page(root)
    host = urlparse(final_root).hostname or ""
    robots = robots_for(final_root)
    queued = {final_root}
    queue = deque([final_root])
    for sitemap_url in discover_sitemap(final_root, host):
        if sitemap_url not in queued:
            queue.append(sitemap_url)
            queued.add(sitemap_url)

    pages = []
    failures = []
    total_text = 0
    home_pending = {final_root: home_doc}
    while queue and len(pages) < MAX_PAGES and total_text < MAX_TOTAL_TEXT:
        candidate = max(queue, key=page_score)
        queue.remove(candidate)
        if any(p["url"] == candidate for p in pages):
            continue
        if robots and not robots.can_fetch(USER_AGENT, candidate):
            failures.append({"url": candidate, "reason": "Excluded by robots.txt"})
            continue
        try:
            if candidate in home_pending:
                final, doc = candidate, home_pending[candidate]
            else:
                final, doc = fetch_page(candidate)
            if not same_site(final, host) or any(p["url"] == final for p in pages):
                continue
            page = {"url": final, **doc}
            pages.append(page)
            total_text += len(doc["text"])
            for href in doc["links"]:
                link = urldefrag(urljoin(final, href))[0]
                parsed = urlparse(link)
                if parsed.scheme in ("http", "https") and same_site(link, host) and link not in queued:
                    if not re.search(r"\.(?:css|js|json|xml|txt|csv|pdf|zip|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|mp4|webm)$", urlparse(link).path, re.I):
                        queue.append(link)
                        queued.add(link)
        except ValueError as exc:
            failures.append({"url": candidate, "reason": clean(str(exc), 180)})

    if not pages:
        raise ValueError("Rabbit could not read any public HTML pages from this website.")
    findings = analyze(pages, final_root)
    known = sum(1 for item in findings if item["kind"] != "UNKNOWN")
    company = findings[0]["value"]
    product = next((item["value"] for item in findings if item["title"] == "Product" and item["kind"] != "UNKNOWN"), "")
    decision = {
        "headline": product or "The site does not yet establish a single product decision.",
        "confidence": "medium" if product else "low",
        "recommendation": "Validate the product, audience, and pricing signals with customer or internal data before making a high-stakes decision.",
        "priority_signals": [item["value"] for item in findings if item["kind"] != "UNKNOWN"][:4],
        "risks": ["The local fallback cannot verify ICP, demand, or competitive strength beyond public website evidence."],
        "next_questions": ["Which customer segment converts and retains best?", "Which claims are supported by customer or revenue data?"],
        "evidence": [],
    }
    by_title = {item["title"]: item for item in findings}
    def kb_value(title: str) -> str:
        return by_title.get(title, {}).get("value") or "Not established from the reviewed pages."
    knowledge_base = {
        "version": 1,
        "generated_at": now(),
        "company": company,
        "source_count": len(pages),
        "source_urls": [p["url"] for p in pages],
        "product": {"name_or_description": kb_value("Product"), "problem": kb_value("Problem being solved"), "capabilities": kb_value("Product capabilities"), "value_proposition": kb_value("Value proposition"), "positioning": kb_value("Positioning")},
        "customers": {"target_customers": kb_value("Likely target customers"), "likely_icp": kb_value("Likely ICP"), "industries": kb_value("Industries"), "use_cases": kb_value("Use cases")},
        "market": {"category": kb_value("Market / category"), "positioning": kb_value("Positioning"), "differentiators": kb_value("Differentiators"), "competitors": kb_value("Competitors")},
        "commercial": {"pricing_or_business_model": kb_value("Pricing / business model"), "messaging": kb_value("Messaging")},
        "judgment": decision,
    }
    memory = {
        "version": 1, "architecture": KNOWLEDGE_ARCHITECTURE, "generated_at": now(), "company_url": final_root, "company": company,
        "pages": [{"url": p["url"], "title": p["title"] or p["url"], "description": p["description"], "headings": p["headings"], "text": p["text"]} for p in pages],
        "findings": findings, "knowledge_base": knowledge_base, "decision": decision,
        "crawl": {"pages_reviewed": len(pages), "page_cap": MAX_PAGES, "failures": len(failures)},
    }
    return {
        "status": "complete",
        "architecture": KNOWLEDGE_ARCHITECTURE,
        "company_url": final_root,
        "company": company,
        "generated_at": now(),
        "duration_seconds": round(time.monotonic() - started, 1),
        "pages": [{"url": p["url"], "title": p["title"] or p["url"]} for p in pages],
        "findings": findings,
        "knowledge_base": knowledge_base,
        "decision": decision,
        "memory": memory,
        "coverage": {"known": known, "unknown": len(findings) - known, "total": len(findings)},
        "failures": failures[:8],
        "limits": {"page_cap": MAX_PAGES, "pages_reviewed": len(pages)},
        "analysis_engine": "evidence-rules",
        "analysis_warning": "OpenAI synthesis runs in the deployed Cloudflare function; local evidence rules were used.",
    }


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Content-Security-Policy", "default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'")
        super().end_headers()

    def log_message(self, format, *args):
        return

    def do_POST(self):
        if self.path != "/api/research":
            self.send_error(404)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length < 2 or length > 10_000:
                raise ValueError("The request was empty or too large.")
            body = json.loads(self.rfile.read(length))
            if not isinstance(body, dict) or not isinstance(body.get("url"), str):
                raise ValueError("Enter a website URL to begin.")
            result = crawl(body["url"])
            self._json(200, result)
        except (ValueError, json.JSONDecodeError) as exc:
            self._json(400, {"error": clean(str(exc), 300)})
        except Exception:
            self._json(500, {"error": "Rabbit could not finish this research run safely. Please try another public website."})

    def _json(self, status: int, value: dict):
        payload = json.dumps(value).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)


def main():
    parser = argparse.ArgumentParser(description="Run Rabbit locally")
    parser.add_argument("--serve", action="store_true")
    parser.add_argument("--port", type=int, default=3000)
    args = parser.parse_args()
    if not args.serve:
        parser.error("Use --serve to start Rabbit.")
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    print(f"Rabbit is ready at http://127.0.0.1:{args.port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
