export const KNOWLEDGE_ARCHITECTURE = {
  version: "1.0",
  memory_contract: "memory.md",
  skill_contract: "skill.md",
  agent_contract: "agent.md",
  intelligence_contract: "intelligence.md",
  stages: ["crawl", "luna_evidence", "terra_synthesis", "evidence_review", "memory_build"],
  persistence: "browser-local MVP memory; server persistence requires a datastore binding"
};

export const AGENT_WORKFLOW = "Use the crawl mapper to discover internal pages, Luna to extract exact evidence, specialist analysis to organize product knowledge, Terra to make the collective judgment, an evidence reviewer to reject unsupported claims, and the memory builder to store only validated outputs.";

export const INTELLIGENCE_RULES = "The decision must use the normalized knowledge base and exact source excerpts. Separate FACT, INFERENCE, and UNKNOWN. Never invent competitors, pricing, ICP, capabilities, or market claims. State risks and next questions when public evidence cannot establish a conclusion.";
