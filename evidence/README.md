# Evidence Folder

Generated local evidence lives here during preparation.

Current generated files, ignored by git:

- `demo-desktop.png`
- `demo-mobile.png`
- `application_payload_preview.json`

Regenerate:

```powershell
npm run qa:smoke
npm run form:dry-run
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --disable-gpu --hide-scrollbars --window-size=1440,1000 --virtual-time-budget=1500 --screenshot='evidence\demo-desktop.png' 'file:///C:/git/v_projects/contests/worth_it/future_caribbean_ai_buildathon/index.html'
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --disable-gpu --hide-scrollbars --window-size=390,1100 --virtual-time-budget=1500 --screenshot='evidence\demo-mobile.png' 'file:///C:/git/v_projects/contests/worth_it/future_caribbean_ai_buildathon/index.html'
```
