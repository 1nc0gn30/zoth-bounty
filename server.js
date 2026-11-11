#!/usr/bin/env node
/**
 * Zoth Bounty — Local Security Research, Disclosure & Communications Server
 * Port: 9494
 * Zero external npm dependencies. Built-in Thermal Governor + HexStrike & Thunderbird Sync.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const { syncAllDocs } = require('./sync_docs');

const PORT = Number(process.env.PORT || 9494);
const HOST = process.env.HOST || '127.0.0.1';
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BOUNTIES_FILE = path.join(DATA_DIR, 'bounties.json');
const COMMS_FILE = path.join(DATA_DIR, 'communications.json');
const REPOS_DIR = process.env.ZOTH_BOUNTY_REPOS_DIR || '/opt/bounty-hunter/repos';
const TB_DB = process.env.ZOTH_BOUNTY_TB_DB || '';
const HEXSTRIKE_TOOLS_JSON = process.env.HEXSTRIKE_TOOLS_JSON || '/opt/NullAI-HexStrike-AI-Terminal/ui/src/data/tools.json';

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getThermals() {
  let cpuTempC = 46.0;
  let fanRpm = 2500;
  try {
    const out = execSync('sensors 2>/dev/null', { encoding: 'utf8', timeout: 1500 });
    const pkgMatch = out.match(/Package id 0:\s*\+?([0-9.]+)°C/);
    if (pkgMatch) cpuTempC = parseFloat(pkgMatch[1]);
    const fanMatch = out.match(/fan1:\s*([0-9]+)\s*RPM/);
    if (fanMatch) fanRpm = parseInt(fanMatch[1], 10);
  } catch (e) {}
  const load = os.loadavg().map(n => Number(n.toFixed(2)));
  const status = cpuTempC < 60 ? 'COOL (OPTIMAL)' : cpuTempC < 72 ? 'WARM (THROTTLED)' : 'HOT (PAUSED)';
  return {
    cpuTempC,
    fanRpm,
    loadAvg: load,
    status,
    checkedAt: new Date().toISOString()
  };
}

function getThunderbirdRecent() {
  if (!fs.existsSync(TB_DB)) return [];
  try {
    const sql = `SELECT datetime(date/1000000, 'unixepoch') || '|' || replace(ifnull(c3author,''), '|', ' ') || '|' || replace(ifnull(c4recipients,''), '|', ' ') || '|' || replace(ifnull(c1subject,''), '|', ' ') FROM messagesText_content JOIN messages ON messagesText_content.docid = messages.id WHERE c4recipients LIKE '%contact@nullai.tech%' OR c1subject LIKE '%Disclosure%' OR c1subject LIKE '%SAML%' OR c1subject LIKE '%skills%' ORDER BY date DESC LIMIT 12;`;
    const out = execSync(`sqlite3 "${TB_DB}" "${sql}"`, { encoding: 'utf8', timeout: 2500 });
    return out
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const [date, from, to, subject] = line.split('|');
        return { date, from: (from || '').replace(' undefined', ''), to: (to || '').replace(' undefined', ''), subject };
      });
  } catch (e) {
    return [];
  }
}

function getClonedRepos() {
  if (!fs.existsSync(REPOS_DIR)) return [];
  try {
    return fs.readdirSync(REPOS_DIR).filter(name => {
      try {
        return fs.statSync(path.join(REPOS_DIR, name)).isDirectory();
      } catch (e) {
        return false;
      }
    });
  } catch (e) {
    return [];
  }
}

function getHexStrikeSummary() {
  let count = 156;
  try {
    if (fs.existsSync(HEXSTRIKE_TOOLS_JSON)) {
      const tools = JSON.parse(fs.readFileSync(HEXSTRIKE_TOOLS_JSON, 'utf8'));
      if (Array.isArray(tools)) count = tools.length;
    }
  } catch (e) {}
  return {
    arsenalCount: count,
    activeStaticTools: [
      'HexStrike AST/Sink Scanner',
      'ShellCheck 0.10 (Bash/POSIX Taint)',
      'Symlink & Archive Traversal Auditor',
      'Git Option / Argument Injection Scanner',
      'GitHub Private Vulnerability Reporting (gh api)',
      'Nuclei / Radare2 / GDB / Objdump (Local Binary & Template Verification)'
    ]
  };
}

function runCoolStaticScan(repoName) {
  const thermals = getThermals();
  if (thermals.cpuTempC > 68) {
    return {
      ok: false,
      reason: `Thermal Guard active (${thermals.cpuTempC}°C > 68°C). Waiting for laptop to cool before scanning.`
    };
  }
  const cleanName = String(repoName || '').replace(/[^a-zA-Z0-9._-]/g, '');
  const targetDir = path.join(REPOS_DIR, cleanName);
  if (!cleanName || !fs.existsSync(targetDir)) {
    return { ok: false, reason: `Repository '${cleanName}' not found in ${REPOS_DIR}` };
  }

  const cmd = `nice -n 19 ionice -c 3 grep -rnE "dereference:\\s*true|allowUnsafe|execSync\\(|spawnSync\\(|child_process|Date\\.parse\\(|extractAllTo|symlink" "${targetDir}" --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=test --exclude-dir=tests 2>/dev/null | head -n 25`;
  let hits = [];
  try {
    const out = execSync(cmd, { encoding: 'utf8', timeout: 4000 });
    hits = out
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(l => l.replace(targetDir + '/', ''));
  } catch (e) {}

  return {
    ok: true,
    repo: cleanName,
    thermalsAtScan: thermals.cpuTempC + '°C',
    hitCount: hits.length,
    hits
  };
}

function parseBody(req) {
  return new Promise(resolve => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        resolve({});
      }
    });
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === 'GET' && (url.pathname === '/health' || url.pathname === '/api/health')) {
    return sendJson(res, 200, {
      ok: true,
      status: 'healthy',
      tool: 'zoth-bounty',
      version: '1.0.0',
      port: PORT,
      open_access: true
    });
  }

  if (req.method === 'GET' && url.pathname === '/api/status') {
    const bounties = readJson(BOUNTIES_FILE, { items: [], summary: {} });
    return sendJson(res, 200, {
      ok: true,
      tool: 'zoth-bounty',
      name: 'Zoth Bounty Research Hub',
      version: '1.0.0',
      category: 'Security & Enclave',
      port: PORT,
      total_findings: (bounties.items || []).length,
      pricing: '100% Free & Open-Access',
      support: {
        stripe: 'https://buy.stripe.com/3cIfZg27PdKo2D64Ocfw40X'
      }
    });
  }

  if (req.method === 'GET' && url.pathname === '/api/state') {
    const bounties = readJson(BOUNTIES_FILE, { items: [], summary: {} });
    const communications = readJson(COMMS_FILE, { logs: [], channels: {} });
    return sendJson(res, 200, {
      bounties,
      communications,
      thermals: getThermals(),
      hexstrike: getHexStrikeSummary(),
      clonedRepos: getClonedRepos(),
      thunderbirdRecent: getThunderbirdRecent()
    });
  }

  if (req.method === 'POST' && url.pathname === '/api/bounties/move') {
    const body = await parseBody(req);
    const bounties = readJson(BOUNTIES_FILE, { items: [], summary: {} });
    const item = bounties.items.find(i => i.id === body.id);
    if (!item) return sendJson(res, 404, { error: 'Item not found' });
    if (['ongoing', 'pending', 'completed', 'possible'].includes(body.category)) {
      item.category = body.category;
      item.updatedAt = new Date().toISOString();
      bounties.updatedAt = item.updatedAt;
      writeJson(BOUNTIES_FILE, bounties);
      syncAllDocs();
    }
    return sendJson(res, 200, { ok: true, item });
  }

  if (req.method === 'POST' && url.pathname === '/api/bounties') {
    const body = await parseBody(req);
    const bounties = readJson(BOUNTIES_FILE, { items: [], summary: {} });
    const newId = body.id || `ZB-2026-${String(bounties.items.length + 1).padStart(3, '0')}`;
    const newItem = {
      id: newId,
      category: ['ongoing', 'pending', 'completed', 'possible'].includes(body.category) ? body.category : 'possible',
      title: body.title || 'Untitled Security Finding',
      target: body.target || 'unknown/repo',
      program: body.program || 'Bug Bounty / Security Contact',
      severity: body.severity || 'Medium',
      cwe: body.cwe || 'CWE-Other',
      confidence: body.confidence || 'Under Review',
      files: Array.isArray(body.files) ? body.files : String(body.files || '').split(',').map(s => s.trim()).filter(Boolean),
      summary: body.summary || '',
      whySolid: body.whySolid || '',
      remediation: body.remediation || '',
      disclosedVia: body.disclosedVia || 'Not Disclosed Yet',
      updatedAt: new Date().toISOString()
    };
    bounties.items.unshift(newItem);
    bounties.updatedAt = newItem.updatedAt;
    writeJson(BOUNTIES_FILE, bounties);
    syncAllDocs();
    return sendJson(res, 200, { ok: true, item: newItem });
  }

  if (req.method === 'POST' && url.pathname === '/api/communications') {
    const body = await parseBody(req);
    const comms = readJson(COMMS_FILE, { logs: [], channels: {} });
    const newComm = {
      id: `COMM-2026-${String(comms.logs.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      direction: body.direction || 'OUTBOUND',
      channel: body.channel || 'Email / GitHub',
      recipient: body.recipient || '',
      subject: body.subject || '',
      status: body.status || 'LOGGED',
      relatedBountyId: body.relatedBountyId || null,
      referenceId: body.referenceId || 'manual',
      summary: body.summary || ''
    };
    comms.logs.unshift(newComm);
    comms.updatedAt = newComm.timestamp;
    writeJson(COMMS_FILE, comms);
    syncAllDocs();
    return sendJson(res, 200, { ok: true, entry: newComm });
  }

  if (req.method === 'POST' && url.pathname === '/api/scan-repo') {
    const body = await parseBody(req);
    const result = runCoolStaticScan(body.repo);
    return sendJson(res, 200, result);
  }

  // Serve static files from public/
  let filePath = path.join(PUBLIC_DIR, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!filePath.startsWith(PUBLIC_DIR) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }
  const ext = path.extname(filePath).toLowerCase();
  const mime = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml'
  }[ext] || 'text/plain; charset=utf-8';

  res.writeHead(200, { 'Content-Type': mime });
  fs.createReadStream(filePath).pipe(res);
});

syncAllDocs();
server.listen(PORT, HOST, () => {
  console.log(`Zoth Bounty server listening on http://${HOST}:${PORT}`);
});
