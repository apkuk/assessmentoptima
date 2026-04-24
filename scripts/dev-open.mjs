/**
 * File: scripts/dev-open.mjs
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Starts Next.js dev mode and opens the local frontend in Chrome by default.
 */
import { spawn } from "node:child_process";

const requestedPort = process.env.PORT ?? readFlag("--port") ?? "3000";
const shouldOpenBrowser = process.env.OPEN_BROWSER !== "false";
const preferredBrowser = process.env.BROWSER ?? "Google Chrome";
const fallbackUrl = `http://localhost:${requestedPort}`;

let opened = false;

function readFlag(flag) {
  const index = process.argv.indexOf(flag);

  if (index === -1) {
    return undefined;
  }

  return process.argv[index + 1];
}

function openBrowser(url) {
  if (!shouldOpenBrowser || opened) {
    return;
  }

  opened = true;

  const command =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "cmd"
        : "xdg-open";
  const args =
    process.platform === "darwin"
      ? ["-a", preferredBrowser, url]
      : process.platform === "win32"
        ? ["/c", "start", preferredBrowser, url]
        : [url];
  const opener = spawn(command, args, {
    detached: true,
    stdio: "ignore",
  });

  opener.on("error", () => {
    if (process.platform === "darwin") {
      spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
    }
  });
  opener.unref();
}

const nextArgs = ["dev", "--port", requestedPort];
const nextCommand = process.platform === "win32" ? "next.cmd" : "next";
const next = spawn(nextCommand, nextArgs, {
  env: process.env,
  stdio: ["inherit", "pipe", "pipe"],
});

function handleOutput(chunk, stream) {
  const text = chunk.toString();
  stream.write(text);

  const url = text.match(/https?:\/\/localhost:\d+/)?.[0] ?? fallbackUrl;

  if (/ready|local:/i.test(text)) {
    openBrowser(url);
  }
}

next.stdout.on("data", (chunk) => handleOutput(chunk, process.stdout));
next.stderr.on("data", (chunk) => handleOutput(chunk, process.stderr));
next.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

process.on("SIGINT", () => next.kill("SIGINT"));
process.on("SIGTERM", () => next.kill("SIGTERM"));
