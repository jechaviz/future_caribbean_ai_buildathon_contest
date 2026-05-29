const state = {
  scenario: "hurricane",
  mode: "response",
  channels: ["Emergency Ops", "Port Authority", "Hotel Desk", "Supplier Network"]
};

const scenarios = {
  hurricane: {
    title: "Hurricane logistics",
    situation: "A Category 2 storm path is disrupting ferry movement, airport transfers and pharmacy restock windows across three islands.",
    decision: "Prioritize safe passenger movement, critical medicine delivery and trusted partner briefings before the next advisory cycle.",
    impact: { time: "18h", tasks: 12, partners: 8, confidence: 87 },
    nodes: [
      { name: "Bridgetown", x: 690, y: 342, status: "warn" },
      { name: "Port of Spain", x: 590, y: 414, status: "ok" },
      { name: "Kingston", x: 255, y: 250, status: "hot" },
      { name: "Castries", x: 650, y: 300, status: "warn" },
      { name: "Miami hub", x: 150, y: 90, status: "ok" }
    ],
    tasks: [
      ["Verify ferry suspension windows", "Port Authority", "2h", "Cross-check advisories with operators and publish one shared cutoff table."],
      ["Route insulin stock to eastern clinics", "Supplier Network", "4h", "Match pharmacy demand, vehicle availability and generator-backed cold storage."],
      ["Publish visitor transfer plan", "Hotel Desk", "5h", "Create hotel-facing plan with transport alternatives and escalation contacts."],
      ["Prepare 12h public brief", "Emergency Ops", "6h", "Summarize actions, open decisions, evidence links and partner asks."]
    ]
  },
  port: {
    title: "Port medical delay",
    situation: "A customs hold and crew shortage have delayed a container with dialysis consumables while clinics report two-day stock cover.",
    decision: "Separate regulatory, logistics and clinical blockers so each owner can clear a specific dependency with evidence.",
    impact: { time: "22h", tasks: 9, partners: 6, confidence: 84 },
    nodes: [
      { name: "Freeport", x: 300, y: 158, status: "hot" },
      { name: "Nassau", x: 365, y: 195, status: "warn" },
      { name: "Santo Domingo", x: 404, y: 260, status: "ok" },
      { name: "San Juan", x: 520, y: 258, status: "warn" },
      { name: "Miami hub", x: 150, y: 90, status: "ok" }
    ],
    tasks: [
      ["Assemble release packet", "Port Authority", "3h", "Attach bill of lading, clinic demand letter and temperature-control notes."],
      ["Find temporary clinic swap", "Supplier Network", "4h", "Locate clinics with surplus consumables and confirm transfer approvals."],
      ["Escalate crew slot", "Emergency Ops", "6h", "Identify available bonded drivers and prioritize medical shipment handling."],
      ["Create insurer memo", "Hotel Desk", "8h", "Package impact and continuity notes for payers and clinical leadership."]
    ]
  },
  shelter: {
    title: "Shelter surge",
    situation: "Flooding has moved 1,800 people into shelters while volunteer intake, cots, meals and transport requests are arriving in separate channels.",
    decision: "Turn incoming messages into a single demand picture, route urgent gaps and keep agencies aligned with frequent status briefs.",
    impact: { time: "14h", tasks: 16, partners: 11, confidence: 89 },
    nodes: [
      { name: "Belize City", x: 210, y: 288, status: "warn" },
      { name: "Montego Bay", x: 292, y: 236, status: "ok" },
      { name: "Kingston", x: 255, y: 250, status: "warn" },
      { name: "Santo Domingo", x: 404, y: 260, status: "hot" },
      { name: "Bridgetown", x: 690, y: 342, status: "ok" }
    ],
    tasks: [
      ["Normalize shelter intake", "Emergency Ops", "2h", "Merge headcount, meal counts and medical flags into one verified table."],
      ["Assign transport pickups", "Hotel Desk", "3h", "Use available vans and safe routes to clear priority pickup requests."],
      ["Restock meals and hygiene kits", "Supplier Network", "5h", "Pair shelter demand with nearby suppliers and NGO stock rooms."],
      ["Generate donor needs brief", "Port Authority", "7h", "Publish itemized asks with location, urgency, evidence and responsible owner."]
    ]
  }
};

const modes = {
  response: {
    label: "24h response",
    lens: "Act on immediate blockers, surface decisions and publish a shared brief every six hours."
  },
  stabilize: {
    label: "72h stabilization",
    lens: "Move from triage to repeatable partner cadence, replenishment windows and exception tracking."
  },
  deploy: {
    label: "3w deployment",
    lens: "Convert the response workflow into a production pilot with integrations, audit trails and partner onboarding."
  }
};

const pitchText = [
  "Caribbean Coordination Desk is an agentic operating layer for disaster and climate coordination in fragmented island markets.",
  "The first wedge is hurricane logistics: the desk ingests alerts, partner updates, inventories and open requests, then creates verified tasks, owner assignments and public-ready briefs.",
  "The business is B2B SaaS plus deployment support for hotels, ports, insurers, utilities, NGOs and emergency operators.",
  "In five years this can become the coordination fabric for Caribbean resilience: a trusted workflow network where critical movement, supplies and decisions clear faster."
].join("\n\n");

const elements = {
  canvas: document.getElementById("coordination-map"),
  brief: document.getElementById("brief-copy"),
  taskList: document.getElementById("task-list"),
  time: document.getElementById("metric-time"),
  tasks: document.getElementById("metric-tasks"),
  partners: document.getElementById("metric-partners"),
  confidence: document.getElementById("metric-confidence"),
  readiness: document.getElementById("readiness-score")
};

function activeScenario() {
  return scenarios[state.scenario];
}

function activeMode() {
  return modes[state.mode];
}

function renderMetrics() {
  const impact = activeScenario().impact;
  const channelModifier = Math.max(0, state.channels.length - 2);
  elements.time.textContent = impact.time;
  elements.tasks.textContent = String(impact.tasks + channelModifier);
  elements.partners.textContent = String(impact.partners + state.channels.length);
  elements.confidence.textContent = `${Math.min(96, impact.confidence + channelModifier)}%`;
  elements.readiness.textContent = String(92 + Math.min(4, state.channels.length));
}

function renderBrief() {
  const scenario = activeScenario();
  const mode = activeMode();
  const channelText = state.channels.join(", ");
  elements.brief.innerHTML = [
    briefBlock("Situation", scenario.situation),
    briefBlock("Decision", scenario.decision),
    briefBlock("Operating lens", `${mode.label}: ${mode.lens}`),
    briefBlock("Active channels", channelText || "No partner channel selected."),
    briefBlock("Investor signal", "The same workflow becomes a paid coordination layer for hotels, ports, insurers, utilities and regional operators.")
  ].join("");
}

function briefBlock(title, text) {
  return `<section><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></section>`;
}

function renderTasks() {
  const tasks = activeScenario().tasks.map((task, index) => {
    const [title, owner, eta, detail] = task;
    return `<article class="task-card">
      <div class="task-priority">${index + 1}</div>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <span class="task-meta">${escapeHtml(owner)}</span>
        <p>${escapeHtml(detail)}</p>
      </div>
      <div class="task-eta">${escapeHtml(eta)}</div>
    </article>`;
  });

  if (state.channels.length < 4) {
    tasks.push(`<article class="task-card">
      <div class="task-priority">!</div>
      <div>
        <h3>Close missing partner channel</h3>
        <span class="task-meta">Coordination Desk</span>
        <p>Restore the inactive partner stream or mark the channel out of scope for audit clarity.</p>
      </div>
      <div class="task-eta">1h</div>
    </article>`);
  }

  elements.taskList.innerHTML = tasks.join("");
}

function drawMap() {
  const canvas = elements.canvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const scenario = activeScenario();
  const statusColor = {
    hot: "#c85245",
    warn: "#b98217",
    ok: "#31724d"
  };

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#eef3f0";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(33, 95, 154, 0.18)";
  ctx.lineWidth = 1;
  for (let x = 40; x < width; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 30);
    ctx.lineTo(x, height - 30);
    ctx.stroke();
  }
  for (let y = 40; y < height; y += 70) {
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(width - 30, y);
    ctx.stroke();
  }

  drawIsland(ctx, 245, 252, 72, 26, "#d9e6de");
  drawIsland(ctx, 408, 260, 82, 30, "#d9e6de");
  drawIsland(ctx, 514, 256, 54, 23, "#d9e6de");
  drawIsland(ctx, 650, 305, 78, 34, "#d9e6de");
  drawIsland(ctx, 688, 342, 58, 24, "#d9e6de");
  drawIsland(ctx, 300, 158, 76, 25, "#d9e6de");
  drawIsland(ctx, 214, 288, 78, 34, "#d9e6de");

  const hub = scenario.nodes[0];
  scenario.nodes.slice(1).forEach((node) => {
    ctx.beginPath();
    ctx.moveTo(hub.x, hub.y);
    ctx.lineTo(node.x, node.y);
    ctx.strokeStyle = "rgba(15, 109, 106, 0.35)";
    ctx.lineWidth = 3;
    ctx.stroke();
  });

  scenario.nodes.forEach((node) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = statusColor[node.status];
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
    ctx.stroke();

    ctx.fillStyle = "#172126";
    ctx.font = "700 16px Inter, sans-serif";
    ctx.fillText(node.name, node.x + 21, node.y + 5);
  });

  ctx.fillStyle = "rgba(23, 33, 38, 0.78)";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText(scenario.title, 30, 42);
}

function drawIsland(ctx, x, y, rx, ry, fill) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, -0.12, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = "rgba(15, 109, 106, 0.16)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function syncControls() {
  document.querySelectorAll("[data-scenario]").forEach((button) => {
    const active = button.dataset.scenario === state.scenario;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === state.mode);
  });

  document.querySelectorAll(".channel-set input").forEach((input) => {
    input.checked = state.channels.includes(input.value);
  });
}

function render() {
  syncControls();
  renderMetrics();
  renderBrief();
  renderTasks();
  drawMap();
}

function exportBrief() {
  const scenario = activeScenario();
  const mode = activeMode();
  const taskText = scenario.tasks
    .map((task, index) => `${index + 1}. ${task[0]} - ${task[1]} - ETA ${task[2]}\n   ${task[3]}`)
    .join("\n");

  const content = [
    "Caribbean Coordination Desk",
    `Scenario: ${scenario.title}`,
    `Mode: ${mode.label}`,
    "",
    `Situation: ${scenario.situation}`,
    `Decision: ${scenario.decision}`,
    `Channels: ${state.channels.join(", ")}`,
    "",
    "Prioritized tasks:",
    taskText,
    "",
    "Pitch:",
    pitchText
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "caribbean-coordination-desk-brief.txt";
  link.click();
  URL.revokeObjectURL(url);
  toast("Brief exported");
}

async function copyPitch() {
  try {
    await navigator.clipboard.writeText(pitchText);
    toast("Pitch copied");
  } catch {
    toast("Clipboard unavailable");
  }
}

function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) {
    existing.remove();
  }
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  window.setTimeout(() => node.remove(), 2200);
}

document.querySelectorAll("[data-scenario]").forEach((button) => {
  button.addEventListener("click", () => {
    state.scenario = button.dataset.scenario;
    render();
  });
});

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    render();
  });
});

document.querySelectorAll(".channel-set input").forEach((input) => {
  input.addEventListener("change", () => {
    state.channels = Array.from(document.querySelectorAll(".channel-set input:checked")).map((item) => item.value);
    render();
  });
});

document.querySelector('[data-action="export-brief"]').addEventListener("click", exportBrief);
document.querySelector('[data-action="copy-pitch"]').addEventListener("click", copyPitch);

window.addEventListener("resize", drawMap);
render();
