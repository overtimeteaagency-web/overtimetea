#!/usr/bin/env node
/**
 * Start API + frontend together (loads .env via with-env.mjs).
 */
import { spawn } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const withEnv = resolve(root, "scripts/with-env.mjs");

const api = spawn(
  "node",
  [withEnv, "--", "sh", "-c", "PORT=8080 pnpm --filter @workspace/api-server run dev"],
  { cwd: root, stdio: "inherit", env: process.env },
);

const web = spawn(
  "node",
  [withEnv, "--", "pnpm", "--filter", "@workspace/overtime-tea", "run", "dev"],
  { cwd: root, stdio: "inherit", env: process.env },
);

function shutdown(code = 0) {
  api.kill("SIGTERM");
  web.kill("SIGTERM");
  process.exit(code);
}

process.on("SIGINT", () => shutdown(130));
process.on("SIGTERM", () => shutdown(143));

api.on("exit", (code) => {
  if (code && code !== 0) shutdown(code);
});
web.on("exit", (code) => {
  if (code && code !== 0) shutdown(code);
});
