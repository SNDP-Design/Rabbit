#!/usr/bin/env python3
"""Optional, dependency-free Rabbit planning CLI.

It creates deterministic planning artifacts from inputs provided at the command line.
It does not browse websites, discover contacts, send messages, publish content,
book meetings, alter budgets, or call an AI provider.
"""
import argparse
import json
from datetime import datetime, timezone

AGENTS = [
    ("Scout", "Offer and market research brief"),
    ("Atlas", "ICP hypotheses"),
    ("Signal", "Account research criteria"),
    ("Writer", "Messaging draft"),
    ("Operator", "Campaign plan"),
    ("Optimizer", "Learning recommendations"),
]

def artifact(name, title, offer, market, goal):
    text = {
        "Scout": f"Working offer: {offer}\nMarket: {market}\nGoal: {goal}\n\nResearch tasks: validate the customer problem, compare alternatives, and collect customer language. No web research was performed.",
        "Atlas": f"Hypothesis: teams in {market} with a clear need related to {goal}. Qualify with urgency, workflow, ownership, and measurable impact. These are hypotheses, not customer data.",
        "Signal": f"Research accounts in {market} with public evidence of a related initiative. Record company context and source links. No contacts or companies were discovered by this CLI.",
        "Writer": f"Draft: Rabbit helps teams in {market} assess {offer} in relation to {goal}. Adapt with truthful public context. Sending always needs approval.",
        "Operator": "Plan: test the hypothesis in small, approved batches; document replies and objections; revise messaging. Publishing, email, calendar, and budget actions need approval.",
        "Optimizer": "Measure observed outcomes only after connected systems record them. Next: interview five relevant people and update the message with their language.",
    }[name]
    return {"agent": name, "title": title, "body": text}

def main():
    parser = argparse.ArgumentParser(description="Create a local, deterministic Rabbit GTM planning brief.")
    parser.add_argument("--website", required=True)
    parser.add_argument("--offer", required=True)
    parser.add_argument("--market", required=True)
    parser.add_argument("--goal", required=True)
    parser.add_argument("--output", default="rabbit-plan.json")
    args = parser.parse_args()
    plan = {"mode": "local deterministic planning", "website": args.website, "created_at": datetime.now(timezone.utc).isoformat(), "artifacts": [artifact(*agent, args.offer, args.market, args.goal) for agent in AGENTS], "safety": "No external action was performed."}
    with open(args.output, "w", encoding="utf-8") as handle:
        json.dump(plan, handle, indent=2)
    print(f"Created {args.output} with {len(plan['artifacts'])} local planning artifacts. No external action was performed.")

if __name__ == "__main__":
    main()
