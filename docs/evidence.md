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

- Demo: `index.html`
- App logic: `src/app.js`
- App styling: `src/styles.css`
- Deployment config: `netlify.toml`, `vercel.json`
- Application answers: `application/future_caribbean.answers.template.json`
- Automation: `scripts/fill_future_caribbean_application.mjs`

## Verification log

Completed on 2026-05-29:

- `npm run qa:smoke` passed.
- `npm run form:dry-run` passed and wrote
  `evidence/application_payload_preview.json`.
- Chrome headless captured `evidence/demo-desktop.png`.
- Chrome headless captured `evidence/demo-mobile.png`.
- Screenshot pixel sanity check:
  - Desktop: 1440x1000, 49 sampled unique colors.
  - Mobile: 390x1100, 28 sampled unique colors.

## Known blockers before real submission

- Replace applicant identity placeholders.
- Add a real website/demo URL if deployed externally.
- Record and paste a 2 to 5 minute Loom video.
- Confirm legal consent choices are correct for the applicant.
