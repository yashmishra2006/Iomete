<!-- source: https://iomete.com/roadmap/iomete-unified-multi-catalog | scraped 2026-11-01 -->

Page title: IOMETE
URL: https://iomete.com/roadmap/iomete-unified-multi-catalog

---

Home

Roadmap

IOMETE Enterprise Catalog

ROADMAP

# IOMETE Enterprise Catalog

Status

In-Progress

Last Updated

July 1, 2026

### Overview

##### Problem:

- Today you must choose one catalog per storage format (Iceberg, Hive-metastore, …).
- Hive Metastore only works under spark_catalog, is tied to a V1 API, and blocks us from modern security & lineage features.
- Teams therefore juggle multiple catalogs, duplicate grants, and can't query JSON/CSV/ORC tables alongside Iceberg in a single namespace.

##### What we are building:

- We are introducing Unity Catalog for IOMETE – a format-agnostic, V2-API data catalog that becomes the single source of truth for all tables (Iceberg, Parquet, JSON, CSV, ORC today; Hudi, Delta & others next).
- Any Spark catalog you create will be able to register heterogeneous tables without restrictions, so logical domains (e.g. finance, marketing) no longer leak physical storage choices.

##### Why this matters (Value)

| Theme  | Benefit

| Operational simplicity  | One catalog to deploy, back up, secure and monitor.

| Developer velocity  | Create a table in the best-fit format and query it instantly – no migration or re-registration.

| Governance  | Centralised RBAC & auditing across formats; paves the way for column-level lineage.

| Modern APIs  | Fully on the Spark Catalog V2 interface – no Hive classes on the classpath, no legacy config knobs.

### Planned Features

- Read/write support: Iceberg, Parquet, JSON, CSV, ORC
- Namespace & table-level ACLs via GRANT/REVOKE
- JDBC/ODBC discovery
- Migration utility: automatic import of existing Hive Metastore schemas into Unity
- Add Hudi & Delta tables
- Column-level lineage & tags
- Fine-grained privileges (column, row filter, mask)
- UI explorer inside IOMETE Console

BOOK A DEMO

## Starting with IOMETE is simple. Book a demo with us today.

The IOMETE data platform helps you achieve more. Book a personalized demo and experience the impact firsthand.

Get in touch
