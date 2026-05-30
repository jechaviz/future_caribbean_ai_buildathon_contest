# Future Caribbean Global AI Buildathon

Tag: `worth_it`
Track interno: `ai_startup_pitch`
Track oficial elegido: `04 - Climate Risk & Disaster Coordination`

Producto: `Caribbean Coordination Desk`

Demo deployable: `C:\git\websites\future_caribbean_ai_buildathon`
Demo publico: https://jechaviz.github.io/future_caribbean_ai_buildathon_web/

Producto/agentes/datasets/QA en Vlang:
`C:\git\v_projects\future_caribbean_ai_buildathon`

Core reusable:
`C:\git\v_projects\lib\fc_coordination_core`

Repos:

- Contest packet: https://github.com/jechaviz/future_caribbean_ai_buildathon_contest
- V product tools: https://github.com/jechaviz/future_caribbean_ai_buildathon
- Vue demo: https://github.com/jechaviz/future_caribbean_ai_buildathon_web

## Entregables

- Tarea principal: `TASK.md`
- Track elegido: `docs/track_selection.md`
- Plan de 3 semanas: `docs/three_week_plan.md`
- Pitch: `docs/pitch.md`
- Application draft: `docs/application_draft.md`
- Evidencia: `docs/evidence.md`
- Checklist prod 100: `docs/checklist.md`
- Riesgos: `docs/risks.md`
- Automatizacion de formulario: `fcbuild form` en Vlang
- Respuestas base: `application/future_caribbean.answers.template.json`
- Respuestas generadas: `application/future_caribbean.answers.generated.json`

## Comandos

```powershell
C:\git\v_projects\future_caribbean_ai_buildathon\bin\fcbuild.exe generate
C:\git\v_projects\future_caribbean_ai_buildathon\bin\fcbuild.exe qa
C:\git\v_projects\future_caribbean_ai_buildathon\bin\fcbuild.exe form --dry-run --allow-placeholders
C:\git\v_projects\future_caribbean_ai_buildathon\bin\fcbuild.exe serve --site C:\git\websites\future_caribbean_ai_buildathon
```

`form --dry-run` no envia nada externo. Para submit real se requiere completar
datos personales, link Loom real y ejecutar `form --submit` con
`APPLICATION_CONSENT_TO_SUBMIT=yes`.

## Por que vale

Future Caribbean pide sistemas deployables para economias reales. Esta entrega
posiciona una consola de coordinacion operacional que reduce retrasos entre
alertas, recursos, partners y decisiones durante eventos climaticos y
disrupciones regionales.
