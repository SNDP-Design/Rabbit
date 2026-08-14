import test from "node:test";
import assert from "node:assert/strict";
import { analyze, extractHtml, isPrivateLiteral, validUrl } from "../functions/api/research.js";

test("blocks protected targets and unsafe ports", () => {
  for (const value of ["http://127.0.0.1", "http://169.254.169.254", "http://[::1]", "file:///tmp/x", "https://user:pass@example.com", "https://example.com:8080"]) assert.throws(() => validUrl(value));
  assert.equal(isPrivateLiteral("10.1.2.3"), true);
});

test("normalizes bare domains", () => assert.equal(validUrl("example.com").href, "https://example.com/"));

test("extracts useful content and ignores scripts", () => {
  const page = extractHtml('<title>Acme</title><meta name="description" content="Helpful"><h1>Grow</h1><script>secret</script><a href="/pricing">Plans</a>');
  assert.equal(page.title, "Acme");
  assert.equal(page.description, "Helpful");
  assert.equal(page.text.includes("secret"), false);
  assert.deepEqual(page.links, ["/pricing"]);
});

test("keeps absent competitors unknown", () => {
  const pages = [{ url: "https://example.com/", title: "Acme", site_name: "Acme", description: "Compare prices in one dashboard.", headings: ["Compare prices"], text: "Compare prices in one dashboard.", links: [] }];
  const competitors = analyze(pages, pages[0].url).find(item => item.title === "Competitors");
  assert.equal(competitors.kind, "UNKNOWN");
});
