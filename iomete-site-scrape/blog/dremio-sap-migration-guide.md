<!-- source: https://iomete.com/resources/blog/dremio-sap-migration-guide | scraped 2026-11-01 -->

Page title: Dremio is now SAP: what it means and how to migrate | IOMETE
URL: https://iomete.com/resources/blog/dremio-sap-migration-guide
Meta description: SAP now owns Dremio. What changed for Dremio customers, what is still yours, and a step-by-step plan for moving Iceberg tables, views, and policies if you leave.

---

# Dremio is now SAP: what it means and how to migrate

October 13, 2026 · 12 min read

Abhishek Pathania
Software Engineer @ IOMETE

On July 6, 2026, SAP finished buying Dremio. If you run Dremio today, nothing broke that day. Your queries still run and your Reflections still refresh.

What changed is who decides where the product goes next. This post covers what that means in practice, what you still control, and what a move to another platform involves if you decide to make one.

A quick note before we start: IOMETE competes with Dremio. We have tried to be fair, and every claim about Dremio or SAP links to their own pages so you can check it.

## What SAP bought, and who it is good news for

SAP announced the deal in May, and the plan is clear. Dremio becomes the base of SAP Business Data Cloud, so SAP data and non-SAP data can sit side by side in Apache Iceberg tables without being copied into SAP HANA. Dremio's catalog, built on Apache Polaris, becomes the foundation of the SAP Knowledge Graph. SAP also said it will keep investing in the open-source projects Dremio works on: Iceberg, Polaris, and Arrow.

If your company already runs on SAP and Business Data Cloud is on your roadmap, this is probably good for you. Your lakehouse engine will get closer to the systems your finance and supply chain data already live in, and that is a fair reason to stay.

The rest of this post is for teams where that isn't the case.

## What changes for everyone else

### The roadmap follows SAP's plan now

Before the deal, Dremio decided what to build based on what lakehouse buyers asked for. Now those decisions are made inside a much larger company, and the stated goal for the product is to make Business Data Cloud stronger.

SAP says the platform will serve both SAP and non-SAP data. Neither SAP nor Dremio has said anything public yet about the self-hosted edition, licensing that doesn't assume a wider SAP contract, or connectors to non-SAP systems. If any of those matter to you, ask for written commitments on each before your renewal.

### "We picked an independent vendor" no longer holds

A lot of teams chose Dremio because it was a smaller company built around open formats, and not a large software vendor with a bigger platform to sell. That reason is gone, and it went away without any input from you.

The product didn't get worse overnight. But the risk section of the business case you wrote when you bought Dremio needs a rewrite, and procurement will ask about it at renewal.

### Self-hosted Dremio already talks to the vendor

This one is older than the deal, but it matters more now. Since Dremio 26.0, Dremio Enterprise on Kubernetes sends telemetry to observability.dremio.com by default, and usage-based billing is calculated from it. Turning it off is a contract decision. Under Dremio's Software Consumption Model Appendix, customers who opt out must buy at least Gold support, and support moves to an offline, degraded mode. Air-gapped clusters report usage through a separate offline process.

Dremio lists what is never sent, including query text, results, query profiles, and audit logs. What is sent is operational: counts of queries and views, plus JVM and Kubernetes metrics. For a bank or hospital, an outbound connection from a self-hosted platform to its vendor still belongs in the third-party register. Dremio is now owned by SAP, so confirm with your account team which entity receives that data and which one you contract with.

This matters in the EU because DORA, the EU's operational resilience rules for financial firms, asks banks to check how much they depend on any single provider (Article 29). Many banks already run SAP for finance, HR, and supply chain. With Dremio inside SAP, the analytics platform now depends on that same provider, so more of the bank's critical systems rely on one company. SAP is also one of the providers EU regulators have designated as critical because so many financial firms already depend on it. That's worth recording in your concentration risk assessment.

## What is still yours: the tables, if you planned for it

If your Dremio tables are Apache Iceberg tables in your own object storage, you already own the most important part of your lakehouse. The Parquet data files and Iceberg metadata live in your S3, ADLS, GCS, or on-premises object store, and any engine that reads Iceberg can open them.

Tables are only part of it, though. To leave a platform cleanly, you also need to take these with you:

- The catalog: which tables exist and where their current metadata file is.
- Permissions: who can see which tables, rows, and columns.
- Audit history: who queried what, and when.
- Lineage: which tables and views feed which.

Open table formats solve the first problem. The rest depend on where your catalog, policies, and logs live, and on whether you can export them without the vendor's help. It is worth checking each one now, while nothing is urgent.

Sovereign by architecture

IOMETE runs this inside your own perimeter: on-premises, private cloud, or air-gapped. Talk to a data architect→

## If you are an EU financial entity under DORA

We have written about DORA in detail before, in DORA and the EU AI Act for financial institutions and data sovereignty for regulated finance. For Dremio customers specifically, four steps are worth doing this quarter, whatever you decide about the platform:

- Update your register of information (DORA Article 28) to record that Dremio is now controlled by SAP.
- Ask for a written commitment on the future of the self-hosted edition: the support timeline, and whether it will keep the same features as the managed cloud version.
- Revisit the exit clause (DORA Article 30) at your next renewal, or sooner if your contract is transferred to SAP. That is when you can negotiate what an exit includes, such as catalog export, permissions, and audit history.
- Rehearse an exit. Pick a few real tables and move them to a second catalog and engine. A tested exit plan carries more weight with a regulator than a written one.

## How a move off Dremio works, step by step

If you decide to look at alternatives, here is the work involved. It applies to any platform that runs on Iceberg, not only ours.

The safest approach is to run both platforms side by side, then move workloads over one table at a time. Nobody has to switch everything over in a single weekend. Until a table moves, Dremio stays its only owner, and the pilot runs on copies.

### Step 1: Move your tables to the new catalog

Iceberg tables can be added to a new catalog without copying any data. Iceberg's register_table procedure points the new catalog at a table's existing metadata file:

```
CALL spark_catalog.system.register_table(
  table         => 'sales.orders',
  metadata_file => 's3://lakehouse/sales/orders/metadata/00042-<uuid>.metadata.json'
);

```

Register each table once, at cutover, and treat it as a move. If two catalogs track the same live table, updates made through one never reach the other, and Dremio's cleanup jobs can delete files the other catalog still needs.

So the cutover for each table is:

- Stop writes and maintenance on the table in Dremio.
- Register the latest metadata file in the new catalog.
- Point your pipelines and dashboards at the new platform.
- Remove the table from Dremio's catalog, after checking that doing so won't delete its files.

For the pilot, don't register live tables. Write copies of a few representative tables to a separate location, for example with CREATE TABLE AS SELECT from Dremio, and register those copies instead. The new platform owns them outright, so nothing either side does can break the other.

The full procedure is in our Iceberg procedures reference.

### Step 2: Translate your views

Dremio views (Dremio calls them virtual datasets) are written in Dremio's SQL dialect. Standard SQL carries over to Spark SQL as is. Dremio-specific functions and syntax need a review. Start by listing all your spaces and views, since that tells you how big this step is.

### Step 3: Replace Reflections

Reflections are Dremio's own acceleration layer, and they don't move to any other platform. What you lose is the automatic part: Dremio picks a Reflection and rewrites the query for you. On another platform you build that acceleration yourself, with pre-aggregated tables that your dashboards query directly, partitioning and sort order that match your filters, regular compaction, and properly sized compute. Whether that closes the gap depends on your workload.

On IOMETE, the Apache DataFusion Comet acceleration in IOMETE 4.0 cut total TPC-DS run time by 42% in our test without changing any SQL. That result compares IOMETE configurations, not IOMETE against Dremio, so test the dashboards your business actually depends on rather than relying on a benchmark, ours included.

### Step 4: Check every federated source

If you query operational databases directly through Dremio, list each connection. IOMETE supports query federation with JDBC databases such as MySQL, PostgreSQL, SQL Server, and Oracle, as well as Snowflake and files in object storage. For each source, decide whether to keep querying it in place or load it into Iceberg.

### Step 5: Rebuild access policies

Row filters, column masks, and role mappings have to be recreated in the new platform's policy model and tested against your identity provider. Test this step with real users before cutover, because a mistake here exposes data.

## Where IOMETE fits

IOMETE is a data lakehouse built on Apache Spark and Apache Iceberg that runs on Kubernetes. It deploys entirely inside your own infrastructure: on-premises, private cloud, sovereign cloud, or your own public cloud account. No part of it that touches your data runs outside your network, and it runs in fully air-gapped environments. Our post on the control plane and data plane explains how that is split.

For Dremio customers, these are the parts that matter most:

- Iceberg-native, with an Iceberg REST catalog. Your existing tables can be registered in place, and other Iceberg engines such as Trino, Flink, DuckDB, and PyIceberg can keep reading the same files.
- Access control inside your network. Row-level security, column masking, and tag-based policies are applied at query time and connected to your identity provider. Audit logs stay in your infrastructure.
- One engine for SQL, pipelines, streaming, and machine learning. Spark handles BI queries, batch jobs, and notebooks on the same tables.
- Your hardware, your costs. Compute runs on your Kubernetes clusters, under your quotas, reserved capacity, and cloud discounts.

There are trade-offs too. IOMETE assumes your team is comfortable running Kubernetes. Spark is a different engine from Dremio's, so dashboards where speed is critical deserve a side-by-side test before you commit.

## Which path fits you

- Stay on Dremio if your company is committed to SAP and Business Data Cloud. Ask SAP for written answers on the self-hosted edition, the licensing model, and the connectors you depend on.
- Run an evaluation if you chose Dremio for independence or data sovereignty. Copy a handful of real tables to a second platform, translate your most important views, and compare results on your own workloads before your renewal date.

Either way, keep your tables in Iceberg on storage you own, and make sure your catalog, permissions, and audit history can be exported. Then the next acquisition, including one of us, doesn't become your problem.

If you want help with an evaluation, talk to our team. We can run a pilot on copies of your own Iceberg tables, in your environment, without touching production.

## FAQ

## Frequently Asked Questions

### Did SAP acquire Dremio?

Yes. SAP announced the deal on May 4, 2026 and completed it on July 6, 2026. Dremio is becoming the Apache Iceberg-based foundation of SAP Business Data Cloud.

### Can I migrate from Dremio without copying my data?

If your Dremio tables are Apache Iceberg tables in your own object storage, yes. Iceberg's register_table procedure adds an existing table to a new catalog by pointing it at the table's metadata file, so the data files stay where they are. Do it once per table, after Dremio has stopped writing to and maintaining it. Views, Reflections, federated sources, and access policies still need to be moved separately.

### Can Dremio and IOMETE use the same Iceberg tables at the same time?

Not safely through two catalogs. Each catalog keeps its own pointer to the table's metadata, so writes through one never reach the other, and Dremio's snapshot expiry can delete files the other catalog still needs. Run the pilot on copies, and register each production table once, at cutover, after Dremio stops writing to and maintaining it.

### Do Dremio Reflections migrate to another platform?

No. Reflections are specific to Dremio, including the automatic query rewriting that uses them. On another platform you rebuild acceleration explicitly with pre-aggregated tables, partitioning and sort order, and compaction, and you should test the dashboards that matter most.

### Does the acquisition affect DORA compliance for Dremio customers?

It changes your third-party picture. Record the change of control in your DORA register of information, and update your concentration risk assessment (Article 29), especially if you already rely on SAP for other critical systems. Revisit exit terms at your next renewal, or sooner if your contract is transferred to SAP.

### Is there a self-hosted Dremio alternative for air-gapped environments?

IOMETE is a self-hosted lakehouse built on Apache Spark and Apache Iceberg that runs on Kubernetes inside your own infrastructure, including fully air-gapped environments.

Last updated on Oct 13, 2026

Older post

Comet in IOMETE 4.0: Same SQL, 42% Less Time
