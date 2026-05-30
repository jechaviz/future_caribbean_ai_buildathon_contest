# Task - Future Caribbean Global AI Buildathon Prod 100 Application

## Goal

Prepare a production-ready application package for the Future Caribbean Global
AI Buildathon under internal track `ai_startup_pitch`, with a deployable demo,
startup pitch, official application draft, evidence, checklist and risk plan.

## Chosen Product

`Caribbean T0 Resilience Network` is agentic coordination infrastructure for
climate risk and disaster response in fragmented Caribbean markets. The promise:
compress hours of calls into minutes of verified tasks, approvals and briefs.

## Chosen Track

- Internal track: `ai_startup_pitch`
- Official Future Caribbean track: `04 - Climate Risk & Disaster Coordination`

## Prod 100 Definition

- Demo runs as Vue3 CDN + SFC + UnoCSS from
  `C:\git\websites\future_caribbean_ai_buildathon`.
- Demo is deployed to GitHub Pages and can also run on Netlify, Vercel or any
  static host.
- Vlang product CLI generates datasets, application payload previews and QA.
- Application answers are mapped to the official form fields.
- External submission automation is dry-run by default and gated for real submit.
- Evidence records official requirements, local checks and remaining blockers.
- Pitch and three-week plan are coherent with T=0, paid pilots and deployable
  infrastructure criteria.

## Acceptance Criteria

- `fcbuild.exe serve --site C:\git\websites\future_caribbean_ai_buildathon`
  opens the operational demo.
- `fcbuild.exe qa` passes.
- `fcbuild.exe form --dry-run --allow-placeholders` creates a redacted payload
  preview.
- Docs cover track, demo, 3-week plan, pitch, evidence, checklist and risks.
- Real external submit is blocked until personal identity fields and Loom link
  are provided by the applicant.

## Current Status

Ready for Loom recording and explicit final-submit approval.
