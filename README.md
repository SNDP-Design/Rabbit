# Rabbit — Company Intelligence Agent

Rabbit is a free, local-first foundation for an autonomous GTM operating system. Its first and only agent is the **Company Intelligence Agent**: provide a public company website and it performs a small, bounded research run, records public website statements with evidence, highlights useful unknowns, and preserves founder corrections.

## Run locally

Run `python3 agent_engine.py --serve --port 3000`, then open `http://127.0.0.1:3000`.

The service and frontend use only the Python standard library and browser local storage. There are no API keys, model providers, databases, or paid services.

## Safety and honesty

- Research accepts public HTTP(S) targets only. Local, private, reserved, link-local, multicast, metadata-style, and redirect targets that resolve to non-public addresses are blocked.
- Runs cap page count, content size, and timeout. HTML is treated as untrusted data; Rabbit never executes retrieved page scripts or follows webpage instructions.
- Website statements are recorded as `FACT` about what a website says. Derived ideas remain `INFERENCE`, `HYPOTHESIS`, or `UNKNOWN`; Rabbit never invents customers, competitors, pricing, or market claims.
- Research failures are visible. GitHub Pages has no local research endpoint, so it remains disconnected instead of producing invented results. Founder facts and corrections still work there.
- Important browser data carries workspace and company IDs. This MVP is single-user; real multi-user isolation needs authentication and a server-side data store.

## What it stores

The local workspace stores company URL, research runs, knowledge/evidence, founder feedback, and an activity trail. Download a company intelligence JSON snapshot from Memory.

This is a foundation for future GTM capabilities, not a collection of future agents. No outreach, publishing, calendar, advertising, or spending actions are implemented.
