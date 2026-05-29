import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));

const FIELD_ORDER = [
  "form-name",
  "bot-field",
  "full_name",
  "preferred_name",
  "email",
  "phone",
  "country",
  "nationality",
  "linkedin",
  "twitter",
  "github",
  "website",
  "discord_username",
  "whatsapp",
  "current_role",
  "current_company",
  "years_experience",
  "primary_skillset",
  "secondary_skillsets",
  "tech_stack",
  "ai_experience",
  "hackathon_experience",
  "startup_experience",
  "track",
  "track_reason",
  "real_world_problem",
  "proposed_solution",
  "why_it_matters",
  "five_year_vision",
  "applying_as",
  "team_name",
  "team_members_roles",
  "team_matching",
  "teammate_types",
  "international_collab",
  "continue_after",
  "tools_planned",
  "tools_experience",
  "compute_needed",
  "compute_intensity",
  "external_datasets",
  "dataset_details",
  "sensitive_data",
  "sensitive_data_details",
  "loom_video_link",
  "full_commitment",
  "hours_per_week",
  "available_live",
  "travel_barbados",
  "raised_funding",
  "interested_startup",
  "interested_incubation",
  "additional_info",
  "agree_rules",
  "consent_sharing",
  "consent_contact",
  "understand_no_guarantee"
];

const REQUIRED = [
  "full_name",
  "email",
  "country",
  "whatsapp",
  "primary_skillset",
  "ai_experience",
  "track",
  "track_reason",
  "real_world_problem",
  "proposed_solution",
  "why_it_matters",
  "applying_as",
  "loom_video_link",
  "full_commitment",
  "agree_rules",
  "consent_sharing",
  "consent_contact",
  "understand_no_guarantee"
];

const REDACT = new Set([
  "full_name",
  "preferred_name",
  "email",
  "phone",
  "linkedin",
  "twitter",
  "github",
  "website",
  "discord_username",
  "whatsapp",
  "team_members_roles"
]);

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

const answersPath = resolve(ROOT, args.answers || "application/future_caribbean.answers.template.json");
const target = args.target || "https://futurecaribbean.com/";
const dryRun = args["dry-run"] || !args.submit;
const allowPlaceholders = Boolean(args["allow-placeholders"]);
const answers = JSON.parse(readFileSync(answersPath, "utf8"));
const payload = buildPayload(answers);
const validation = validatePayload(payload, allowPlaceholders);

mkdirSync(join(ROOT, "evidence"), { recursive: true });
writeFileSync(
  join(ROOT, "evidence/application_payload_preview.json"),
  JSON.stringify({ target, dryRun, validation, payload: redactPayload(payload) }, null, 2)
);

if (validation.blockers.length > 0) {
  console.log("Application payload is not submit-ready.");
  validation.blockers.forEach((item) => console.log(`- ${item}`));
  console.log("Preview written to evidence/application_payload_preview.json");
  process.exit(dryRun ? 0 : 2);
}

if (dryRun) {
  console.log("Dry-run passed. Preview written to evidence/application_payload_preview.json");
  process.exit(0);
}

if (process.env.APPLICATION_CONSENT_TO_SUBMIT !== "yes") {
  console.error("Blocked: set APPLICATION_CONSENT_TO_SUBMIT=yes for a real external submission.");
  process.exit(3);
}

const response = await fetch(target, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams(payload).toString()
});

const receipt = {
  target,
  status: response.status,
  ok: response.ok,
  submittedAt: new Date().toISOString(),
  payload: redactPayload(payload)
};
const receiptPath = join(ROOT, `evidence/submission_receipt_${Date.now()}.json`);
writeFileSync(receiptPath, JSON.stringify(receipt, null, 2));

if (!response.ok) {
  console.error(`Submission returned HTTP ${response.status}. Receipt: ${receiptPath}`);
  process.exit(4);
}

console.log(`Submission completed. Receipt: ${receiptPath}`);

function buildPayload(answers) {
  const payload = {};
  for (const field of FIELD_ORDER) {
    if (field === "form-name") {
      payload[field] = "buildathon-registration";
      continue;
    }
    if (field === "bot-field") {
      payload[field] = "";
      continue;
    }
    const value = answers[field];
    if (Array.isArray(value)) {
      payload[field] = value.join(", ");
    } else if (value === undefined || value === null) {
      payload[field] = "";
    } else {
      payload[field] = String(value).trim();
    }
  }
  return payload;
}

function validatePayload(payload, allowPlaceholders) {
  const blockers = [];
  for (const field of REQUIRED) {
    if (!payload[field]) {
      blockers.push(`Missing required field: ${field}`);
    }
  }
  for (const [field, value] of Object.entries(payload)) {
    if (!allowPlaceholders && isPlaceholder(value)) {
      blockers.push(`Placeholder still present: ${field}`);
    }
  }
  if (payload.loom_video_link && !(allowPlaceholders && isPlaceholder(payload.loom_video_link)) && !/^https?:\/\//.test(payload.loom_video_link)) {
    blockers.push("Loom video link must be a URL.");
  }
  if (payload.email && !(allowPlaceholders && isPlaceholder(payload.email)) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    blockers.push("Email is not valid.");
  }
  return { blockers };
}

function isPlaceholder(value) {
  return /^REPLACE_WITH/i.test(String(value || ""));
}

function redactPayload(payload) {
  return Object.fromEntries(
    Object.entries(payload).map(([field, value]) => [field, REDACT.has(field) && value ? "[redacted]" : value])
  );
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) {
      continue;
    }
    const key = item.slice(2);
    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      parsed[key] = next;
      index += 1;
    } else {
      parsed[key] = true;
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage:
node scripts/fill_future_caribbean_application.mjs --answers application/future_caribbean.answers.local.json --dry-run
APPLICATION_CONSENT_TO_SUBMIT=yes node scripts/fill_future_caribbean_application.mjs --answers application/future_caribbean.answers.local.json --submit

The script posts Netlify form fields for the official Future Caribbean application.
Default mode is dry-run. Real submit is blocked unless APPLICATION_CONSENT_TO_SUBMIT=yes.`);
}
