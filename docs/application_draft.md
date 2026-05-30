# Application Draft

Use `application/future_caribbean.answers.template.json` as the source of truth
for automation. Replace personal placeholders and add the final Loom URL before
submitting.

## Track

`04 - Climate Risk & Disaster Coordination`

## Demo URL

https://jechaviz.github.io/future_caribbean_ai_buildathon_web/

## Why this track

I chose Climate Risk & Disaster Coordination because it is the clearest place to
prove FutureCaribbean's T=0 thesis. Hurricanes, floods and logistics disruption
create expensive coordination lag across hotels, ports, clinics, insurers, NGOs
and emergency teams. A deployable agentic network can compress hours of calls
into verified decisions, owners, ETAs and stakeholder briefs.

## Real-world problem

During hurricanes, floods and port disruptions, critical operators coordinate
through calls, WhatsApp threads, email and spreadsheets. The region is not
small; it is fragmented. The economic drag is the gap between when a decision
should happen and when it clears across agencies, suppliers, hotels, ports and
funders.

## Proposed solution

Caribbean T0 Resilience Network is an agentic coordination layer for climate and
disaster operations. It ingests public advisories, partner updates, inventories
and requests; normalizes them into incident events; scores urgency and economic
drag; creates owner-led tasks with evidence; and drafts briefs that stay behind
human approval gates. The demo shows the cockpit, agent trace, impact economics
and paid-pilot deal room.

## Why it matters

Reducing coordination time protects lives, tourism revenue, medical continuity,
donor trust and regional economic resilience. If the Caribbean can compress
disaster coordination from hours to minutes, the same operating model can become
exportable infrastructure for other island and emerging markets.

## Five-year vision

In five years, Caribbean T0 Resilience Network can become the trusted
coordination fabric for Caribbean resilience: a SaaS and deployment network used
by hotels, ports, insurers, utilities, NGOs, donors and emergency operators to
clear decisions faster across fragmented markets.

## Tools and data

Vlang coordination core, Vue3 CDN + SFC + UnoCSS cockpit, OpenClaw-compatible
agent workflow design, public/synthetic datasets, messaging/email connectors,
vector search and LLM APIs.

Initial build uses public and non-sensitive data: National Hurricane Center
advisories, public weather feeds, open map layers, public port/airport status
where available and synthetic partner inventories. Production pilots would use
partner-provided operational data under explicit agreements.
