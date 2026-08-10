/* ==========================================================================
   Rabbit - Explee Agent Workflow Graph
   ========================================================================== */

export function renderWorkflowGraph(container, agents) {
  container.innerHTML = `
    <div class="workflow-graph-container">
      <svg width="100%" height="100%" viewBox="0 0 800 260" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="explee-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.9"/>
            <stop offset="40%" stop-color="#6366F1" stop-opacity="0.9"/>
            <stop offset="70%" stop-color="#EC4899" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#10B981" stop-opacity="0.9"/>
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <style>
            .flow-line {
              stroke: url(#explee-flow);
              stroke-width: 2.5;
              stroke-dasharray: 6 6;
              animation: flowDash 1.8s linear infinite;
            }
            @keyframes flowDash {
              to { stroke-dashoffset: -24; }
            }
            .node-group {
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .node-group:hover {
              transform: scale(1.08);
              filter: url(#glow);
            }
          </style>
        </defs>

        <!-- Dynamic Connecting Paths -->
        <path d="M 90 130 Q 200 50 310 130" fill="none" class="flow-line" />
        <path d="M 310 130 Q 420 210 530 130" fill="none" class="flow-line" />
        <path d="M 530 130 Q 620 60 710 130" fill="none" class="flow-line" />
        <path d="M 710 130 Q 400 250 90 130" fill="none" class="flow-line" style="stroke: #10B981; stroke-dasharray: 4 4;" />

        <!-- 1. Koda -->
        <g transform="translate(90, 130)" class="node-group">
          <circle r="34" fill="#090D21" stroke="#06B6D4" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="13">Koda</text>
          <text text-anchor="middle" dy="14" fill="#06B6D4" font-family="Inter" font-size="9">Domain Learner</text>
        </g>

        <!-- 2. Atlas -->
        <g transform="translate(230, 70)" class="node-group">
          <circle r="30" fill="#090D21" stroke="#6366F1" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="12">Atlas</text>
          <text text-anchor="middle" dy="14" fill="#6366F1" font-family="Inter" font-size="9">Fit Scorer</text>
        </g>

        <!-- 3. Nova -->
        <g transform="translate(370, 130)" class="node-group">
          <circle r="34" fill="#090D21" stroke="#EC4899" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="13">Nova</text>
          <text text-anchor="middle" dy="14" fill="#EC4899" font-family="Inter" font-size="9">536M+ Sourcing</text>
        </g>

        <!-- 4. Pulse -->
        <g transform="translate(510, 190)" class="node-group">
          <circle r="30" fill="#090D21" stroke="#A855F7" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="12">Pulse</text>
          <text text-anchor="middle" dy="14" fill="#A855F7" font-family="Inter" font-size="9">1:1 Writer</text>
        </g>

        <!-- 5. Echo -->
        <g transform="translate(630, 100)" class="node-group">
          <circle r="32" fill="#090D21" stroke="#F59E0B" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="12">Echo</text>
          <text text-anchor="middle" dy="14" fill="#F59E0B" font-family="Inter" font-size="9">Reply Booker</text>
        </g>

        <!-- 6. Apex -->
        <g transform="translate(730, 160)" class="node-group">
          <circle r="34" fill="#090D21" stroke="#10B981" stroke-width="3" filter="url(#glow)"/>
          <text text-anchor="middle" dy="-2" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="13">Apex</text>
          <text text-anchor="middle" dy="14" fill="#10B981" font-family="Inter" font-size="9">Doubles Down</text>
        </g>
      </svg>
    </div>
  `;
}
