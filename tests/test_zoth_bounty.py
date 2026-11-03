import json
import os
import subprocess
import time
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def test_bounties_and_communications_data_invariants():
    bounties_path = os.path.join(ROOT, "data", "bounties.json")
    comms_path = os.path.join(ROOT, "data", "communications.json")
    assert os.path.exists(bounties_path)
    assert os.path.exists(comms_path)
    with open(bounties_path, "r") as f:
        bounties = json.load(f)
    assert "items" in bounties
    assert len(bounties["items"]) >= 3
    categories = {item["category"] for item in bounties["items"]}
    assert categories.issubset({"ongoing", "pending", "completed", "possible"})


def test_http_endpoints_health_status_and_state():
    env = os.environ.copy()
    env["PORT"] = "19494"
    proc = subprocess.Popen(
        ["node", os.path.join(ROOT, "server.js")],
        cwd=ROOT,
        env=env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        for _ in range(20):
            try:
                with urllib.request.urlopen("http://127.0.0.1:19494/health", timeout=0.5) as r:
                    if r.status == 200:
                        break
            except Exception:
                time.sleep(0.1)

        with urllib.request.urlopen("http://127.0.0.1:19494/health") as r:
            health = json.loads(r.read().decode())
            assert health["ok"] is True
            assert health["tool"] == "zoth-bounty"
            assert health["open_access"] is True

        with urllib.request.urlopen("http://127.0.0.1:19494/api/state") as r:
            state = json.loads(r.read().decode())
            assert "bounties" in state
            assert "thermals" in state
            assert "hexstrike" in state
            assert state["thermals"]["cpuTempC"] > 0
    finally:
        proc.terminate()
        proc.wait(timeout=3)
