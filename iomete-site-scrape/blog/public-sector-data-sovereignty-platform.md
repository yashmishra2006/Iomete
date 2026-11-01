<!-- source: https://iomete.com/resources/blog/public-sector-data-sovereignty-platform | scraped 2026-11-01 -->

Page title: Data sovereignty for the public sector: a platform blueprint | IOMETE
URL: https://iomete.com/resources/blog/public-sector-data-sovereignty-platform
Meta description: Public sector data sovereignty: how agencies build an analytics platform that keeps citizen data under national jurisdiction, plus the procurement exit test.

---

# Data sovereignty for the public sector: a platform blueprint

August 27, 2026 · 10 min read

Aytan Jalilova
Developer Advocate @ IOMETE

A tax authority, a health ministry, and a national statistics office have very different mandates and almost identical data problems. Each holds records on nearly every citizen, each is under pressure to do more analytics on them, and each has to answer one question that the private sector can often dodge: under whose law does this data sit?

That question is not solved by picking a region in a console. It is solved by architecture and procurement decisions made early, and it gets very expensive to revisit later.

## Residency is not sovereignty

The most common failure is treating a region selection as compliance. Data stored in-country, processed by a legal entity subject to another country's disclosure regime, remains reachable by that regime. The operator's jurisdiction travels with the service, not with the disk.

For a government agency the practical consequences are concrete. A lawful foreign order for records can arrive without the agency being notified. A sanctions decision can suspend a service the agency depends on. The EU Data Act tackles part of this by mandating switching and egress rights, but it does not change whose law reaches the operator. A pricing or licence change can arrive mid-budget-cycle with no alternative in reach. The legal distinction is unpacked in data residency vs data sovereignty, and the extraterritorial mechanics in the CLOUD Act reality check.

## The four questions to answer before procurement

Getting these into the tender document is worth more than any architecture diagram, because they are nearly impossible to negotiate afterwards.

- Who can technically read the data? Not who is contractually forbidden – who has a path. If a vendor operates the control plane, they have a path.
- Where do the encryption keys live, and who can rotate them? Keys held or escrowed by the operator make every other control conditional.
- What is the exit test? Not the exit clause. The test: if the contract ended tomorrow, what concrete steps read this data with a different engine, and how long do they take?
- What happens with no internet connection? Many public sector environments are air-gapped or intermittently connected by design. A platform that requires a call home to license, authenticate, or schedule will fail there.

## Architecture that answers them

The blueprint that satisfies all four is consistent across agencies, and it is not exotic.

Open table format as the sovereignty primitive. Apache Iceberg tables plus their metadata sit in the agency's own object storage. This is what makes question three answerable: the exit path is the storage layer itself, not a migration project. Any Iceberg-compatible engine can read the same files.

Compute on the agency's own Kubernetes. Deploying the engine inside infrastructure the agency runs means no external control plane holds a path to the data. It also means capacity planning is a budget exercise rather than a consumption risk – which matters more in public finance than it does commercially.

Keys in the agency's own KMS or HSM. Non-negotiable, and the single control that most cleanly separates a sovereign deployment from a hosted one.

Everything works offline. Licensing, authentication against the national identity provider, job scheduling, and upgrades all have to function inside an air-gapped network.

Classification-aligned storage zones. Public sector data classification schemes already exist and are usually stricter than the ones a platform ships with. Map buckets and catalogs to the existing scheme rather than inventing a parallel one.

Sovereign by architecture

IOMETE runs this inside your own perimeter: on-premises, private cloud, or air-gapped. Talk to a data architect→

## Where the analytical demand actually comes from

Sovereignty is the constraint. The demand is elsewhere, and it is usually one of these:

- Cross-register matching – linking tax, customs, property, and business registers to find inconsistencies. High value, high political sensitivity, and impossible to do safely without row-level access control.
- Fraud and leakage detection – historically batch and rules-based, moving toward models that need far more data than the rules did.
- Service delivery analytics – how long a permit, refund, or benefit actually takes, measured from real event data rather than reported by the department that owns the target.
- Statistical production – reproducibility is the requirement here. Which exact version of the data produced this published figure, two years ago?

Each of these needs governed joins across datasets owned by different departments. That is a governance design problem more than a technology one, and it is where data governance for the modern data stack is worth reading before the first pipeline is written.

## The reproducibility requirement

Statistical and audit obligations impose something most commercial platforms treat as optional: the ability to reconstruct exactly what a query saw at a point in time. Iceberg's snapshot model handles this natively – every table change creates a snapshot, and queries can be run against a specific snapshot ID or timestamp.

Two practical consequences. First, snapshot retention becomes a compliance parameter, not a storage optimization – expiring snapshots after seven days quietly destroys the ability to reproduce a published figure. Second, table maintenance has to be deliberate, because compaction and snapshot expiry interact with retention. The operational reality of that is covered in the hidden debt in lakehouse tables.

## How IOMETE maps to the blueprint

IOMETE is a sovereign data platform deployed on the agency's own Kubernetes clusters, including fully air-gapped environments. There is no external control plane: the catalog, the Spark compute, and the platform services all run inside the agency's infrastructure, and encryption keys stay in the agency's own key management system.

Tables are Apache Iceberg on S3-compatible storage the agency administers, so the exit test is answered by the storage layer rather than by a contractual clause. Access control – row-level filters, dynamic column masking, and tag-based grants – is enforced inside the query engine, which is what makes cross-register analytics defensible when different departments have different rights over the same joined table. Deployment options cover single-cluster, multi-data-center, and disconnected topologies.

Operations are handled by IOMETE's Field Data Engineers, which addresses the constraint that limits most public sector platform projects: the platform engineering skills required to run Kubernetes at this level are hard to hire and harder to retain on public sector pay scales.

## Start with the exit test

If you take one thing into the next procurement meeting, make it question three. Ask every vendor to describe, in concrete steps, how the agency reads its own data with a different engine after the contract ends. The answers separate architectures faster than any feature comparison, and they are much harder to answer with a slide.

## FAQ

## Frequently Asked Questions

### What is data sovereignty in the public sector?

Data sovereignty means citizen and government data is governed under national law and stays under the technical control of the agency holding it. Architecture narrows exposure but cannot by itself settle every applicable jurisdiction: contracts, support access paths, and data-subject rules still count.

It is a stronger requirement than residency, which concerns only where bytes are physically stored – an in-country deployment operated by a foreign entity is still exposed to that entity's jurisdiction. IOMETE addresses this by deploying entirely inside the agency's own Kubernetes clusters, with encryption keys held in the agency's key management system.

### Can a data lakehouse run in an air-gapped government network?

Yes, provided every component functions without outbound connectivity. Licensing, authentication, job scheduling, and upgrades all have to work offline.

The usual failure is a platform that phones home for licence validation or telemetry, which stops the whole system in a disconnected network. IOMETE supports fully air-gapped deployment on the customer's own Kubernetes clusters, with no external control plane involved in running queries.

### What is an exit test for a government data platform?

An exit test is a concrete demonstration that the agency can read and process its own data with a different engine after a contract ends – measured in steps and elapsed time, not described in a clause.

Proprietary storage formats make this expensive because leaving requires a full export and re-ingestion. IOMETE stores all data as Apache Iceberg tables in object storage the agency administers, so the same files remain readable by any Iceberg-compatible engine.

### How do agencies share data across departments without over-exposing it?

By enforcing row-level and column-level policies in the query engine, so one governed table can serve departments with different rights rather than being copied into departmental extracts.

Copies are where cross-department sharing usually breaks down: each extract is a new place data can leak and a new thing to govern. IOMETE evaluates row-level filters and dynamic column masking inside the Spark engine, so the same table returns different results depending on the requesting identity.

### How is a published statistic reproduced years later?

By querying the exact table snapshot the original calculation ran against. Every table change creates a snapshot that can be queried by ID or timestamp.

This makes snapshot retention a compliance parameter rather than a storage setting – expiring snapshots aggressively destroys reproducibility. IOMETE runs on Apache Iceberg, whose snapshot model provides this natively, with table maintenance and expiry configured per table.

### Does a self-hosted platform require a large in-house platform team?

Not necessarily. Self-hosting the infrastructure is a separate question from who operates it day to day.

This distinction matters most in public sector organizations, where deep Kubernetes skills are difficult to hire and retain. IOMETE's Field Data Engineers can handle cluster operations while the agency's data team works with SQL, jobs, and notebooks. For that to survive the first procurement question, the contract has to spell out the access model: operator access granted by the agency and time-boxed rather than standing, sessions logged where the agency can audit them, and the agency's key management system outside the operator's reach, so running the platform never becomes a path to reading the data.

Last updated on Aug 27, 2026

Newer post

On-premises lakehouse reference architecture for banks

Older post

Control Plane vs Data Plane in Kubernetes and IOMETE
