<!-- source: https://iomete.com/resources/reference/sql-quick-start/query-federation | scraped 2026-11-01 -->

Page title: Unifying Data Sources in a Single Query with IOMETE | IOMETE
URL: https://iomete.com/resources/reference/sql-quick-start/query-federation
Meta description: Learn how to unify data from MySQL, PostgreSQL, CSV files, and Snowflake tables in a single SQL query with IOMETE. Explore JDBC integration, object storage, and more.

---

- SQL Quick Start
- Query Federation

On this page

# Unifying Data Sources in a Single Query with IOMETE

## Introduction

Imagine running a single SQL query that seamlessly pulls together data from a MySQL database, a PostgreSQL database, a CSV file stored in an S3 bucket, and a Snowflake table. Sounds like a dream, right? Well, with IOMETE, this is not only possible but also incredibly straightforward. In this guide, we'll show you how to do just that. Let's dive in!

## The Power of a Single Query

Before we get into the nitty-gritty details, let's see the end game—a SQL query that joins data from multiple sources:

```
-- Joining MySQL, PostgreSQL, CSV, and Snowflake tables
SELECT m.*, p.*, c.*, s.*
FROM mysqlTable m
JOIN postgreTable p ON m.id = p.id
JOIN csvTable c ON c.flight_id = c.flight_id
JOIN snowflake_table s ON m.snowflake_id = s.id;

```

This query brings together data from MySQL, PostgreSQL, a CSV file, and a Snowflake table. Now, let's backtrack and see how we set up each of these data sources in IOMETE.

## Data Sources Supported by IOMETE

- IOMETE Managed Data Lake Tables (Iceberg)
- Files in Object Storage (CSV, JSON, Parquet, ORC)
- JDBC Sources (MySQL, PostgreSQL, Oracle, etc.)
- Snowflake Tables

## JDBC Sources: MySQL and PostgreSQL

JDBC sources like MySQL, PostgreSQL, MS SQL Server and Oracle can be easily integrated into IOMETE. You can create a proxy table that links to your database table and then query it as if it were a local table.

### MySQL

```
-- Creating a proxy table
CREATE TABLE mysqlTable
USING org.apache.spark.sql.jdbc
OPTIONS (
  url "jdbc:mysql://db_host:db_port/db_name",
  dbtable "schema.tablename",
  driver 'com.mysql.cj.jdbc.Driver',
  user 'username',
  password 'password'
);

```

### PostgreSQL

```
-- Creating a proxy table
CREATE TABLE postgreTable
USING org.apache.spark.sql.jdbc
OPTIONS (
  url "jdbc:postgresql://db_host:db_port/db_name",
  dbtable 'schema.tablename',
  user 'username',
  password 'password'
);

```

For more, visit our JDBC Sources Documentation.

## Object Storage: CSV, JSON, Parquet, and ORC Files

IOMETE allows you to read various file formats directly from object storage services like S3.

### CSV Files

```
CREATE table csvTable
USING csv
OPTIONS (
  header "true",
  path "s3a://iomete-lakehouse-shared/superset_examples/tutorial_flights.csv"
);

```

### JSON Files

```
CREATE TABLE countries
USING org.apache.spark.sql.json
OPTIONS (
  path "s3a://iomete-lakehouse-shared/superset_examples/countries.json"
);

```

### Parquet and ORC Files

```
-- Parquet
CREATE TABLE parquetTable
USING org.apache.spark.sql.parquet
OPTIONS (
  path "s3a://iomete-lakehouse/trial-staging-area/parquet/userdata1.parquet"
);

-- ORC
CREATE TABLE orcTable
USING orc
OPTIONS (
  path "s3a://iomete-lakehouse-shared/orc/userdata1_orc"
);

```

For more details, check our documentation on CSV, JSON, Parquet, and ORC.

## Snowflake Integration

IOMETE also supports Snowflake, and the connector is already included in the distribution package.

```
-- Create a new table in Spark linked to a Snowflake table
CREATE TABLE snowflake_table
USING snowflake
OPTIONS (
    dbtable '<table-name>',
    sfUrl '<snowflake-account-url>',
    sfUser '<username>',
    sfPassword '<password>',
    sfDatabase '<database-name>',
    sfSchema '<schema-name>',
    sfWarehouse '<warehouse-name>'
);

```

For more details, check the Snowflake Connector.

## Conclusion

IOMETE makes it incredibly easy to join multiple disparate data sources into a single query, enabling you to perform complex analytics without the hassle of data movement or transformation. With just a few lines of SQL, you can bring together data from JDBC sources, object storage files, and even Snowflake tables.

For more information, you can always refer to the comprehensive IOMETE documentation. Happy querying!

Previous

External Tables

Next

Microsoft SQL Server Data Source

## ON THIS PAGE

- Introduction
- The Power of a Single Query
- Data Sources Supported by IOMETE
- JDBC Sources: MySQL and PostgreSQL

- MySQL
- PostgreSQL

- Object Storage: CSV, JSON, Parquet, and ORC Files

- CSV Files
- JSON Files
- Parquet and ORC Files

- Snowflake Integration
- Conclusion
