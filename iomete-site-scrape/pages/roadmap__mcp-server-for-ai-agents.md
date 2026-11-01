<!-- source: https://iomete.com/roadmap/mcp-server-for-ai-agents | scraped 2026-11-01 -->

Page title: IOMETE
URL: https://iomete.com/roadmap/mcp-server-for-ai-agents

---

Home

Roadmap

✨ MCP Server for AI Agents (Beta)

ROADMAP

# ✨ MCP Server for AI Agents (Beta)

Status

Completed

Release Version

4.0.0

Last Updated

September 30, 2026

#### Overview

The IOMETE MCP Server connects AI agents to your lakehouse through the Model Context Protocol (MCP), the open standard AI assistants use to call external tools. Point an MCP client such as Claude Code, Codex or Devin at your IOMETE deployment, and the agent can find tables in the data catalog, read their schemas and run SQL on your compute clusters, acting as the user who signed in.

Version 1 ships in IOMETE 4.0 as a beta feature. It runs inside your data plane, stays off until an administrator turns it on, and runs only read queries unless an administrator allows writes.

#### Use cases

- Ask questions in plain language and get answers computed from lakehouse data. The agent finds the tables, writes the SQL and runs it.
- Ground generated SQL in real schemas, sample rows and column profiles instead of guessed table and column names.
- Explore an unfamiliar dataset, from what a catalog holds to how a table's columns are distributed.
- Connect IOMETE to the AI tools your team already uses, through one standard endpoint and each user's own IOMETE login.

#### Features

V1 has 17 tools in five groups, and one ready-made prompt.

Session and identity

- Check the connection and see who the agent is signed in as (server_info, whoami).

Working context

- List the domains the user can access, and each domain's compute clusters with their status (list_domains, list_compute_clusters).
- When the user has one domain, or a domain has one running compute cluster, it is picked automatically; otherwise each call names it.

Discovery

- Browse catalogs, then namespaces and tables a page at a time (list_catalogs, list_namespaces, list_tables). A catalog or namespace that does not exist is reported as not found.
- Search the data catalog by catalog, namespace or table name, description or column name, a page at a time (search_tables). Results are as fresh as the last catalog sync.
- Read a table's description from the data catalog: columns with type, description and tags, plus owners, row count, file count, size, and created, modified and sync times (describe_table).

SQL execution

- Run one SQL statement as the signed-in user (run_query). It returns up to 100 rows, or a query id to check later when the query runs longer than 30 seconds.
- Follow a query, page through its results, or cancel it (get_query_status, get_query_result, cancel_query).
- Inspect the Spark plan and a low, medium or high risk rating for a statement without running it (explain_query).
- Preview the first rows of a table, up to 100 (sample_table). These are the first rows the engine returns, not a random sample.

Column profiling

- Profile chosen columns (plan_column_profile, execute_column_profile). Numeric, date and time columns get row and null counts, a minimum and a maximum. Text and other simple columns get a null count, their most frequent values with counts, and a few example values. Array, map and struct columns cannot be profiled.

Prompt

- discover-then-query is a ready-made instruction the user can pick in their MCP client. It tells the agent to find and describe tables before writing SQL, check the query with explain_query, always include a LIMIT, and wait for the user's approval before it cancels a query or runs a heavy profile.

#### Security and governance

- Every call carries the signed-in user's own IOMETE credentials, and queries run in Spark as that user, so data security policies (access, masking and row-level filter) apply the same way they do in the SQL Editor.
- Access needs the Use MCP Server permission, granted through a role in each domain. Domain owners and Domain Managers always have it.
- Queries are read-only by default. An administrator can allow writes, and data security policies still decide what each user can write.
- Users sign in with their IOMETE login over OAuth, which MCP clients discover on their own, or connect with a personal access token.
- Every tool call from a signed-in user is written to an audit log, refused calls included, with the user, domain, tool, SQL and outcome. Result rows are never logged.
- Query results come back at most 100 rows at a time, a cap an administrator can change. When a query ends with its own LIMIT, an agent can page through up to 10,000 rows of the result. Running and explaining queries, and running column profiles, are rate-limited per user.
- An agent has to confirm before it cancels a query or runs a heavy column profile, so neither happens by accident. Whether a person approves that step depends on the MCP client.

#### Deployment

- The server runs inside your IOMETE data plane at https://<your IOMETE host>/mcp. It calls no AI model itself; results go only to the MCP client that asked for them.
- It is off by default. An administrator turns it on and sets its public URL in the data-plane Helm chart.
- Tested with Claude Code, Codex, Antigravity CLI and Devin. claude.ai also connects, using OAuth sign-in. Clients that run on your machine reach any IOMETE host on your network. Cloud-hosted clients, such as claude.ai and Devin's cloud agents, need an IOMETE host they can reach from the internet. Browser-based MCP clients are not supported in V1.

#### What's next

Next is MCP Server for AI Agents V2. As in V1, every call will run as the signed-in user. It will add:

- Spark application diagnostics, read-only: a job run's configuration, and its driver and executor logs.
- Iceberg table metadata, starting with a table's partition spec.
- The first tools for the Troubleshooting Agent.

Workload Optimization and the Troubleshooting Agent will also offer their own tools through MCP.

####

BOOK A DEMO

## Starting with IOMETE is simple. Book a demo with us today.

The IOMETE data platform helps you achieve more. Book a personalized demo and experience the impact firsthand.

Get in touch
