<!-- source: https://iomete.com/resources/user-guide/table-maintenance/deployment | scraped 2026-11-01 -->

Page title: Kubernetes Deployment | IOMETE
URL: https://iomete.com/resources/user-guide/table-maintenance/deployment
Meta description: Tune the iom-maintenance service — resource limits and archival configuration.

---

- Table Maintenance (Beta)
- Deployment

On this page

# Kubernetes Deployment

This section covers deployment and tuning for Kubernetes administrators. The iom-maintenance service is always deployed, so there is no feature flag to enable.

## Resource Defaults

Tune CPU and memory limits for the iom-maintenance service via Helm:

```
services:
  maintenance:
    resources:
      requests:
        memory: "1000Mi"
        cpu: "2000m"
      limits:
        memory: "1000Mi"
        cpu: "2000m"

```

Requests and limits must match

Set requests and limits to the same values. Mismatched values can cause maintenance operations to run in loops.

## Archival Configuration

Completed maintenance runs are archived to Iceberg tables for long-term retention. Configure via Helm:

```
services:
  maintenance:
    archival:
      enabled: true
      retentionDays: 30

```

How archival works:

- Schedule: archival runs every hour.
- What moves: finished runs older than retentionDays are moved in batches of 500.
- Where they go: three Iceberg tables in spark_catalog.iomete_system_db:

- maintenance_evaluation_runs
- maintenance_execution_runs
- maintenance_sql_runs

note

Archived runs no longer appear in the console's run history. To see runs older than retentionDays, query the archive tables in the SQL Editor.

Previous

Run History & Metrics

Next

FAQs

## ON THIS PAGE

- Resource Defaults
- Archival Configuration
