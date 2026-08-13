# Rabbit — local-first GTM planning workspace

Rabbit is a static, GitHub Pages-compatible MVP for turning a product description into a structured go-to-market planning brief. Six coordinated stages create local drafts: Scout, Atlas, Signal, Writer, Operator, and Optimizer.

## What static mode does

- Collects a product website, offer, target market, and goal.
- Creates deterministic strategy, ICP, account-research, messaging, campaign, and learning artifacts from those inputs.
- Saves the workspace, approvals, run state, and audit trail in the current browser's local storage.
- Allows a readable GTM plan and local workspace data to be downloaded.
- Provides an optional dependency-free Python CLI that creates the same kind of local planning JSON.

## What static mode does not do

It does not inspect websites, crawl the web, discover people or companies, verify contacts, send email, publish content, book meetings, change a budget, or report live performance. It contains no API keys and should not be used to store them.

Sending email, publishing, calendar booking, and budget changes are mandatory approval gates. In the static MVP, approval only records a local decision; it does not perform an external action.

## Free MVP stack options

- **Ollama** for local model-assisted drafting.
- **Google Gemini free tier** for optional hosted drafting within its free limits.
- **Supabase free tier** for authentication and a database.
- **Resend free tier** for email delivery after a server-side approval workflow.

Secrets and integrations need a server-side backend: static GitHub Pages cannot safely hold private API keys. Any real outreach should also include consent, legal review, sender identity, and a clear human approval flow.

## Run locally

No dependencies are required:

1. In this folder, run `python3 -m http.server 3000`.
2. Open `http://localhost:3000`.

Optional CLI example: run `python3 agent_engine.py --help` to view its required inputs. It only writes a local planning JSON file.

## Structure

- `index.html` — application shell
- `css/styles.css` — responsive editorial interface
- `js/app.js` — local state, deterministic workflow, approvals, exports
- `agent_engine.py` — optional standard-library local CLI
