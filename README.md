# LaunchOnIt MCP Server 🚀

[![Model Context Protocol](https://img.shields.io/badge/MCP-Compatible-blue.svg)](https://modelcontextprotocol.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Streamable HTTP](https://img.shields.io/badge/Transport-Streamable%20HTTP%20%7C%20stdio-green.svg)](https://launchon.it/api/mcp)
[![No API Key Required](https://img.shields.io/badge/Auth-Zero%20Config%20(No%20Key)-purple.svg)](https://launchon.it/mcp)

Official [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server for [**LaunchOnIt**](https://launchon.it) — the launch platform for indie hackers and modern software makers.

Connect this server to **Claude Desktop**, **Cursor**, **Windsurf**, **Cline**, **Antigravity**, or any MCP-compatible agent to search products, inspect weekly rankings, check launch calendar availability, and draft new product launches.

---

## ✨ Features

* **🔍 Real-Time Product Search**: Search through hundreds of launched SaaS tools, indie applications, and dev utilities.
* **🏆 Weekly Leaderboards & Winners**: Fetch the current live week rankings or historical podium finishers from the Hall of Fame.
* **📅 Launch Calendar Availability**: Inspect free launch slots and plans for upcoming cohorts.
* **🤖 AI Product Submissions**: Draft a product launch by simply providing a URL. LaunchOnIt automatically crawls metadata, writes a launch draft, and returns a private review link for the maker to edit and publish.
* **⚡ Zero Configuration**: Public Streamable HTTP JSON-RPC endpoint. No API keys or account setup required to connect.

---

## 🚀 Quickstart & Configuration

### Option A: Direct Streamable HTTP (Recommended)
Most modern MCP clients support direct HTTP / SSE remote connections without installing local Node packages.

**Endpoint URL**: `https://launchon.it/api/mcp`

#### Claude Desktop
Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "launchonit": {
      "url": "https://launchon.it/api/mcp"
    }
  }
}
```

#### Cursor (`.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "launchonit": {
      "url": "https://launchon.it/api/mcp"
    }
  }
}
```

#### Windsurf (`~/.codeium/windsurf/mcp_config.json`)
```json
{
  "mcpServers": {
    "launchonit": {
      "serverUrl": "https://launchon.it/api/mcp"
    }
  }
}
```

---

### Option B: Local CLI / Stdio Bridge
For clients that require a local command (`stdio` transport):

```bash
npx -y launchonit-mcp
```

#### Claude Desktop (Local Stdio)
```json
{
  "mcpServers": {
    "launchonit": {
      "command": "npx",
      "args": ["-y", "launchonit-mcp"]
    }
  }
}
```

#### Claude Code CLI
```bash
claude mcp add launchonit -- npx -y launchonit-mcp
```

---

## 🛠️ Available Tools

| Tool | Type | Description | Arguments |
| :--- | :--- | :--- | :--- |
| `search_products` | Read | Keyword search across every product launched on LaunchOnIt, ranked by community upvotes. | `query` *(string, required)*, `limit` *(int, default 10)* |
| `get_weekly_leaderboard` | Read | Fetch ranked products for an ISO week (e.g. `2026-W39`) or the live ongoing cohort. | `week` *(string, optional)*, `limit` *(int, default 20)* |
| `get_product` | Read | Retrieve complete product details: tagline, story, problem solved, pricing, tech stack, and links. | `slug` *(string, required)* |
| `get_winners` | Read | Top 3 podium winners from past launch weeks (Hall of Fame). | `weeks` *(int, default 4)* |
| `get_launch_calendar` | Read | Free launch slots remaining in the live week and subsequent weeks, plus launch tiers. | `weeks` *(int, default 4)* |
| `submit_product` | Write (Draft) | Scrapes a website URL, generates a full listing draft, and returns a private review link. | `url` *(string, required)*, optional overrides: `title`, `tagline`, `description`, `pricing_type` |

---

## 🔒 Safety & Privacy

* **Non-destructive Drafting**: The `submit_product` tool **only creates a private draft**. It never publishes a product publicly and never initiates payment. The agent receives a secure URL where the product owner signs in, verifies their details, and chooses when to launch.
* **Rate Limits**: The public endpoint is protected by intelligent rate limiting (60 requests/minute for queries, 5 drafts/hour per IP).
* **Open & Free**: All discovery and research tools are 100% free and open to the community.

---

## 💡 Example AI Prompts

Once connected, you can ask your AI:
* *"Search LaunchOnIt for AI developer tools that launched recently."*
* *"Who is currently leading this week's launch leaderboard on LaunchOnIt?"*
* *"Show me the top 3 podium winners from the last 4 weeks on LaunchOnIt."*
* *"I just built https://mycooltool.com. Can you draft a submission for me on LaunchOnIt?"*

---

## 🌐 Useful Links

* **Platform**: [https://launchon.it](https://launchon.it)
* **MCP Documentation**: [https://launchon.it/mcp](https://launchon.it/mcp)
* **Hall of Fame**: [https://launchon.it/winners](https://launchon.it/winners)
* **Well-Known MCP Discovery Card**: [https://launchon.it/.well-known/mcp.json](https://launchon.it/.well-known/mcp.json)

---

## 📄 License

[MIT](LICENSE) · [LaunchOnIt](https://launchon.it)
