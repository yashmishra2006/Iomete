<!-- source: https://iomete.com/resources/reference/spark-sql/use-database | scraped 2026-11-01 -->

Page title: Use Database | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/use-database
Meta description: USE statement is used to set the current database. Once set, the unqualified database artifacts that are referenced by SQLs are resolved from the current database

---

- Spark SQL Reference
- Queries
- Use Database

On this page

# Use Database

USE statement is used to set the current database. Once set, the unqualified database artifacts such as tables, functions and views that are referenced by SQLs are resolved from the current database

info

The default database name is ‘default’

## Syntax

```
USE database_name

```

## Parameter

database_name Name of the database will be used. If the database does not exist, an exception will be thrown.

## Example

```
-- Use the 'userdb' which exists.
USE userdb;
+---------+--+
| Result  |
+---------+--+
+---------+--+

-- Use the 'userdb1' which doesn't exist
USE userdb1;
Error: org.apache.spark.sql.catalyst.analysis.NoSuchDatabaseException: Database 'userdb1' not found;(state=,code=0)

```

Previous

Table-valued Functions (TVF)

Next

WHERE Clause

## ON THIS PAGE

- Syntax
- Parameter
- Example
