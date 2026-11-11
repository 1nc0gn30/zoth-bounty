#!/usr/bin/env node
/**
 * Zoth Bounty — Documentation & Markdown Synchronizer
 * Generates clean Markdown files for:
 * - docs/ongoing/
 * - docs/pending/
 * - docs/completed/
 * - docs/possible/
 * - docs/communications/
 * - README.md
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const DOCS_DIR = path.join(ROOT, 'docs');

function syncAllDocs() {
  const bounties = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'bounties.json'), 'utf8'));
  const comms = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'communications.json'), 'utf8'));

  const categories = ['ongoing', 'pending', 'completed', 'possible'];
  for (const cat of categories) {
    const dir = path.join(DOCS_DIR, cat);
    fs.mkdirSync(dir, { recursive: true });
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith('.md')) fs.unlinkSync(path.join(dir, f));
    }
  }

  const commDir = path.join(DOCS_DIR, 'communications');
  fs.mkdirSync(commDir, { recursive: true });

  for (const item of bounties.items) {
    const cat = categories.includes(item.category) ? item.category : 'possible';
    const slug = `${item.id}-${item.target.replace(/[^a-zA-Z0-9_-]/g, '_')}.md`;
    const filePath = path.join(DOCS_DIR, cat, slug);

    const md = `# [${item.id}] ${item.title}

- **Category**: \`${item.category.toUpperCase()}\`
- **Target Repository**: \`${item.target}\`
- **Program / Channel**: ${item.program}
- **Severity**: ${item.severity}
- **CWE**: ${item.cwe}
- **Confidence / Gate Status**: ${item.confidence}
- **Disclosure Status**: ${item.disclosedVia}
- **Last Updated**: ${item.updatedAt}

## Affected Files
${(item.files || []).map(f => `- \`${f}\``).join('\n')}

## Technical Summary & Root Cause
${item.summary}

## Triager Verification & Why This Finding Is Solid
${item.whySolid}

## Defensive Remediation
${item.remediation}
`;
    fs.writeFileSync(filePath, md);
  }

  const commMd = `# Zoth Bounty — Communications & Disclosure Log

- **Last Synced**: ${comms.updatedAt}
- **Thunderbird Inbox**: \`${comms.channels.thunderbirdInbox}\`
- **Outbound DKIM/SPF Rail**: \`${comms.channels.outboundVerified}\`
- **Gmail Account**: \`${comms.channels.gmailAccount}\`
- **GitHub Account**: \`${comms.channels.githubAccount}\`

---

${comms.logs.map(c => `## [${c.id}] ${c.direction} — ${c.subject}
- **Timestamp**: ${c.timestamp}
- **Channel**: ${c.channel}
- **Recipient / Counterparty**: \`${c.recipient}\`
- **Status**: **${c.status}**
- **Related Bounty**: ${c.relatedBountyId || 'General / Revenue Challenge'}
- **Reference / Message ID**: \`${c.referenceId}\`

${c.summary}
`).join('\n---\n\n')}
`;
  fs.writeFileSync(path.join(commDir, 'COMMUNICATIONS_LOG.md'), commMd);

  const byCat = (cat) => bounties.items.filter(i => i.category === cat);
  const lines = [
    '<div align="center">',
    '  <img src="assets/hero-banner.svg" alt="Zoth Bounty Research Hub — Architecture Banner" width="100%" />',
    '</div>',
    '',
    '<br />',
    '',
    '<div align="center">',
    '  <a href="https://zoth.nullai.tech/tools/zoth-bounty"><img src="https://img.shields.io/badge/Zoth_Studio_v2-Dossier-D4AF37?style=for-the-badge" alt="Zoth Studio v2 Dossier" /></a>',
    '  <a href="http://127.0.0.1:9494"><img src="https://img.shields.io/badge/Workstation-127.0.0.1:9494-EF4444?style=for-the-badge" alt="Loopback Port 9494" /></a>',
    '  <a href="https://buy.stripe.com/3cIfZg27PdKo2D64Ocfw40X"><img src="https://img.shields.io/badge/Support-Buy_Us_a_Coffee-FFDD00?style=for-the-badge" alt="Buy Us a Coffee" /></a>',
    '  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge" alt="MIT License" /></a>',
    '</div>',
    '',
    '# Zoth Bounty Research Hub',
    '',
    'Local security research, responsible vulnerability disclosure, and audit triage workstation (`127.0.0.1:9494`). Enforces a strict zero-false-positive gate across four lifecycle buckets (`ongoing`, `pending`, `completed`, `possible`), integrates a thermal-gated low-priority static sink scanner (`nice -n 19 ionice -c 3`), and synchronizes JSON ledgers into deterministic Markdown reports under `docs/`.',
    '',
    '## Overview',
    '',
    '| Property | Specification |',
    '| :--- | :--- |',
    '| **Tool ID** | `zoth-bounty` |',
    '| **Category** | `Security & Enclave` |',
    '| **Loopback Workstation** | `http://127.0.0.1:9494` (`node server.js`) |',
    '| **Zoth Studio v2 Dossier** | [`https://zoth.nullai.tech/tools/zoth-bounty`](https://zoth.nullai.tech/tools/zoth-bounty) (`http://127.0.0.1:3000/tools/zoth-bounty`) |',
    '| **ZothOS v3.4.0 CLI** | `zoth-bounty` (`bin/zoth-bounty`) |',
    `| **Disclosure Policy** | ${bounties.summary.policy} |`,
    `| **Thermal Policy** | ${bounties.summary.thermalPolicy} |`,
    '| **License** | MIT — 100% Free & Open-Source |',
    '',
    '## Architecture',
    '',
    '1. **Zero-Dependency HTTP Daemon (`server.js`)**',
    '   - Pure Node.js HTTP server bound to `127.0.0.1:9494` (configurable via `HOST` and `PORT`).',
    '   - Serves the single-page research workstation from `public/index.html` and exposes JSON state, bounty triage mutations, communication log append, and thermal-gated static sink scanning.',
    '2. **Thermal-Gated Static Sink Scanner (`runCoolStaticScan`)**',
    '   - Samples CPU package temperature and fan RPM via `sensors` plus host `os.loadavg()`.',
    '   - Refuses static scan bursts when package temperature exceeds `68°C`, and executes pattern scans under `nice -n 19 ionice -c 3` across target repositories in `ZOTH_BOUNTY_REPOS_DIR` (checking `dereference: true`, `allowUnsafe`, `execSync(`, `spawnSync(`, `child_process`, `Date.parse(`, `extractAllTo`, and `symlink`).',
    '3. **Deterministic Markdown Synchronizer (`sync_docs.js`)**',
    '   - Compiles `data/bounties.json` and `data/communications.json` into structured per-finding Markdown advisories under `docs/ongoing/`, `docs/pending/`, `docs/completed/`, `docs/possible/`, and `docs/communications/COMMUNICATIONS_LOG.md`.',
    '',
    '## Quickstart',
    '',
    '```bash',
    'git clone https://github.com/1nc0gn30/zoth-bounty.git',
    'cd zoth-bounty',
    '',
    '# Regenerate Markdown advisory dossiers from data/*.json',
    'node sync_docs.js',
    '',
    '# Start the loopback command center on 127.0.0.1:9494',
    'HOST=127.0.0.1 PORT=9494 node server.js',
    '```',
    '',
    '### Environment Variables',
    '',
    '| Variable | Default | Purpose |',
    '| :--- | :--- | :--- |',
    '| `HOST` | `127.0.0.1` | Bind address for `server.js` |',
    '| `PORT` | `9494` | TCP port for `server.js` |',
    '| `ZOTH_BOUNTY_REPOS_DIR` | `/opt/bounty-hunter/repos` | Directory of cloned open-source targets for static sink scans |',
    '| `ZOTH_BOUNTY_TB_DB` | *(disabled if unset)* | Optional path to local Thunderbird `global-messages-db.sqlite` |',
    '| `HEXSTRIKE_TOOLS_JSON` | `/opt/NullAI-HexStrike-AI-Terminal/ui/src/data/tools.json` | Optional HexStrike catalog path for tool count summary |',
    '',
    '## CLI & MCP Usage',
    '',
    '### ZothOS v3.4.0 CLI (`bin/zoth-bounty`)',
    '',
    '```bash',
    './bin/zoth-bounty --help',
    './bin/zoth-bounty --status',
    './bin/zoth-bounty --json',
    './bin/zoth-bounty --list',
    './bin/zoth-bounty --category pending --json',
    './bin/zoth-bounty --thermals --json',
    './bin/zoth-bounty --ui',
    './bin/zoth-bounty --serve 9494',
    '```',
    '',
    '### REST API Endpoints (`127.0.0.1:9494`)',
    '',
    '| Method & Route | Description |',
    '| :--- | :--- |',
    '| `GET /health`, `GET /api/health` | Daemon health check, version, port, and open-access flag |',
    '| `GET /api/status` | Tool metadata, category, port, and total finding count |',
    '| `GET /api/state` | Full ledger (`bounties`, `communications`), live `thermals`, `hexstrike` summary, and `clonedRepos` |',
    '| `POST /api/bounties` | Create a new finding entry in `data/bounties.json` and resync `docs/` |',
    '| `POST /api/bounties/move` | Move an existing finding `id` between `ongoing`, `pending`, `completed`, and `possible` |',
    '| `POST /api/communications` | Append an inbound/outbound disclosure communication entry and resync `docs/` |',
    '| `POST /api/scan-repo` | Run a thermal-gated (`<= 68°C`) static sink scan against `{ "repo": "<name>" }` |',
    '',
    '## Vulnerability & Audit Ledger',
    '',
    `### Pending (Disclosed & Awaiting Vendor Triage) — ${byCat('pending').length}`,
    byCat('pending').map(i => `- **[${i.id}] ${i.title}** (\`${i.target}\` · ${i.severity})\n  - *Disclosed via*: ${i.disclosedVia}`).join('\n'),
    '',
    `### Ongoing (Active Audits & Low-CPU Queue) — ${byCat('ongoing').length}`,
    byCat('ongoing').map(i => `- **[${i.id}] ${i.title}** (\`${i.target}\`)\n  - *Summary*: ${i.summary}`).join('\n'),
    '',
    `### Completed (Verified / Hardened Target Audits) — ${byCat('completed').length}`,
    byCat('completed').map(i => `- **[${i.id}] ${i.title}** (\`${i.target}\` · ${i.severity})`).join('\n'),
    '',
    `### Possible / Held Back (Zero-False-Positive Gate) — ${byCat('possible').length}`,
    byCat('possible').map(i => `- **[${i.id}] ${i.title}** (\`${i.target}\` · ${i.confidence})\n  - *Gate Rationale*: ${i.whySolid}`).join('\n'),
    '',
    `### Recent Disclosure Communications (${comms.logs.length})`,
    comms.logs.map(c => `- **[${c.id}] [${c.direction}]** \`${c.recipient}\` — *${c.subject}* (**${c.status}**)`).join('\n'),
    '',
    '## Testing & Verification',
    '',
    '```bash',
    '# Run data invariant and live HTTP endpoint tests (spawns ephemeral :19494 instance)',
    'python3 -m pytest -q',
    '',
    '# Verify CLI flags and JSON output',
    './bin/zoth-bounty --help',
    './bin/zoth-bounty --json',
    './bin/zoth-bounty --list',
    '```',
    '',
    '## Support',
    '',
    'Zoth Bounty is 100% free and open-source with zero paywalls. Optional support: [Buy Us a Coffee via Stripe](https://buy.stripe.com/3cIfZg27PdKo2D64Ocfw40X).',
    '',
    '## License',
    '',
    'Released under the [MIT License](LICENSE). Engineered by [1nc0gn30](https://1nc0gn30.si) (`@1nc0gn30`) and [NullAI](https://nullai.tech).',
    ''
  ];
  fs.writeFileSync(path.join(ROOT, 'README.md'), lines.join('\n'));
  return { bountiesCount: bounties.items.length, commsCount: comms.logs.length };
}

if (require.main === module) {
  const res = syncAllDocs();
  console.log('Synced Zoth Bounty docs:', res);
}

module.exports = { syncAllDocs };
