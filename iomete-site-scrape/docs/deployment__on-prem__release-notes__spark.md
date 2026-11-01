<!-- source: https://iomete.com/resources/deployment/on-prem/release-notes/spark | scraped 2026-11-01 -->

Page title: IOMETE Spark Release Notes | IOMETE
URL: https://iomete.com/resources/deployment/on-prem/release-notes/spark
Meta description: Release notes for IOMETE Spark images. Learn about new features, improvements, security updates, and bug fixes in each Spark image release.

---

- Deployment
- Release Notes
- Spark

On this page

# IOMETE Spark Release Notes

#### Sign Up for Product Updates and Release Notes

You'll receive notifications about new features, improvements, and important updates.

Subscribe

Unsubscribe at any time.

IOMETE Spark images ship on their own cadence, independent of platform releases. This page tracks changes between Spark image versions, newest first across all supported Spark lines.

October 1, 2026

## Spark - v4.1.3-v1

The first release of the Spark 4 line.

### 🚀 New Features

- Initial support for Spark 4.
- Initial support for Iceberg 1.11, including format V3.
- Initial support for Comet 1.0.0.

### ⚡ Improvements

- Security Updates: Security-related upgrades to bundled dependencies, including the Ranger plugin and the PostgreSQL JDBC driver.
- Includes every fix and improvement shipped in 3.5.7-v7.

October 1, 2026

## Spark - v3.5.7-v7

A fix for data-security policies that stopped refreshing on long-running clusters, correct query-to-cluster attribution in multi-data-plane deployments, and Spark History Server reliability fixes.

### ⚡ Improvements

- Multi-Cluster Query Attribution: In deployments with more than one data plane, SQL monitoring (V2) now links each query to the Spark UI on the data plane that actually ran it. Previously these links could point at the wrong data plane.

### 🐛 Bug Fixes

- Data-Security Policies Stopped Refreshing: A compute cluster could stop picking up data-security policy changes after a brief interruption of the identity service, and only a restart brought it back. The Ranger plugin is upgraded from 2.4.0 to 2.8.0, which carries the upstream fix. Audit output is unchanged.
- Driver Logs Silenced: An older SLF4J bundled with the catalog extension shadowed Spark's logging and left driver logs empty. It is no longer bundled, so driver logs are back.
- Spark History Server — Storage Failures No Longer Hidden: When object-storage access fails, the history server now surfaces the real storage error instead of reporting the application as "not found," so storage incidents are no longer misdiagnosed as missing Spark applications.
- Spark History Server — Recovery from an Unusable Storage Client: The history server now detects when its storage client has become locally unusable and recovers without a manual pod restart, while still correctly distinguishing this from a genuine object-storage (S3/ECS) outage. Filesystem resources are also reliably released on shutdown.

August 19, 2026

## Spark - v3.5.7-v6

Security policy support for Iceberg-specific queries and clearer external catalog errors.

### ⚡ Improvements

- Security policy support for Iceberg-specific queries.
- Security policy enforcement is now enabled by default and can not be disabled with the rangerEnabled flag.

### 🐛 Bug Fixes

- External Catalog Authentication Errors: Queries against an external catalog with an expired or invalid token now return a clear authentication error instead of a generic internal error.
- Spark History Server OOM on Large Event Logs: The history server no longer attempts to rebuild oversized event logs that exceed the configured size limit (spark.history.fs.maxEventLogSizeBytes, default 500MB), preventing OOM crashes caused by long-running apps with large logs.
- Spark History Server Crash on Missing Subfolder: The Spark History server now auto-creates its required S3 subfolder if it is missing, instead of failing with a startup error.
- View Authorization with Subqueries: Queries against a view now succeed when the user has access to the view but not to its underlying tables, even when the view definition contains a subquery (for example an aggregate or scalar subquery). Previously the subquery was authorized separately and the query was denied.

August 7, 2026

## Spark - v3.5.7-v5

A hotfix for 3.5.7-v4. Upgrade if you are running 3.5.7-v4.

### 🐛 Bug Fixes

- Driver and Executor Startup Crashes: The Netty 4.1.135.Final upgrade shipped in 3.5.7-v4 conflicted with Netty classes pulled in by upstream jars, so driver and executor pods crashed on startup non-deterministically — roughly half of all attempts, on clean computes. Netty is reverted to 4.1.100.Final, which restores reliable startup. The conflicting classes come from jars outside IOMETE's control, so 4.1.135.Final could not be kept. Note the trade-off: this reopens the 11 Netty CVEs that 3.5.7-v4 closed.
- Audit Events Lost on Shutdown: Pending audit events are now flushed when the JVM shuts down, instead of being dropped.

August 5, 2026

## Spark - v3.5.7-v4

A maintenance and hardening release: catalog session-lifecycle fixes, finer-grained authorization, and a broad round of security patches across bundled dependencies.

### ⚡ Improvements

Iceberg Branch/Tag Authorization: Branch and tag operations are now authorized against the base table.

Column-Level Authorization: Source columns referenced in expressions and predicates are now authorized, closing a gap in column-level access control.

Iceberg Runtime: Upgraded to Iceberg 1.9.0-iomete-5, which restores iceberg-build.properties in the published jars and drops a shaded log4j 2.20.0 from iceberg-aws-bundle.

Security Updates: Patched multiple bundled dependencies — log4j 2.25.4 (CVE-2026-34480, CVE-2026-34481), Netty 4.1.135.Final (fixes 11 CVEs), Parquet 1.15.2 (CVE-2025-46762), GCS connector 4.0.4 (CVE-2024-7254), jetty-util 9.4.58.v20250814, MySQL Connector/J 8.2.0 (CVE-2023-22102), and MSSQL/PostgreSQL JDBC drivers (CVE-2025-59250, CVE-2026-42198).

Configurable Catalog Sync Interval: Compute clusters refreshed their catalog configuration on a fixed 10-second tick. The interval is now configurable with spark.iomete.catalogUpdates.interval, so deployments with many catalogs or an external REST catalog can widen it and reduce both driver connection churn and load on core services. Stop the cluster, then add it under Spark config on the Configurations tab. To apply it to every cluster at once, use Global Spark Settings instead; a per-cluster value overrides the global one. Values accept ISO-8601 or short forms (PT5M, 1m, 30s) and default to 10 seconds, which preserves the previous behavior. Values below the 5-second floor are raised to it with a warning, an unparseable value falls back to the default rather than failing the driver, and the effective interval is logged at driver startup.

Compute Driver Socket Exhaustion Detection: A new driver health check samples the driver's ephemeral TCP port usage, logs a warning at 85% and reports the cluster unhealthy at 95%, so the Spark liveness probe restarts a stuck driver automatically instead of leaving it to silently fail queries. The check runs only on the driver and is enabled by default. Keys below omit the spark.iomete.healthChecks.ephemeralPorts. prefix.

| Key | Default | Description

| enabled | true | Whether the check runs.

| initialDelayMilliseconds | 30000 | Wait before the first run.

| checkIntervalMilliseconds | 60000 | Period between runs.

| warnThresholdPercent | 85 | Port usage at which a warning is logged.

| unhealthyThresholdPercent | 95 | Port usage at or above which the driver reports unhealthy.

| warnRepeatIntervalSeconds | 1800 | Minimum gap between repeated warnings while usage stays high.

Invalid thresholds (warn at or above unhealthy, or outside 0-100) fall back to 85 and 95.

### 🐛 Bug Fixes

- External Catalog Connection Leak: Per-session Iceberg REST catalogs were not released when a session ended, so long-running compute clusters could exhaust ephemeral ports and stop servicing queries with BindException: Cannot assign requested address, recoverable only by restarting the cluster. Catalogs are now closed across all session paths — Arrow Flight, Thrift closeSession, and Spark Connect session expiry — and when a catalog is dropped by auto-sync.
- Partial Catalog Failures in Schema/Table Listing: getSchemas/getTables requests could fail entirely if any one federated catalog was down, even when only some catalogs were affected. Broken catalogs (or namespaces) are now isolated and skipped during unfiltered listings, while an explicitly requested catalog still surfaces its error. A single broken table's schema no longer drops the rest of the table listing either.

August 5, 2026

## Spark - v3.5.5-v16

A maintenance release that backports the catalog session-lifecycle fixes and operational health checks from the 3.5.7 line to the 3.5.5 image.

### ⚡ Improvements

- Configurable Catalog Sync Interval: Compute clusters refreshed their catalog configuration on a fixed 10-second tick. The interval is now configurable with spark.iomete.catalogUpdates.interval, so deployments with many catalogs or an external REST catalog can widen it. Stop the cluster, then add it under Spark config on the Configurations tab, or use Global Spark Settings to cover every cluster. Values accept ISO-8601 or short forms (PT5M, 1m, 30s) and default to 10 seconds; values below the 5-second floor are raised to it with a warning.
- Compute Driver Socket Exhaustion Detection: A new driver health check samples the driver's ephemeral TCP port usage, logs a warning at 85% and reports the cluster unhealthy at 95%, so the Spark liveness probe restarts a stuck driver automatically instead of leaving it to silently fail queries. The check runs only on the driver and is enabled by default, with the same spark.iomete.healthChecks.ephemeralPorts. keys and defaults listed under 3.5.7-v4 above.

### 🐛 Bug Fixes

- External Catalog Connection Leak: Per-session Iceberg REST catalogs were not released when a session ended, so long-running compute clusters could exhaust ephemeral ports and stop servicing queries with BindException: Cannot assign requested address, recoverable only by restarting the cluster. Catalogs are now closed across all session paths — Arrow Flight, Thrift closeSession, and Spark Connect session expiry — and when a catalog is dropped by auto-sync.
- Partial Catalog Failures in Schema/Table Listing: getSchemas/getTables requests could fail entirely if any one federated catalog was down, even when only some catalogs were affected. Broken catalogs (or namespaces) are now isolated and skipped during unfiltered listings, while an explicitly requested catalog still surfaces its error. A single broken table's schema no longer drops the rest of the table listing either.

July 13, 2026

## Spark - v3.5.7-v2.1

Security update for the IOMETE Spark image.

### ⚡ Improvements

- Security Updates: Patched multiple security vulnerabilities across bundled dependencies.
- JDBC Driver Upgrades: PostgreSQL 42.7.2 → 42.7.13, MySQL Connector/J 8.0.33 → 8.2.0, and Microsoft SQL Server 12.2.0 → 12.2.1.

June 12, 2026

## Spark - v3.5.7-v3

Re-enables the Enterprise Catalog for the 4.x platform and improves external JDBC catalog support.

### ⚡ Improvements

- Enterprise Catalog: Re-enabled the Enterprise Catalog for the 4.x platform release.
- Optional S3 Credentials: S3 credentials are now optional in CredentialUtil, allowing instance/role-based S3 authentication.
- Oracle Dialect Registration: Moved Oracle JDBC dialect registration from the SQL extension to the Spark plugin for more reliable registration.

Previous

Platform

Next

Marketplace Jobs

## ON THIS PAGE

- v4.1

- v4.1.3-v1Oct 1, 2026

- v3.5

- v3.5.7-v7Oct 1, 2026
- v3.5.7-v6Aug 19, 2026
- v3.5.7-v5Aug 7, 2026
- v3.5.7-v4Aug 5, 2026
- v3.5.5-v16Aug 5, 2026
- v3.5.7-v2.1Jul 13, 2026
- v3.5.7-v3Jun 12, 2026
