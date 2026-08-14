# Rabbit agent architecture

Rabbit is a coordinated pipeline, not a single free-form chatbot.

## Agents

1. Crawl mapper: discovers and safely fetches internal pages.
2. Evidence analyst (Luna): extracts page types, claims, and exact excerpts.
3. Product analyst: identifies the product, problem, capabilities, and value proposition.
4. Audience analyst: identifies target customers, ICP, industries, and use cases.
5. Commercial analyst: identifies pricing, business model, messaging, and differentiation.
6. Market analyst: identifies category and explicitly mentioned competitors.
7. Senior synthesizer (Terra): consolidates the knowledge base and makes the intelligence decision.
8. Evidence reviewer: rejects unsupported claims before display or memory storage.
9. Memory builder: stores source text, normalized knowledge, evidence, and judgment.

## Handoff

The crawl produces source pages. Luna produces an evidence digest. Terra receives the digest plus a verification catalog. The reviewer validates every excerpt. The memory builder stores the validated result. No later stage may silently replace missing evidence with outside knowledge.
