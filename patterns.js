/* ============================================================
   PATTERNS.JS - Interactive Pattern Visualizations
   All physics metaphors for the 15 Patterns page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Safe init wrapper - prevents one failure from crashing all others
  const safeInit = (fn, name) => {
    try {
      fn();
    } catch (e) {
      console.warn(`[patterns.js] ${name} failed:`, e.message);
    }
  };

  // Initialize progressive depth system (3-level tabs)
  safeInit(initLevelTabs, 'initLevelTabs');
  safeInit(initWorkplaceDrawers, 'initWorkplaceDrawers');
  safeInit(initContradictionFinder, 'initContradictionFinder');
  safeInit(initLoopRacer, 'initLoopRacer');
  safeInit(initPipelineAnalyzer, 'initPipelineAnalyzer');
  safeInit(initTimeBreakdown, 'initTimeBreakdown');
  safeInit(initPrecisionMeter, 'initPrecisionMeter');
  safeInit(initLanguageLab, 'initLanguageLab');
  safeInit(initKnowledgeAudit, 'initKnowledgeAudit');
  safeInit(initLegibilityLab, 'initLegibilityLab');
  safeInit(initRelationshipEvolution, 'initRelationshipEvolution');
  safeInit(initSymbiosisLab, 'initSymbiosisLab');
  safeInit(initIdentityMap, 'initIdentityMap');
  safeInit(initIdentityLab, 'initIdentityLab');
  safeInit(initDebtAccumulator, 'initDebtAccumulator');
  safeInit(initEntropyBudgetLab, 'initEntropyBudgetLab');
  safeInit(initBeliefEcosystem, 'initBeliefEcosystem');
  safeInit(initDiscernmentLab, 'initDiscernmentLab');
  safeInit(initPolicyConflict, 'initPolicyConflict');
  safeInit(initPolicyComposer, 'initPolicyComposer');
  safeInit(initFearCalibration, 'initFearCalibration');
  safeInit(initAttackSurface, 'initAttackSurface');
  safeInit(initDefenseStrategy, 'initDefenseStrategy');
  safeInit(initValuesAudit, 'initValuesAudit');
  safeInit(initConstraintDesigner, 'initConstraintDesigner');
  safeInit(initTransitionMap, 'initTransitionMap');
  safeInit(initIdentitySupportDesigner, 'initIdentitySupportDesigner');

  // Initialize all pattern interactives
  safeInit(initDepthToggle, 'initDepthToggle');
  safeInit(initCoherence, 'initCoherence');
  safeInit(initLoop, 'initLoop');
  safeInit(initBottleneck, 'initBottleneck');
  safeInit(initCost, 'initCost');
  safeInit(initLanguage, 'initLanguage');
  safeInit(initLegibility, 'initLegibility');
  safeInit(initSymbiosis, 'initSymbiosis');
  safeInit(initIdentity, 'initIdentity');
  safeInit(initEntropy, 'initEntropy');
  safeInit(initPersuasion, 'initPersuasion');
  safeInit(initPolicy, 'initPolicy');
  safeInit(initFear, 'initFear');
  safeInit(initSecurity, 'initSecurity');
  safeInit(initValues, 'initValues');
  safeInit(initStress, 'initStress');
  safeInit(initResetButtons, 'initResetButtons');
});

/* ============================================================
   PROGRESSIVE DEPTH SYSTEM
   Three levels of engagement: Quick / Deeper / Lab
   ============================================================ */

/* ------------------------------------------------------------
   LEVEL TABS - Switch between Quick/Deeper/Lab views
   ------------------------------------------------------------ */
function initLevelTabs() {
  document.querySelectorAll('.level-tabs').forEach(tabContainer => {
    const tabs = tabContainer.querySelectorAll('.level-tab');
    const patternBand = tabContainer.closest('.pattern-band');
    // Look for either container type
    const demoContainer = tabContainer.closest('.demo-container') ||
                          tabContainer.closest('.interactive-container');

    // Get pattern number from tab or container for scoped selection
    const patternNum = tabContainer.dataset.pattern ||
                       tabs[0]?.dataset.pattern;

    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const level = tab.dataset.level;
        if (!level) return;

        // Update active tab
        tabs.forEach(t => t.classList.remove('level-tab--active'));
        tab.classList.add('level-tab--active');

        // Show/hide level content - use pattern-scoped selection if available
        let contents;
        if (patternNum) {
          contents = patternBand?.querySelectorAll(`.level-content[data-pattern="${patternNum}"]`);
        } else {
          contents = demoContainer?.querySelectorAll('.level-content') ||
                     patternBand?.querySelectorAll('.level-content');
        }

        contents?.forEach(content => {
          if (content.dataset.level === level) {
            content.hidden = false;
            content.classList.add('level-content--active');
            // Trigger entrance animation
            content.style.animation = 'none';
            content.offsetHeight; // Force reflow
            content.style.animation = 'levelFadeIn 0.4s ease-out forwards';
          } else {
            content.hidden = true;
            content.classList.remove('level-content--active');
          }
        });

        // Add visual feedback
        tab.style.transform = 'scale(0.95)';
        setTimeout(() => {
          tab.style.transform = '';
        }, 150);
      });
    });
  });
}

/* ------------------------------------------------------------
   WORKPLACE DRAWERS - Toggle "At work..." examples
   ------------------------------------------------------------ */
function initWorkplaceDrawers() {
  document.querySelectorAll('.workplace-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.demo-container') || btn.closest('.interactive-container');
      const drawer = container?.querySelector('.workplace-drawer');

      if (!drawer) return;

      const isOpen = !drawer.hidden;

      if (isOpen) {
        // Close drawer
        drawer.style.animation = 'drawerSlideOut 0.3s ease-in forwards';
        setTimeout(() => {
          drawer.hidden = true;
        }, 280);
        btn.innerHTML = '💼 At work...';
        btn.classList.remove('workplace-btn--active');
      } else {
        // Open drawer
        drawer.hidden = false;
        drawer.style.animation = 'drawerSlideIn 0.35s ease-out forwards';
        btn.innerHTML = '✕ Close examples';
        btn.classList.add('workplace-btn--active');
      }
    });
  });
}

/* ------------------------------------------------------------
   PATTERN 1: CONTRADICTION FINDER (Level 2 demo)
   Click statements to reveal contradictions
   ------------------------------------------------------------ */
function initContradictionFinder() {
  const container = document.getElementById('contradiction-demo');
  if (!container) return;

  const statements = container.querySelectorAll('.statement-card');
  const clarifyCard = container.querySelector('.clarify-card');
  const reworkMeter = container.querySelector('.rework-meter-fill');
  const reworkValue = container.querySelector('.rework-value');

  let contradictionsFound = 0;
  const totalContradictions = statements.length;

  statements.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('revealed')) return;

      card.classList.add('revealed');
      contradictionsFound++;

      // Update rework meter
      const progress = (contradictionsFound / totalContradictions) * 100;
      if (reworkMeter) {
        reworkMeter.style.width = progress + '%';
      }
      if (reworkValue) {
        reworkValue.textContent = `${contradictionsFound}/${totalContradictions}`;
      }

      // Show the hidden contradiction text
      const hiddenText = card.querySelector('.contradiction-text');
      if (hiddenText) {
        hiddenText.style.opacity = '1';
        hiddenText.style.maxHeight = '100px';
      }

      // Pulse animation
      card.style.animation = 'contradictionReveal 0.5s ease-out';

      // Check if all found
      if (contradictionsFound >= totalContradictions && clarifyCard) {
        clarifyCard.classList.add('ready');
        clarifyCard.innerHTML = '<strong>All contradictions surfaced!</strong><br>Now the team can rework definitions coherently.';
      }
    });
  });

  // Reset functionality
  container.resetFn = () => {
    contradictionsFound = 0;
    statements.forEach(card => {
      card.classList.remove('revealed');
      const hiddenText = card.querySelector('.contradiction-text');
      if (hiddenText) {
        hiddenText.style.opacity = '0';
        hiddenText.style.maxHeight = '0';
      }
    });
    if (reworkMeter) reworkMeter.style.width = '0%';
    if (reworkValue) reworkValue.textContent = '0/' + totalContradictions;
    if (clarifyCard) {
      clarifyCard.classList.remove('ready');
      clarifyCard.innerHTML = '<strong>Clarify Card</strong><br>Click statements above to surface contradictions';
    }
  };
}

/* ------------------------------------------------------------
   PATTERN 2: LOOP RACER (Level 2 demo)
   Race two teams with different iteration speeds
   ------------------------------------------------------------ */
function initLoopRacer() {
  const container = document.getElementById('loop-racer');
  if (!container) return;

  const startBtn = document.getElementById('start-race');
  const slowProgress = document.getElementById('slow-progress');
  const fastProgress = document.getElementById('fast-progress');
  const slowIterations = document.getElementById('slow-iterations');
  const fastIterations = document.getElementById('fast-iterations');
  const slowLearnings = document.getElementById('slow-learnings');
  const fastLearnings = document.getElementById('fast-learnings');

  let raceInterval = null;
  let day = 0;
  const totalDays = 30;

  function runRace() {
    if (day >= totalDays) {
      clearInterval(raceInterval);
      startBtn.textContent = '↺ Race Again';
      startBtn.classList.remove('race-btn--running');
      startBtn.disabled = false;
      return;
    }

    day++;
    const progress = (day / totalDays) * 100;

    // Slow team: weekly iterations (every 7 days)
    const slowIter = Math.floor(day / 7);
    slowProgress.style.width = progress + '%';
    slowIterations.textContent = slowIter;
    slowLearnings.textContent = slowIter; // 1 learning per iteration

    // Fast team: daily iterations
    fastProgress.style.width = progress + '%';
    fastIterations.textContent = day;
    fastLearnings.textContent = day; // 1 learning per iteration
  }

  startBtn.addEventListener('click', () => {
    if (raceInterval) {
      clearInterval(raceInterval);
    }

    // Reset state
    day = 0;
    slowProgress.style.width = '0%';
    fastProgress.style.width = '0%';
    slowIterations.textContent = '0';
    fastIterations.textContent = '0';
    slowLearnings.textContent = '0';
    fastLearnings.textContent = '0';

    startBtn.textContent = '▶ Racing...';
    startBtn.classList.add('race-btn--running');
    startBtn.disabled = true;

    // Run race at ~100ms per day (3 seconds total)
    raceInterval = setInterval(runRace, 100);
  });

  // Reset functionality
  container.resetFn = () => {
    if (raceInterval) clearInterval(raceInterval);
    day = 0;
    slowProgress.style.width = '0%';
    fastProgress.style.width = '0%';
    slowIterations.textContent = '0';
    fastIterations.textContent = '0';
    slowLearnings.textContent = '0';
    fastLearnings.textContent = '0';
    startBtn.textContent = '▶ Start Race (30 days)';
    startBtn.classList.remove('race-btn--running');
    startBtn.disabled = false;
  };
}

/* ------------------------------------------------------------
   PATTERN 3: PIPELINE ANALYZER (Level 2 demo)
   Click stages to speed them up, find the bottleneck
   ------------------------------------------------------------ */
function initPipelineAnalyzer() {
  const container = document.getElementById('pipeline-analyzer');
  if (!container) return;

  const stages = container.querySelectorAll('.pipeline-stage');
  const throughputDisplay = document.getElementById('pipeline-throughput');

  // Stage speeds (items/second)
  const speeds = {
    intake: 5,
    process: 2,  // Initial bottleneck
    review: 4,
    deploy: 10
  };

  function updatePipeline() {
    // Find minimum (bottleneck)
    const minSpeed = Math.min(...Object.values(speeds));
    throughputDisplay.textContent = minSpeed;

    // Update UI for each stage
    stages.forEach(stage => {
      const stageName = stage.dataset.stage;
      const speed = speeds[stageName];
      const isBottleneck = speed === minSpeed;

      // Update throughput display
      const tpSpan = document.getElementById('tp-' + stageName);
      if (tpSpan) tpSpan.textContent = speed;

      // Update bottleneck styling
      stage.classList.toggle('is-bottleneck', isBottleneck);
      const queueBar = document.getElementById('queue-' + stageName);
      if (queueBar) {
        queueBar.classList.toggle('queue-bar--bottleneck', isBottleneck);
        // Queue builds up at bottleneck
        queueBar.style.height = isBottleneck ? '80%' : Math.max(10, 100 - (speed * 10)) + '%';
      }
    });
  }

  // Click to speed up a stage
  stages.forEach(stage => {
    stage.addEventListener('click', () => {
      const stageName = stage.dataset.stage;
      speeds[stageName] = Math.min(20, speeds[stageName] + 2);
      updatePipeline();
    });
  });

  // Initialize
  updatePipeline();

  // Reset functionality
  container.resetFn = () => {
    speeds.intake = 5;
    speeds.process = 2;
    speeds.review = 4;
    speeds.deploy = 10;
    updatePipeline();
  };
}

/* ------------------------------------------------------------
   PATTERN 4: TIME BREAKDOWN (Coordination cost comparison)
   ------------------------------------------------------------ */
function initTimeBreakdown() {
  const container = document.getElementById('time-breakdown');
  if (!container) return;

  const buttons = container.querySelectorAll('.time-btn');
  const fills = {
    meetings: document.getElementById('fill-meetings'),
    waiting: document.getElementById('fill-waiting'),
    rework: document.getElementById('fill-rework'),
    execution: document.getElementById('fill-execution')
  };
  const values = {
    meetings: document.getElementById('val-meetings'),
    waiting: document.getElementById('val-waiting'),
    rework: document.getElementById('val-rework'),
    execution: document.getElementById('val-execution')
  };

  // Scenarios: before AI, after AI (naive), optimized
  const scenarios = {
    before: {
      meetings: 25,
      waiting: 20,
      rework: 15,
      execution: 40
    },
    after: {
      meetings: 30,  // More meetings to coordinate faster work
      waiting: 25,   // More waiting - bottlenecks exposed
      rework: 20,    // More rework - faster = more mistakes
      execution: 25  // Less execution time (AI helps)
    },
    optimized: {
      meetings: 15,  // Async-first, fewer meetings
      waiting: 10,   // Better flow, less waiting
      rework: 10,    // Quality gates, less rework
      execution: 65  // Most time on actual work
    }
  };

  let currentScenario = 'after';

  function updateDisplay(scenario) {
    const data = scenarios[scenario];

    Object.keys(fills).forEach(key => {
      if (fills[key]) {
        fills[key].style.width = data[key] + '%';
      }
      if (values[key]) {
        values[key].textContent = data[key] + '%';

        // Add visual indicators for change
        values[key].classList.remove('growing', 'shrinking');
        if (scenario === 'after') {
          if (data[key] > scenarios.before[key]) {
            values[key].classList.add('growing');
          }
        } else if (scenario === 'optimized') {
          if (data[key] < scenarios.after[key]) {
            values[key].classList.add('shrinking');
          }
        }
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const scenario = btn.dataset.scenario;

      // Update active state
      buttons.forEach(b => b.classList.remove('time-btn--active'));
      btn.classList.add('time-btn--active');

      currentScenario = scenario;
      updateDisplay(scenario);
    });
  });

  // Initialize with current scenario
  updateDisplay(currentScenario);
}

/* ------------------------------------------------------------
   PATTERN 5: PRECISION METER (Prompt variance visualization)
   ------------------------------------------------------------ */
function initPrecisionMeter() {
  const container = document.getElementById('precision-meter');
  if (!container) return;

  const buttons = container.querySelectorAll('.prompt-example');
  const outputsContainer = document.getElementById('variance-outputs');

  const variances = {
    low: [
      'Rewrote everything',
      'Changed the tone',
      'Added more examples',
      'Made it shorter',
      'Made it longer',
      'Removed jargon',
      'Added formatting'
    ],
    medium: [
      'Simplified first paragraph',
      'Added hook sentence',
      'Removed redundant phrases',
      'Split into two paragraphs'
    ],
    high: [
      'Two sentences, insight-first intro'
    ]
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const precision = btn.dataset.precision;

      // Update active state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show variance outputs
      outputsContainer.innerHTML = '';
      const outputs = variances[precision];
      outputs.forEach((output, i) => {
        const div = document.createElement('div');
        div.className = 'variance-output';
        if (precision === 'high') {
          div.classList.add('variance-output--highlight');
        }
        div.textContent = output;
        div.style.animationDelay = `${i * 0.1}s`;
        outputsContainer.appendChild(div);
      });
    });
  });
}

/* ------------------------------------------------------------
   PATTERN 5: LANGUAGE LAB (Infrastructure controls)
   ------------------------------------------------------------ */
function initLanguageLab() {
  const templateSelect = document.getElementById('prompt-template');
  const glossarySelect = document.getElementById('domain-glossary');
  const varianceBar = document.getElementById('lab-variance-bar');
  const varianceText = document.getElementById('lab-variance-text');

  if (!templateSelect || !glossarySelect) return;

  function updateVariance() {
    const template = templateSelect.value;
    const glossary = glossarySelect.value;

    // Calculate variance based on selections
    let variance = 80;
    let description = 'High variance - outputs unpredictable';

    if (template === 'structured') variance -= 20;
    if (template === 'chain') variance -= 35;
    if (glossary === 'basic') variance -= 15;
    if (glossary === 'full') variance -= 25;

    variance = Math.max(10, variance);

    if (variance <= 25) {
      description = 'Low variance - consistent outputs';
    } else if (variance <= 50) {
      description = 'Medium variance - mostly predictable';
    } else {
      description = 'High variance - outputs unpredictable';
    }

    varianceBar.style.width = variance + '%';
    varianceText.textContent = description;
  }

  templateSelect.addEventListener('change', updateVariance);
  glossarySelect.addEventListener('change', updateVariance);
}

/* ------------------------------------------------------------
   PATTERN 6: KNOWLEDGE AUDIT (Legibility visualization)
   ------------------------------------------------------------ */
function initKnowledgeAudit() {
  const container = document.getElementById('knowledge-audit');
  if (!container) return;

  const rows = container.querySelectorAll('.knowledge-row');
  const leverageScore = document.getElementById('leverage-score');
  const digitizeBtn = container.querySelector('[data-action="digitize"]');
  const protectBtn = container.querySelector('[data-action="protect"]');

  // Track legibility percentages for each category
  const knowledge = {
    processes: { legible: 30, tacit: 70 },
    decisions: { legible: 15, tacit: 85 },
    expertise: { legible: 10, tacit: 90 },
    customer: { legible: 45, tacit: 55 }
  };

  function updateDisplay() {
    // Update bars and percentages
    rows.forEach(row => {
      const type = row.dataset.type;
      const data = knowledge[type];

      const legibleBar = row.querySelector('.knowledge-bar--legible');
      const tacitBar = row.querySelector('.knowledge-bar--tacit');
      const pctLegible = row.querySelector('.pct-legible');
      const pctTacit = row.querySelector('.pct-tacit');

      if (legibleBar) legibleBar.style.width = data.legible + '%';
      if (tacitBar) tacitBar.style.width = data.tacit + '%';
      if (pctLegible) pctLegible.textContent = data.legible + '%';
      if (pctTacit) pctTacit.textContent = data.tacit + '%';
    });

    // Calculate overall leverage score (weighted average of legible)
    const totalLegible = Object.values(knowledge).reduce((sum, k) => sum + k.legible, 0);
    const avgLegible = Math.round(totalLegible / 4);

    leverageScore.textContent = avgLegible + '%';
    leverageScore.classList.remove('low', 'medium', 'high');
    if (avgLegible < 30) leverageScore.classList.add('low');
    else if (avgLegible < 60) leverageScore.classList.add('medium');
    else leverageScore.classList.add('high');
  }

  if (digitizeBtn) {
    digitizeBtn.addEventListener('click', () => {
      // Increase legibility by converting tacit knowledge
      Object.keys(knowledge).forEach(key => {
        const shift = Math.min(15, knowledge[key].tacit);
        knowledge[key].legible += shift;
        knowledge[key].tacit -= shift;
      });
      updateDisplay();
    });
  }

  if (protectBtn) {
    protectBtn.addEventListener('click', () => {
      // Simulate protecting legible knowledge (visual feedback)
      rows.forEach(row => {
        const legibleBar = row.querySelector('.knowledge-bar--legible');
        if (legibleBar) {
          legibleBar.style.boxShadow = '0 0 12px rgba(0, 255, 213, 0.5)';
          setTimeout(() => {
            legibleBar.style.boxShadow = 'none';
          }, 1000);
        }
      });
    });
  }
}

/* ------------------------------------------------------------
   PATTERN 6: LEGIBILITY LAB (Infrastructure controls)
   ------------------------------------------------------------ */
function initLegibilityLab() {
  const docDepth = document.getElementById('doc-depth');
  const dataStructure = document.getElementById('data-structure');
  const leverageFill = document.getElementById('lab-leverage-fill');
  const leverageText = document.getElementById('lab-leverage-text');

  if (!docDepth || !dataStructure) return;

  function updateLeverage() {
    const doc = docDepth.value;
    const structure = dataStructure.value;

    // Calculate leverage based on selections
    let leverage = 15;
    let description = 'Low - AI mostly unusable';

    if (doc === 'basic') leverage += 20;
    if (doc === 'full') leverage += 40;
    if (structure === 'semi') leverage += 15;
    if (structure === 'structured') leverage += 35;

    leverage = Math.min(90, leverage);

    if (leverage >= 70) {
      description = 'High - AI fully leverageable';
    } else if (leverage >= 40) {
      description = 'Medium - AI partially useful';
    } else {
      description = 'Low - AI mostly unusable';
    }

    leverageFill.style.width = leverage + '%';
    leverageText.textContent = description;
  }

  docDepth.addEventListener('change', updateLeverage);
  dataStructure.addEventListener('change', updateLeverage);
}

/* ------------------------------------------------------------
   PATTERN 7: RELATIONSHIP EVOLUTION (Level 2)
   ------------------------------------------------------------ */
function initRelationshipEvolution() {
  const container = document.getElementById('relationship-evolution');
  if (!container) return;

  const buttons = container.querySelectorAll('.evolution-btn');
  const outcome = document.getElementById('evolution-outcome');
  const humanSkills = document.getElementById('human-skills');
  const aiSkills = document.getElementById('ai-skills');
  const humanValue = document.getElementById('human-value');
  const aiValue = document.getElementById('ai-value');
  const evolutionPath = document.getElementById('evolution-path');
  const markers = container.querySelectorAll('.timeline-marker');

  const scenarios = {
    parasitism: {
      human: [50, 40, 30, 20],
      ai: [50, 70, 85, 95],
      outcome: '⚠️ Parasitism: Human skills atrophy while AI dependency grows. Short-term productivity, long-term vulnerability.',
      pathColor: '#ef4444'
    },
    commensalism: {
      human: [50, 50, 50, 50],
      ai: [50, 65, 75, 85],
      outcome: '→ Commensalism: AI improves, human skills static. Productivity gains, but no personal growth.',
      pathColor: '#f59e0b'
    },
    mutualism: {
      human: [50, 60, 75, 90],
      ai: [50, 60, 75, 90],
      outcome: '↑ Mutualism: Both parties grow together. Human learns new meta-skills while AI handles routine. Compound effect.',
      pathColor: '#3fb950'
    }
  };

  let animationInterval = null;

  function runScenario(scenarioName) {
    const scenario = scenarios[scenarioName];
    if (!scenario) return;

    // Clear any existing animation
    if (animationInterval) clearInterval(animationInterval);

    // Reset to start
    let step = 0;
    markers.forEach(m => m.classList.remove('active'));
    markers[0].classList.add('active');

    // Update values immediately for step 0
    humanSkills.style.width = scenario.human[0] + '%';
    aiSkills.style.width = scenario.ai[0] + '%';
    humanValue.textContent = scenario.human[0];
    aiValue.textContent = scenario.ai[0];
    evolutionPath.style.width = '0%';
    evolutionPath.style.background = scenario.pathColor;

    // Animate through timeline
    animationInterval = setInterval(() => {
      step++;
      if (step >= 4) {
        clearInterval(animationInterval);
        outcome.textContent = scenario.outcome;
        outcome.className = 'evolution-outcome mono ' + scenarioName;
        return;
      }

      // Update progress
      const progress = (step / 3) * 100;
      evolutionPath.style.width = progress + '%';

      // Activate marker
      markers.forEach((m, i) => {
        if (i <= step) m.classList.add('active');
      });

      // Animate skill bars
      humanSkills.style.width = scenario.human[step] + '%';
      aiSkills.style.width = scenario.ai[step] + '%';
      humanValue.textContent = scenario.human[step];
      aiValue.textContent = scenario.ai[step];
    }, 600);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      runScenario(btn.dataset.scenario);
    });
  });
}

/* ------------------------------------------------------------
   PATTERN 7: SYMBIOSIS LAB (Mode Designer)
   ------------------------------------------------------------ */
function initSymbiosisLab() {
  const learningRequired = document.getElementById('learning-required');
  const valueDistribution = document.getElementById('value-distribution');
  const aiTransparency = document.getElementById('ai-transparency');
  const modeIndicator = document.getElementById('predicted-mode');
  const modeDescription = document.getElementById('mode-description');

  if (!learningRequired || !valueDistribution || !aiTransparency) return;

  const modeData = {
    parasitism: {
      icon: '🔴',
      name: 'Parasitism',
      description: 'One party extracts value while other diminishes'
    },
    commensalism: {
      icon: '🟡',
      name: 'Commensalism',
      description: 'One party benefits, other unchanged'
    },
    mutualism: {
      icon: '🟢',
      name: 'Mutualism',
      description: 'Both parties grow and benefit together'
    }
  };

  function calculateMode() {
    // Score each dimension (0 = parasitism, 1 = commensalism, 2 = mutualism)
    const learningScore = { none: 0, some: 1, deep: 2 }[learningRequired.value];
    const valueScore = { company: 0, split: 1, worker: 2 }[valueDistribution.value];
    const transparencyScore = { black: 0, explain: 1, teach: 2 }[aiTransparency.value];

    const total = learningScore + valueScore + transparencyScore;

    // Determine mode based on total (0-6)
    let mode;
    if (total <= 2) {
      mode = 'parasitism';
    } else if (total <= 4) {
      mode = 'commensalism';
    } else {
      mode = 'mutualism';
    }

    return mode;
  }

  function updateDisplay() {
    const mode = calculateMode();
    const data = modeData[mode];

    modeIndicator.className = 'mode-indicator ' + mode;
    modeIndicator.querySelector('.mode-icon').textContent = data.icon;
    modeIndicator.querySelector('.mode-name').textContent = data.name;
    modeDescription.textContent = data.description;
  }

  learningRequired.addEventListener('change', updateDisplay);
  valueDistribution.addEventListener('change', updateDisplay);
  aiTransparency.addEventListener('change', updateDisplay);

  // Initial update
  updateDisplay();
}

/* ------------------------------------------------------------
   PATTERN 8: IDENTITY MAP (Level 2)
   Shows identity strength vs AI threat level
   ------------------------------------------------------------ */
function initIdentityMap() {
  const container = document.getElementById('identity-map');
  if (!container) return;

  const items = container.querySelectorAll('.identity-item');
  const insight = container.querySelector('.map-insight');

  const reframes = {
    'writer': { from: 'I am a writer', to: 'I am a creator who uses any tool' },
    'analyst': { from: 'I am an analyst', to: 'I am a decision-maker who leverages analysis' },
    'coder': { from: 'I am a coder', to: 'I am a problem-solver who builds solutions' }
  };

  items.forEach(item => {
    item.addEventListener('click', () => {
      // Toggle reframed state
      item.classList.toggle('reframed');

      // Update threat level display
      const threatLevel = item.querySelector('.threat-level');
      const strengthBar = item.querySelector('.strength-bar');

      if (item.classList.contains('reframed')) {
        threatLevel.textContent = 'ADAPTED';
        threatLevel.className = 'threat-level threat-level--low mono';
        strengthBar.style.background = 'linear-gradient(90deg, var(--accent-green), #4ade80)';
      } else {
        // Reset to original
        const strength = item.dataset.strength;
        const levelMap = {
          high: { text: 'HIGH THREAT', class: 'threat-level--high' },
          medium: { text: 'MEDIUM', class: 'threat-level--medium' },
          low: { text: 'LOW', class: 'threat-level--low' }
        };
        threatLevel.textContent = levelMap[strength].text;
        threatLevel.className = 'threat-level ' + levelMap[strength].class + ' mono';
        strengthBar.style.background = 'linear-gradient(90deg, var(--accent-purple), #c084fc)';
      }
    });
  });

  // Insight click shows all reframed
  if (insight) {
    insight.addEventListener('click', () => {
      items.forEach(item => {
        if (!item.classList.contains('reframed')) {
          item.click();
        }
      });
    });
  }
}

/* ------------------------------------------------------------
   PATTERN 8: IDENTITY LAB (Level 3)
   Reframe workshop for identity-AI relationship
   ------------------------------------------------------------ */
function initIdentityLab() {
  const container = document.querySelector('.reframe-exercise');
  if (!container) return;

  const input = container.querySelector('.reframe-input');
  const examples = container.querySelectorAll('.reframe-example');
  const result = container.querySelector('.reframe-result');
  const beforeText = result.querySelector('.reframe-before .reframe-text');
  const afterText = result.querySelector('.reframe-after .reframe-text');

  const reframeData = {
    writer: {
      before: '"I am a writer"',
      after: '"I am a communicator who shapes ideas" → Writing is one tool of many'
    },
    analyst: {
      before: '"I am an analyst"',
      after: '"I am a decision-architect" → Analysis informs but doesn\'t define'
    },
    coder: {
      before: '"I am a coder"',
      after: '"I am a solution-builder" → Code is implementation, not identity'
    },
    designer: {
      before: '"I am a designer"',
      after: '"I am a problem-framer" → Design thinking transcends tools'
    }
  };

  function showReframe(role) {
    const data = reframeData[role];
    if (!data) return;

    beforeText.textContent = data.before;
    afterText.textContent = data.after;

    result.classList.add('updated');
    setTimeout(() => result.classList.remove('updated'), 300);
  }

  examples.forEach(btn => {
    btn.addEventListener('click', () => {
      examples.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const role = btn.dataset.role;
      if (input) input.value = reframeData[role]?.before.replace(/"/g, '') || '';
      showReframe(role);
    });
  });

  // Custom input handling
  if (input) {
    input.addEventListener('input', () => {
      examples.forEach(b => b.classList.remove('active'));
      const value = input.value.toLowerCase();

      // Generate dynamic reframe
      if (value.includes('am a') || value.includes('am an')) {
        const role = value.replace(/i am an? /i, '').trim();
        beforeText.textContent = `"I am a ${role}"`;
        afterText.textContent = `"I am someone who uses ${role} skills" → The skill serves you, not vice versa`;
        result.classList.add('updated');
        setTimeout(() => result.classList.remove('updated'), 300);
      }
    });
  }
}

/* ------------------------------------------------------------
   PATTERN 9: DEBT ACCUMULATOR (Level 2)
   Shows entropy growth patterns over time
   ------------------------------------------------------------ */
function initDebtAccumulator() {
  const container = document.getElementById('debt-accumulator');
  if (!container) return;

  const buttons = container.querySelectorAll('.accumulator-btn');
  const humanPath = document.getElementById('entropy-path-human');
  const aiPath = document.getElementById('entropy-path-ai');
  const insight = document.getElementById('accumulator-insight');

  const scenarios = {
    human: {
      path: 'M0,100 C50,95 100,85 150,70 C200,55 250,40 300,30',
      aiPath: '',
      insight: 'Human teams: Slow, linear entropy growth. Sustainable for years.',
      class: ''
    },
    ai: {
      path: 'M0,100 C50,95 100,85 150,70 C200,55 250,40 300,30',
      aiPath: 'M0,100 C30,85 60,60 100,35 C140,10 180,5 220,5 C260,5 300,5 300,5',
      insight: '⚠️ AI-augmented: Exponential growth. Collapse at month 4-6 without intervention.',
      class: 'warning'
    },
    managed: {
      path: 'M0,100 C50,95 100,85 150,70 C200,55 250,40 300,30',
      aiPath: 'M0,100 C50,90 100,75 150,55 C200,45 250,40 300,38',
      insight: '✓ AI + active culling: Entropy stays bounded. Sustainable velocity.',
      class: 'success'
    }
  };

  function animatePath(pathEl, d) {
    if (!d) {
      pathEl.setAttribute('d', '');
      return;
    }
    pathEl.setAttribute('d', d);
    const length = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = length;
    pathEl.style.strokeDashoffset = length;
    pathEl.getBoundingClientRect(); // Force reflow
    pathEl.style.transition = 'stroke-dashoffset 1s ease-out';
    pathEl.style.strokeDashoffset = '0';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.dataset.mode;
      const scenario = scenarios[mode];

      // Reset transitions
      humanPath.style.transition = 'none';
      aiPath.style.transition = 'none';

      setTimeout(() => {
        animatePath(humanPath, scenario.path);
        animatePath(aiPath, scenario.aiPath);

        insight.textContent = scenario.insight;
        insight.className = 'accumulator-insight mono ' + scenario.class;
      }, 50);
    });
  });
}

/* ------------------------------------------------------------
   PATTERN 9: ENTROPY BUDGET LAB (Level 3)
   Calculator for entropy sustainability
   ------------------------------------------------------------ */
function initEntropyBudgetLab() {
  const container = document.getElementById('entropy-budget-lab');
  if (!container) return;

  const aiGenRate = document.getElementById('ai-gen-rate');
  const aiGenValue = document.getElementById('ai-gen-value');
  const cleanupFreq = document.getElementById('cleanup-freq');
  const deleteRatio = document.getElementById('delete-ratio');
  const deleteRatioValue = document.getElementById('delete-ratio-value');
  const resultDisplay = document.getElementById('entropy-result');

  function calculateSustainability() {
    const genRate = parseInt(aiGenRate.value);
    const cleanup = cleanupFreq.value;
    const ratio = parseInt(deleteRatio.value);

    // Update display values
    aiGenValue.textContent = genRate + 'x';
    deleteRatioValue.textContent = '1:' + Math.max(1, Math.round(100 / Math.max(ratio, 1)));

    // Calculate sustainability score
    const cleanupScore = { never: 0, quarterly: 1, monthly: 2, weekly: 3, daily: 4 }[cleanup];
    const ratioScore = ratio / 20; // 0-5 scale
    const genPenalty = genRate / 2; // Higher gen = more entropy

    const sustainabilityScore = cleanupScore + ratioScore - genPenalty;

    let indicator, details;

    if (sustainabilityScore < 1) {
      indicator = {
        class: 'result-indicator--danger',
        icon: '💀',
        text: 'System collapse imminent'
      };
      details = 'Time-to-collapse: ~' + Math.max(1, Math.round(6 - genRate/2)) + ' months | Action required immediately';
    } else if (sustainabilityScore < 3) {
      indicator = {
        class: 'result-indicator--warning',
        icon: '⚠️',
        text: 'Marginal sustainability'
      };
      details = 'Time-to-collapse: ~' + Math.round(8 + sustainabilityScore) + ' months | Recommended: Increase cleanup to ' + (cleanup === 'monthly' ? 'weekly' : 'daily');
    } else {
      indicator = {
        class: 'result-indicator--success',
        icon: '✓',
        text: 'Sustainable entropy budget'
      };
      details = 'Projected stable indefinitely | Current strategy is working';
    }

    resultDisplay.innerHTML = `
      <div class="result-indicator ${indicator.class}">
        <span class="result-icon">${indicator.icon}</span>
        <span class="result-text">${indicator.text}</span>
      </div>
      <div class="result-details mono">${details}</div>
    `;
  }

  aiGenRate.addEventListener('input', calculateSustainability);
  cleanupFreq.addEventListener('change', calculateSustainability);
  deleteRatio.addEventListener('input', calculateSustainability);

  // Initial calculation
  calculateSustainability();
}

/* ------------------------------------------------------------
   PATTERN 10: BELIEF ECOSYSTEM
   Shows how ideas/beliefs spread or get resisted
   ------------------------------------------------------------ */
function initBeliefEcosystem() {
  const container = document.getElementById('belief-ecosystem');
  if (!container) return;

  const view = container.querySelector('.ecosystem-view');
  const insight = container.querySelector('.ecosystem-insight');
  const buttons = container.querySelectorAll('.ecosystem-btn');

  // Guard against missing elements
  if (!view) return;

  const modes = {
    single: {
      wells: [{ x: 50, y: 50, strength: 'normal' }],
      nodes: 15,
      insight: 'Single source: Beliefs cluster around one gravity well. High adoption, low diversity.',
      class: ''
    },
    competing: {
      wells: [
        { x: 30, y: 50, strength: 'normal' },
        { x: 70, y: 50, strength: 'normal' }
      ],
      nodes: 15,
      insight: '⚠️ Competing sources: Polarization emerges. Nodes split between wells with unstable middle.',
      class: 'warning'
    },
    resistant: {
      wells: [{ x: 50, y: 50, strength: 'strong' }],
      nodes: 15,
      resistant: 5,
      insight: '✓ Some nodes resist: Skeptical nodes (green) maintain independent positions. Healthier ecosystem.',
      class: 'success'
    }
  };

  function renderEcosystem(mode) {
    const config = modes[mode];
    view.innerHTML = '';

    // Create gravity wells
    config.wells.forEach(well => {
      const wellEl = document.createElement('div');
      wellEl.className = `gravity-well ${well.strength === 'strong' ? 'gravity-well--strong' : ''}`;
      wellEl.style.left = `${well.x}%`;
      wellEl.style.top = `${well.y}%`;
      view.appendChild(wellEl);
    });

    // Create belief nodes
    for (let i = 0; i < config.nodes; i++) {
      const node = document.createElement('div');
      const isResistant = config.resistant && i < config.resistant;
      node.className = `belief-node ${isResistant ? 'belief-node--skeptical' : ''}`;

      // Random starting positions
      const startX = Math.random() * 80 + 10;
      const startY = Math.random() * 80 + 10;
      node.style.left = `${startX}%`;
      node.style.top = `${startY}%`;

      view.appendChild(node);

      // Animate towards nearest well (or resist)
      setTimeout(() => {
        if (isResistant) {
          // Resistant nodes move slightly away from wells
          const awayX = startX < 50 ? startX - 10 : startX + 10;
          const awayY = startY < 50 ? startY - 10 : startY + 10;
          node.style.left = `${Math.max(5, Math.min(95, awayX))}%`;
          node.style.top = `${Math.max(5, Math.min(95, awayY))}%`;
        } else {
          // Find nearest well
          let nearestWell = config.wells[0];
          let minDist = Infinity;
          config.wells.forEach(well => {
            const dist = Math.hypot(well.x - startX, well.y - startY);
            if (dist < minDist) {
              minDist = dist;
              nearestWell = well;
            }
          });

          // Move towards well with some randomness
          const targetX = nearestWell.x + (Math.random() - 0.5) * 20;
          const targetY = nearestWell.y + (Math.random() - 0.5) * 20;
          node.style.left = `${targetX}%`;
          node.style.top = `${targetY}%`;
          node.classList.add('belief-node--attracted');
        }
      }, 100 + i * 50);
    }

    // Update insight (if element exists)
    if (insight) {
      insight.textContent = config.insight;
      insight.className = `ecosystem-insight mono ${config.class}`;
    }
  }

  // Button click handlers
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEcosystem(btn.dataset.mode);
    });
  });

  // Initial render
  buttons[0]?.classList.add('active');
  renderEcosystem('single');
}

/* ------------------------------------------------------------
   PATTERN 10: DISCERNMENT LAB
   Protocol builder for resisting persuasion gravity
   ------------------------------------------------------------ */
function initDiscernmentLab() {
  const container = document.getElementById('discernment-lab');
  if (!container) return;

  const checkboxes = container.querySelectorAll('.protocol-check');
  const scoreValue = container.querySelector('.score-value');
  const options = container.querySelectorAll('.protocol-option');

  const protocolScores = {
    'proto-steelman': 25,
    'proto-sources': 20,
    'proto-premortem': 30,
    'proto-redteam': 25
  };

  const verdicts = {
    0: 'No protocols active. Highly susceptible to persuasion gravity.',
    25: 'Basic protection. Still vulnerable to sophisticated influence.',
    50: 'Moderate defenses. Can resist casual manipulation.',
    75: 'Strong protocols. Difficult to influence without evidence.',
    100: 'Maximum discernment. Beliefs update on evidence, not gravity.'
  };

  function calculateScore() {
    let score = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) {
        score += protocolScores[cb.id] || 0;
        cb.closest('.protocol-option').classList.add('active');
      } else {
        cb.closest('.protocol-option').classList.remove('active');
      }
    });

    // Update display
    scoreValue.textContent = score;
    scoreValue.className = 'score-value';

    if (score === 0) scoreValue.classList.add('low');
    else if (score < 50) scoreValue.classList.add('medium');
    else if (score < 100) scoreValue.classList.add('good');
    else scoreValue.classList.add('excellent');

    // Find appropriate verdict
    let verdictKey = 0;
    Object.keys(verdicts).forEach(key => {
      if (score >= parseInt(key)) verdictKey = parseInt(key);
    });

    // Update verdict if element exists
    const verdictEl = container.querySelector('.protocol-verdict');
    if (verdictEl) {
      verdictEl.textContent = verdicts[verdictKey];
    }
  }

  // Add change listeners
  checkboxes.forEach(cb => {
    cb.addEventListener('change', calculateScore);
  });

  // Also make labels clickable properly
  options.forEach(opt => {
    opt.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const cb = opt.querySelector('.protocol-check');
        cb.checked = !cb.checked;
        calculateScore();
      }
    });
  });

  // Initial calculation
  calculateScore();
}

/* ------------------------------------------------------------
   PATTERN 11: POLICY CONFLICT SIMULATOR
   Shows how policy conflicts create unpredictable behavior
   ------------------------------------------------------------ */
function initPolicyConflict() {
  const container = document.getElementById('policy-conflict');
  if (!container) return;

  const buttons = container.querySelectorAll('.conflict-btn');
  const policyA = container.querySelector('.conflict-policy--a .policy-text');
  const policyB = container.querySelector('.conflict-policy--b .policy-text');
  const trigger = container.querySelector('.trigger-text');
  const result = container.querySelector('#conflict-result');
  const resultText = result.querySelector('.result-text');

  const scenarios = {
    compare: {
      policyA: 'Always be helpful and complete',
      policyB: 'Never discuss competitor products',
      trigger: '"Compare your product to [competitor]"',
      result: '⚠️ Policies conflict. Behavior depends on priority ordering (often undefined).',
      resolved: false
    },
    sensitive: {
      policyA: 'Answer all user questions',
      policyB: 'Never reveal confidential data',
      trigger: '"What are the Q4 revenue projections?"',
      result: '⚠️ Without explicit priority, AI may inconsistently refuse or reveal.',
      resolved: false
    },
    speed: {
      policyA: 'Respond quickly (under 2s)',
      policyB: 'Always verify facts before responding',
      trigger: '"What\'s the latest stock price?"',
      result: '✓ Solvable: Add priority rule "safety over speed" or timeout fallbacks.',
      resolved: true
    }
  };

  function showScenario(scenarioKey) {
    const s = scenarios[scenarioKey];
    policyA.textContent = s.policyA;
    policyB.textContent = s.policyB;
    trigger.textContent = s.trigger;
    resultText.textContent = s.result;

    result.className = 'conflict-result' + (s.resolved ? ' resolved' : '');
    result.querySelector('.result-label').textContent = s.resolved ? 'RESOLUTION:' : 'OUTCOME:';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showScenario(btn.dataset.scenario);
    });
  });

  // Initial state
  buttons[0]?.classList.add('active');
}

/* ------------------------------------------------------------
   PATTERN 11: POLICY COMPOSER LAB
   Interactive policy priority ordering
   ------------------------------------------------------------ */
function initPolicyComposer() {
  const container = document.getElementById('policy-composer');
  if (!container) return;

  const layers = container.querySelectorAll('.policy-layer');
  const output = container.querySelector('#composer-output');
  const moveButtons = container.querySelectorAll('.layer-move');
  const selects = container.querySelectorAll('.layer-select');

  const policyDescriptions = {
    safety: 'Safety constraints',
    helpful: 'helpfulness',
    honest: 'honesty',
    brief: 'brevity'
  };

  function updateOutput() {
    const values = [];
    layers.forEach(layer => {
      const select = layer.querySelector('.layer-select');
      values.push(policyDescriptions[select.value] || select.value);
    });

    const text = `When policies conflict, ${values[0]} wins. Then ${values[1]}. Then ${values[2]}.`;
    output.textContent = text;
  }

  // Move button functionality
  moveButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const currentLayer = layers[index];
      const nextIndex = index + 1;

      if (nextIndex < layers.length) {
        const nextLayer = layers[nextIndex];
        const currentSelect = currentLayer.querySelector('.layer-select');
        const nextSelect = nextLayer.querySelector('.layer-select');

        // Swap values
        const tempValue = currentSelect.value;
        currentSelect.value = nextSelect.value;
        nextSelect.value = tempValue;

        updateOutput();
      }
    });
  });

  // Select change handlers
  selects.forEach(select => {
    select.addEventListener('change', updateOutput);
  });

  // Initial output
  updateOutput();
}

/* ------------------------------------------------------------
   PATTERN 12: FEAR CALIBRATION LAB
   Domain-specific fear level configuration
   ------------------------------------------------------------ */
function initFearCalibration() {
  const container = document.getElementById('fear-calibration');
  if (!container) return;

  const sliders = container.querySelectorAll('.domain-slider');
  const output = container.querySelector('#calibration-output');

  const domainLabels = {
    code: 'code generation',
    comms: 'customer communications',
    finance: 'financial decisions'
  };

  function getLevel(value) {
    if (value < 33) return 'low';
    if (value < 66) return 'medium';
    return 'high';
  }

  function getLevelLabel(value) {
    if (value < 33) return 'Low';
    if (value < 66) return 'Moderate';
    return 'High';
  }

  function getRationale(domain, value) {
    const level = getLevel(value);
    const rationales = {
      code: {
        low: 'sandbox available, reversible',
        medium: 'some production risk',
        high: 'critical infrastructure'
      },
      comms: {
        low: 'internal only',
        medium: 'customer-facing, recoverable',
        high: 'legal/PR implications'
      },
      finance: {
        low: 'small amounts, reversible',
        medium: 'significant but bounded',
        high: 'major stakes, irreversible'
      }
    };
    return rationales[domain]?.[level] || '';
  }

  function updateOutput() {
    const values = {};
    sliders.forEach(slider => {
      const domain = slider.dataset.domain;
      const value = parseInt(slider.value);
      values[domain] = value;

      // Update display value and color
      const valueDisplay = container.querySelector(`.domain-value[data-domain="${domain}"]`);
      if (valueDisplay) {
        valueDisplay.textContent = value;
        valueDisplay.classList.remove('low', 'medium', 'high');
        valueDisplay.classList.add(getLevel(value));
      }
    });

    // Generate profile text
    const parts = [];
    for (const [domain, value] of Object.entries(values)) {
      const level = getLevelLabel(value);
      const rationale = getRationale(domain, value);
      parts.push(`${level} fear for ${domainLabels[domain]} (${rationale})`);
    }

    output.textContent = parts.join('. ') + '.';
  }

  // Attach listeners
  sliders.forEach(slider => {
    slider.addEventListener('input', updateOutput);
  });

  // Initial state
  updateOutput();
}

/* ------------------------------------------------------------
   PATTERN 13: ATTACK SURFACE SCANNER
   Compare AI vs human vulnerability discovery speed
   ------------------------------------------------------------ */
function initAttackSurface() {
  const container = document.getElementById('attack-surface');
  if (!container) return;

  const nodes = container.querySelectorAll('.surface-node');
  const scanBtn = container.querySelector('#run-scan');
  const humanBtn = container.querySelector('#run-human-scan');
  const status = container.querySelector('#scan-status');
  const result = container.querySelector('#surface-result');
  const resultText = result.querySelector('.result-text');

  const vulnerabilities = {
    api: { vuln: 'high', issue: 'SQL injection in /users endpoint' },
    auth: { vuln: 'medium', issue: 'Weak session token entropy' },
    db: { vuln: 'low', issue: 'Missing index causes slow queries' },
    cdn: { vuln: 'none', issue: null },
    queue: { vuln: 'medium', issue: 'Message replay possible' },
    cache: { vuln: 'none', issue: null }
  };

  function resetNodes() {
    nodes.forEach(node => {
      node.dataset.vuln = 'none';
    });
    result.classList.remove('found');
    resultText.textContent = 'Click a scan method to find vulnerabilities.';
    status.textContent = 'Ready';
    status.classList.remove('scanning', 'complete');
  }

  function runScan(isAI) {
    resetNodes();
    status.textContent = 'Scanning...';
    status.classList.add('scanning');
    scanBtn.disabled = true;
    humanBtn.disabled = true;

    const delay = isAI ? 300 : 15000;
    const stepDelay = isAI ? 50 : 2500;

    let index = 0;
    const scanInterval = setInterval(() => {
      if (index >= nodes.length) {
        clearInterval(scanInterval);
        status.textContent = 'Complete';
        status.classList.remove('scanning');
        status.classList.add('complete');
        scanBtn.disabled = false;
        humanBtn.disabled = false;

        // Show results
        const found = [];
        nodes.forEach(node => {
          const service = node.dataset.service;
          const v = vulnerabilities[service];
          if (v.vuln !== 'none') {
            found.push(`${service.toUpperCase()}: ${v.issue}`);
          }
        });

        if (found.length > 0) {
          result.classList.add('found');
          const timeText = isAI ? '0.3 seconds' : '15 seconds';
          resultText.innerHTML = `<strong>${found.length} vulnerabilities found in ${timeText}:</strong><br>${found.join('<br>')}`;
        }
        return;
      }

      const node = nodes[index];
      const service = node.dataset.service;
      node.dataset.vuln = vulnerabilities[service].vuln;
      index++;
    }, stepDelay);
  }

  scanBtn.addEventListener('click', () => runScan(true));
  humanBtn.addEventListener('click', () => runScan(false));
}

/* ------------------------------------------------------------
   PATTERN 13: DEFENSE STRATEGY LAB
   Configure detection/response/prediction trade-offs
   ------------------------------------------------------------ */
function initDefenseStrategy() {
  const container = document.getElementById('defense-lab');
  if (!container) return;

  const sliders = container.querySelectorAll('.strategy-slider');
  const budgetFill = container.querySelector('#budget-fill');
  const budgetValue = container.querySelector('#budget-value');
  const outcome = container.querySelector('#strategy-outcome');
  const outcomeText = outcome.querySelector('.outcome-text');

  const maxBudget = 300;

  function updateStrategy() {
    let total = 0;
    const values = {};

    sliders.forEach(slider => {
      const strategy = slider.dataset.strategy;
      const value = parseInt(slider.value);
      values[strategy] = value;
      total += value;

      // Update display value
      const valueDisplay = container.querySelector(`.strategy-value[data-strategy="${strategy}"]`);
      if (valueDisplay) {
        valueDisplay.textContent = `${value}%`;
      }
    });

    // Update budget
    const budgetPercent = Math.min((total / maxBudget) * 100, 100);
    budgetFill.style.width = `${budgetPercent}%`;
    budgetValue.textContent = `${total} / ${maxBudget}`;

    // Generate outcome text
    let text = '';
    if (total > maxBudget) {
      text = '⚠️ Over budget. Something has to give. Which capability do you cut?';
    } else if (values.detection > 70 && values.response < 30) {
      text = 'Detection-heavy: You see attacks but respond slowly. Alerts pile up faster than fixes.';
    } else if (values.response > 70 && values.detection < 30) {
      text = 'Response-heavy: Fast reactions but blind spots. You fix what you see but miss novel attacks.';
    } else if (values.prediction > 70) {
      text = 'Prediction-focused: Proactive stance but may chase false positives. High upfront cost, uncertain ROI.';
    } else if (values.detection < 30 && values.response < 30 && values.prediction < 30) {
      text = 'Minimal investment: Vulnerable to almost everything. Hope is not a strategy.';
    } else {
      text = 'Balanced approach. Good at catching known attacks, may miss novel threats.';
    }

    outcomeText.textContent = text;
  }

  sliders.forEach(slider => {
    slider.addEventListener('input', updateStrategy);
  });

  updateStrategy();
}

/* ------------------------------------------------------------
   PATTERN 14: VALUES AUDIT (Level 2)
   ------------------------------------------------------------ */
function initValuesAudit() {
  const container = document.getElementById('values-audit');
  if (!container) return;

  const auditBtn = document.getElementById('run-audit');
  const fixBtn = document.getElementById('fix-values');
  const scoreEl = document.getElementById('audit-score');
  const enforcedItems = container.querySelectorAll('.audit-item--enforced');

  let auditRun = false;

  auditBtn.addEventListener('click', () => {
    if (auditRun) return;
    auditRun = true;
    auditBtn.textContent = '⏳ Scanning...';
    auditBtn.style.opacity = '0.5';

    // Reveal each enforced item with stagger
    enforcedItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('revealed');

        // Flash the corresponding stated value
        const value = item.dataset.value;
        const statedItem = container.querySelector(`.audit-item--stated[data-value="${value}"]`);
        if (statedItem) {
          statedItem.style.transform = 'scale(1.02)';
          setTimeout(() => statedItem.style.transform = '', 200);
        }
      }, (index + 1) * 400);
    });

    // Update score after all items revealed
    setTimeout(() => {
      const trueCount = container.querySelectorAll('[data-enforced="true"]').length;
      const partialCount = container.querySelectorAll('[data-enforced="partial"]').length;
      const total = enforcedItems.length;
      const percentage = Math.round((trueCount + partialCount * 0.5) / total * 100);

      scoreEl.textContent = `${percentage}% Enforced`;
      if (percentage >= 75) {
        scoreEl.classList.add('good');
      } else if (percentage >= 50) {
        scoreEl.classList.add('partial');
      }

      auditBtn.textContent = '✓ Audit Complete';
      fixBtn.classList.add('active');
    }, enforcedItems.length * 400 + 500);
  });

  fixBtn.addEventListener('click', () => {
    // Animate fixing the unenforced values
    const falseItems = container.querySelectorAll('[data-enforced="false"]');
    falseItems.forEach((item, index) => {
      setTimeout(() => {
        item.dataset.enforced = 'true';
        const status = item.querySelector('.enforcement-status');
        const reality = item.querySelector('.audit-reality');
        if (status) status.textContent = '✓';
        if (reality) reality.textContent = 'Hard constraint added';
      }, index * 300);
    });

    setTimeout(() => {
      scoreEl.textContent = '100% Enforced';
      scoreEl.classList.remove('partial');
      scoreEl.classList.add('good');
      fixBtn.textContent = '✓ All Constrained';
      fixBtn.style.opacity = '0.5';
      fixBtn.style.pointerEvents = 'none';
    }, falseItems.length * 300 + 200);
  });
}

/* ------------------------------------------------------------
   PATTERN 14: CONSTRAINT DESIGNER (Level 3)
   ------------------------------------------------------------ */
function initConstraintDesigner() {
  const container = document.getElementById('constraint-lab');
  if (!container) return;

  const valueSelect = document.getElementById('constraint-value-select');
  const enforcementRadios = container.querySelectorAll('input[name="enforcement"]');
  const previewCode = document.getElementById('constraint-preview');
  const testBtn = document.getElementById('test-constraint');
  const resultEl = document.getElementById('constraint-result');

  const codeTemplates = {
    privacy: {
      poster: `// Poster Only Mode
console.log("We value customer privacy");
// No actual enforcement
agent.accessPII(); // ✓ Allowed`,
      soft: `// Soft Constraint Mode
if (agent.accessPII()) {
  log.warn("PII access detected");
  notify.manager("Review PII access");
  // Agent proceeds anyway
}`,
      hard: `// Hard Constraint Mode
if (agent.accessPII()) {
  throw new ConstraintViolation("PII access blocked");
  // Agent cannot proceed
}
// Only approved flows allowed`
    },
    transparency: {
      poster: `// Poster Only Mode
console.log("We believe in transparency");
// No logging required
agent.makeDecision(); // Untracked`,
      soft: `// Soft Constraint Mode
if (!agent.hasAuditLog()) {
  log.warn("Decision made without audit trail");
  // Still allows unlogged actions
}`,
      hard: `// Hard Constraint Mode
if (!agent.hasAuditLog()) {
  throw new ConstraintViolation("Audit trail required");
}
// Every decision logged`
    },
    fairness: {
      poster: `// Poster Only Mode
console.log("We ensure algorithmic fairness");
// No bias checking
model.predict(data); // Unchecked`,
      soft: `// Soft Constraint Mode
const result = model.predict(data);
if (biasChecker.flagged(result)) {
  log.warn("Potential bias detected");
  // Result still returned
}`,
      hard: `// Hard Constraint Mode
const result = model.predict(data);
if (!biasChecker.approved(result)) {
  throw new ConstraintViolation("Bias check failed");
}
// Only approved predictions returned`
    },
    accuracy: {
      poster: `// Poster Only Mode
console.log("Data accuracy is important");
// No validation
db.insert(userData); // Unchecked`,
      soft: `// Soft Constraint Mode
if (!validator.check(userData)) {
  log.warn("Data quality issues detected");
  // Still inserts anyway
}`,
      hard: `// Hard Constraint Mode
if (!validator.check(userData)) {
  throw new ConstraintViolation("Data validation failed");
}
// Only clean data accepted`
    }
  };

  const testResults = {
    poster: { text: '⚠️ Violation occurred. Value was ignored because no constraint exists.', class: 'allowed' },
    soft: { text: '⚠️ Warning logged, manager notified. But action still proceeded.', class: 'warned' },
    hard: { text: '✓ Action BLOCKED. Constraint enforced. Value protected.', class: 'blocked' }
  };

  function updatePreview() {
    const value = valueSelect.value;
    const enforcement = container.querySelector('input[name="enforcement"]:checked').value;
    previewCode.textContent = codeTemplates[value][enforcement];
    resultEl.textContent = '';
    resultEl.className = 'test-result mono';
  }

  valueSelect.addEventListener('change', updatePreview);
  enforcementRadios.forEach(radio => {
    radio.addEventListener('change', updatePreview);
  });

  testBtn.addEventListener('click', () => {
    const enforcement = container.querySelector('input[name="enforcement"]:checked').value;
    const result = testResults[enforcement];

    testBtn.textContent = '⏳ Testing...';
    testBtn.style.opacity = '0.5';

    setTimeout(() => {
      resultEl.textContent = result.text;
      resultEl.className = `test-result mono ${result.class}`;
      testBtn.textContent = '▶ Test Violation Attempt';
      testBtn.style.opacity = '1';
    }, 800);
  });

  updatePreview();
}

/* ------------------------------------------------------------
   PATTERN 15: TRANSITION MAP (Level 2)
   Navigate through identity transition stages
   ------------------------------------------------------------ */
function initTransitionMap() {
  const container = document.getElementById('transition-map');
  if (!container) return;

  const stages = ['denial', 'resistance', 'exploration', 'integration'];
  let currentIndex = 0;

  const stageData = {
    denial: {
      behavior: 'Dismisses AI demos, avoids discussions, emphasizes "AI can\'t do the creative part"',
      need: 'Feels expertise is threatened, needs validation that skills still matter',
      support: 'Show AI as amplifier of existing skills, not replacement. Let them discover limitations naturally.'
    },
    resistance: {
      behavior: 'Points out AI failures, becomes the "AI critic", may actively slow adoption',
      need: 'Needs agency and control, fears being left behind or made obsolete',
      support: 'Give ownership of AI integration decisions. Create safe experimentation spaces.'
    },
    exploration: {
      behavior: 'Tries AI privately, asks "what if" questions, experiments but downplays usage',
      need: 'Curious but socially cautious, doesn\'t want to be seen as "giving in"',
      support: 'Normalize exploration. Share stories of respected peers finding value. Remove stigma.'
    },
    integration: {
      behavior: 'Openly uses AI as a tool, develops personal workflow, teaches others',
      need: 'Has redefined professional identity to include AI collaboration',
      support: 'Celebrate new identity, create mentorship opportunities, recognize evolution.'
    }
  };

  const nodes = container.querySelectorAll('.stage-node');
  const stageLabel = document.getElementById('current-stage');
  const behaviorText = document.getElementById('behavior-text');
  const needText = document.getElementById('need-text');
  const supportText = document.getElementById('support-text');
  const prevBtn = document.getElementById('stage-prev');
  const nextBtn = document.getElementById('stage-next');

  function updateStage() {
    const stage = stages[currentIndex];
    const data = stageData[stage];

    // Update nodes
    nodes.forEach((node, i) => {
      node.classList.toggle('stage-node--active', i <= currentIndex);
      node.classList.toggle('stage-node--current', i === currentIndex);
    });

    // Update content with animation
    const details = container.querySelectorAll('.detail-text');
    details.forEach(el => el.style.opacity = '0');

    setTimeout(() => {
      stageLabel.textContent = `Stage: ${stage.charAt(0).toUpperCase() + stage.slice(1)}`;
      behaviorText.textContent = data.behavior;
      needText.textContent = data.need;
      supportText.textContent = data.support;
      details.forEach(el => el.style.opacity = '1');
    }, 150);

    // Update buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === stages.length - 1;
  }

  // Click on stage nodes
  nodes.forEach((node, i) => {
    node.addEventListener('click', () => {
      currentIndex = i;
      updateStage();
    });
  });

  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateStage();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < stages.length - 1) {
      currentIndex++;
      updateStage();
    }
  });

  updateStage();
}

/* ------------------------------------------------------------
   PATTERN 15: IDENTITY SUPPORT DESIGNER (Level 3)
   Configure support for different personas at stages
   ------------------------------------------------------------ */
function initIdentitySupportDesigner() {
  const container = document.getElementById('support-lab');
  if (!container) return;

  const personas = {
    expert: {
      name: 'Senior Expert',
      desc: '20+ years experience, deep domain knowledge',
      defaultStage: 'denial',
      sensitivities: ['status', 'expertise', 'legacy']
    },
    manager: {
      name: 'Middle Manager',
      desc: 'Team leads, project owners, coordinators',
      defaultStage: 'resistance',
      sensitivities: ['control', 'team dynamics', 'metrics']
    },
    newgrad: {
      name: 'New Graduate',
      desc: 'Early career, building professional identity',
      defaultStage: 'exploration',
      sensitivities: ['skill development', 'differentiation', 'career path']
    }
  };

  const interventions = {
    training: {
      name: 'AI Training Program',
      effect: { expert: 'low', manager: 'medium', newgrad: 'high' },
      risk: 'May feel condescending to experts'
    },
    pilot: {
      name: 'Opt-in Pilot Program',
      effect: { expert: 'high', manager: 'medium', newgrad: 'medium' },
      risk: 'Self-selection may leave skeptics behind'
    },
    mentorship: {
      name: 'AI Mentorship Pairs',
      effect: { expert: 'medium', manager: 'low', newgrad: 'high' },
      risk: 'Requires willing senior participants'
    },
    showcase: {
      name: 'Success Showcases',
      effect: { expert: 'medium', manager: 'high', newgrad: 'medium' },
      risk: 'Can feel like propaganda if not authentic'
    }
  };

  let selectedPersona = 'expert';
  let selectedIntervention = 'training';

  const personaBtns = container.querySelectorAll('.persona-btn');
  const personaDesc = document.getElementById('persona-desc');
  const configOpts = container.querySelectorAll('.config-opt');
  const previewTitle = document.getElementById('preview-title');
  const previewEffect = document.getElementById('preview-effect');
  const previewRisk = document.getElementById('preview-risk');
  const outcomeFill = document.getElementById('outcome-fill');
  const outcomeLabel = document.getElementById('outcome-label');

  function updatePreview() {
    const persona = personas[selectedPersona];
    const intervention = interventions[selectedIntervention];
    const effect = intervention.effect[selectedPersona];

    // Update persona description
    personaDesc.textContent = persona.desc;

    // Update intervention preview
    previewTitle.textContent = intervention.name;
    previewEffect.textContent = `Expected impact for ${persona.name}: ${effect.toUpperCase()}`;
    previewRisk.textContent = intervention.risk;

    // Update outcome meter
    const effectMap = { low: 25, medium: 55, high: 85 };
    const effectValue = effectMap[effect];
    outcomeFill.style.width = `${effectValue}%`;

    // Color based on effectiveness
    if (effectValue >= 70) {
      outcomeFill.style.background = 'linear-gradient(90deg, var(--accent), #10b981)';
      outcomeLabel.textContent = 'High Adoption Likelihood';
    } else if (effectValue >= 45) {
      outcomeFill.style.background = 'linear-gradient(90deg, var(--accent-purple), var(--accent))';
      outcomeLabel.textContent = 'Moderate Adoption Likelihood';
    } else {
      outcomeFill.style.background = 'linear-gradient(90deg, #ef4444, var(--accent-purple))';
      outcomeLabel.textContent = 'Low Adoption Likelihood';
    }
  }

  // Persona selection
  personaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      personaBtns.forEach(b => b.classList.remove('persona-btn--active'));
      btn.classList.add('persona-btn--active');
      selectedPersona = btn.dataset.persona;
      updatePreview();
    });
  });

  // Intervention selection
  configOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      configOpts.forEach(o => o.classList.remove('config-opt--active'));
      opt.classList.add('config-opt--active');
      selectedIntervention = opt.dataset.intervention;
      updatePreview();
    });
  });

  updatePreview();
}

/* ------------------------------------------------------------
   DEPTH TOGGLE (Simple/Deep text switching)
   ------------------------------------------------------------ */
function initDepthToggle() {
  const simpleBtn = document.querySelector('[data-depth="simple"]');
  const deepBtn = document.querySelector('[data-depth="deep"]');
  const simpleBodies = document.querySelectorAll('.pattern-body--simple');
  const deepBodies = document.querySelectorAll('.pattern-body--deep');

  if (!simpleBtn || !deepBtn) return;

  simpleBtn.addEventListener('click', () => {
    simpleBtn.classList.add('depth-toggle__btn--active');
    deepBtn.classList.remove('depth-toggle__btn--active');
    simpleBodies.forEach(el => el.hidden = false);
    deepBodies.forEach(el => el.hidden = true);
  });

  deepBtn.addEventListener('click', () => {
    deepBtn.classList.add('depth-toggle__btn--active');
    simpleBtn.classList.remove('depth-toggle__btn--active');
    simpleBodies.forEach(el => el.hidden = true);
    deepBodies.forEach(el => el.hidden = false);
  });
}

/* ------------------------------------------------------------
   PATTERN 1: COHERENCE WINS (Mess→Clear slider)
   ------------------------------------------------------------ */
function initCoherence() {
  const field = document.getElementById('coherence-field');
  const slider = document.getElementById('coherence-slider');
  const output = document.querySelector('#coherence-output .output-value');

  if (!field || !slider) return;

  const particles = [];
  const particleCount = 40;
  const centerX = field.offsetWidth / 2;
  const centerY = field.offsetHeight / 2;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'coherence-particle';
    particle.style.left = Math.random() * (field.offsetWidth - 8) + 'px';
    particle.style.top = Math.random() * (field.offsetHeight - 8) + 'px';
    particle.style.backgroundColor = `hsl(${170 + Math.random() * 20}, 100%, ${50 + Math.random() * 20}%)`;
    field.appendChild(particle);
    particles.push({
      el: particle,
      baseX: Math.random() * field.offsetWidth,
      baseY: Math.random() * field.offsetHeight,
      targetX: centerX - 100 + (i % 10) * 20 + Math.random() * 10,
      targetY: centerY - 80 + Math.floor(i / 10) * 40 + Math.random() * 10
    });
  }

  function updateCoherence(value) {
    const coherence = value / 100;
    output.textContent = value + '%';

    particles.forEach((p, i) => {
      const messy = 1 - coherence;
      const x = p.targetX * coherence + p.baseX * messy;
      const y = p.targetY * coherence + p.baseY * messy;

      p.el.style.left = x + 'px';
      p.el.style.top = y + 'px';
      p.el.style.opacity = 0.4 + coherence * 0.6;
      p.el.style.transform = `scale(${0.6 + coherence * 0.4})`;

      if (messy > 0.3) {
        p.el.classList.add('messy');
        p.el.style.animationDelay = (i * 0.1) + 's';
      } else {
        p.el.classList.remove('messy');
      }
    });
  }

  slider.addEventListener('input', (e) => updateCoherence(e.target.value));
  updateCoherence(slider.value);

  // Store reset function
  field.resetFn = () => {
    slider.value = 50;
    updateCoherence(50);
  };
}

/* ------------------------------------------------------------
   PATTERN 2: THE LOOP IS THE PRODUCT (Speed dial)
   ------------------------------------------------------------ */
function initLoop() {
  const dial = document.getElementById('loop-dial');
  const arc = document.getElementById('loop-arc');
  const handle = document.getElementById('loop-handle');
  const speedText = document.getElementById('loop-speed-text');
  const cyclesEl = document.getElementById('loop-cycles');
  const iterationsContainer = document.getElementById('loop-iterations');

  if (!dial) return;

  let speed = 1;
  let cycles = 0;
  let intervalId = null;
  let isDragging = false;

  function updateDial(newSpeed) {
    speed = Math.max(1, Math.min(10, newSpeed));
    speedText.textContent = speed + '×';

    // Update arc
    const dashOffset = 502 - (speed / 10) * 251;
    arc.style.strokeDashoffset = dashOffset;

    // Update handle position (rotate around center)
    const angle = -90 + (speed / 10) * 180;
    const radians = angle * Math.PI / 180;
    const hx = 100 + 80 * Math.cos(radians);
    const hy = 100 + 80 * Math.sin(radians);
    handle.setAttribute('cx', hx);
    handle.setAttribute('cy', hy);

    // Restart interval with new speed
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      cycles++;
      cyclesEl.textContent = cycles;

      // Add iteration dot
      const dot = document.createElement('div');
      dot.className = 'iteration-dot';
      iterationsContainer.appendChild(dot);

      // Limit dots shown
      if (iterationsContainer.children.length > 30) {
        iterationsContainer.removeChild(iterationsContainer.firstChild);
      }
    }, 2000 / speed);
  }

  // Drag to change speed
  dial.addEventListener('mousedown', (e) => {
    isDragging = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const degrees = angle * 180 / Math.PI;
    const normalizedAngle = (degrees + 90 + 360) % 360;
    const newSpeed = Math.round((normalizedAngle / 180) * 9) + 1;
    updateDial(newSpeed);
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  updateDial(1);

  // Reset function
  dial.resetFn = () => {
    cycles = 0;
    cyclesEl.textContent = '0';
    iterationsContainer.innerHTML = '<div class="iteration-dot"></div>';
    updateDial(1);
  };
}

/* ------------------------------------------------------------
   PATTERN 3: BOTTLENECK GRAVITY (Marbles canvas)
   ------------------------------------------------------------ */
function initBottleneck() {
  const canvas = document.getElementById('bottleneck-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const marbleCountEl = document.getElementById('marble-count');
  const stuckCountEl = document.getElementById('stuck-count');
  const throughCountEl = document.getElementById('through-count');

  // Set canvas size
  canvas.width = canvas.offsetWidth * 2;
  canvas.height = canvas.offsetHeight * 2;
  ctx.scale(2, 2);
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;

  let marbles = [];
  let holes = [{ x: width / 2, width: 40 }];
  let throughCount = 0;

  class Marble {
    constructor(x) {
      this.x = x;
      this.y = 10;
      this.vy = 0;
      this.vx = (Math.random() - 0.5) * 2;
      this.radius = 6;
      this.stuck = false;
      this.color = `hsl(${170 + Math.random() * 30}, 80%, 60%)`;
    }

    update() {
      if (this.stuck) return;

      this.vy += 0.2; // gravity
      this.y += this.vy;
      this.x += this.vx;

      // Wall bounces
      if (this.x < this.radius) { this.x = this.radius; this.vx *= -0.5; }
      if (this.x > width - this.radius) { this.x = width - this.radius; this.vx *= -0.5; }

      // Check bottleneck (at y = 150)
      const bottleneckY = 150;
      if (this.y >= bottleneckY - this.radius && this.y <= bottleneckY + 10) {
        let canPass = false;
        holes.forEach(hole => {
          if (this.x > hole.x - hole.width/2 && this.x < hole.x + hole.width/2) {
            canPass = true;
          }
        });

        if (!canPass) {
          this.y = bottleneckY - this.radius;
          this.vy = 0;
          this.stuck = true;
        }
      }

      // Through the bottom
      if (this.y > height + 10) {
        throughCount++;
        throughCountEl.textContent = throughCount;
        return false; // remove marble
      }
      return true;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.stuck ? '#f85149' : this.color;
      ctx.fill();
      if (!this.stuck) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }
  }

  function drawBottleneck() {
    ctx.fillStyle = '#30363d';
    ctx.fillRect(0, 150, width, 10);

    // Cut holes
    ctx.globalCompositeOperation = 'destination-out';
    holes.forEach(hole => {
      ctx.fillRect(hole.x - hole.width/2, 148, hole.width, 14);
    });
    ctx.globalCompositeOperation = 'source-over';

    // Draw hole edges
    ctx.strokeStyle = '#00ffd5';
    ctx.lineWidth = 2;
    holes.forEach(hole => {
      ctx.beginPath();
      ctx.moveTo(hole.x - hole.width/2, 148);
      ctx.lineTo(hole.x - hole.width/2, 162);
      ctx.moveTo(hole.x + hole.width/2, 148);
      ctx.lineTo(hole.x + hole.width/2, 162);
      ctx.stroke();
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    drawBottleneck();

    marbles = marbles.filter(m => m.update());
    marbles.forEach(m => m.draw());

    marbleCountEl.textContent = marbles.length;
    stuckCountEl.textContent = marbles.filter(m => m.stuck).length;

    requestAnimationFrame(animate);
  }

  // Button handlers
  document.querySelector('[data-action="add-marble"]')?.addEventListener('click', () => {
    marbles.push(new Marble(50 + Math.random() * (width - 100)));
  });

  document.querySelector('[data-action="add-hole"]')?.addEventListener('click', () => {
    if (holes.length < 4) {
      holes.push({ x: Math.random() * (width - 60) + 30, width: 30 + Math.random() * 20 });
      // Unstick marbles that are now over holes
      marbles.forEach(m => {
        if (m.stuck) {
          holes.forEach(hole => {
            if (m.x > hole.x - hole.width/2 && m.x < hole.x + hole.width/2) {
              m.stuck = false;
              m.vy = 1;
            }
          });
        }
      });
    }
  });

  document.querySelector('[data-action="remove-hole"]')?.addEventListener('click', () => {
    if (holes.length > 1) {
      holes.pop();
    }
  });

  animate();

  // Reset
  canvas.resetFn = () => {
    marbles = [];
    holes = [{ x: width / 2, width: 40 }];
    throughCount = 0;
    throughCountEl.textContent = '0';
  };
}

/* ------------------------------------------------------------
   PATTERN 4: ACTION GETS CHEAP (Cost slider)
   ------------------------------------------------------------ */
function initCost() {
  const slider = document.getElementById('cost-slider');
  const actionCost = document.getElementById('action-cost');
  const coordCost = document.getElementById('coord-cost');
  const actionValue = document.getElementById('action-value');
  const coordValue = document.getElementById('coord-value');
  const insight = document.getElementById('cost-insight');

  if (!slider) return;

  const insights = [
    'Traditional model: Optimize for execution speed.',
    'AI tools starting to reduce action costs.',
    'Action costs dropping. Coordination becoming visible.',
    'The flip approaches. Coordination dominates.',
    'Post-flip: Coordination is the primary constraint.'
  ];

  function updateCost(value) {
    const t = value / 100;

    // Action cost: 80 → 5
    const action = Math.round(80 - t * 75);
    // Coordination cost: 20 → 95
    const coord = Math.round(20 + t * 75);

    actionCost.style.height = action + '%';
    coordCost.style.height = coord + '%';
    actionValue.textContent = '$' + action;
    coordValue.textContent = '$' + coord;

    const insightIndex = Math.min(4, Math.floor(t * 5));
    insight.textContent = insights[insightIndex];
  }

  slider.addEventListener('input', (e) => updateCost(e.target.value));
  updateCost(0);

  slider.resetFn = () => {
    slider.value = 0;
    updateCost(0);
  };
}

/* ------------------------------------------------------------
   PATTERN 5: LANGUAGE IS INFRASTRUCTURE (Robot builder)
   ------------------------------------------------------------ */
function initLanguage() {
  const wordBlocks = document.getElementById('word-blocks');
  const promptText = document.getElementById('prompt-text');
  const promptArea = document.querySelector('.prompt-area');

  if (!wordBlocks) return;

  const parts = {
    head: ['.robot-head'],
    body: ['.robot-body'],
    arms: ['.robot-arm-left', '.robot-arm-right'],
    legs: ['.robot-leg-left', '.robot-leg-right'],
    eyes: ['.robot-eye-left', '.robot-eye-right', '.robot-mouth']
  };

  const usedWords = new Set();

  document.querySelectorAll('.word-block').forEach(block => {
    block.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', block.dataset.part);
      block.classList.add('dragging');
    });

    block.addEventListener('dragend', () => {
      block.classList.remove('dragging');
    });

    // Click to toggle
    block.addEventListener('click', () => {
      const part = block.dataset.part;
      if (usedWords.has(part)) {
        usedWords.delete(part);
        block.classList.remove('used');
        parts[part].forEach(sel => {
          document.querySelector(sel)?.classList.remove('active');
        });
      } else {
        usedWords.add(part);
        block.classList.add('used');
        parts[part].forEach(sel => {
          document.querySelector(sel)?.classList.add('active');
        });
      }
      updatePrompt();
    });
  });

  promptArea?.addEventListener('dragover', (e) => {
    e.preventDefault();
    promptArea.classList.add('drag-over');
  });

  promptArea?.addEventListener('dragleave', () => {
    promptArea.classList.remove('drag-over');
  });

  promptArea?.addEventListener('drop', (e) => {
    e.preventDefault();
    promptArea.classList.remove('drag-over');
    const part = e.dataTransfer.getData('text/plain');
    if (part && !usedWords.has(part)) {
      usedWords.add(part);
      document.querySelector(`[data-part="${part}"]`)?.classList.add('used');
      parts[part].forEach(sel => {
        document.querySelector(sel)?.classList.add('active');
      });
      updatePrompt();
    }
  });

  function updatePrompt() {
    if (usedWords.size === 0) {
      promptText.textContent = 'Drop words here to build...';
      promptText.classList.remove('filled');
    } else {
      const words = Array.from(usedWords);
      promptText.textContent = `Build a robot with: ${words.join(', ')}`;
      promptText.classList.add('filled');
    }
  }

  // Reset
  wordBlocks.resetFn = () => {
    usedWords.clear();
    document.querySelectorAll('.word-block').forEach(b => b.classList.remove('used'));
    document.querySelectorAll('.robot-part').forEach(p => p.classList.remove('active'));
    updatePrompt();
  };
}

/* ------------------------------------------------------------
   PATTERN 6: LEGIBILITY BECOMES POWER (Search game)
   Click cells to make data legible, then search to find it
   ------------------------------------------------------------ */
function initLegibility() {
  const grid = document.getElementById('data-grid');
  const input = document.getElementById('search-input');
  const legibleCount = document.getElementById('legible-count');
  const hiddenCount = document.getElementById('hidden-count');
  const searchTime = document.getElementById('search-time');

  if (!grid) return;

  const gridSize = 36;
  const cells = [];
  // Use searchable text labels instead of symbols
  const dataTypes = ['USER', 'SALE', 'TASK', 'FILE', 'NOTE', 'ITEM'];
  const targetData = 'SALE'; // The data we're looking for
  let searchStart = null;
  let foundTarget = false;

  // Generate grid
  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div');
    cell.className = 'data-cell';
    const isLegible = Math.random() > 0.4;
    const dataType = dataTypes[Math.floor(Math.random() * dataTypes.length)];

    cell.dataset.type = dataType;
    cell.dataset.legible = isLegible;

    // Show label for legible data, obscured for hidden
    if (isLegible) {
      cell.textContent = dataType;
      cell.classList.add('legible');
    } else {
      cell.textContent = '????';
      cell.classList.add('hidden-data');
    }

    // Click to toggle legibility (make data queryable)
    cell.addEventListener('click', () => {
      if (cell.dataset.legible === 'true') {
        // Make hidden
        cell.dataset.legible = 'false';
        cell.textContent = '????';
        cell.classList.remove('legible', 'found');
        cell.classList.add('hidden-data');
      } else {
        // Make legible
        cell.dataset.legible = 'true';
        cell.textContent = cell.dataset.type;
        cell.classList.remove('hidden-data');
        cell.classList.add('legible');
      }
      updateCounts();
      // Re-run search if there's a query
      if (input.value) {
        runSearch(input.value);
      }
    });

    grid.appendChild(cell);
    cells.push(cell);
  }

  function updateCounts() {
    const legible = cells.filter(c => c.dataset.legible === 'true').length;
    const hidden = gridSize - legible;
    legibleCount.textContent = legible;
    hiddenCount.textContent = hidden;
  }

  function runSearch(query) {
    const q = query.toUpperCase();
    let foundCount = 0;
    let hiddenMatches = 0;

    cells.forEach(cell => {
      cell.classList.remove('found', 'searched', 'hidden-match');

      if (q && cell.dataset.type.includes(q)) {
        if (cell.dataset.legible === 'true') {
          cell.classList.add('found');
          foundCount++;
        } else {
          // Data exists but is hidden/not queryable
          cell.classList.add('hidden-match');
          hiddenMatches++;
        }
      }
    });

    // Update search time
    if (q && !searchStart) searchStart = Date.now();
    if (q) {
      const elapsed = ((Date.now() - searchStart) / 1000).toFixed(1);
      searchTime.textContent = elapsed + 's';
    }

    // Show feedback about hidden matches
    if (hiddenMatches > 0 && foundCount === 0) {
      input.placeholder = `${hiddenMatches} match${hiddenMatches > 1 ? 'es' : ''} hidden! Click cells to reveal`;
    } else if (foundCount > 0) {
      input.placeholder = `Found ${foundCount}!`;
    } else if (q) {
      input.placeholder = 'No matches...';
    }
  }

  input?.addEventListener('input', (e) => {
    runSearch(e.target.value);
  });

  // Initial counts
  updateCounts();

  // Set helpful placeholder
  input.placeholder = 'Search: USER, SALE, TASK...';

  // Reset
  grid.resetFn = () => {
    input.value = '';
    input.placeholder = 'Search: USER, SALE, TASK...';
    searchStart = null;
    searchTime.textContent = '0.0s';
    foundTarget = false;
    cells.forEach(cell => {
      cell.classList.remove('found', 'searched', 'hidden-match');
    });
  };
}

/* ------------------------------------------------------------
   PATTERN 7: SYMBIOSIS MODES (Wave canvas)
   ------------------------------------------------------------ */
function initSymbiosis() {
  const canvas = document.getElementById('wave-canvas');
  const output = document.getElementById('symbiosis-output');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 400;

  let mode = 'commensalism';
  let time = 0;

  const messages = {
    parasitism: 'Parasitism: One wave grows at the expense of the other.',
    commensalism: 'Commensalism: One wave benefits, other unchanged.',
    mutualism: 'Mutualism: Both waves amplify together.'
  };

  function drawWaves() {
    ctx.clearRect(0, 0, 800, 400);

    const centerY = 200;

    // Wave 1 (Human - cyan)
    ctx.beginPath();
    ctx.strokeStyle = '#00ffd5';
    ctx.lineWidth = 3;

    let amp1 = 40;
    if (mode === 'parasitism') amp1 = 20;
    if (mode === 'mutualism') amp1 = 60;

    for (let x = 0; x < 800; x++) {
      const y = centerY + Math.sin(x * 0.02 + time) * amp1;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Wave 2 (AI - purple)
    ctx.beginPath();
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;

    let amp2 = 40;
    if (mode === 'parasitism') amp2 = 70;
    if (mode === 'mutualism') amp2 = 60;

    for (let x = 0; x < 800; x++) {
      const phase = mode === 'mutualism' ? time : time + Math.PI;
      const y = centerY + Math.sin(x * 0.02 + phase + 1) * amp2;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    time += 0.05;
    requestAnimationFrame(drawWaves);
  }

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.mode-btn--active')?.classList.remove('mode-btn--active');
      btn.classList.add('mode-btn--active');
      mode = btn.dataset.mode;
      output.textContent = messages[mode];
    });
  });

  drawWaves();

  canvas.resetFn = () => {
    mode = 'commensalism';
    document.querySelector('.mode-btn--active')?.classList.remove('mode-btn--active');
    document.querySelector('[data-mode="commensalism"]')?.classList.add('mode-btn--active');
    output.textContent = messages.commensalism;
  };
}

/* ------------------------------------------------------------
   PATTERN 8: IDENTITY GRAVITY (Spring)
   ------------------------------------------------------------ */
function initIdentity() {
  const svg = document.getElementById('spring-svg');
  const ball = document.getElementById('identity-ball');
  const ballLabel = document.getElementById('ball-label');
  const springPath = document.getElementById('spring-path');
  const tensionValue = document.getElementById('tension-value');

  if (!svg || !ball) return;

  const anchorX = 40;
  const restX = 200;
  let currentX = restX;
  let isDragging = false;
  let velocity = 0;
  const springK = 0.05;
  const damping = 0.9;

  function updateSpring() {
    // Generate spring coils
    const coils = 5;
    const coilWidth = 20;
    let d = `M${anchorX},100`;
    const len = currentX - anchorX;
    const segmentLen = len / (coils * 2);

    for (let i = 0; i < coils * 2; i++) {
      const x = anchorX + segmentLen * (i + 1);
      const yOffset = (i % 2 === 0 ? -1 : 1) * coilWidth * (1 - (currentX - restX) / 200);
      d += ` Q${x - segmentLen/2},${100 + yOffset} ${x},100`;
    }

    springPath.setAttribute('d', d);
    ball.setAttribute('cx', currentX);
    ballLabel.setAttribute('x', currentX);

    const tension = Math.abs(currentX - restX) / 1.5;
    tensionValue.textContent = Math.round(tension) + '%';
  }

  function animate() {
    if (!isDragging) {
      const force = (restX - currentX) * springK;
      velocity += force;
      velocity *= damping;
      currentX += velocity;
    }
    updateSpring();
    requestAnimationFrame(animate);
  }

  svg.addEventListener('mousedown', (e) => {
    const rect = svg.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 400;
    if (Math.abs(x - currentX) < 30) {
      isDragging = true;
      velocity = 0;
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = svg.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 400;
    currentX = Math.max(60, Math.min(380, x));
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  animate();

  svg.resetFn = () => {
    currentX = restX;
    velocity = 0;
  };
}

/* ------------------------------------------------------------
   PATTERN 9: ENTROPY DEBT (Debt meter)
   ------------------------------------------------------------ */
function initEntropy() {
  const fill = document.getElementById('debt-fill');
  const rateEl = document.getElementById('entropy-rate');
  const generateBtn = document.getElementById('entropy-generate');
  const cleanBtn = document.getElementById('entropy-clean');

  if (!fill) return;

  let entropy = 20;
  let driftRate = 0.5;

  function updateMeter() {
    fill.style.width = entropy + '%';

    fill.classList.remove('warning', 'danger', 'critical');
    if (entropy > 80) fill.classList.add('critical');
    else if (entropy > 60) fill.classList.add('danger');
    else if (entropy > 40) fill.classList.add('warning');
  }

  // Natural drift
  setInterval(() => {
    entropy = Math.min(100, entropy + driftRate);
    updateMeter();

    if (entropy >= 100) {
      rateEl.textContent = '⚠ SYSTEM COLLAPSE - Reset required';
      rateEl.style.color = 'var(--accent-red)';
    }
  }, 1000);

  generateBtn?.addEventListener('click', () => {
    entropy = Math.min(100, entropy + 15);
    driftRate = Math.min(2, driftRate + 0.2);
    rateEl.textContent = `Rate: +${driftRate.toFixed(1)}/sec (accelerating!)`;
    updateMeter();
  });

  cleanBtn?.addEventListener('click', () => {
    entropy = Math.max(0, entropy - 20);
    driftRate = Math.max(0.3, driftRate - 0.1);
    rateEl.textContent = `Rate: +${driftRate.toFixed(1)}/sec (natural drift)`;
    rateEl.style.color = '';
    updateMeter();
  });

  updateMeter();

  fill.resetFn = () => {
    entropy = 20;
    driftRate = 0.5;
    rateEl.textContent = 'Rate: +0.5/sec (natural drift)';
    rateEl.style.color = '';
    updateMeter();
  };
}

/* ------------------------------------------------------------
   PATTERN 10: PERSUASION GRAVITY (Belief magnet)
   ------------------------------------------------------------ */
function initPersuasion() {
  const field = document.getElementById('magnet-field');
  const magnet = document.getElementById('belief-magnet');
  const addBtn = document.getElementById('add-evidence');
  const flipBtn = document.getElementById('toggle-polarity');
  const confirmCount = document.getElementById('confirm-count');
  const disconfirmCount = document.getElementById('disconfirm-count');

  if (!field) return;

  const particles = [];
  let polarity = 1; // 1 = attracts confirming, -1 = attracts disconfirming
  let confirm = 0;
  let disconfirm = 0;

  function addEvidence() {
    const isConfirming = Math.random() > 0.5;
    const particle = document.createElement('div');
    particle.className = `evidence-particle ${isConfirming ? 'confirming' : 'disconfirming'}`;
    particle.dataset.confirming = isConfirming;

    // Random position at edges
    const edge = Math.floor(Math.random() * 4);
    const fieldRect = field.getBoundingClientRect();
    switch(edge) {
      case 0: particle.style.left = Math.random() * 100 + '%'; particle.style.top = '0'; break;
      case 1: particle.style.left = '100%'; particle.style.top = Math.random() * 100 + '%'; break;
      case 2: particle.style.left = Math.random() * 100 + '%'; particle.style.top = '100%'; break;
      case 3: particle.style.left = '0'; particle.style.top = Math.random() * 100 + '%'; break;
    }

    field.appendChild(particle);
    particles.push(particle);

    if (isConfirming) {
      confirm++;
      confirmCount.textContent = confirm;
    } else {
      disconfirm++;
      disconfirmCount.textContent = disconfirm;
    }

    // Animate toward or away from magnet
    setTimeout(() => updateParticlePositions(), 50);
  }

  function updateParticlePositions() {
    particles.forEach(p => {
      const isConfirming = p.dataset.confirming === 'true';
      const attracted = (polarity === 1 && isConfirming) || (polarity === -1 && !isConfirming);

      if (attracted) {
        // Move toward center
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        p.style.left = `calc(50% + ${offsetX}px)`;
        p.style.top = `calc(50% + ${offsetY}px)`;
      } else {
        // Move to edges
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 20;
        p.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
        p.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;
      }
    });
  }

  addBtn?.addEventListener('click', addEvidence);

  flipBtn?.addEventListener('click', () => {
    polarity *= -1;
    magnet.classList.toggle('flipped');
    updateParticlePositions();
  });

  field.resetFn = () => {
    particles.forEach(p => p.remove());
    particles.length = 0;
    polarity = 1;
    magnet.classList.remove('flipped');
    confirm = 0;
    disconfirm = 0;
    confirmCount.textContent = '0';
    disconfirmCount.textContent = '0';
  };
}

/* ------------------------------------------------------------
   PATTERN 11: PROMPT IS POLICY (Rule toggles)
   ------------------------------------------------------------ */
function initPolicy() {
  const toggles = document.getElementById('policy-toggles');
  const preview = document.getElementById('policy-preview');

  if (!toggles) return;

  const rules = {
    external: { on: 'use external data sources', off: 'use internal data only' },
    citations: { on: 'cite sources for all claims', off: 'provide information without citations' },
    length: { on: 'keep responses brief (under 100 words)', off: 'provide detailed responses' },
    formal: { on: 'use formal, professional tone', off: 'use conversational tone' }
  };

  function updatePreview() {
    const behaviors = [];
    toggles.querySelectorAll('input[type="checkbox"]').forEach(input => {
      const rule = input.dataset.rule;
      behaviors.push(input.checked ? rules[rule].on : rules[rule].off);
    });

    preview.textContent = `AI will ${behaviors.slice(0, -1).join(', ')}, and ${behaviors.slice(-1)[0]}.`;
  }

  toggles.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', updatePreview);
  });

  updatePreview();

  toggles.resetFn = () => {
    toggles.querySelectorAll('input[type="checkbox"]').forEach((input, i) => {
      input.checked = i === 1; // Only citations checked by default
    });
    updatePreview();
  };
}

/* ------------------------------------------------------------
   PATTERN 12: FEAR IS A SYSTEMS VARIABLE (Fear dial)
   ------------------------------------------------------------ */
function initFear() {
  const slider = document.getElementById('fear-slider');
  const needle = document.getElementById('fear-needle');
  const output = document.getElementById('fear-output');

  if (!slider || !needle) return;

  const messages = [
    { threshold: 0, text: 'Fear level: Reckless. Moving fast but missing dangers.' },
    { threshold: 30, text: 'Fear level: Low. Confident but should stay alert.' },
    { threshold: 40, text: 'Fear level: Optimal. Ready to learn with appropriate caution.' },
    { threshold: 60, text: 'Fear level: Elevated. Caution increasing, learning slowing.' },
    { threshold: 80, text: 'Fear level: High. Paralysis setting in. Too scared to act.' },
    { threshold: 95, text: 'Fear level: Paralyzed. Unable to engage with AI at all.' }
  ];

  function updateFear(value) {
    // Needle rotation: 0 = -90deg, 100 = 90deg
    const angle = -90 + (value / 100) * 180;
    needle.style.transform = `rotate(${angle}deg)`;

    // Find appropriate message
    let message = messages[0].text;
    for (const m of messages) {
      if (value >= m.threshold) message = m.text;
    }
    output.textContent = message;

    // Color based on zone
    if (value >= 40 && value <= 60) {
      output.style.color = 'var(--accent-green)';
    } else if (value < 30 || value > 70) {
      output.style.color = 'var(--accent-red)';
    } else {
      output.style.color = 'var(--text-muted)';
    }
  }

  slider.addEventListener('input', (e) => updateFear(e.target.value));
  updateFear(50);

  slider.resetFn = () => {
    slider.value = 50;
    updateFear(50);
  };
}

/* ------------------------------------------------------------
   PATTERN 13: SECURITY AI vs AI (Battle simulator)
   ------------------------------------------------------------ */
function initSecurity() {
  const startBtn = document.getElementById('start-battle');
  const pauseBtn = document.getElementById('pause-battle');
  const log = document.getElementById('battle-log');
  const attackHealth = document.getElementById('attack-health');
  const defendHealth = document.getElementById('defend-health');
  const attackScore = document.getElementById('attack-score');
  const defendScore = document.getElementById('defend-score');

  if (!startBtn) return;

  let running = false;
  let intervalId = null;
  let exploits = 0;
  let patches = 0;

  const attackEvents = ['SQL injection found', 'XSS vulnerability', 'Auth bypass attempt', 'Buffer overflow', 'CSRF attack'];
  const defendEvents = ['Patch deployed', 'Firewall updated', 'Input sanitized', 'Auth hardened', 'Rate limiting added'];

  function addEvent(type, text) {
    const event = document.createElement('div');
    event.className = `battle-event ${type}`;
    event.textContent = text;
    log.appendChild(event);
    log.scrollTop = log.scrollHeight;

    // Limit log entries
    if (log.children.length > 20) {
      log.removeChild(log.firstChild);
    }
  }

  function runBattle() {
    const isAttack = Math.random() > 0.45;

    if (isAttack) {
      exploits++;
      attackScore.textContent = exploits;
      attackHealth.style.height = Math.min(100, 20 + exploits * 3) + '%';
      addEvent('attack', '⚔ ' + attackEvents[Math.floor(Math.random() * attackEvents.length)]);
    } else {
      patches++;
      defendScore.textContent = patches;
      defendHealth.style.height = Math.min(100, 20 + patches * 3) + '%';
      addEvent('defend', '🛡 ' + defendEvents[Math.floor(Math.random() * defendEvents.length)]);
    }
  }

  startBtn.addEventListener('click', () => {
    if (running) return;
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    intervalId = setInterval(runBattle, 800);
  });

  pauseBtn.addEventListener('click', () => {
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    clearInterval(intervalId);
  });

  startBtn.resetFn = () => {
    running = false;
    clearInterval(intervalId);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    exploits = 0;
    patches = 0;
    attackScore.textContent = '0';
    defendScore.textContent = '0';
    attackHealth.style.height = '20%';
    defendHealth.style.height = '20%';
    log.innerHTML = '';
  };
}

/* ------------------------------------------------------------
   PATTERN 14: VALUES ARE CONSTRAINTS (Bridge guardrails)
   Real physics simulation with collision detection
   ------------------------------------------------------------ */
function initValues() {
  const toggle = document.getElementById('guardrails-toggle');
  const driveBtn = document.getElementById('drive-agent');
  const agent = document.getElementById('bridge-agent');
  const topRail = document.getElementById('guardrail-top');
  const bottomRail = document.getElementById('guardrail-bottom');
  const output = document.getElementById('values-output');

  if (!toggle || !agent) return;

  // Physics state
  let x = 0;           // Horizontal position (relative to start)
  let y = 0;           // Vertical position (relative to center of road)
  let vx = 0;          // Horizontal velocity
  let vy = 0;          // Vertical velocity (drift)
  let driving = false;
  let animationId = null;
  let bounceCount = 0;
  let fellOff = false;

  // Road boundaries (in local coordinates)
  const roadTop = -10;    // Top guardrail at y = -10
  const roadBottom = 10;  // Bottom guardrail at y = 10
  const roadEnd = 230;    // End of road at x = 230
  const carHeight = 15;
  const carWidth = 30;

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      topRail.classList.remove('hidden');
      bottomRail.classList.remove('hidden');
      output.textContent = 'Guardrails active. Agent constrained to safe path.';
      output.classList.remove('warning');
    } else {
      topRail.classList.add('hidden');
      bottomRail.classList.add('hidden');
      output.textContent = '⚠ Guardrails disabled. Agent can drift off the edge!';
      output.classList.add('warning');
    }
  });

  function updateAgent() {
    // Apply transform - car starts at translate(80, 90) in SVG
    // We offset y from center of road (which is y=0 in our coords, y=97.5 in SVG)
    agent.setAttribute('transform', `translate(${80 + x}, ${90 + y})`);
  }

  function physicsStep() {
    if (!driving || fellOff) return;

    const hasGuardrails = toggle.checked;

    // Move forward
    vx = 2.5;
    x += vx;

    // Random drift (simulating imperfect steering)
    vy += (Math.random() - 0.5) * 0.8;
    vy *= 0.95; // Slight damping
    y += vy;

    // Guardrail collision detection
    if (hasGuardrails) {
      // Top guardrail collision
      if (y < roadTop) {
        y = roadTop;
        vy = Math.abs(vy) * 0.6; // Bounce back down
        bounceCount++;
        output.textContent = `🛡 Bounced off guardrail! (${bounceCount} corrections)`;
        // Add visual feedback
        topRail.style.filter = 'brightness(1.5)';
        setTimeout(() => { topRail.style.filter = ''; }, 150);
      }
      // Bottom guardrail collision
      if (y > roadBottom) {
        y = roadBottom;
        vy = -Math.abs(vy) * 0.6; // Bounce back up
        bounceCount++;
        output.textContent = `🛡 Bounced off guardrail! (${bounceCount} corrections)`;
        // Add visual feedback
        bottomRail.style.filter = 'brightness(1.5)';
        setTimeout(() => { bottomRail.style.filter = ''; }, 150);
      }
    } else {
      // No guardrails - check if drifted off
      if (y < roadTop - 5 || y > roadBottom + 5) {
        fellOff = true;
        output.textContent = '💥 Agent drifted off the road! Values without constraints fail.';
        output.classList.add('warning');
        // Fall animation
        let fallY = y;
        const fallInterval = setInterval(() => {
          fallY += 3;
          agent.setAttribute('transform', `translate(${80 + x}, ${90 + fallY})`);
          if (fallY > 80) {
            clearInterval(fallInterval);
            driving = false;
          }
        }, 30);
        return;
      }
    }

    updateAgent();

    // Check if reached destination
    if (x >= roadEnd) {
      driving = false;
      if (hasGuardrails) {
        output.textContent = `✓ Arrived safely! Guardrails corrected ${bounceCount} drift${bounceCount !== 1 ? 's' : ''}.`;
        output.classList.remove('warning');
      }
      return;
    }

    animationId = requestAnimationFrame(physicsStep);
  }

  driveBtn.addEventListener('click', () => {
    if (driving) return;

    // Reset state
    x = 0;
    y = 0;
    vx = 0;
    vy = (Math.random() - 0.5) * 2; // Random initial drift
    bounceCount = 0;
    fellOff = false;
    driving = true;

    output.textContent = toggle.checked
      ? 'Driving... guardrails will keep agent on track.'
      : '⚠ Driving without guardrails...';

    updateAgent();
    animationId = requestAnimationFrame(physicsStep);
  });

  agent.parentElement.resetFn = () => {
    if (animationId) cancelAnimationFrame(animationId);
    driving = false;
    fellOff = false;
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    bounceCount = 0;
    updateAgent();
    toggle.checked = true;
    topRail.classList.remove('hidden');
    bottomRail.classList.remove('hidden');
    output.textContent = 'Guardrails active. Agent constrained to safe path.';
    output.classList.remove('warning');
  };
}

/* ------------------------------------------------------------
   PATTERN 15: IDENTITY STRESS (Seesaw)
   ------------------------------------------------------------ */
function initStress() {
  const oldSlider = document.getElementById('old-weight-slider');
  const newSlider = document.getElementById('new-weight-slider');
  const plank = document.getElementById('seesaw-plank');
  const leftWeight = document.getElementById('left-weight');
  const rightWeight = document.getElementById('right-weight');
  const balanceDot = document.getElementById('balance-dot');
  const output = document.getElementById('stress-output');

  if (!oldSlider || !newSlider) return;

  function updateSeesaw() {
    const oldVal = parseInt(oldSlider.value);
    const newVal = parseInt(newSlider.value);
    const diff = oldVal - newVal;

    // Tilt: -15deg to +15deg
    const tilt = (diff / 100) * 15;
    plank.style.transform = `rotate(${tilt}deg)`;

    // Move weights with the plank
    const leftY = 130 - tilt * 2;
    const rightY = 130 + tilt * 2;
    leftWeight.style.transform = `translate(80, ${leftY})`;
    rightWeight.style.transform = `translate(260, ${rightY})`;

    // Balance dot color
    const balance = Math.abs(diff);
    if (balance < 20) {
      balanceDot.style.fill = 'var(--accent-green)';
      output.textContent = 'Stress level: Low. Identity in healthy transition.';
    } else if (balance < 50) {
      balanceDot.style.fill = 'var(--accent-cyan)';
      output.textContent = 'Stress level: Moderate. Tension between old and new.';
    } else {
      balanceDot.style.fill = 'var(--accent-red)';
      if (diff > 0) {
        output.textContent = 'Stress level: High. Old identity dominates, resisting change.';
      } else {
        output.textContent = 'Stress level: High. Rushing new identity, losing foundation.';
      }
    }
  }

  oldSlider.addEventListener('input', updateSeesaw);
  newSlider.addEventListener('input', updateSeesaw);
  updateSeesaw();

  oldSlider.resetFn = () => {
    oldSlider.value = 70;
    newSlider.value = 30;
    updateSeesaw();
  };
}

/* ------------------------------------------------------------
   RESET BUTTONS
   ------------------------------------------------------------ */
function initResetButtons() {
  document.querySelectorAll('[data-reset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pattern = btn.dataset.reset;
      const container = btn.closest('.interactive-container');

      // Find and call the reset function for this pattern
      const resetable = container?.querySelector('[id]');
      if (resetable?.resetFn) {
        resetable.resetFn();
      }

      // Also try common reset targets
      const targets = [
        document.getElementById(`${pattern}-field`),
        document.getElementById(`${pattern}-canvas`),
        document.getElementById(`${pattern}-slider`),
        document.getElementById(`${pattern}-dial`),
        document.getElementById(`${pattern}-svg`)
      ];

      targets.forEach(t => {
        if (t?.resetFn) t.resetFn();
      });

      // Visual feedback
      btn.textContent = '✓ Reset';
      setTimeout(() => {
        btn.textContent = '↺ Reset';
      }, 1000);
    });
  });
}

// ============================================================
// SCROLL-TRIGGERED ANIMATIONS
// Uses Intersection Observer for smooth reveal effects
// ============================================================

function initScrollAnimations() {
  // Elements to observe for scroll triggers
  const observeTargets = [
    '.pattern-band',
    '.patterns-map',
    '.patterns-close'
  ];

  const observerOptions = {
    root: null,
    rootMargin: '-50px 0px -50px 0px',
    threshold: [0, 0.1, 0.25]
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        entry.target.classList.add('in-view');

        // Trigger pattern-specific animations
        const patternNum = entry.target.dataset?.pattern;
        if (patternNum) {
          updateActiveChip(patternNum);
        }
      }
    });
  }, observerOptions);

  // Observe all target elements
  observeTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      observer.observe(el);
    });
  });
}

// Update active pattern chip in the navigation
function updateActiveChip(patternNum) {
  // Remove active from all chips
  document.querySelectorAll('.pattern-chip').forEach(chip => {
    chip.classList.remove('pattern-chip--active');
  });

  // Add active to matching chip
  const activeChip = document.querySelector(`.pattern-chip[href="#pattern-${patternNum}"]`);
  if (activeChip) {
    activeChip.classList.add('pattern-chip--active');
  }
}

// ============================================================
// SCROLL PROGRESS INDICATOR
// Shows reading progress through the patterns
// ============================================================

function initScrollProgress() {
  // Create progress bar if it doesn't exist
  let progressContainer = document.querySelector('.patterns-progress');
  if (!progressContainer) {
    progressContainer = document.createElement('div');
    progressContainer.className = 'patterns-progress';
    progressContainer.innerHTML = '<div class="patterns-progress__bar"></div>';
    document.body.appendChild(progressContainer);
  }

  const progressBar = progressContainer.querySelector('.patterns-progress__bar');

  // Update progress on scroll
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${Math.min(100, scrollPercent)}%`;
  }

  // Throttled scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial update
  updateProgress();
}

// ============================================================
// PATTERN BAND DATA ATTRIBUTES
// Auto-add data-pattern attributes based on section IDs
// ============================================================

function initPatternAttributes() {
  document.querySelectorAll('.pattern-band').forEach((band, index) => {
    // Add data-pattern attribute
    const patternNum = index + 1;
    band.dataset.pattern = patternNum;

    // Add id for anchor linking if not present
    if (!band.id) {
      band.id = `pattern-${patternNum}`;
    }
  });
}

// ============================================================
// ENHANCED INITIALIZATION
// ============================================================

// Add to existing DOMContentLoaded or create new one
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancements);
} else {
  initEnhancements();
}

function initEnhancements() {
  initPatternAttributes();
  initScrollAnimations();
  initScrollProgress();

  // Add smooth scroll for pattern chip links
  document.querySelectorAll('.pattern-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const href = chip.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}
