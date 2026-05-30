# Veloclaw Agent Plan

## Goal

Use the local agent ecosystem to keep the Future Caribbean package application
ready without turning the flow into an unsafe auto-submit.

## Agent Capsule

- Name: `future_caribbean_ai_buildathon_application`
- Runtime: `veloclaw` for Git-aware planning and status, `vimport` for public
  application-page evidence, `waibav` for guarded browser/form automation.
- Primary repo: `C:/git/v_projects/contests/worth_it/future_caribbean_ai_buildathon`
- Product tools: `C:/git/v_projects/future_caribbean_ai_buildathon`
- Website: `C:/git/websites/future_caribbean_ai_buildathon`

## Autonomy Rules

- Generate and validate evidence automatically.
- Use `profile-sync` for ignored local answers.
- Never commit PII local answers or raw credentials.
- Use `jesus.cgalaviz@gmail.com` only for account flows explicitly required by
  the target portal.
- Stop for CAPTCHA, MFA, terms changes, legal consent, payments, or final
  external submit.

## Current Blockers

- Loom video URL.
- Optional manual review of legal consent before final submit.

## Receipts

- `evidence/vimport_future_caribbean_apply.json`
- `evidence/application_payload_preview_v.json`
- `automation/waiba/future_caribbean_submission_gate.playbook.yml`
