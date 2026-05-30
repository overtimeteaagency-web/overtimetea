#!/usr/bin/env node
/**
 * Load repo-root .env, then run the given command.
 * Usage: node scripts/with-env.mjs [--] <command> [args...]
 */
import { spawn } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    console.error(`Missing ${filePath}. Copy .env.example to .env and set DATABASE_URL.`);
    process.exit(1);
  }

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(envPath);

const argv = process.argv.slice(2);
const dashDash = argv.indexOf("--");
const cmdArgs = dashDash === -1 ? argv : argv.slice(dashDash + 1);

if (cmdArgs.length === 0) {
  console.error("Usage: node scripts/with-env.mjs [--] <command> [args...]");
  process.exit(1);
}

const [command, ...args] = cmdArgs;
const child = spawn(command, args, {
  stdio: "inherit",
  env: process.env,
  shell: false,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
