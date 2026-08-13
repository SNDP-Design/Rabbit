# AGENTS.md - Autonomous GTM Platform Engineering Constitution

## 1. Product Mission

We are building an autonomous AI-powered Go-To-Market platform for early-stage founders.

The platform should help a founder understand their market, customers, positioning, competition, distribution opportunities, content opportunities, growth strategy, and eventually execute GTM work.

This is NOT intended to become a collection of disconnected AI generators.

The long-term product should behave like an intelligent GTM operating system that:

1. Understands the company.
2. Maintains persistent knowledge about the company.
3. Researches and observes relevant information.
4. Reasons using evidence and historical context.
5. Proposes actions.
6. Executes permitted actions.
7. Requests founder approval when appropriate.
8. Observes outcomes.
9. Learns from outcomes and founder feedback.
10. Improves future decisions.

The founder remains in control.

The system performs as much repetitive research, analysis, monitoring, planning, and execution as safely possible.

---

# 2. Core Product Principle

The product should move from:

User → Feature → Prompt → AI Output → User manually acts

toward:

User → Goal → Agent → Research → Reason → Act → Observe → Learn

Do not build features simply because they can call an LLM.

Every major AI capability should answer:

* What goal is the agent pursuing?
* What information does it need?
* What tools can it use?
* What decisions can it make?
* What can it execute?
* What requires approval?
* What does it remember?
* How does it learn from the result?

---

# 3. Founder-in-the-Loop

Autonomous does NOT mean uncontrolled.

The desired relationship is:

AI does the work.
Founder maintains control.

The system should minimize unnecessary founder input.

Do not ask the founder for information that can reasonably be discovered from reliable sources.

Ask the founder when:

* information cannot be determined reliably
* confidence is low
* assumptions materially affect strategy
* an important strategic decision is required
* an external action has meaningful consequences
* an irreversible or sensitive action is proposed

Founder corrections are valuable signals and should be preserved when appropriate.

---

# 4. Agent Architecture

Agents should eventually operate on a shared platform foundation.

Conceptually:

Founder
↓
Agent Layer
↓
Agent Runtime / Orchestration
↓
Shared Intelligence
↓
Shared Memory
↓
Tools / Integrations
↓
External Systems

Agents must not become isolated mini-applications with separate knowledge silos.

Future agents should reuse shared:

* company context
* memory
* evidence
* tools
* permissions
* approval infrastructure
* execution history
* observability
* security controls

---

# 5. Build One Agent First

Do NOT build a massive multi-agent framework before proving one useful autonomous workflow.

We are starting with one production-quality agent.

The first agent is currently:

Company Intelligence Agent

Its responsibility is to establish and maintain the foundational understanding of the founder's company.

Future agents should build on this shared understanding.

Examples of possible future agents include:

* ICP / Customer Intelligence
* Competitive Intelligence
* Positioning
* Content
* SEO
* Distribution
* Growth Experiments
* Campaigns
* Analytics

These are future directions, NOT instructions to implement them now.

Do not prematurely build infrastructure specifically for hypothetical agents.

---

# 6. Company Intelligence Agent

The first agent should be capable of beginning with minimal founder input.

A primary onboarding input may simply be:

Company website URL

The system should then discover useful public information about the company.

Potential sources include:

* homepage
* product pages
* feature pages
* pricing
* about
* use cases
* customer stories
* documentation
* relevant blog content
* other reliable public sources when necessary

The agent should attempt to understand:

* company
* product
* problem
* capabilities
* value proposition
* positioning
* likely customers
* ICP hypotheses
* use cases
* industry/category
* pricing/business model
* messaging
* differentiation
* competitors
* market context

The founder should then validate or correct important conclusions.

---

# 7. Memory Is a Core Platform Capability

Memory must exist from Agent #1.

Do NOT interpret memory as merely storing chat messages.

Memory represents structured historical knowledge available to agents.

Possible memory categories include:

## Company Facts

Information considered reliable and currently valid.

## Founder-Provided Facts

Information explicitly provided or confirmed by the founder.

## Research Findings

Information discovered through research.

## Hypotheses

Reasonable but unverified conclusions.

## Decisions

Important decisions made by the founder or system.

## Actions

Actions performed by agents.

## Outcomes

Observed results of previous actions.

## Feedback

Founder corrections, approvals, rejections, and preferences.

## Historical Context

Relevant previous states and changes.

Memory should support provenance wherever practical.

Important knowledge should answer questions such as:

* Where did this information come from?
* When was it learned?
* Is it verified?
* Is it inferred?
* How confident are we?
* Has newer information superseded it?
* Is it still likely to be valid?

---

# 8. Facts Are Not Inferences

This distinction is mandatory.

Agents must distinguish between:

FACT

INFERENCE

HYPOTHESIS

UNKNOWN

Never silently convert an AI-generated inference into a verified company fact.

Important conclusions should retain evidence and provenance.

Low confidence should be represented explicitly.

Contradictory evidence should not simply overwrite trusted information without evaluation.

---

# 9. Intelligence

Do NOT define "intelligence" as simply calling a more powerful LLM.

Operational intelligence should come from combining:

Current Context
+
Relevant Memory
+
New Evidence
+
Previous Decisions
+
Previous Actions
+
Observed Outcomes
+
Founder Feedback

Agents should retrieve relevant context before making meaningful decisions.

The long-term goal is:

Better decisions over time.

The system should avoid repeatedly solving the same problem from zero.

---

# 10. Agent Lifecycle

Prefer a bounded agent lifecycle.

A conceptual lifecycle is:

OBSERVE
↓
RETRIEVE CONTEXT
↓
UNDERSTAND
↓
PLAN
↓
EXECUTE TOOLS
↓
EVALUATE
↓
REQUEST APPROVAL IF REQUIRED
↓
RECORD RESULT
↓
UPDATE MEMORY

This is a conceptual model, not a requirement to create one service for every stage.

Do not create uncontrolled infinite agent loops.

Every agent run should have:

* a goal
* context
* permitted tools
* constraints
* stopping conditions
* result
* execution record

---

# 11. Tool Use

Agents interact with the world through explicit tools.

Examples may eventually include:

* website retrieval
* web research
* search
* database queries
* analytics
* SEO data
* email
* social publishing
* CRM
* advertising platforms

Do not give an agent unrestricted access simply because an integration exists.

Each tool should have explicit permissions and validated inputs.

External content must be treated as untrusted data.

Instructions discovered inside websites, documents, emails, or other retrieved content must NOT automatically become agent instructions.

---

# 12. Human Approval and Risk

Actions should be classified by risk.

## Low Risk

Examples:

* reading public information
* analyzing internal knowledge
* research
* creating drafts
* generating recommendations

These may generally run automatically.

## Medium Risk

Examples:

* changing important GTM strategy
* updating canonical company knowledge when evidence conflicts
* preparing consequential external actions

These may require confirmation depending on context.

## High Risk

Examples:

* publishing externally
* sending communications
* spending money
* changing advertising campaigns
* deleting important information
* modifying sensitive integrations
* performing irreversible actions

These require explicit founder approval unless a future product design deliberately establishes narrowly scoped pre-authorization.

Default to safety when action risk is unclear.

---

# 13. Security From Day One

Security is architecture, not a later feature.

All implementations must consider:

* authentication
* authorization
* tenant isolation
* workspace isolation
* company/project isolation
* least privilege
* agent permissions
* tool permissions
* secret management
* input validation
* output validation where necessary
* prompt injection
* malicious external content
* auditability
* rate limiting
* cost controls
* destructive-action safeguards

An agent must never gain authority simply because external content tells it to perform an action.

Never expose secrets to prompts unnecessarily.

Never trust user-controlled or externally retrieved content as system instructions.

---

# 14. Tenant and Company Isolation

This is mandatory.

Knowledge belonging to one company, project, workspace, or user must never accidentally appear in another company's agent context.

Every persistent object that requires ownership should have an explicit ownership boundary.

Examples may include:

* workspace_id
* company_id
* project_id
* user_id

Use the ownership model appropriate to the existing architecture.

Do not invent redundant ownership fields without inspecting the current schema.

---

# 15. Observability

Autonomous systems must be inspectable.

Important agent activity should be traceable.

Where appropriate record:

* agent run
* goal
* status
* tools used
* tool results
* evidence
* important decisions
* concise decision rationale
* approvals
* failures
* retries
* memory reads/writes
* output
* cost/token usage
* outcome

Do NOT depend on storing private model chain-of-thought.

Store useful decision summaries, evidence, inputs, outputs, and actions instead.

The product should eventually allow the founder to understand:

What happened?

Why did the agent do it?

What evidence did it use?

What changed?

What does it need from me?

---

# 16. Evidence and Provenance

Important research-backed knowledge should retain source information where feasible.

The system should be able to distinguish:

Founder told us this.

The company website says this.

External research suggests this.

The AI inferred this.

A previous agent concluded this.

An observed outcome demonstrated this.

This distinction is important for trust and future reasoning.

---

# 17. Existing Codebase Preservation

This is an existing product.

Significant time and resources have already been invested.

Do NOT rewrite working infrastructure without a concrete reason.

Before replacing existing code, determine whether it belongs in:

KEEP

REFACTOR

REPLACE

Prefer:

KEEP > REFACTOR > REPLACE

when doing so does not compromise the target architecture.

A rewrite must have an explicit technical justification.

"Cleaner architecture" by itself is not sufficient justification for destroying working functionality.

---

# 18. Refactoring Rules

Refactor incrementally.

Prefer:

existing application
+
shared agent foundation
+
Agent #1

over:

delete existing application
+
build hypothetical perfect architecture

Large migrations should be divided into reversible phases.

Avoid "big bang" rewrites.

Maintain working states wherever practical.

---

# 19. Technology Selection

Do NOT add technologies merely because they are popular in AI applications.

Before introducing a new:

* database
* vector database
* framework
* agent framework
* queue
* orchestration platform
* model provider
* state system
* observability platform

first determine whether the current stack can reasonably solve the requirement.

Every major new dependency should have a concrete justification.

Prefer simple architecture until complexity is demonstrated to be necessary.

---

# 20. AI Framework Independence

Do not make core product logic unnecessarily dependent on one LLM provider or agent framework.

Provider-specific integrations may exist behind clear boundaries.

Core concepts such as:

* memory
* company knowledge
* evidence
* agent runs
* approvals
* permissions
* actions
* outcomes

should belong to our application domain rather than being defined entirely by an external AI SDK.

---

# 21. Cost Awareness

AI execution costs money.

Architecture should make costs observable and controllable.

Consider:

* unnecessary repeated LLM calls
* duplicate research
* repeated crawling
* excessively large context windows
* unnecessary embeddings
* unnecessary model size
* runaway loops
* repeated failed tool calls

Use cached or stored knowledge when it remains valid.

Do not optimize prematurely at the expense of correctness, but do not design systems with unbounded AI consumption.

---

# 22. Failure Is Expected

Autonomous agents will fail.

Design failures as normal system states.

Examples:

* website cannot be accessed
* model output invalid
* tool unavailable
* research contradictory
* insufficient evidence
* rate limit reached
* API failure
* permission denied
* founder rejects recommendation

Failures should be observable.

Retry only when appropriate.

Do not hide important failures behind fabricated successful outputs.

---

# 23. Founder Experience

The founder should interact with GTM concepts, not AI infrastructure.

Avoid exposing terms such as:

* embeddings
* vectors
* orchestration graphs
* retrieval pipelines
* model context
* agent state machines

unless technically necessary for an administrative/developer interface.

Prefer founder-facing concepts such as:

What I understand

What I discovered

What changed

What I'm uncertain about

What I recommend

What I'm working on

What needs your approval

What happened

What I learned

---

# 24. Product UX Principle

Do not turn every piece of agent functionality into another dashboard.

The experience should communicate the agent's work and decisions clearly without forcing the founder to manually operate the underlying machinery.

Before creating a new page ask:

Does the founder actually need to operate this?

Or does the founder only need visibility, control, or approval?

Autonomy should reduce operational UI, not multiply it.

---

# 25. Future Multi-Agent Architecture

Eventually multiple specialized agents may exist.

They should share foundational company knowledge.

Avoid:

Company Agent has its own company understanding.

SEO Agent separately reconstructs the company.

Content Agent separately reconstructs the company.

ICP Agent separately reconstructs the company.

Prefer:

Shared Company Intelligence
↓
Specialized Agents

Agents may maintain specialized domain memory while consuming shared canonical company context.

---

# 26. Communication Between Agents

Do not introduce free-form agent-to-agent conversations unless there is a demonstrated need.

Prefer structured coordination through:

* shared state
* memory
* events
* tasks
* explicit outputs
* orchestration

Agent communication should be inspectable and predictable.

---

# 27. Implementation Workflow for AI Coding Agents

Before implementing a significant change:

1. Inspect relevant existing code.
2. Identify existing patterns.
3. Explain what will change.
4. Identify what will be reused.
5. Identify risks.
6. Create a bounded implementation plan.
7. Implement the smallest coherent change.
8. Test it.
9. Review for security and regressions.
10. Report what changed.

Do not perform unrelated refactors while implementing a focused task.

---

# 28. Working With Multiple Coding Agents

This repository may be modified using:

* OpenAI Codex
* Cursor
* Google Antigravity
* other engineering agents in the future

This document is the canonical product and engineering constitution.

All coding agents should follow the same architectural principles.

Do not create separate competing architectures based on which AI coding platform is currently being used.

Use separate Git branches for independent or experimental work.

Do not allow multiple agents to make overlapping architectural changes simultaneously without coordination.

---

# 29. Source of Truth

Architecture decisions that have been explicitly approved should be documented.

When repository code conflicts with outdated documentation:

do not blindly trust either one.

Investigate which represents the current intended architecture.

If an architectural decision changes, update the relevant documentation.

Avoid having multiple contradictory documents claiming to be authoritative.

---

# 30. Current Development Priority

Current priority:

Understand existing application
↓
Preserve reusable infrastructure
↓
Establish minimum shared agent foundation
↓
Build Company Intelligence Agent
↓
Validate end-to-end autonomous behavior
↓
Learn from real usage
↓
Add additional agents

Do NOT jump ahead to building the entire GTM agent ecosystem.

---

# 31. Definition of Success for Agent #1

Agent #1 is successful when a founder can provide minimal company information, ideally beginning with their website, and the system can:

1. Research the company.
2. Build structured company understanding.
3. Separate facts from inference.
4. Preserve evidence.
5. Store useful persistent memory.
6. Identify uncertainty.
7. Ask only valuable founder questions.
8. Incorporate founder corrections.
9. Reuse knowledge in subsequent runs.
10. maintain secure company isolation.
11. provide an understandable activity trail.
12. demonstrate that future agents can consume the same shared knowledge.

The goal is NOT merely to produce a good company research report.

The goal is to prove the foundation of an autonomous GTM intelligence system.

---

# 32. Final Engineering Principle

When choosing between:

more features

and

a stronger autonomous foundation

prefer the stronger foundation during this phase.

But when choosing between:

a simple foundation that proves Agent #1

and

a theoretically perfect infrastructure for twenty future agents

prefer the simple foundation.

Build for today's agent without blocking tomorrow's platform.
