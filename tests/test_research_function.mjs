import test from "node:test";
import assert from "node:assert/strict";
import { analyze, extractHtml, isPrivateLiteral, synthesizeWithOpenAI, validUrl } from "../functions/api/research.js";

test("blocks protected targets and unsafe ports", () => {
  for (const value of ["http://127.0.0.1", "http://169.254.169.254", "http://[::1]", "file:///tmp/x", "https://user:pass@example.com", "https://example.com:8080"]) assert.throws(() => validUrl(value));
  assert.equal(isPrivateLiteral("10.1.2.3"), true);
});

test("normalizes bare domains", () => assert.equal(validUrl("example.com").href, "https://example.com/"));

test("extracts useful content and ignores scripts", () => {
  const page = extractHtml('<title>Acme</title><meta name="description" content="Helpful"><body><nav>Navigation noise</nav><main><h1>Grow</h1><p>Useful product content for teams.</p></main><script>secret</script><a href="/pricing">Plans</a></body>');
  assert.equal(page.title, "Acme");
  assert.equal(page.description, "Helpful");
  assert.equal(page.text.includes("secret"), false);
  assert.equal(page.text.includes("Navigation noise"), false);
  assert.equal(page.text.includes("Useful product content"), true);
  assert.deepEqual(page.links, ["/pricing"]);
});

test("keeps absent competitors unknown", () => {
  const pages = [{ url: "https://example.com/", title: "Acme", site_name: "Acme", description: "Compare prices in one dashboard.", headings: ["Compare prices"], text: "Compare prices in one dashboard.", links: [] }];
  const competitors = analyze(pages, pages[0].url).find(item => item.title === "Competitors");
  assert.equal(competitors.kind, "UNKNOWN");
});

test("OpenAI synthesis accepts exact evidence and rejects invented evidence", async () => {
  const pages = [{ url: "https://acme.example/", title: "Acme", site_name: "Acme", description: "Analytics for teams", headings: ["Automate reporting"], text: "Acme helps marketing teams automate reporting.", links: [] }];
  const payload = {
    company: "Acme",
    findings: [
      { title: "Company", value: "Acme", kind: "FACT", confidence: "high", note: "", evidence: [{ source_id: 1, excerpt: "Acme" }] },
      { title: "Product", value: "Analytics platform", kind: "FACT", confidence: "high", note: "", evidence: [{ source_id: 1, excerpt: "This was never on the page" }] }
    ]
  };
  let requestBody;
  const fetcher = async (_url, options) => {
    requestBody = JSON.parse(options.body);
    return { ok: true, json: async () => ({ output: [{ content: [{ type: "output_text", text: JSON.stringify(payload) }] }] }) };
  };
  const result = await synthesizeWithOpenAI(pages, "secret", "gpt-5-mini", fetcher);
  assert.equal(requestBody.model, "gpt-5-mini");
  assert.equal(requestBody.text.format.strict, true);
  assert.equal(result.findings.find(item => item.title === "Company").kind, "FACT");
  assert.equal(result.findings.find(item => item.title === "Product").kind, "UNKNOWN");
});
