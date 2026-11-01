<!-- source: https://iomete.com/resources/user-guide/table-maintenance/faqs | scraped 2026-11-01 -->

Page title: Table Maintenance FAQs | IOMETE
URL: https://iomete.com/resources/user-guide/table-maintenance/faqs
Meta description: Frequently asked questions about IOMETE table maintenance — configuration, troubleshooting, and operational behavior.

---

- Table Maintenance (Beta)
- FAQs

# Table Maintenance FAQs

## Frequently Asked Questions

### I saved my configuration but nothing changed. Why?

Configuration changes can take up to 1 minute to take effect. The detection pipeline caches table configuration with a 1-minute TTL, so newly saved settings apply after the next cache refresh.

### Why can't I configure maintenance for my catalog?

Maintenance is supported only for IOMETE-managed internal Iceberg REST catalogs. Unsupported catalog types include spark_catalog, external catalogs (not managed by IOMETE), non-Iceberg catalogs, and non-REST Iceberg implementations.

If your catalog falls into one of these categories, you'll need to use a supported catalog type. See the Prerequisites section for the full requirements.

### Why are maintenance controls disabled?

The catalog might not have an owner domain assigned. All maintenance resources (compute clusters and service accounts) are scoped to the owner domain, so one must be assigned before maintenance can be configured.

See Catalog Owner Domain to assign one.

### Why can't I enable table maintenance?

Catalog-level maintenance must be enabled before table maintenance can be turned on. The catalog setting acts as a master switch: table-level operations will not run until catalog maintenance is enabled.

See Catalog-Level Configuration.

### Table not found or not accessible?

This usually means the table doesn't exist in the selected catalog, or your account doesn't have the required permissions to access it.

Verify the table exists, confirm you're looking in the right catalog, and check that your domain owns the catalog.

### What happens if the catalog owner domain is changed?

Changing or removing the owner domain disables maintenance, and resources from the previous domain no longer apply. After the change, re-enable maintenance and select new resources under the new owner domain.

### Can concurrent writes affect maintenance operations?

Yes, in two ways:

Commit failures. Iceberg uses optimistic concurrency control. Maintenance operations rewrite files and attempt to commit a new snapshot. If concurrent writes modify the table before the commit completes, the operation may fail because the snapshot has changed. Iceberg may automatically retry metadata-only conflicts, but data conflicts (for example, compaction overlapping with streaming writes to the same partition) can cause the operation to fail. The maintenance service retries the operation on the next cycle.

Metric discrepancies. Before-and-after metrics are captured at job start and completion. If concurrent writes occur during the run, the recorded metrics may reflect those writes in addition to the maintenance operation. This is expected behavior for tables with frequent writes.

Both cases are uncommon under normal workloads but are more likely for tables with continuous streaming ingestion.

### Why did a pending job fail without ever running?

Jobs that remain in PENDING for more than 24 hours are automatically marked as failed. This prevents stale jobs from accumulating.

Rewrite Data Files and Rewrite Manifest Files run as SQL on the compute cluster and have a separate limit: they're marked as failed if they stay pending or running for more than 6 hours.

### Why isn't the history table updating automatically?

The history table does not auto-refresh. Status changes (for example PENDING → RUNNING → COMPLETED) are not pushed to the page automatically.

Use the Refresh button to load the latest job status. Real-time updates are planned for a future release.

### Does the system retry failed maintenance operations?

Yes. When a maintenance operation fails (for example, due to commit conflicts from concurrent writes), the system automatically returns the job to PENDING and retries it.

Up to 3 retries are attempted. If all retries fail, the operation moves to FAILED and is not retried automatically. You can view the retry count in the Retries column of the maintenance run history.

Some failures are never retried: orphan cleanup safety aborts (such as the 30% orphan threshold) and failures from invalid thresholds move straight to FAILED.

### Orphan cleanup aborted — orphan percentage threshold exceeded. What should I do?

The operation aborts if orphan files exceed 30% of total files. This safeguard prevents accidental mass deletion.

First, check for misconfiguration or data corruption — a high orphan ratio is unusual under normal conditions. Once verified, run remove_orphan_files manually via the SQL Editor to clean up the files directly.

### Why don't I see any maintenance runs for my table?

Maintenance follows detect → evaluate → execute pipeline. The system first detects tables that have changed, then evaluates whether any operation is actually needed based on the configured thresholds. Only when a table exceeds a threshold (e.g., too many small files, too many snapshots) does the system create an execution entry that appears in the History tab.

Each operation is evaluated independently — a table may qualify for one but not another. If none of the operations find a threshold exceeded, no run is created.

Also note that only tables with recent changes are evaluated. If the table hasn't been modified since the last maintenance cycle, it won't be picked up for evaluation at all.

If needed, you can always manually trigger an operation to run it on demand.

### Why are some files skipped during orphan file cleanup?

There are two common reasons:

1. File is newer than the retention period. Orphan cleanup only deletes files older than the configured Older Than threshold (minimum 3 days). Files newer than this are skipped even if they appear unreferenced — they may belong to in-progress operations that haven't committed yet.

2. File belongs to an active Flink job. If the table is written by a Flink streaming job, orphan cleanup skips files belonging to that job. Flink temporarily stores checkpoint data as metadata files before committing them to a snapshot. These files may appear unreferenced but deleting them would corrupt the Flink job state. IOMETE reads the flink.job-id from snapshot summaries and excludes metadata files whose names match that job ID. This exclusion applies only to metadata files — data files written by Flink are not affected.

Previous

Deployment

Next

IOMETE SQLAlchemy
