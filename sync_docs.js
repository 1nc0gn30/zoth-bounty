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
    // Clear old generated markdown files
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

  // Write communications log markdown
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

  // Write root README.md
  const byCat = (cat) => bounties.items.filter(i => i.category === cat);
  const readme = `# Zoth Bounty — Security Research & Responsible Disclosure Hub

Clean, zero-false-positive workspace tracking security audits, responsible vulnerability disclosures, and communications across **Ongoing**, **Pending**, **Completed**, and **Possible (Not Sure)** categories.

- **Web Command Center**: \`http://localhost:9494\` (\`node server.js\`)
- **Policy**: ${bounties.summary.policy}
- **Thermal Governance**: ${bounties.summary.thermalPolicy}

---

## 1. Pending (Disclosed & Awaiting Vendor Triage) — ${byCat('pending').length}
${byCat('pending').map(i => `- **[${i.id}] ${i.title}** (\`${i.target}\` · ${i.severity})\n  - *Disclosed via*: ${i.disclosedVia}`).join('\n')}

## 2. Ongoing (Active Audits & Low-CPU Queue) — ${byCat('ongoing').length}
${byCat('ongoing').map(i => `- **[${i.id}] ${i.title}** (\`${i.target}\`)\n  - *Summary*: ${i.summary}`).join('\n')}

## 3. Completed (Verified / Hardened Target Audits) — ${byCat('completed').length}
${byCat('completed').map(i => `- **[${i.id}] ${i.title}** (\`${i.target}\` · ${i.severity})`).join('\n')}

## 4. Possible / Not Sure (Held Back by Zero-False-Positive Gate) — ${byCat('possible').length}
${byCat('possible').map(i => `- **[${i.id}] ${i.title}** (\`${i.target}\` · ${i.confidence})\n  - *Why Held Back*: ${i.whySolid}`).join('\n')}

---

## 5. Recent Communications (${comms.logs.length})
${comms.logs.map(c => `- **[${c.id}] [${c.direction}]** \`${c.recipient}\` — *${c.subject}* (**${c.status}**)`).join('\n')}
`;
  fs.writeFileSync(path.join(ROOT, 'README.md'), readme);
  return { bountiesCount: bounties.items.length, commsCount: comms.logs.length };
}

if (require.main === module) {
  const res = syncAllDocs();
  console.log('Synced Zoth Bounty docs:', res);
}

module.exports = { syncAllDocs };
