<!-- source: https://iomete.com/resources/reference/spark-sql/drop-database | scraped 2026-11-01 -->

Page title: Drop Database | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/drop-database
Meta description: Learn how to drop a database and associated directory in the file system with this tutorial. Syntax, parameters, and examples included.

---

- Spark SQL Reference
- DDL
- Drop Database

On this page

# Drop Database

Drop a database and delete the directory associated with the database from the file system. An exception will be thrown if the database does not exist in the system.

## Syntax

```
DROP (DATABASE|SCHEMA) [IF EXISTS] dbname [RESTRICT|CASCADE];

```

## Parameters

DATABASE|SCHEMA DATABASE and SCHEMA mean the same thing, either of them can be used.IF EXISTS If specified, no exception is thrown when the database does not exist.RESTRICTIf specified, will restrict dropping a non-empty database and is enabled by default.CASCADE If specified, will drop all the associated tables and functions.

## Examples

```
-- Create `inventory_db` Database
CREATE DATABASE inventory_db COMMENT 'This database is used to maintain Inventory';

-- Drop the database and it's tables
DROP DATABASE inventory_db CASCADE;
+---------+
| Result  |
+---------+
+---------+

-- Drop the database using IF EXISTS
DROP DATABASE IF EXISTS inventory_db CASCADE;
+---------+
| Result  |
+---------+
+---------+

```

Previous

Alter Database

Next

Create Table

## ON THIS PAGE

- Syntax
- Parameters
- Examples
