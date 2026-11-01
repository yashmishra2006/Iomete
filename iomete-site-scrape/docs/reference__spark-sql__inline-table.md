<!-- source: https://iomete.com/resources/reference/spark-sql/inline-table | scraped 2026-11-01 -->

Page title: Inline Table | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/inline-table
Meta description: An inline table is a transient table generated through a VALUES clause, providing a convenient way to create temporary data structures in SQL.

---

- Spark SQL Reference
- Queries
- Inline Table

On this page

# Inline Table

An inline table is a temporary table created using a VALUES clause.

## Syntax

```
VALUES ( expression [ , ... ] ) [ table_alias ]

```

## Parameters

expression

Specifies a combination of one or more values, operators and SQL functions that results in a value.

table_alias

Specifies a temporary name with an optional column name list.

Syntax: [ AS ] table_name [ ( column_name [ , ... ] ) ]

## Examples

```
-- single row, without a table alias
SELECT * FROM VALUES ("one", 1);
+----+----+
|col1|col2|
+----+----+
| one|   1|
+----+----+

-- three rows with a table alias
SELECT * FROM VALUES ("one", 1), ("two", 2), ("three", null) AS data(a, b);
+-----+----+
|    a|   b|
+-----+----+
|  one|   1|
|  two|   2|
|three|null|
+-----+----+

-- complex types with a table alias
SELECT * FROM VALUES ("one", array(0, 1)), ("two", array(2, 3)) AS data(a, b);
+---+------+
|  a|     b|
+---+------+
|one|[0, 1]|
|two|[2, 3]|
+---+------+

```

Previous

Hints

Next

File

## ON THIS PAGE

- Syntax
- Parameters
- Examples
