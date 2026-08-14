# Rabbit

Rabbit is a free, local-first company intelligence web app. Enter a public website and its coordinated research agents read a bounded set of relevant pages, then produce a structured brief with evidence links, confidence, and clearly labelled facts, inferences, and unknowns.

**Live app:** [rabbit-gtm.pages.dev](https://rabbit-gtm.pages.dev/)

## Start Rabbit

1. Open Terminal in this folder.
2. Run `python3 agent_engine.py --serve`.
3. Open `http://127.0.0.1:3000` in a browser.

Rabbit uses the Python standard library locally and a matching Cloudflare Pages Function in production. It needs no API key, paid service, database, or account for visitors.

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
