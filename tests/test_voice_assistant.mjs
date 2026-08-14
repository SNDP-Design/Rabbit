import test from "node:test";
import assert from "node:assert/strict";
import { answerFromMemory } from "../voice-assistant.js";

const memory = {
  company: "Acme",
  pages: [
    { url: "https://acme.test/", title: "Acme", headings: ["Automate reporting"], text: "Acme is a reporting platform for marketing teams. It automates weekly dashboards and performance summaries." },
    { url: "https://acme.test/pricing", title: "Pricing", headings: ["Simple plans"], text: "Start free. The Pro plan costs $19 per month and includes unlimited reports." }
  ],
  findings: [
    { title: "Product", kind: "FACT", value: "A reporting platform for marketing teams.", evidence: [{ url: "https://acme.test/", page: "Acme" }] },
    { title: "Pricing / business model", kind: "FACT", value: "The Pro plan costs $19 per month.", evidence: [{ url: "https://acme.test/pricing", page: "Pricing" }] }
  ]
};

test("answers product questions from saved website memory", () => {
  const result = answerFromMemory("What does this company do?", memory);
  assert.match(result.answer, /reporting platform/i);
  assert.equal(result.source.url, "https://acme.test/");
});

test("answers pricing questions with the relevant source", () => {
  const result = answerFromMemory("What does it cost?", memory);
  assert.match(result.answer, /\$19/);
  assert.equal(result.source.url, "https://acme.test/pricing");
});

test("does not invent an answer without website memory", () => {
  const result = answerFromMemory("What does it cost?", null);
  assert.match(result.answer, /Research a website first/);
  assert.equal(result.source, null);
});
