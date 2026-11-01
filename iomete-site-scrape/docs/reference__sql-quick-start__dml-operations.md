<!-- source: https://iomete.com/resources/reference/sql-quick-start/dml-operations | scraped 2026-11-01 -->

Page title: DML Operations | IOMETE
URL: https://iomete.com/resources/reference/sql-quick-start/dml-operations
Meta description: This SQL script illustrates common queries and DML operations in IOMETE, utilizing Spark SQL and Iceberg. It encompasses database and table creation, data insertion, update and deletion operations and table descriptions.

---

- SQL Quick Start
- DML Operations

On this page

# DML Operations

### Common queries and DML operations (IOMETE SparkSQL and Iceberg)

This SQL script illustrates common queries and DML operations in IOMETE, utilizing Spark SQL and Iceberg. It encompasses database and table creation, data insertion, update and deletion operations and table descriptions.

Let's create a database and some sample tables for the queries

```
CREATE DATABASE IF NOT EXISTS common_queries_demo_db;


CREATE TABLE IF NOT EXISTS common_queries_demo_db.employees_mysql_external
USING org.apache.spark.sql.jdbc
OPTIONS (
    url "jdbc:mysql://iomete-tutorial.cetmtjnompsh.eu-central-1.rds.amazonaws.com:3306/employees",
    dbtable "employees.employees",
    driver 'com.mysql.cj.jdbc.Driver',
    user 'tutorial_user',
    password '9tVDVEKp'
);

```

```

CREATE TABLE common_queries_demo_db.employees
AS
SELECT *
FROM common_queries_demo_db.employees_mysql_external;
-- Schema: emp_no INT, birth_date DATE, first_name STRING, last_name STRING, gender STRING, hire_date DATE

```

## Common queries

Show tables in the given database

```
SHOW TABLES in common_queries_demo_db;

/* Output:
+-------------------------+---------------------------+--------------+
|        namespace        |         tableName         | isTemporary  |
+-------------------------+---------------------------+--------------+
| common_queries_demo_db  | employees                 | false        |
| common_queries_demo_db  | employees_mysql_external  | false        |
+-------------------------+---------------------------+--------------+
*/

```

Describe table

```
DESCRIBE common_queries_demo_db.employees;

/* Output:
+------------------+------------+----------+
|     col_name     | data_type  | comment  |
+------------------+------------+----------+
| emp_no           | int        |          |
| birth_date       | date       |          |
| first_name       | string     |          |
| last_name        | string     |          |
| gender           | string     |          |
| hire_date        | date       |          |
|                  |            |          |
| # Partitioning   |            |          |
| Not partitioned  |            |          |
+------------------+------------+----------+
*/

```

Extended description

```
DESCRIBE EXTENDED common_queries_demo_db.employees;
/* Output:
+-------------------------------+----------------------------------------------------+----------+
|           col_name            |                     data_type                      | comment  |
+-------------------------------+----------------------------------------------------+----------+
| emp_no                        | int                                                |          |
| birth_date                    | date                                               |          |
| first_name                    | string                                             |          |
| last_name                     | string                                             |          |
| gender                        | string                                             |          |
| hire_date                     | date                                               |          |
|                               |                                                    |          |
| # Partitioning                |                                                    |          |
| Not partitioned               |                                                    |          |
|                               |                                                    |          |
| # Metadata Columns            |                                                    |          |
| _spec_id                      | int                                                |          |
| _partition                    | struct<>                                           |          |
| _file                         | string                                             |          |
| _pos                          | bigint                                             |          |
| _deleted                      | boolean                                            |          |
|                               |                                                    |          |
| # Detailed Table Information  |                                                    |          |
| Name                          | spark_catalog.common_queries_demo_db.employees     |          |
| Location                      | gs://iom-lakehouse-2e6c6c/data/common_queries_de.. |          |
| Provider                      | iceberg                                            |          |
| Owner                         | root                                               |          |
| Table Properties              | [current-snapshot-id=495840486470051111,format=i.. |          |
+-------------------------------+----------------------------------------------------+----------+
*/

```

Show table properties

```
SHOW TBLPROPERTIES common_queries_demo_db.employees;

/* Output:
+----------------------+---------------------+
|         key          |        value        |
+----------------------+---------------------+
| current-snapshot-id  | 495840486470051111  |
| format               | iceberg/parquet     |
| format-version       | 1                   |
+----------------------+---------------------+
*/

```

Show table schema

```
SHOW CREATE TABLE common_queries_demo_db.employees;

/* Output:
+----------------------------------------------------------------------------+
|                   createtab_stmt                                           |
+----------------------------------------------------------------------------+
| CREATE TABLE spark_catalog.common_queries_demo_db.employees (              |
|  emp_no INT,                                                               |
|  birth_date DATE,                                                          |
|  first_name STRING,                                                        |
|  last_name STRING,                                                         |
|  gender STRING,                                                            |
|  hire_date DATE)                                                           |
| USING iceberg                                                              |
| LOCATION 'gs://iom-lakehouse-2e6c6c/data/common_queries_demo_db/employees' |
| TBLPROPERTIES (                                                            |
|  'current-snapshot-id' = '495840486470051111',                             |
|  'format' = 'iceberg/parquet',                                             |
|  'format-version' = '1')                                                   |
+----------------------------------------------------------------------------+
*/

```

Inspect table history (Iceberg)

```
SELECT * FROM common_queries_demo_db.employees.history;

/* Output:
+--------------------------+---------------------+------------+----------------------+
|     made_current_at      |     snapshot_id     | parent_id  | is_current_ancestor  |
+--------------------------+---------------------+------------+----------------------+
| 2023-07-14 11:35:25.305  | 495840486470051111  | NULL       | true                 |
+--------------------------+---------------------+------------+----------------------+
*/

```

Inspect table snapshots (Iceberg)

```
SELECT * FROM common_queries_demo_db.employees.snapshots;

/* Output:
+--------------------------+---------------------+------------+------------+----------------------------------------------------+----------------------------------------------------+
|       committed_at       |     snapshot_id     | parent_id  | operation  |                   manifest_list                    |                      summary                       |
+--------------------------+---------------------+------------+------------+----------------------------------------------------+----------------------------------------------------+
| 2023-07-14 11:35:25.305  | 495840486470051111  | NULL       | append     | gs://iom-lakehouse-2e6c6c/data/common_queries_dem..| {"added-data-files":"1","added-files-size":"2304.. |
+--------------------------+---------------------+------------+------------+----------------------------------------------------+----------------------------------------------------+
*/

```

Show the table's data files and each file's metadata (Iceberg)

```
SELECT * FROM common_queries_demo_db.employees.files;

/* Output:
+----------+----------------------------------------------------+--------------+----------+---------------+---------------------+----------------------------------------------------+----------------------------------------------------+----------------------------+-------------------+----------------------------------------------+------------------------------------------------+---------------+----------------+---------------+----------------+----------------------------------------------------+
| content  |                     file_path                      | file_format  | spec_id  | record_count  | file_size_in_bytes  |                    column_sizes                    |                    value_counts                    |     null_value_counts      | nan_value_counts  |                 lower_bounds                 |                  upper_bounds                  | key_metadata  | split_offsets  | equality_ids  | sort_order_id  |                  readable_metrics                  |
+----------+----------------------------------------------------+--------------+----------+---------------+---------------------+----------------------------------------------------+----------------------------------------------------+----------------------------+-------------------+----------------------------------------------+------------------------------------------------+---------------+----------------+---------------+----------------+----------------------------------------------------+
| 0        | gs://iom-lakehouse-2e6c6c/data/common...01.parquet | PARQUET      | 0        | 300024        | 2304414             | {1:416211,2:500084,3:420016,4:423003,5:39871,6:5...| {1:300024,2:300024,3:300024,4:300024,5:300024,6:...| {1:0,2:0,3:0,4:0,5:0,6:0}  | {}                | {1:',2:p���,3:Aamer,4:Aamodt,5:F,6:g}        | {1:�,2:����,3:Zvonko,4:dAstous,5:M,6:�*}.      | NULL          | [4]            | NULL          | 0              | {"birth_date":{"column_size":500084,"value_count...|
+----------+----------------------------------------------------+--------------+----------+---------------+---------------------+----------------------------------------------------+----------------------------------------------------+----------------------------+-------------------+----------------------------------------------+------------------------------------------------+---------------+----------------+---------------+----------------+----------------------------------------------------+
*/

```

Show the table's file manifests and each file's metadata (Iceberg)

```
SELECT * FROM common_queries_demo_db.employees.manifests;

/* Output:
+----------+----------------------------------------------------+---------+--------------------+---------------------+-------------------------+----------------------------+---------------------------+---------------------------+------------------------------+-----------------------------+----------------------+
| content  |                        path                        | length  | partition_spec_id  |  added_snapshot_id  | added_data_files_count  | existing_data_files_count  | deleted_data_files_count  | added_delete_files_count  | existing_delete_files_count  | deleted_delete_files_count  | partition_summaries  |
+----------+----------------------------------------------------+---------+--------------------+---------------------+-------------------------+----------------------------+---------------------------+---------------------------+------------------------------+-----------------------------+----------------------+
| 0        | gs://iom-lakehouse-2e6c6c/data/common_quer....avro | 6152    | 0                  | 495840486470051111  | 1                       | 0                          | 0                         | 0                         | 0                            | 0                           | []                   |
+----------+----------------------------------------------------+---------+--------------------+---------------------+-------------------------+----------------------------+---------------------------+---------------------------+------------------------------+-----------------------------+----------------------+
*/

```

## INSERT INTO Operations

INSERT INTO operation

```
INSERT INTO common_queries_demo_db.employees
VALUES (
    1,
    CAST('01.10.2000' AS DATE),
    'John',
    'Doe',
    'M',
    CAST('01.10.2000' AS DATE)
);

```

See the newly inserted record

```
SELECT * FROM common_queries_demo_db.employees WHERE emp_no = 1;

/* Output:
+---------+-------------+-------------+------------+---------+-------------+
| emp_no  | birth_date  | first_name  | last_name  | gender  |  hire_date  |
+---------+-------------+-------------+------------+---------+-------------+
| 1       | 2000-10-01  | John        | Doe        | M       | 2000-10-01  |
| 1       | NULL        | John        | Doe        | M       | NULL        |
| 1       | 2000-10-01  | John        | Doe        | M       | 2022-01-01  |
+---------+-------------+-------------+------------+---------+-------------+
*/

```

You can also specify the columns in any order. Note: You must specify all columns in the table.

```
INSERT INTO common_queries_demo_db.employees (
    emp_no, first_name, last_name, gender, birth_date, hire_date
)
VALUES (
    1,
    'John',
    'Doe',
    'M',
    CAST('2000-10-01' AS DATE),
    CAST('2000-10-01' AS DATE)
);

```

Using a SELECT query to insert data

```
INSERT INTO common_queries_demo_db.employees
SELECT 1 AS id,
       TO_DATE('2000-10-01', 'yyyy-MM-dd') AS birth_date,
       'John' AS first_name,
       'Doe' AS last_name,
       'M' AS gender,
       TO_DATE('2022-01-01', 'yyyy-MM-dd') AS hire_date;

```

Inserting into a partitioned table requires data to be sorted by the partition columns

```
CREATE TABLE common_queries_demo_db.employees_partitioned (
    emp_no int,
    birth_date date,
    first_name string,
    last_name string,
    gender string
) PARTITIONED BY (gender);

```

```
INSERT INTO common_queries_demo_db.employees_partitioned
SELECT emp_no,
       birth_date,
       first_name,
       last_name,
       gender
FROM common_queries_demo_db.employees
ORDER BY gender;

```

note

ORDER BY is required for partitioned columns. They must be sorted.

## MERGE/Update/Delete Operations

MERGE INTO operation

```
MERGE INTO spark_catalog.common_queries_demo_db.employees AS t
USING (
    SELECT
        1 AS emp_no,
        'John Doe' AS first_name,
        'Doe' AS last_name,
        'M' AS gender,
        DATE('2022-01-01') AS hire_date,
        DATE('1990-01-01') AS birth_date
) AS s
ON t.emp_no = s.emp_no
WHEN MATCHED THEN
    UPDATE SET t.first_name = s.first_name,
               t.last_name = s.last_name,
               t.gender = s.gender,
               t.hire_date = s.hire_date,
               t.birth_date = s.birth_date
WHEN NOT MATCHED THEN
    INSERT (emp_no, birth_date, first_name, last_name, gender, hire_date)
    VALUES (s.emp_no, s.birth_date, s.first_name, s.last_name, s.gender, s.hire_date);


```

info

See: MERGE INTO

Check the row

```
SELECT * FROM common_queries_demo_db.employees WHERE emp_no = 1;

/* Output:
+---------+-------------+-------------+------------+---------+-------------+
| emp_no  | birth_date  | first_name  | last_name  | gender  |  hire_date  |
+---------+-------------+-------------+------------+---------+-------------+
| 1       | 2000-10-01  | John        | Doe        | M       | 2022-01-01  |
| 1       | 2000-10-01  | John        | Doe        | M       | 2000-10-01  |
| 1       | NULL        | John        | Doe        | M       | NULL        |
| 1       | 2000-10-01  | John        | Doe        | M       | 2022-01-01  |
| 1       | 2000-10-01  | John        | Doe        | M       | 2000-10-01  |
+---------+-------------+-------------+------------+---------+-------------+
*/

```

UPDATE operation

```
UPDATE common_queries_demo_db.employees
    SET first_name = 'Max', last_name = 'Doe'
WHERE emp_no = 1;

```

DELETE FROM operation

```
DELETE FROM common_queries_demo_db.employees WHERE emp_no = 1;

```

## Clean up

```
DROP TABLE common_queries_demo_db.employees PURGE;
DROP TABLE common_queries_demo_db.employees_partitioned PURGE;
DROP TABLE common_queries_demo_db.employees_mysql_external;

DROP DATABASE common_queries_demo_db;

```

Previous

SQL DDL Examples

Next

Iceberg Advanced Features

## ON THIS PAGE

- Common queries and DML operations (IOMETE SparkSQL and Iceberg)
- Common queries
- INSERT INTO Operations
- MERGE/Update/Delete Operations
- Clean up
