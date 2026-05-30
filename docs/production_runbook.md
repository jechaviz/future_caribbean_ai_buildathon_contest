# Production Runbook

## Local demo

```powershell
v -path "C:/git/v_projects/lib|@vlib|@vmodules" run C:/git/v_projects/future_caribbean_ai_buildathon/cmd/fcbuild -- serve --site C:/git/websites/future_caribbean_ai_buildathon
```

## Generate packet

```powershell
v -path "C:/git/v_projects/lib|@vlib|@vmodules" run C:/git/v_projects/future_caribbean_ai_buildathon/cmd/fcbuild -- generate
```

## Sync applicant profile

```powershell
v -path "C:/git/v_projects/lib|@vlib|@vmodules" run C:/git/v_projects/future_caribbean_ai_buildathon/cmd/fcbuild -- profile-sync
```

## Dry-run application

```powershell
v -path "C:/git/v_projects/lib|@vlib|@vmodules" run C:/git/v_projects/future_caribbean_ai_buildathon/cmd/fcbuild -- form --dry-run --allow-placeholders
```

## Submit gate

Only submit after replacing personal placeholders, adding a real Loom URL and setting `APPLICATION_CONSENT_TO_SUBMIT=yes`.