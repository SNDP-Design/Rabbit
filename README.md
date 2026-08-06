# 🐇 Rabbit — Fully Autonomous AI Agent GTM Platform

> **Rabbit** is an end-to-end, self-operating Go-To-Market (GTM) AI platform driven by an autonomous multi-agent workforce that researches markets, enriches leads, crafts hyper-personalized sequences, executes omnichannel drips, handles inbound objections, and optimizes ROI autonomously.

![Rabbit Banner](https://img.shields.io/badge/Status-Fully_Autonomous-emerald?style=for-the-badge)
![Agent Workforce](https://img.shields.io/badge/Workforce-6_AI_Agents-6366F1?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5_|_CSS3_|_ES_Modules-06B6D4?style=for-the-badge)

---

## 🌐 Autonomous AI Workforce Matrix

Rabbit operates with 6 specialized AI agents working together in an integrated data mesh:

1. **🌐 Atlas (Market Intelligence & ICP Crawler)**:
   - Crawls hiring triggers, funding signals ($5M+ Series A-C), and technology stack adoptions (Snowflake, Kubernetes, Salesforce).
2. **🎯 Nova (Lead Sourcing & Intent Scorer)**:
   - Discovers decision-makers (CTOs, CROs, VPs of Sales), verifies email & phone deliverability, and scores intent (0-100).
3. **✍️ Pulse (Hyper-Personalized Copywriter)**:
   - Synthesizes 1:1 tailored messaging across Email, LinkedIn connection notes, and X DMs using real-time prospect signals.
4. **⚡ Velocity (Omnichannel Drip Executor)**:
   - Executes multi-channel delivery workflows with warm-up IP pools, tracking opens, clicks, and reply rates.
5. **💬 Echo (Objection AI & Meeting Booker)**:
   - Classifies inbound responses (*Interested*, *Pricing Objection*, *Timing*, *Competitor*), formulates ROI counter-arguments, and dispatches booking links.
6. **🧠 Apex (GTM Strategy & Self-Optimizer)**:
   - Continuously runs A/B tests on subject lines and personas, automatically re-allocating budget to peak-performing channels.

---

## 🎨 Key Features & Modules

- **⚡ Live Command Center**: Real-time workforce telemetry, scrolling thought logs, and an interactive glowing SVG workflow mesh.
- **🎯 Active Campaigns & ICP Studio**: Target criteria configuration with an AI ICP & Value Proposition Generator.
- **📊 Pipeline CRM**: Dynamic Kanban board (*Discovered* ➔ *Enriched* ➔ *Outreach Active* ➔ *Inbound Engaged* ➔ *Meeting Booked*) with intent heat badges and detailed Lead Drawer modal.
- **✉️ Omnichannel Sequence Studio**: Multi-step sequence manager with step-delay triggers, dynamic variables (`{{first_name}}`, `{{buying_signal}}`), and AI rewrite tools.
- **📥 Autonomous Inbox & Objection AI**: Inbound sentiment classifier with automated counter-drafting and 1-click dispatch.
- **📈 Self-Optimization & Analytics**: Apex Agent self-healing logs, channel ROI split charts, and CAC reduction tracking.
- **✨ Agent Co-Pilot Directive Center**: Interactive modal for issuing high-level natural language instructions to steer the workforce.

---

## 🚀 Getting Started

### Run Locally with Python (Zero Dependencies)

```bash
# Clone the repository
git clone https://github.com/SNDP-Design/Rabbit.git
cd Rabbit

# Start local HTTP server
python3 -m http.server 3000
```

Open **`http://localhost:3000`** in your web browser.

---

## 📁 Repository Structure

```
Rabbit/
├── index.html                  # Main Web Application Frame
├── css/
│   └── styles.css              # Dark Glassmorphism Design System & Keyframe Animations
├── js/
│   ├── app.js                  # Main Application Entry & State Coordinator
│   ├── mockData.js             # Initial Seed Dataset (Agents, Campaigns, Leads, Sequences)
│   ├── simulationEngine.js     # Real-Time Simulation Engine driving Agent Task Cycles
│   ├── types.js                # TypeScript-style Constants & Enums
│   └── components/
│       ├── header.js           # Header Bar & Execution Toggle
│       ├── sidebar.js          # Navigation Sidebar
│       ├── workforceGrid.js    # Agent Workforce Matrix Cards
│       ├── workflowGraph.js    # Glowing SVG Workflow Mesh
│       ├── campaignsView.js    # ICP Studio & Campaign Generator
│       ├── pipelineView.js     # Pipeline CRM Kanban & Lead Drawer
│       ├── sequenceView.js     # Sequence Builder & Dynamic Variables
│       ├── inboxView.js        # Autonomous Inbox & Objection AI Counter-Drafter
│       ├── selfOptimizationView.js # Apex Agent Self-Tuning Analytics
│       └── copilotModal.js     # Agent Co-Pilot Prompt Assistant
└── README.md                   # Repository Documentation
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

