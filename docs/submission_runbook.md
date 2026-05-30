# Submission Runbook

## 1. Personalize answers

Copy the template locally:

```powershell
Copy-Item application/future_caribbean.answers.template.json application/future_caribbean.answers.local.json
```

Edit only the local file and replace:

- `REPLACE_WITH_FULL_NAME`
- `REPLACE_WITH_EMAIL`
- `REPLACE_WITH_WHATSAPP_WITH_COUNTRY_CODE`
- `REPLACE_WITH_PORTFOLIO_OR_DEMO_URL`
- `REPLACE_WITH_LOOM_VIDEO_URL`
- Any optional profile or team placeholders.

## 2. Validate without sending

Generate ignored local answers from the private profile:

```powershell
C:\git\v_projects\future_caribbean_ai_buildathon\bin\fcbuild.exe profile-sync
```

```powershell
C:\git\v_projects\future_caribbean_ai_buildathon\bin\fcbuild.exe form --answers application/future_caribbean.answers.local.json --dry-run
```

The script writes a redacted preview to:

```text
evidence/application_payload_preview.json
```

## 3. Submit only after final approval

```powershell
$env:APPLICATION_CONSENT_TO_SUBMIT='yes'
C:\git\v_projects\future_caribbean_ai_buildathon\bin\fcbuild.exe form --answers application/future_caribbean.answers.local.json --submit
```

The V CLI posts the same Netlify form fields used by the official application
form. If the POST fails, use the official browser form at
https://futurecaribbean.com/apply and paste the answers from the local JSON.

## Submission gate

Do not submit with placeholder identity data or without a real Loom URL.
