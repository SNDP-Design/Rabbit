# Rabbit website intelligence skill

## Purpose

Convert a public website into a complete, evidence-backed product knowledge base and a cautious business judgment.

## Required behavior

- discover sitemap URLs and recursively follow same-site HTML links
- prioritize product, feature, solution, pricing, about, use-case, customer, documentation, security, integration, and useful blog pages
- extract readable text while excluding scripts, styles, navigation noise, and executable website content
- use Luna for bounded evidence extraction and Terra for synthesis and judgment
- require exact contiguous evidence excerpts and validate them against the crawled source text
- return structured output with a fixed schema so the UI and memory remain stable

## Quality bar

Prefer `UNKNOWN` to a confident guess. Treat ICP, positioning, differentiators, and competitors as inferences unless the website explicitly supports them. A judgment must cite the collective evidence and state what remains unverified.
