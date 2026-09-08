import assert from "node:assert/strict";
import test from "node:test";
import { spawnSync } from "node:child_process";
import path from "node:path";

test("capability fabric provider matrix passes deterministic conformance", () => {
  const root = process.cwd();
  const result = spawnSync(process.execPath, [path.join(root, "scripts/validate-capability-fabric.mjs")], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
});
