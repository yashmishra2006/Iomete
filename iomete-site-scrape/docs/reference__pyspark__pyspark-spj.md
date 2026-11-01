<!-- source: https://iomete.com/resources/reference/pyspark/pyspark-spj | scraped 2026-11-01 -->

Page title: Storage Partitioned Joins | IOMETE
URL: https://iomete.com/resources/reference/pyspark/pyspark-spj
Meta description: Joining large tables efficiently

---

- Pyspark
- Storage Partitioned Joins (SPJ)

On this page

# Storage Partitioned Joins

One of the most common query types in data warehouses is fact-to-dimension joins. In most cases, dimension tables are small enough to use broadcast joins, which avoids shuffling large fact tables. However, sometimes it is needed to join fact tables with each other. When joining two large datasets, broadcast joins are not an option. Since shuffling two large datasets is too costly, we will explain how storage-partitioned joins can optimize this computation.

## Shuffle

To join two large datasets, Spark needs to bring related records together based on the join key(s). It does this by reading both tables, partitioning the datasets into equal chunks, and writing them to disk as intermediate data. In the next stage, Spark reads matching chunk IDs from both intermediate storage locations (local disk of executors) and joins the records. Grouping data like that is called shuffling, and spark uses the shuffling mechanism for joining datasets (e.g. Shuffle-SortMergeJoin, Shuffle-HashJoin).

## Iceberg Bucketing

Iceberg supports creating bucketed tables.

```
CREATE TABLE table_a(
    id INT,
    name STRING,
    ...
)
USING iceberg
CLUSTERED BY (id)
INTO 256 BUCKETS;

```

or, equivalent:

```
CREATE TABLE table_a(
    id INT,
    name STRING,
    ...
)
USING iceberg
PARTITIONED BY(BUCKET(256, id));

```

In the example above Iceberg applies a hash function to the values of id column, modulus it with 256 , and stores the data as 256 buckets.

If another table is created like:

```
CREATE TABLE table_b(
    id INT,
    address STRING,
    ...
)
USING iceberg
CLUSTERED BY (id)
INTO 256 BUCKETS;

```

due to the number of buckets are the same (256), Iceberg ensures that the rows from table_a and table_b with the same id will be located in the same bucket number.

## SPJ

Storage partitioned join (SPJ) in Spark enables shuffle-free joins by aligning table partitions on disk. Given that source tables are already bucketed Spark does not need to do the shuffle step described above, take advantage of the pre-bucketed tables on the storage.

```
SELECT
    a.id,
    a.name,
    a.address
FROM table_a as a
JOIN table_b as b USING (id);

```

Taking advantage of the pre-bucketed table, and avoiding costly shuffle step can speed up the queries, as well as reduce resource (CPU, Memory, Disk, Network) usage significantly.

It is required to configure Spark and Iceberg engine accordingly to let the optimizer take advantage of the source bucketing.

```
-- Is used to enable bucketing for V2 data sources. When turned on,
-- Spark will recognize the specific distribution reported by a V2 data source (ex. Iceberg)
-- through SupportsReportPartitioning, and will try to avoid shuffle if necessary.
SET spark.sql.sources.v2.bucketing.enabled=true;


-- When true, co-locate scan tasks for the same partition in the same read split,
-- used in Storage Partitioned Joins
SET `spark.sql.iceberg.planning.preserve-data-grouping`=true;

```

note

It is required tables on both side of the join clustered on the join keys to the same number of buckets to be able to use SPJ.

Previous

Joins

Next

Getting Started

## ON THIS PAGE

- Shuffle
- Iceberg Bucketing
- SPJ
