<!-- source: https://iomete.com/resources/reference/spark-sql/drop-table | scraped 2026-11-01 -->

Page title: Drop Table | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/drop-table
Meta description: DROP TABLE syntax reference for Spark SQL. Covers IF EXISTS, PURGE, qualified identifiers, and external table behavior with examples.

---

- Spark SQL Reference
- DDL
- Drop Table

On this page

# Drop Table

DROP TABLE removes a table's catalog entry. By default, the data files, metadata files, and manifest lists stay in storage. Add PURGE to delete those files along with the catalog reference. For external tables, only the catalog entry is ever removed, regardless of PURGE.

Spark SQL extends standard SQL with IF EXISTS for idempotent scripts. For the full upstream specification, see the Spark SQL DROP TABLE reference.

## Syntax

```
DROP TABLE [ IF EXISTS ] table_identifier [ PURGE ]

```

## Parameters

- IF EXISTS: Suppresses the error if the table doesn't exist, so your script won't fail on a missing table.
- table_identifier: The table to drop, written as [database_name.]table_name or as a three-part identifier `catalog_name`.`database_name`.`table_name`. Escape each part with backticks. Include the database or catalog prefix to target a table outside your current session context.
- PURGE: Deletes the underlying data and metadata files from storage along with the catalog reference. Without this option, files remain in the storage layer.

## Examples

Here are the most common ways you'll use DROP TABLE.

```
-- Basic drop: removes catalog entry
DROP TABLE employees;

-- Safe drop: no error if the table does not exist
DROP TABLE IF EXISTS employees;

-- PURGE: drops the catalog reference and deletes all data and metadata
-- files from storage; without PURGE the files remain in your object store
DROP TABLE employees PURGE;

-- Qualified identifier: target a table in a specific database
DROP TABLE IF EXISTS staging_db.raw_events;

-- Three-part identifier: target a table in a specific catalog and database
DROP TABLE IF EXISTS `my_catalog`.`staging_db`.`raw_events`;

-- External table: only the catalog entry is removed;
-- data files at the LOCATION path are NOT deleted
CREATE TABLE ext_logs (event STRING, ts TIMESTAMP)
USING parquet
LOCATION 's3://bucket/logs/';

DROP TABLE ext_logs;

```

## Related Statements

- Create Table: defines the tables that DROP TABLE removes.
- Drop Database: works the same way at the database level. The CASCADE option drops all tables in the database.

Previous

Alter Table

Next

Create View

## ON THIS PAGE

- Syntax
- Parameters
- Examples
- Related Statements
