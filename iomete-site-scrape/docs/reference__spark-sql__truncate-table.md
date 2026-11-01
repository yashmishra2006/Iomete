<!-- source: https://iomete.com/resources/reference/spark-sql/truncate-table | scraped 2026-11-01 -->

Page title: Truncate Table | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/truncate-table
Meta description: Remove all rows from a table or partition(s) with TRUNCATE TABLE statement. Learn syntax, parameters, and examples for easy table truncation in this comprehensive documentation

---

- Spark SQL Reference
- Writes
- Truncate Table

On this page

# Truncate Table

The TRUNCATE TABLE statement removes all the rows from a table or partition(s).

The table must not be a view or an external table. In order to truncate multiple partitions at once, the user can specify the partitions in partition_spec. If no partition_spec is specified it will remove all partitions in the table.

## Syntax

```
TRUNCATE TABLE table_name [PARTITION partition_spec];

```

## Parameters

table_name The name of an existing table.PARTITION ( partition_spec :[ partition_column = partition_col_value, partition_column = partition_col_value, ...] ) Specifies one or more partition columns and value pairs. The partition value is optional.

## Examples

```
--Create table Student with partition
CREATE TABLE Student ( name String, rollno INT) PARTITIONED BY (age int);

SELECT * from Student;
+-------+---------+------+--+
| name  | rollno  | age  |
+-------+---------+------+--+
| ABC   | 1       | 10   |
| DEF   | 2       | 10   |
| XYZ   | 3       | 12   |
+-------+---------+------+--+

-- Removes all rows from the table in the partion specified
TRUNCATE TABLE Student partition(age=10);

--After truncate execution, records belonging to partition age=10 are removed
SELECT * from Student;
+-------+---------+------+--+
| name  | rollno  | age  |
+-------+---------+------+--+
| XYZ   | 3       | 12   |
+-------+---------+------+--+

-- Removes all rows from the table from all partitions
TRUNCATE TABLE Student;

SELECT * from Student;
+-------+---------+------+--+
| name  | rollno  | age  |
+-------+---------+------+--+
+-------+---------+------+--+
No rows selected

```

Previous

Create View

Next

Insert Into

## ON THIS PAGE

- Syntax
- Parameters
- Examples
