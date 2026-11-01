<!-- source: https://iomete.com/resources/reference/sql-quick-start/ms-sql-server-datasource | scraped 2026-11-01 -->

Page title: Microsoft SQL Server Data Source | IOMETE
URL: https://iomete.com/resources/reference/sql-quick-start/ms-sql-server-datasource
Meta description: Learn how to connect to Microsoft SQL Server from IOMETE Lakehouse.

---

- SQL Quick Start
- Microsoft SQL Server Data Source

On this page

# Microsoft SQL Server Data Source

By default, IOMETE includes MySQL, PostgreSQL, and Snowflake JDBC drivers. However, adding custom drivers, such as the Microsoft SQL Server driver, Oracle is straightforward. Follow these steps to add Microsoft SQL Server driver to IOMETE:

### Configure Microsoft SQL Server Driver

Through the IOMETE Console:

Navigate to Settings:
Go to the IOMETE Console, then proceed to Settings -> Spark Settings (Global Spark Settings).

Add Dependency:

You can add the MS SQL driver using two methods:

Option 1: Using Packages: Add the MS SQL driver package using the following configuration:

```
spark.jars.packages com.microsoft.azure:spark-mssql-connector_2.12:1.2.0

```

Option 2: Using JAR Files: Upload the JAR file to the default lakehouse bucket specified during IOMETE installation. This could be AWS S3 or S3-compatible storage such as Apache Ozone, Dell ECS or MinIO. Then, add the JAR file path:

```
spark.jars s3a://lakehouse/spark-mssql-connector_2.12-1.2.0.jar, s3a://lakehouse/mssql-jdbc-11.2.3.jre11.jar

```

### Restart the Lakehouse

After adding the MS SQL driver dependencies, restart the lakehouses to make the driver available.

### Connect to Microsoft SQL Server Data Source

Once the dependencies are added and the lakehouse is restarted, you can connect to the MS SQL data source using the following syntax:

```
CREATE TABLE ms_sql_demo_db
USING com.microsoft.sqlserver.jdbc.spark
OPTIONS (
    url "jdbc:sqlserver://host_name_or_ip;databaseName=db_name",
    driver "com.microsoft.sqlserver.jdbc.SQLServerDriver",
    dbtable "db_name.table_name",
    user 'user',
    password 'password'
);

```

### Important Parameters

- Format: com.microsoft.sqlserver.jdbc.spark
- Driver: com.microsoft.sqlserver.jdbc.SQLServerDriver

By following these steps, you can easily add and configure a custom Microsoft SQL Server driver in IOMETE, enabling you to connect and interact with your Microsoft SQL Server databases efficiently.

Previous

Query Federation

Next

Oracle Data Source

## ON THIS PAGE

- Configure Microsoft SQL Server Driver
- Restart the Lakehouse
- Connect to Microsoft SQL Server Data Source
- Important Parameters
