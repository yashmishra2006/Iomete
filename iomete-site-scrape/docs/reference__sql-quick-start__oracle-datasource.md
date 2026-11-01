<!-- source: https://iomete.com/resources/reference/sql-quick-start/oracle-datasource | scraped 2026-11-01 -->

Page title: Oracle Data Source | IOMETE
URL: https://iomete.com/resources/reference/sql-quick-start/oracle-datasource
Meta description: Learn how to connect to Oracle from IOMETE Lakehouse.

---

- SQL Quick Start
- Oracle Data Source

On this page

# Oracle Data Source

By default, IOMETE includes MySQL, PostgreSQL, and Snowflake JDBC drivers. However, adding custom drivers, such as the Oracle driver, is straightforward. Follow these steps to add the Oracle driver to IOMETE:

### Configure Oracle JDBC Driver

Through the IOMETE Console:

Navigate to Settings:
Go to the IOMETE Console, then proceed to Settings -> Spark Settings (Global Spark Settings).

Add Dependency:

2.1. Download the Oracle JDBC driver JAR file. For example, you can download the Oracle 18c JDBC driver from the following link:

info

Ensure that the Oracle JDBC driver version is compatible with your Oracle database version.

```
wget https://download.oracle.com/otn-pub/otn_software/jdbc/1922/ojdbc8.jar

```

2.2. Upload the driver JAR file to your object storage. For example, you can upload it to:

```
s3a://lakehouse/drivers/ojdbc8.jar

```

2.3. Then, add the following configuration in the Global Spark Settings:

```
spark.jars s3a://lakehouse/drivers/ojdbc8.jar

```

### Restart the Lakehouse

After adding the Oracle driver dependencies, restart the lakehouses to make the driver available.

### Connect to Oracle Data Source

Once the dependencies are added and the lakehouse is restarted, you can connect to the Oracle data source using the following syntax:

```
CREATE TABLE test_table
USING org.apache.spark.sql.jdbc
OPTIONS (
    url "jdbc:oracle:thin:@bore.pub:22746:ORCL",
    dbtable "<datbase>.<table>",
    driver 'oracle.jdbc.OracleDriver',
    user '<oracle_user>',
    password '<oracle_password>'
);

```

info

In addition to using the JDBC method to create individual tables, you can also create a Spark JDBC catalog. By setting up a Spark JDBC catalog, you will be able to connect to an entire database or schema and browse all the tables under that catalog without needing to write DDL statements for every table. This simplifies the process of managing multiple tables in your Oracle Data Source. For more details on setting up a Spark JDBC catalog, refer to the following Spark Catalogs Documentation.

### Important Parameters

- Format: org.apache.spark.sql.jdbc
- Driver: oracle.jdbc.OracleDriver

By following these steps, you can easily add and configure a custom Oracle JDBC driver in IOMETE, enabling you to connect and interact with your Oracle databases efficiently.

Previous

Microsoft SQL Server Data Source

Next

Getting Started

## ON THIS PAGE

- Configure Oracle JDBC Driver
- Restart the Lakehouse
- Connect to Oracle Data Source
- Important Parameters
