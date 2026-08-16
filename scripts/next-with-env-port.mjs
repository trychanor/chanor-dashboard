import nextEnv from "@next/env";
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import process from "node:process";

const require = createRequire(import.meta.url);
const { loadEnvConfig } = nextEnv;
const projectDir = process.cwd();
const command = process.argv[2];
const allowedCommands = new Set(["dev", "start"]);

if (!allowedCommands.has(command)) {
  console.error("Usage: node scripts/next-with-env-port.mjs <dev|start>");
  process.exit(1);
}

loadEnvConfig(projectDir, command === "dev");

const port = process.env.PORT || "3000";
const portNumber = Number(port);

if (!Number.isInteger(portNumber) || portNumber < 1 || portNumber > 65535) {
  console.error("PORT must be a number from 1 to 65535.");
  process.exit(1);
}

const nextBin = require.resolve("next/dist/bin/next");
const child = spawn(process.execPath, [nextBin, command, "--port", port], {
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
