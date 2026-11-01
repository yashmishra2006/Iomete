<!-- source: https://iomete.com/resources/reference/spark-sql/alter-database | scraped 2026-11-01 -->

Page title: Alter Database | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/alter-database
Meta description: Learn how to create and use Personal Access Tokens as an alternative to using passwords for authentication with IOMETE API

---

- Spark SQL Reference
- DDL
- Alter Database

On this page

# Alter Database

You can alter metadata associated with a database by setting DBPROPERTIES. The specified property values override any existing value with the same property name. Please note that the usage of SCHEMA and DATABASE are interchangable and one can be used in place of the other. An error message is issued if the database is not found in the system. This command is mostly used to record the metadata for a database and may be used for auditing purposes.

## Syntax

```
ALTER {DATABASE | SCHEMA} database_name SET DBPROPERTIES (propery_name=property_value, ...);

```

## Parameters

database_name Specifies the name of the database to be altered.

## Examples

```
-- Creates a database named `inventory`.
CREATE DATABASE inventory;

-- Alters the database to set properties `Edited-by` and `Edit-date`.
ALTER DATABASE inventory SET DBPROPERTIES ('Edited-by' = 'John', 'Edit-date' = '01/01/2001');

-- Verify that properties are set.
DESCRIBE DATABASE EXTENDED inventory;

   +-------------------------+--------------------------------------------+
   |database_description_item|database_description_value                  |
   +-------------------------+--------------------------------------------+
   |Database Name            |inventory                                   |
   |Description              |                                            |
   |Properties               |((Edit-date,01/01/2001), (Edited-by,John))  |
   +-------------------------+--------------------------------------------+

```

Previous

Create Database

Next

Drop Database

## ON THIS PAGE

- Syntax
- Parameters
- Examples
