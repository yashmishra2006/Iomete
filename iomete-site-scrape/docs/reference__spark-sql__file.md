<!-- source: https://iomete.com/resources/reference/spark-sql/file | scraped 2026-11-01 -->

Page title: File | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/file
Meta description: By utilizing the "USING FILE" syntax, you can directly query a file in a specified format using SQL, streamlining the interaction with structured data.

---

- Spark SQL Reference
- Queries
- File

On this page

# File

You can query a file with a specified format directly with SQL.

## Syntax

```
file_format.`file_path`

```

## Parameters

file_format

Specifies a file format for a given file path, could be TEXTFILE, ORC, PARQUET, etc.

file_path

Specifies a file path with a given format.

## Examples

```
-- PARQUET file
SELECT * FROM parquet.`examples/src/main/resources/users.parquet`;
+------+--------------+----------------+
|  name|favorite_color|favorite_numbers|
+------+--------------+----------------+
|Alyssa|          null|  [3, 9, 15, 20]|
|   Ben|           red|              []|
+------+--------------+----------------+

-- ORC file
SELECT * FROM orc.`examples/src/main/resources/users.orc`;
+------+--------------+----------------+
|  name|favorite_color|favorite_numbers|
+------+--------------+----------------+
|Alyssa|          null|  [3, 9, 15, 20]|
|   Ben|           red|              []|
+------+--------------+----------------+

-- JSON file
SELECT * FROM json.`examples/src/main/resources/people.json`;
+----+-------+
| age|   name|
+----+-------+
|null|Michael|
|  30|   Andy|
|  19| Justin|
+----+-------+

```

Previous

Inline Table

Next

JOIN

## ON THIS PAGE

- Syntax
- Parameters
- Examples
