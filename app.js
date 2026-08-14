const AGENTS = [
  ["CR", "Crawl mapper"], ["PR", "Product analyst"], ["AU", "Audience analyst"],
  ["PK", "Pricing analyst"], ["MK", "Market analyst"], ["EV", "Evidence reviewer"]
];

const $ = (selector) => document.querySelector(selector);
const agentsEl = $("#agents");
const form = $("#url-form");
const input = $("#url-input");
const button = $("#search-button");
let currentResult = null;
let progressTimer = null;

function renderAgents(active = -1, complete = false) {
  agentsEl.innerHTML = AGENTS.map(([icon, name], index) => {
    const state = complete || index < active ? "complete" : index === active ? "active" : "";
    return `<div class="agent ${state}"><span class="agent-icon">${icon}</span><span>${name}</span><span class="agent-state"></span></div>`;
  }).join("");
}

function showState(name) {
  ["empty-state", "loading-state", "results", "error-state"].forEach(id => $("#" + id).classList.toggle("hidden", id !== name));
}

function safeUrl(value) {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function beginProgress() {
  const stages = [
    [8, 0, "Mapping high-value pages"], [23, 1, "Understanding the product"],
    [39, 2, "Identifying customers and ICP"], [55, 3, "Reviewing pricing and business model"],
    [69, 4, "Placing the company in its market"], [82, 5, "Checking every conclusion against evidence"]
  ];
  let stage = 0;
  const update = () => {
    const [value, agent, message] = stages[Math.min(stage, stages.length - 1)];
    $("#progress-value").textContent = value + "%";
    $("#progress-bar").style.width = value + "%";
    $("#loading-title").textContent = message;
    $("#loading-message").textContent = "Rabbit is reading public pages. This can take up to a minute on larger websites.";
    renderAgents(agent);
    stage++;
  };
  update();
  progressTimer = setInterval(update, 2200);
}

function escapeHtml(value = "") {
  return value.replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
}

function renderResult(result) {
  currentResult = result;
  const coverage = Math.round((result.coverage.known / result.coverage.total) * 100);
  const product = result.findings.find(item => item.title === "Product");
  const messaging = result.findings.find(item => item.title === "Messaging");
  const summary = product && product.kind !== "UNKNOWN" ? product.value : (messaging?.value || "Public website intelligence");
  $("#page-title").textContent = result.company;
  $("#company-name").textContent = result.company;
  $("#company-summary").textContent = summary;
  $("#coverage-score").textContent = coverage + "%";
  $("#metrics").innerHTML = [
    [result.limits.pages_reviewed, "pages reviewed"],
    [result.coverage.known, "areas established"],
    [result.coverage.unknown, "open questions"],
    [result.analysis_engine === "evidence-rules" ? "Local" : "OpenAI", "analysis engine"]
  ].map(([value, label]) => `<div class="metric"><strong>${escapeHtml(String(value))}</strong><span>${label}</span></div>`).join("");
  const aiActive = result.analysis_engine !== "evidence-rules";
  $("#analysis-note").className = `analysis-note ${aiActive ? "ai-active" : "ai-fallback"}`;
  $("#analysis-note").textContent = aiActive
    ? `AI synthesis complete with ${result.analysis_engine}. Every fact was checked against the crawled source text.`
    : (result.analysis_warning || "OpenAI synthesis was unavailable, so Rabbit used its evidence rules.");
  $("#findings").innerHTML = result.findings.map(item => {
    const sources = item.evidence.map(source => `<a class="evidence-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.excerpt)}<span>${escapeHtml(source.url)}</span></a>`).join("");
    return `<article class="finding"><div class="finding-top"><h3>${escapeHtml(item.title)}</h3><span class="badge ${item.kind.toLowerCase()}">${item.kind} · ${escapeHtml(item.confidence)}</span></div><p class="finding-value">${escapeHtml(item.value)}</p>${item.note ? `<p class="finding-note">${escapeHtml(item.note)}</p>` : ""}${sources}</article>`;
  }).join("");
  $("#sources").innerHTML = result.pages.map((page, index) => `<a class="source" href="${escapeHtml(page.url)}" target="_blank" rel="noopener noreferrer"><span class="source-num">${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(page.title)}</strong><span>${escapeHtml(page.url)}</span></a>`).join("");
  $("#run-state").className = "run-state";
  $("#run-state").innerHTML = "<span></span>Complete";
  renderAgents(-1, true);
  showState("results");
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!input.value.trim()) return;
  button.disabled = true;
  showState("loading-state");
  $("#run-state").className = "run-state running";
  $("#run-state").innerHTML = "<span></span>Researching";
  beginProgress();
  try {
    const response = await fetch("/api/research", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({url: safeUrl(input.value)})});
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "The research run could not be completed.");
    clearInterval(progressTimer);
    $("#progress-value").textContent = "100%";
    $("#progress-bar").style.width = "100%";
    renderResult(data);
  } catch (error) {
    clearInterval(progressTimer);
    $("#error-message").textContent = error.message;
    $("#run-state").className = "run-state";
    $("#run-state").innerHTML = "<span></span>Stopped";
    renderAgents();
    showState("error-state");
  } finally {
    button.disabled = false;
  }
});

$("#try-again").addEventListener("click", () => { showState("empty-state"); input.focus(); });
$("#copy-summary").addEventListener("click", async () => {
  if (!currentResult) return;
  const text = currentResult.findings.map(item => `${item.title} [${item.kind}]: ${item.value}`).join("\n\n");
  await navigator.clipboard.writeText(text);
  $("#copy-summary").textContent = "Copied";
  setTimeout(() => $("#copy-summary").textContent = "Copy brief", 1400);
});

renderAgents();
