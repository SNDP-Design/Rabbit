/* ==========================================================================
   AutoGTM - Interactive Agent Workflow Graph
   ========================================================================== */

export function renderWorkflowGraph(container, agents) {
  // SVG mesh diagram showing agent nodes connected by glowing animated directional lines
  container.innerHTML = `
    <div class="workflow-graph-container">
      <svg width="100%" height="100%" viewBox="0 0 800 260" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#6366F1" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#10B981" stop-opacity="0.8"/>
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <style>
            .flow-line {
              stroke: url(#flow-grad);
              stroke-width: 2;
              stroke-dasharray: 6 6;
              animation: flowDash 2s linear infinite;
            }
            @keyframes flowDash {
              to { stroke-dashoffset: -24; }
            }
            .node-circle {
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .node-circle:hover {
              transform: scale(1.1);
              filter: url(#glow);
            }
          </style>
        </defs>

        <!-- Connecting Lines -->
        <path d="M 100 130 Q 220 50 340 130" fill="none" class="flow-line" />
        <path d="M 340 130 Q 460 210 580 130" fill="none" class="flow-line" />
        <path d="M 580 130 Q 640 60 700 130" fill="none" class="flow-line" />
        <path d="M 700 130 Q 400 240 100 130" fill="none" class="flow-line" style="stroke: #10B981; stroke-dasharray: 4 4;" />

        <!-- Nodes -->
        <!-- 1. Atlas -->
        <g transform="translate(100, 130)" class="node-circle">
          <circle r="32" fill="#090D21" stroke="#06B6D4" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="13">Atlas</text>
          <text text-anchor="middle" dy="14" fill="#06B6D4" font-family="Outfit" font-size="9">Intelligence</text>
        </g>

        <!-- 2. Nova -->
        <g transform="translate(240, 70)" class="node-circle">
          <circle r="28" fill="#090D21" stroke="#6366F1" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="12">Nova</text>
          <text text-anchor="middle" dy="14" fill="#6366F1" font-family="Outfit" font-size="9">Scoring</text>
        </g>

        <!-- 3. Pulse -->
        <g transform="translate(380, 130)" class="node-circle">
          <circle r="32" fill="#090D21" stroke="#EC4899" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="13">Pulse</text>
          <text text-anchor="middle" dy="14" fill="#EC4899" font-family="Outfit" font-size="9">Copywriter</text>
        </g>

        <!-- 4. Velocity -->
        <g transform="translate(520, 190)" class="node-circle">
          <circle r="28" fill="#090D21" stroke="#A855F7" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="12">Velocity</text>
          <text text-anchor="middle" dy="14" fill="#A855F7" font-family="Outfit" font-size="9">Drip Exec</text>
        </g>

        <!-- 5. Echo -->
        <g transform="translate(640, 100)" class="node-circle">
          <circle r="30" fill="#090D21" stroke="#F59E0B" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="12">Echo</text>
          <text text-anchor="middle" dy="14" fill="#F59E0B" font-family="Outfit" font-size="9">Objection AI</text>
        </g>

        <!-- 6. Apex -->
        <g transform="translate(740, 160)" class="node-circle">
          <circle r="32" fill="#090D21" stroke="#10B981" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="13">Apex</text>
          <text text-anchor="middle" dy="14" fill="#10B981" font-family="Outfit" font-size="9">Optimizer</text>
        </g>
      </svg>
    </div>
  `;
}
