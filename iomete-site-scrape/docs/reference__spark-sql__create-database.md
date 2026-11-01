<!-- source: https://iomete.com/resources/reference/spark-sql/create-database | scraped 2026-11-01 -->

Page title: Create Database | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/create-database
Meta description: Create a database with the specified name. If not exists, with optional comment and database properties. Syntax, parameters, and examples included.

---

- Spark SQL Reference
- DDL
- Create Database

On this page

# Create Database

Creates a database with the specified name. If database with the same name already exists, an exception will be thrown.

### Syntax

```
CREATE {DATABASE | SCHEMA} [ IF NOT EXISTS ] database_name
  [ COMMENT database_comment ]
  [ WITH DBPROPERTIES (property_name=property_value [ , ...]) ]

```

## Parameters

database_name
Specifies the name of the database to be created

IF NOT EXISTS
Creates a database with the given name if it doesn't exists. If a database with the same name already exists, nothing will happen.

database_comment
Specifies the description for the database.

WITH DBPROPERTIES (property_name=property_value [ , ...])
Specifies the properties for the database in key-value pairs.

## Examples

```
-- Create database `customer_db`. This throws exception if database with name customer_db
-- already exists.
CREATE DATABASE customer_db;

-- Create database `customer_db` only if database with same name doesn't exist.
CREATE DATABASE IF NOT EXISTS customer_db;

-- Create database `customer_db` only if database with same name doesn't exist with
-- `Comments`,`Specific Location` and `Database properties`.
CREATE DATABASE IF NOT EXISTS customer_db COMMENT 'This is customer database' LOCATION
WITH DBPROPERTIES (ID=001, Name='John');

-- Verify that properties are set.
DESCRIBE DATABASE EXTENDED customer_db;
   +----------------------------+-----------------------------+
   | database_description_item  | database_description_value  |
   +----------------------------+-----------------------------+
   | Database Name              | customer_db                 |
   | Description                | This is customer database   |
   | Properties                 | ((ID,001), (Name,John))     |
   +----------------------------+-----------------------------+

```

Previous

Overview

Next

Alter Database

## ON THIS PAGE

- Syntax
- Parameters
- Examples
