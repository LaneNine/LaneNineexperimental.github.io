# 🏊 Lane9

Lane9 is a local-first swimming progress tracker.

Track personal bests, goals, and race history without creating an account or sending data anywhere.

## Features

- 🏊 Track multiple swimming events
- 📈 Progress graphs
- 🎯 Goal setting with deadlines
- 📊 Performance statistics
- 📋 Import race history from SwimCloud
- 💾 Local device storage
- 📤 Export and restore backups
- 📱 Installable PWA

## Privacy

Lane9 does not use:

- Accounts
- Cloud storage
- Servers
- Databases
- Analytics

All swimmer data is stored locally on the device using browser storage.

Data only leaves the device when the user manually exports a backup file.

## Supported Events

Examples:

- 50 Fly
- 100 Fly
- 200 Fly
- 50 Free
- 100 Free
- 200 Free
- 100 Back
- 100 Breast
- 200 IM
- 400 IM

Any custom event can be added.

## SwimCloud Import

Copy race history from SwimCloud and paste it into Lane9.

Example:


25.41 Wisconsin LSC Regional Championship Feb 21, 2026
25.52 Big 8 JV Conference Jan 29, 2026


Lane9 automatically extracts:

- Time
- Meet
- Date
- Relay markers

## Installation

### GitHub Pages

1. Upload the repository to GitHub
2. Enable GitHub Pages
3. Open the generated website
4. Install Lane9 from the browser menu

## Repository Structure


Lane9/

├── index.html
├── style.css
├── app.js
├── manifest.json

├── js/
│ ├── utils.js
│ ├── storage.js
│ ├── parser.js
│ ├── events.js
│ ├── goals.js
│ ├── charts.js
│ ├── stats.js
│ ├── importExport.js
│ └── ui.js

└── assets/
├── logo.png
├── icon-192.png
├── icon-512.png
└── favicon.ico


## Technology

Built with:

- HTML
- CSS
- JavaScript
- Chart.js

No frameworks or build tools required.

## License

MIT License
