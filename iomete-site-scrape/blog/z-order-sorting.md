<!-- source: https://iomete.com/resources/blog/z-order-sorting | scraped 2026-11-01 -->

Page title: Z-ORDER sorting during compaction | IOMETE
URL: https://iomete.com/resources/blog/z-order-sorting
Meta description: to force the whole dataset sorting during compaction to be ordered using Z-ORDER, you can use the following steps

---

# Z-ORDER sorting during compaction

October 25, 2023 · 3 min read

Aytan Jalilova
Developer Advocate @ IOMETE

Apache Iceberg supports Z-ORDER sorting during compaction (rewrite_data_files), but not during normal inserts or as a create table configuration.

To force the whole dataset to be ordered using Z-ORDER, you can use the following steps:

Set a default WRITE ORDERED BY for the table.

```
ALTER TABLE db.table_name WRITE ORDERED BY (col1, col2);

```

Perform a rewrite_data_files operation with the sort strategy specified and rewrite-all option set to true.

```
CALL spark_catalog.system.rewrite_data_files(
    table => 'db.table_name',
    strategy => 'sort',
    sort_order => 'zorder(col1, col2)',
    options => map('rewrite-all', 'true')
);

```

### Discovering the data lakehouse platform?
Talk to us

Additional notes

- It is important to note that rewriting the whole dataset can be a very expensive operation, so it is important to only do this when necessary.
- It is also worth noting that there is an open issue on GitHub to add support for Z-ORDER sorting during normal inserts.

## Frequently Asked Questions

### What is Z-ORDER sorting in Apache Iceberg?

Z-ORDER is a multi-dimensional sorting technique that clusters related values across several columns so that queries filtering on those columns scan fewer data files. In Apache Iceberg, Z-ORDER is applied during compaction through the rewrite_data_files procedure rather than on insert. This layout improves query performance for workloads that filter on multiple columns at once. Iceberg is the table format underneath IOMETE, where these maintenance procedures are available.

### When does Iceberg apply Z-ORDER sorting?

Iceberg applies Z-ORDER only during compaction via rewrite_data_files, not during normal inserts or as a create-table setting. To sort an entire dataset, you set a default WRITE ORDERED BY on the table, then run rewrite_data_files with the sort strategy and the rewrite-all option set to true. Support for Z-ORDER on normal inserts is tracked as an open Iceberg issue. These compaction operations run on the Apache Spark engine that IOMETE uses.

### Is rewriting an entire Iceberg dataset expensive?

Yes, rewriting a whole dataset with rewrite-all set to true reads and rewrites every data file, which makes it a costly operation on large tables. Because of this, full re-sorts are best run only when query patterns genuinely benefit from the new layout. Many teams schedule such maintenance during low-traffic windows. Running Iceberg maintenance on a platform like IOMETE lets you control when these compaction jobs execute against your data.

### How does table compaction improve query performance?

Compaction rewrites many small data files into fewer, larger ones and can reorder rows, which reduces the number of files a query must open and scan. Combined with a sort strategy like Z-ORDER, it clusters related data so filters skip irrelevant files. The result is faster reads and lower I/O on large tables. IOMETE exposes Iceberg compaction and sorting as maintenance operations on tables in its lakehouse.

Last updated on Oct 22, 2026

Newer post

On-Prem vs Cloud Data Lakehouse: Cost, Control, Compliance

Older post

How to optimize SQL query?
