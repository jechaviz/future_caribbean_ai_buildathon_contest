import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const required = [
  "index.html",
  "src/styles.css",
  "src/app.js",
  "TASK.md",
  "docs/track_selection.md",
  "docs/three_week_plan.md",
  "docs/pitch.md",
  "docs/evidence.md",
  "docs/checklist.md",
  "docs/risks.md",
  "application/future_caribbean.answers.template.json",
  "scripts/fill_future_caribbean_application.mjs",
  "netlify.toml",
  "vercel.json"
];

const failures = [];

for (const relativePath of required) {
  if (!existsSync(join(root, relativePath))) {
    failures.push(`Missing ${relativePath}`);
  }
}

const index = readFileSync(join(root, "index.html"), "utf8");
const styles = readFileSync(join(root, "src/styles.css"), "utf8");
const app = readFileSync(join(root, "src/app.js"), "utf8");

if (!index.includes("Climate Risk & Disaster Coordination")) {
  failures.push("Index does not state selected official track.");
}
if (!index.includes("coordination-map")) {
  failures.push("Demo map surface missing.");
}
if (!app.includes("hurricane") || !app.includes("copyPitch") || !app.includes("exportBrief")) {
  failures.push("Interactive demo logic incomplete.");
}
if (/TODO|FIXME/.test(index + styles + app)) {
  failures.push("Found TODO/FIXME markers.");
}
if (/letter-spacing\s*:\s*-/.test(styles)) {
  failures.push("CSS contains negative letter-spacing.");
}

execFileSync(process.execPath, ["--check", join(root, "src/app.js")], { stdio: "pipe" });
execFileSync(process.execPath, ["--check", join(root, "scripts/fill_future_caribbean_application.mjs")], { stdio: "pipe" });

if (failures.length > 0) {
  console.error("Smoke failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Smoke passed: demo, docs, deployment config and automation entrypoints are present.");
