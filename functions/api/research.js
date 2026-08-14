const MAX_PAGES = 12;
const MAX_BYTES = 900000;
const MAX_BODY = 10000;
const TIMEOUT = 6000;
const REDIRECTS = 4;
const META_HOSTS = new Set(["metadata", "metadata.google.internal", "metadata.azure.internal", "169.254.169.254"]);
const HINTS = { pricing: 100, product: 95, features: 92, feature: 92, solutions: 88, "use-case": 86, customers: 82, "case-stud": 82, about: 78, docs: 72, documentation: 72, blog: 55 };
const responseHeaders = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff", "x-frame-options": "DENY", "referrer-policy": "no-referrer" };

const clean = (value, limit = 1000) => String(value || "").replace(/\s+/g, " ").trim().slice(0, limit);
const decode = value => clean(String(value || "").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'"), 70000);

export function isPrivateLiteral(host) {
  const value = host.toLowerCase().replace(/^\[|\]$/g, "");
  if (value.includes(":")) {
    if (value === "::" || value === "::1" || /^(fc|fd|fe8|fe9|fea|feb|ff)/.test(value)) return true;
    const mapped = value.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    return Boolean(mapped && isPrivateLiteral(mapped[1]));
  }
  const match = value.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return false;
  const [a, b, c, d] = match.slice(1).map(Number);
  if ([a, b, c, d].some(n => n > 255)) return true;
  return a === 0 || a === 10 || a === 127 || a >= 224 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && (b === 168 || (b === 0 && c === 2))) || (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) || (a === 203 && b === 0 && c === 113) || (a === 255 && b === 255 && c === 255 && d === 255);
}

export function validUrl(value) {
  let input = clean(value, 2048);
  if (!input.includes("://")) input = `https://${input}`;
  let url;
  try { url = new URL(input); } catch { throw new Error("Enter a valid public website URL."); }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || !["", "80", "443"].includes(url.port)) throw new Error("Only public HTTP(S) websites are allowed.");
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (host === "localhost" || host.endsWith(".localhost") || META_HOSTS.has(host) || isPrivateLiteral(host)) throw new Error("That website points to a private or protected network address and was blocked.");
  url.hash = "";
  return url;
}

function siteHost(value) { return new URL(value).hostname.toLowerCase().replace(/^www\./, ""); }
function sameSite(value, host) { try { return siteHost(value) === host.replace(/^www\./, ""); } catch { return false; } }
function pageScore(value) {
  const path = new URL(value).pathname.toLowerCase();
  if (path === "/") return 120;
  let score = 20;
  for (const [hint, points] of Object.entries(HINTS)) if (path.includes(hint)) score = Math.max(score, points);
  return score - Math.min((path.match(/\//g) || []).length * 2, 12);
}

async function readBounded(response, limit = MAX_BYTES) {
  const advertised = Number(response.headers.get("content-length") || 0);
  if (advertised > limit) throw new Error("A page exceeded the safe reading limit.");
  const reader = response.body?.getReader();
  if (!reader) return "";
  const chunks = []; let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new Error("A page exceeded the safe reading limit."); }
      chunks.push(value);
    }
  } finally { reader.releaseLock?.(); }
  const all = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { all.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(all);
}

async function safeFetch(value, types, limit = MAX_BYTES) {
  let current = validUrl(value);
  for (let count = 0; count <= REDIRECTS; count++) {
    let response;
    try {
      response = await fetch(current.href, { redirect: "manual", signal: AbortSignal.timeout(TIMEOUT), headers: { "user-agent": "RabbitCompanyResearch/1.0", accept: "text/html,application/xhtml+xml,application/xml,text/plain;q=0.8" } });
    } catch { throw new Error("The page could not be reached safely."); }
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("A redirect had no destination.");
      current = validUrl(new URL(location, current).href);
      continue;
    }
    if (!response.ok) throw new Error("The public page could not be retrieved.");
    const type = (response.headers.get("content-type") || "").split(";")[0].toLowerCase();
    if (!types.some(item => type.includes(item))) throw new Error("This page is not readable website content.");
    return { url: current.href, text: await readBounded(response, limit) };
  }
  throw new Error("The website redirected too many times.");
}

export function extractHtml(html) {
  const withoutNoise = String(html || "").replace(/<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi, " ");
  const plain = decode(withoutNoise.replace(/<[^>]+>/g, " "));
  const one = regex => decode((withoutNoise.match(regex) || [])[1]);
  const title = one(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = one(/<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']*)/i) || one(/<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["'](?:description|og:description)["']/i);
  const siteName = one(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']*)/i) || one(/<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:site_name["']/i);
  const headings = [...withoutNoise.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map(match => decode(match[1].replace(/<[^>]+>/g, " ")).slice(0, 240)).filter(Boolean);
  const links = [...withoutNoise.matchAll(/<a[^>]+href=["']([^"']+)/gi)].map(match => match[1]);
  return { title: clean(title, 240), description: clean(description, 500), site_name: clean(siteName, 120), headings: [...new Set(headings)].slice(0, 24), text: clean(plain, 70000), links: [...new Set(links)].slice(0, 500) };
}

async function fetchPage(value) {
  const result = await safeFetch(value, ["text/html", "application/xhtml+xml"]);
  return { url: result.url, ...extractHtml(result.text) };
}

function allowedByRobots(text, path) {
  if (!text) return true;
  let applies = false; const disallowed = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const [key, ...rest] = line.split(":"); const value = rest.join(":").trim();
    if (key?.toLowerCase() === "user-agent") applies = value === "*";
    if (applies && key?.toLowerCase() === "disallow" && value) disallowed.push(value);
  }
  return !disallowed.some(rule => path.startsWith(rule));
}

function sentence(text, keywords) {
  for (const part of String(text || "").split(/(?<=[.!?])\s+|\s+[•|]\s+/)) {
    const value = clean(part, 700); const low = value.toLowerCase();
    if (value.length >= 24 && keywords.some(key => low.includes(key))) return clean(value, 260);
  }
  return "";
}

function evidence(page, excerpt) { return excerpt ? { url: page.url, page: page.title || page.url, excerpt: clean(excerpt, 280) } : null; }
function finding(title, value, kind, confidence, sources = [], note = "") { return { title, value: clean(value, 700) || "Not established from the pages reviewed.", kind: value ? kind : "UNKNOWN", confidence: value ? confidence : "low", evidence: sources.filter(Boolean).slice(0, 3), note }; }
function bestPage(pages, hints) {
  const ranked = pages.map(page => {
    const haystack = `${page.url} ${page.title} ${page.description} ${page.headings.join(" ")}`.toLowerCase();
    const rank = hints.reduce((sum, hint) => sum + (new URL(page.url).pathname.toLowerCase().includes(hint) ? 3 : 0) + (haystack.includes(hint) ? 1 : 0), 0);
    return { page, rank, score: pageScore(page.url) };
  }).filter(item => item.rank).sort((a, b) => b.rank - a.rank || b.score - a.score);
  return ranked[0]?.page;
}

export function analyze(pages, rootUrl) {
  const home = pages[0];
  const company = home.site_name || home.title.split(/[|—–:-]/)[0].trim() || new URL(rootUrl).hostname.split(".")[0];
  const textLead = home.text.split(/(?<=[.!?])\s+/).map(value => clean(value, 500)).find(value => value.length > home.title.length + 18) || "";
  const lead = home.description || textLead || home.headings[0] || home.title;
  const allText = pages.map(page => page.text).join(" ");
  const productPage = bestPage(pages, ["product", "platform", "solution", "feature"]) || home;
  const product = productPage.description || (productPage !== home ? productPage.headings[0] : "");
  const problem = sentence(allText, ["struggle", "problem", "challenge", "manual", "time-consuming", "difficult", "waste"]);
  const problemPage = pages.find(page => problem && page.text.includes(problem)) || home;
  const featurePage = bestPage(pages, ["feature", "product", "platform", "capabilit"]) || productPage;
  const generic = new Set([company.toLowerCase(), home.title.toLowerCase(), (home.headings[0] || "").toLowerCase()]);
  const capabilityList = featurePage.headings.filter(value => value.length > 3 && value.length < 110 && !generic.has(value.toLowerCase())).slice(0, 5);
  const usePage = bestPage(pages, ["use-case", "solution", "industr", "customer", "workflow", "how to", "guide"]);
  const useList = (usePage?.headings || []).filter(value => value.length > 3 && value.length < 110).slice(0, 5);
  const audience = sentence(allText, ["teams", "businesses", "companies", "founders", "marketers", "developers", "sales", "enterprise", "startups", "agencies", "creators", "leaders"]);
  const audiencePage = pages.find(page => audience && page.text.includes(audience)) || home;
  const industryTerms = ["healthcare", "finance", "financial", "retail", "ecommerce", "education", "legal", "manufacturing", "saas", "real estate", "hospitality", "government"];
  const industries = [...new Set(industryTerms.filter(term => allText.toLowerCase().includes(term)).map(term => term[0].toUpperCase() + term.slice(1)))];
  let pricingPage = bestPage(pages, ["pricing", "plans"]);
  let pricing = pricingPage ? sentence(pricingPage.text, ["$", "₹", "free", "month", "year", "plan", "trial", "contact sales"]) || pricingPage.description || pricingPage.headings[0] : sentence(allText, ["free to use", "free public", "free plan", "subscription", "commission"]);
  pricingPage ||= pages.find(page => pricing && page.text.includes(pricing));
  const differentiator = sentence(allText, ["unlike", "the only", "first-ever", "fastest", "built specifically", "unique", "proprietary"]);
  const diffPage = pages.find(page => differentiator && page.text.includes(differentiator)) || home;
  const competitor = sentence(allText, ["alternative to", " versus ", " vs ", "competitor"]);
  const competitorPage = pages.find(page => competitor && page.text.includes(competitor)) || home;
  const market = sentence(`${home.description}. ${home.headings.join(". ")}`, ["platform", "software", "tool", "solution", "service", "marketplace", "assistant", "infrastructure"]);
  const value = sentence(`${home.description}. ${home.text}`, ["help", "enable", "increase", "reduce", "save", "grow", "build", "automate"]) || lead;
  return [
    finding("Company", company, "FACT", "high", [evidence(home, lead)]),
    finding("Product", product, "FACT", productPage === home ? "medium" : "high", [evidence(productPage, product)]),
    finding("Problem being solved", problem, "INFERENCE", "medium", [evidence(problemPage, problem)], "Inferred from problem-oriented website language."),
    finding("Product capabilities", capabilityList.join("; "), "FACT", "medium", [evidence(featurePage, capabilityList.slice(0, 3).join("; "))]),
    finding("Value proposition", value, "FACT", "high", [evidence(home, value)]),
    finding("Positioning", market || lead, "INFERENCE", "medium", [evidence(home, market || lead)], "Inferred from the homepage category and promise."),
    finding("Likely target customers", audience, "INFERENCE", "medium", [evidence(audiencePage, audience)], "Audience language is treated as a likely target, not a confirmed sales segment."),
    finding("Likely ICP", audience, "INFERENCE", "low", [evidence(audiencePage, audience)], "A true ICP also needs customer, deal, and retention data."),
    finding("Industries", industries.slice(0, 8).join(", "), "INFERENCE", "medium", [evidence(usePage || home, industries.slice(0, 8).join(", "))]),
    finding("Use cases", useList.join("; "), "FACT", "medium", [evidence(usePage || home, useList.slice(0, 3).join("; "))]),
    finding("Pricing / business model", pricing, "FACT", pricing ? "high" : "low", [evidence(pricingPage || home, pricing)]),
    finding("Messaging", lead, "FACT", "high", [evidence(home, lead)]),
    finding("Differentiators", differentiator, "INFERENCE", "medium", [evidence(diffPage, differentiator)], "Only explicit or strongly signalled differentiation is included."),
    finding("Competitors", competitor, "FACT", "medium", [evidence(competitorPage, competitor)], "Rabbit does not invent competitor names when the reviewed site does not mention comparisons."),
    finding("Market / category", market, "INFERENCE", "medium", [evidence(home, market)], "Inferred from how the company describes its product category.")
  ];
}

export async function research(value) {
  const started = Date.now();
  const root = validUrl(value);
  const home = await fetchPage(root.href);
  const host = siteHost(home.url);
  const [robotsResult, sitemapResult] = await Promise.allSettled([
    safeFetch(new URL("/robots.txt", home.url).href, ["text/plain"], 200000),
    safeFetch(new URL("/sitemap.xml", home.url).href, ["xml", "text/plain"], 500000)
  ]);
  const robots = robotsResult.status === "fulfilled" ? robotsResult.value.text : "";
  const sitemap = sitemapResult.status === "fulfilled" ? [...sitemapResult.value.text.matchAll(/<loc[^>]*>([\s\S]*?)<\/loc>/gi)].map(match => decode(match[1])) : [];
  const candidates = new Set();
  for (const raw of [...sitemap, ...home.links]) {
    try {
      const url = validUrl(new URL(raw, home.url).href);
      if (sameSite(url.href, host) && url.href !== home.url && allowedByRobots(robots, url.pathname) && pageScore(url.href) >= 50) candidates.add(url.href);
    } catch { /* ignore malformed or unsafe links */ }
  }
  const selected = [...candidates].sort((a, b) => pageScore(b) - pageScore(a)).slice(0, MAX_PAGES - 1);
  const settled = await Promise.allSettled(selected.map(fetchPage));
  const failures = [];
  const pages = [home];
  settled.forEach((result, index) => {
    if (result.status === "fulfilled" && sameSite(result.value.url, host) && !pages.some(page => page.url === result.value.url)) pages.push(result.value);
    else if (result.status === "rejected") failures.push({ url: selected[index], reason: clean(result.reason?.message || "Page could not be read", 180) });
  });
  const findings = analyze(pages, home.url);
  const known = findings.filter(item => item.kind !== "UNKNOWN").length;
  return { status: "complete", company_url: home.url, company: findings[0].value, generated_at: new Date().toISOString(), duration_seconds: Math.round((Date.now() - started) / 100) / 10, pages: pages.map(page => ({ url: page.url, title: page.title || page.url })), findings, coverage: { known, unknown: findings.length - known, total: findings.length }, failures: failures.slice(0, 8), limits: { page_cap: MAX_PAGES, pages_reviewed: pages.length } };
}

async function handler(request) {
  if (request.method !== "POST") return new Response(JSON.stringify({ error: "Use the website form to begin research." }), { status: 405, headers: responseHeaders });
  try {
    const length = Number(request.headers.get("content-length") || 0);
    if (length > MAX_BODY) throw new Error("The request was too large.");
    if (!(request.headers.get("content-type") || "").includes("application/json")) throw new Error("The request format was not supported.");
    const raw = await request.text();
    if (!raw || raw.length > MAX_BODY) throw new Error("The request was empty or too large.");
    const body = JSON.parse(raw);
    if (!body || typeof body.url !== "string") throw new Error("Enter a website URL to begin.");
    return new Response(JSON.stringify(await research(body.url)), { headers: responseHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: clean(error?.message || "Rabbit could not finish this research run safely.", 300) }), { status: 400, headers: responseHeaders });
  }
}

export const onRequestPost = context => handler(context.request);
export const onRequestGet = context => handler(context.request);
export default { fetch: handler };
