# Evidence

## Official source check

Verified on 2026-05-29:

- Official site: https://futurecaribbean.com/
- Application page: https://futurecaribbean.com/apply
- The site states the buildathon selects 40 teams across 10 challenge tracks.
- The site positions the event around deployable AI systems for real-world
  coordination problems, not isolated demos.
- The application page asks for track, problem, solution, why it matters,
  five-year vision, tools, compute, datasets, sensitive data, Loom video and
  legal consent.
- The application HTML metadata observed locally says applications close on
  June 10, 2026. The success message says selected teams are emailed by June 17.

## Local artifacts

- Demo: `C:\git\websites\future_caribbean_ai_buildathon`
- Public demo: https://jechaviz.github.io/future_caribbean_ai_buildathon_web/
- App stack: Vue3 CDN + SFC + UnoCSS runtime
- App data: `C:\git\websites\future_caribbean_ai_buildathon\src\data`
- V product CLI: `C:\git\v_projects\future_caribbean_ai_buildathon`
- V reusable core: `C:\git\v_projects\lib\fc_coordination_core`
- Deployment config: website `netlify.toml`, `vercel.json`
- Application answers: `application/future_caribbean.answers.template.json`
- Automation: `scripts/fill_future_caribbean_application.mjs`

## Verification log

Completed on 2026-05-29, v0.8 legacy static slice:

- `npm run qa:smoke` passed.
- `npm run form:dry-run` passed and wrote
  `evidence/application_payload_preview.json`.
- Chrome headless captured `evidence/demo-desktop.png`.
- Chrome headless captured `evidence/demo-mobile.png`.
- Screenshot pixel sanity check:
  - Desktop: 1440x1000, 49 sampled unique colors.
  - Mobile: 390x1100, 28 sampled unique colors.

Completed on 2026-05-29, v0.9 Vue/Vlang product slice:

- `fcbuild.exe generate` passed and wrote generated answers, runbooks,
  website data and readiness evidence.
- `fcbuild.exe qa` passed line caps across V, Vue, JS, CSS, HTML, Markdown and
  JSON source files.
- `fcbuild.exe form --dry-run --allow-placeholders` passed and wrote
  `evidence/application_payload_preview_v.json`.
- Edge headless captured website screenshots:
  - `C:\git\websites\future_caribbean_ai_buildathon\evidence\vue-desktop.png`
  - `C:\git\websites\future_caribbean_ai_buildathon\evidence\vue-mobile.png`
  - `C:\git\websites\future_caribbean_ai_buildathon\evidence\vue-public-desktop.png`
- Screenshot pixel sanity check:
  - Desktop: 1440x1000, 83 sampled unique colors.
  - Mobile: 390x1100, 58 sampled unique colors.
- GitHub Pages returned HTTP 200 for the public demo URL.
- `vimport` generated official application-page evidence at
  `evidence/vimport_future_caribbean_apply.json`.
- WAIBA submission gate playbook prepared at
  `automation/waiba/future_caribbean_submission_gate.playbook.yml`.
- Public demo now includes a judge-mode readout and Loom recording structure.
- Loom recording script prepared at `docs/loom_video_script.md`.

## Known blockers before real submission

- Replace applicant identity placeholders.
- Add a real website/demo URL if deployed externally.
- Record and paste a 2 to 5 minute Loom video.
- Confirm legal consent choices are correct for the applicant.
