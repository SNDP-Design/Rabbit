# 🐇 Rabbit — Fully Autonomous AI Agent GTM Platform

> **Rabbit** is an end-to-end, self-operating Go-To-Market (GTM) AI platform driven by an autonomous multi-agent workforce that researches markets, enriches leads, crafts hyper-personalized sequences, executes omnichannel drips, handles inbound objections, and optimizes ROI autonomously.

![Rabbit Banner](https://img.shields.io/badge/Status-Fully_Autonomous-emerald?style=for-the-badge)
![Agent Workforce](https://img.shields.io/badge/Workforce-6_AI_Agents-6366F1?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5_|_CSS3_|_ES_Modules-06B6D4?style=for-the-badge)

---

## 🌐 Explee-Powered Autonomous AI Workforce

Rabbit turns Explee's product pipeline into a 24/7 self-operating workforce of 6 specialized AI agents:

1. **🔍 Koda (Domain & Offer Intelligence)**:
   - *Explee Feature: "Learns what you sell"*
   - Paste any website URL (e.g. `larksilk.com`), and Koda automatically studies your product offering, analyzes competitor domains (afloral.com, nearlynatural.com), and synthesizes your core value proposition in 60 seconds.
2. **📊 Atlas (ICP & Fit Score Segmenter)**:
   - *Explee Feature: "Figures out who buys it"*
   - Computes real-time ICP Fit Scores across market verticals (Event Designers 92%, Wedding Floral Studios 88%, Wedding Planners 85%).
3. **🎯 Nova (536M+ Contact Sourcing)**:
   - *Explee Feature: "Finds those exact people"*
   - Sourced directly from a GPU cluster covering **105M+ companies** and **536M+ decision-maker profiles** with 100% email verification.
4. **✍️ Pulse (1:1 Personal Email Writer)**:
   - *Explee Feature: "Writes each a personal email"*
   - Generates context-aware, 1:1 email copy matching prospect install projects, venue lighting needs, and bulk NJ shipping benefits.
5. **💬 Echo (Objection AI & Meeting Booker)**:
   - *Explee Feature: "Handles replies and books meetings"*
   - Categorizes inbound prospect questions (e.g. *"How do these hold up under venue lighting?"*), answers technical specs, and auto-dispatches calendar invites.
6. **🧠 Apex (Pipeline Scaler & Double-Down AI)**:
   - *Explee Feature: "Learns what works and doubles down"*
   - Automatically scales high-converting verticals ($1.69/lead) and pauses low-performing segments.

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

