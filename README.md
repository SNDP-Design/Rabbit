# Rabbit

Rabbit is a free, local-first company intelligence web app. Enter a public website and its coordinated research agents read a bounded set of relevant pages, then produce a structured brief with evidence links, confidence, and clearly labelled facts, inferences, and unknowns.

**Live app:** [rabbit-gtm.pages.dev](https://rabbit-gtm.pages.dev/)

## Start Rabbit

1. Open Terminal in this folder.
2. Run `python3 agent_engine.py --serve`.
3. Open `http://127.0.0.1:3000` in a browser.

Rabbit uses the Python standard library locally and a matching Cloudflare Pages Function in production. It needs no API key, paid service, database, or account for visitors.

## OpenAI synthesis

The production function uses a bounded two-stage OpenAI workflow: `gpt-5.6-luna` first compresses the crawled pages into an evidence digest, then `gpt-5.6-terra` turns that digest and a verification catalog into the structured brief. Every factual evidence excerpt is checked against the retrieved source text before it is shown. If OpenAI is unavailable or not configured, Rabbit visibly falls back to its local evidence rules.

To activate AI synthesis securely, add an encrypted Cloudflare Pages secret named `OPENAI_API_KEY` to the `rabbit-gtm` project. Do not place the key in the website, repository, or browser. Optional `OPENAI_TERRA_MODEL` and `OPENAI_LUNA_MODEL` variables can change the two model IDs; the defaults are `gpt-5.6-terra` and `gpt-5.6-luna`.

## What the MVP reviews

Rabbit prioritizes homepage, product, feature, solution, use-case, customer, pricing, about, documentation, and useful blog pages. A research run is capped at 12 public HTML pages and reports pages it could not read.

## Safety and honesty

- Local, private, reserved, link-local, metadata-style, credentialed, and nonstandard-port targets are blocked, including redirects.
- Rabbit does not execute website scripts and caps redirects, response size, total text, page count, and request time.
- `robots.txt` exclusions are respected when available.
- Website statements are presented as facts about what the site says. Derived conclusions are marked as inferences. Missing evidence remains unknown.
- Competitors and pricing are never invented when the reviewed pages do not establish them.

## Verify

Run `python3 -m unittest discover -s tests -v`.
