#!/usr/bin/env node

/**
 * LaunchOnIt MCP Stdio Bridge
 *
 * Lightweight, zero-dependency bridge that connects stdio-based MCP clients
 * (Claude Desktop, Cursor, Windsurf, Cline) to the official LaunchOnIt
 * MCP JSON-RPC endpoint (https://launchon.it/api/mcp).
 *
 * @license MIT
 * @author LaunchOnIt
 */

import readline from "node:readline";

const MCP_ENDPOINT = process.env.LAUNCHONIT_MCP_URL || "https://launchon.it/api/mcp";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  let payload;
  try {
    payload = JSON.parse(trimmed);
  } catch (err) {
    process.stdout.write(
      JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error: invalid JSON" },
      }) + "\n"
    );
    return;
  }

  try {
    const res = await fetch(MCP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "launchonit-mcp-cli/1.0.0",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      if (payload.id !== undefined) {
        process.stdout.write(
          JSON.stringify({
            jsonrpc: "2.0",
            id: payload.id,
            error: {
              code: -32603,
              message: `HTTP ${res.status}: ${errText || res.statusText}`,
            },
          }) + "\n"
        );
      }
      return;
    }

    const data = await res.json();
    process.stdout.write(JSON.stringify(data) + "\n");
  } catch (err) {
    if (payload.id !== undefined) {
      process.stdout.write(
        JSON.stringify({
          jsonrpc: "2.0",
          id: payload.id,
          error: {
            code: -32603,
            message: `Connection error: ${err?.message || "Failed to reach LaunchOnIt MCP server"}`,
          },
        }) + "\n"
      );
    }
  }
});

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
