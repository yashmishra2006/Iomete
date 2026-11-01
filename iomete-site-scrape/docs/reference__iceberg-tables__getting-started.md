<!-- source: https://iomete.com/resources/reference/iceberg-tables/getting-started | scraped 2026-11-01 -->

Page title: Getting started with Apache Iceberg | IOMETE
URL: https://iomete.com/resources/reference/iceberg-tables/getting-started
Meta description: Starting Apache Spark as a compute engine, with Apache Iceberg provider with additional optimization and packaging

---

- Iceberg Tables
- Getting Started

On this page

# Getting started with Apache Iceberg

IOMETE uses Apache Spark as a compute engine, with Apache Iceberg provider with additional optimization and packaging.

## Apache Iceberg

Apache Iceberg is an open table format for huge analytic datasets. It provides a rich feature set:

- ACID transactions and insert/merge/delete
- Schema evolution supports add, drop, update, or rename, and has no side-effects
- Hidden partitioning prevents user mistakes that cause silently incorrect results or extremely slow queries
- Partition layout evolution can update the layout of a table as data volume or query patterns change
- Time travel enables reproducible queries that use exactly the same table snapshot, or lets users easily examine changes
- Version rollback allows users to quickly correct problems by resetting tables to a good state

info

Iceberg is the default provider. That means the followings have the same effect:

- create table test1(id string);
- create table test1(id string) using iceberg;

### Creating a table

```
CREATE TABLE table1 (id bigint, data string);

```

Iceberg supports the full range of SQL DDL commands, including:

- CREATE TABLE ... PARTITIONED BY
- CREATE TABLE ... AS SELECT
- ALTER TABLE
- DROP TABLE

### Writing

Once your table is created, insert data using INSERT INTO:

```
INSERT INTO table1 VALUES (1, 'a'), (2, 'b'), (3, 'c');
INSERT INTO table1 SELECT id, data FROM source WHERE length(data) = 1;

```

Row-level SQL updates using MERGE INTO and DELETE FROM:

```
MERGE INTO local.db.target t USING (SELECT * FROM updates) u ON t.id = u.id
WHEN MATCHED THEN UPDATE SET t.count = t.count + u.count
WHEN NOT MATCHED THEN INSERT *

```

### Reading

```
SELECT count(1) as count, data
FROM table1
GROUP BY data

```

To view all of the snapshots in a table, use the snapshots metadata table:

```
SELECT * FROM default.table1.snapshots

```

| committed_at | snapshot_id | parent_id | operation | manifest_list

| 2019-02-08 03:29:51.215 | 57897183625154 | null | append | s3://.../table/metadata/snap-57897183625154-1.avro

| ... | ... | ... | ... | ...

Previous

Oracle Data Source

Next

DDL

## ON THIS PAGE

- Apache Iceberg

- Creating a table
- Writing
- Reading
