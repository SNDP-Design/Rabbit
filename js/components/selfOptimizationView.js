/* ==========================================================================
   AutoGTM - Self-Optimization View
   ========================================================================== */

export function renderSelfOptimizationView(container, state) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <div>
        <h1 style="font-size: 1.5rem; font-weight: 800; color: #FFF;">Apex Agent Self-Optimization Engine</h1>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Continuous A/B testing, persona sentiment tuning, and automatic channel effort reallocation.</p>
      </div>
      <div class="intent-badge intent-high" style="padding: 6px 12px; font-size: 0.8rem;">
        🧠 Autonomous Self-Healing: ENABLED
      </div>
    </div>

    <!-- Analytics Stat Cards -->
    <div class="grid-cols-4" style="margin-bottom: 24px;">
      <div class="stat-card">
        <div class="stat-icon">
          <i data-lucide="mail"></i>
        </div>
        <div>
          <div class="stat-value">67.4%</div>
          <div class="stat-label">Avg Email Open Rate</div>
          <div class="stat-trend"><i data-lucide="arrow-up-right"></i> +14.2% AI Boosted</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(6, 182, 212, 0.15); color: var(--cyan); border-color: rgba(6, 182, 212, 0.25);">
          <i data-lucide="message-square"></i>
        </div>
        <div>
          <div class="stat-value">18.6%</div>
          <div class="stat-label">Positive Reply Rate</div>
          <div class="stat-trend"><i data-lucide="arrow-up-right"></i> +6.8% vs Industry</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--emerald); border-color: rgba(16, 185, 129, 0.25);">
          <i data-lucide="calendar"></i>
        </div>
        <div>
          <div class="stat-value">23</div>
          <div class="stat-label">Meetings Booked</div>
          <div class="stat-trend"><i data-lucide="arrow-up-right"></i> $380k Pipeline Value</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--amber); border-color: rgba(245, 158, 11, 0.25);">
          <i data-lucide="dollar-sign"></i>
        </div>
        <div>
          <div class="stat-value">$182</div>
          <div class="stat-label">Cost per Qualified Lead</div>
          <div class="stat-trend" style="color: var(--emerald);"><i data-lucide="arrow-down-right"></i> -54% CAC Reduction</div>
        </div>
      </div>
    </div>

    <!-- Optimization Logs & Insights -->
    <div class="grid-cols-2">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <i data-lucide="cpu" style="color: var(--emerald);"></i>
            <span>Apex Agent Autonomous Decision Logs</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${state.optimizationLogs.map(log => `
            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); padding: 12px; border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 0.75rem; font-weight: 700; color: var(--emerald);">${log.type}</span>
                <span style="font-size: 0.7rem; color: var(--text-dim);">${log.time}</span>
              </div>
              <div style="font-size: 0.8rem; color: #E2E8F0;">${log.description}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ROI & Channel Performance Breakdown -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <i data-lucide="bar-chart-2" style="color: var(--cyan);"></i>
            <span>Channel ROI & Effort Allocation</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
              <span>Cold Email Sequences (Ultra-Personalized)</span>
              <strong style="color: var(--cyan);">55% Allocated (3.4x ROI)</strong>
            </div>
            <div style="height: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; overflow: hidden;">
              <div style="width: 55%; height: 100%; background: linear-gradient(90deg, var(--cyan), var(--primary));"></div>
            </div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
              <span>LinkedIn InMail & Connection Drips</span>
              <strong style="color: var(--purple);">35% Allocated (4.1x ROI)</strong>
            </div>
            <div style="height: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; overflow: hidden;">
              <div style="width: 35%; height: 100%; background: linear-gradient(90deg, var(--purple), var(--rose));"></div>
            </div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
              <span>X (Twitter) DM & Intent Signals</span>
              <strong style="color: var(--amber);">10% Allocated (2.2x ROI)</strong>
            </div>
            <div style="height: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; overflow: hidden;">
              <div style="width: 10%; height: 100%; background: linear-gradient(90deg, var(--amber), var(--emerald));"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}
