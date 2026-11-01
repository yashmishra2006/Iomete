<!-- source: https://iomete.com/resources/reference/spark-sql/create-view | scraped 2026-11-01 -->

Page title: Create View | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/create-view
Meta description: This documentation provides a detailed guide on creating a view using Apache Spark SQL, facilitating a clear understanding of the process.

---

- Spark SQL Reference
- DDL
- Create View

On this page

# Create View

Views are based on the result-set of an SQL query. CREATE VIEW constructs a virtual table that has no physical data therefore other operations like ALTER VIEW and DROP VIEW only change metadata.

## Syntax

```
CREATE [OR REPLACE] [TEMPORARY] VIEW [IF NOT EXISTS] [db_name.]view_name
    create_view_clauses
    AS query;

```

## Parameters

OR REPLACE If a view of same name already exists, it will be replaced.[GLOBAL] TEMPORARY TEMPORARY views are session-scoped and will be dropped when session ends because it skips persisting the definition in the underlying metastore, if any.IF NOT EXISTS Creates a view if it does not exists.create_view_clauses These clauses are optional and order insensitive. It can be of following formats.

[(column_name [COMMENT column_comment], ...) ] to specify column-level comments.
[COMMENT view_comment] to specify view-level comments.
[TBLPROPERTIES (property_name = property_value, ...)] to add metadata key-value pairs.

queryA SELECT statement that constructs the view from base tables or other views.

## Examples

```
-- Create or replace view for `experienced_employee` with comments.
CREATE OR REPLACE VIEW experienced_employee
    (ID COMMENT 'Unique identification number', Name)
    COMMENT 'View for experienced employees'
    AS SELECT id, name FROM all_employee
        WHERE working_years > 5;

```

Previous

Drop Table

Next

Truncate Table

## ON THIS PAGE

- Syntax
- Parameters
- Examples
