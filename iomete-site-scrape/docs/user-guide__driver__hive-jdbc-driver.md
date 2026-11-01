<!-- source: https://iomete.com/resources/user-guide/driver/hive-jdbc-driver | scraped 2026-11-01 -->

Page title: Hive JDBC Driver | IOMETE
URL: https://iomete.com/resources/user-guide/driver/hive-jdbc-driver
Meta description: Connect to IOMETE over HiveServer2 using the Hive JDBC driver for BI tools, dbt, and other SQL clients.

---

- Client & Libraries
- Hive JDBC Driver

On this page

# Hive JDBC Driver

The Hive JDBC driver connects a BI tool, dbt, or any other HiveServer2-aware client to IOMETE. IOMETE exposes a HiveServer2 endpoint that's compatible with the Apache Hive JDBC driver, so it behaves like a standard SQL-over-JDBC connection.

Looking for the Arrow Flight JDBC Driver?

For high-performance binary data transfer or HTTP CONNECT proxy support, use the Arrow Flight SQL JDBC Driver instead. It uses a different JDBC URL scheme (jdbc:arrow-flight-sql://).

## Download the Driver

Before you can connect, you need the driver JAR. Download the latest release from the iomete-artifacts GitHub repository. The standalone build bundles every dependency, so you don't need to install anything else:

```
hive-jdbc-4.0.1-standalone.jar

```

## Using the Driver in a Java Project

To use IOMETE in your own Java application, declare the standalone JAR as a system-scoped Maven dependency:

```
<dependency>
    <groupId>org.apache.hive</groupId>
    <artifactId>hive-jdbc</artifactId>
    <version>4.0.1</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/src/main/resources/hive-jdbc-4.0.1-standalone.jar</systemPath>
</dependency>

```

Then point your connection at IOMETE using this JDBC URL format:

```
jdbc:hive2://<host>/;transportMode=http;ssl=true;httpPath=/data-plane/<namespace>/lakehouse/<compute>

```

To avoid assembling the URL by hand, copy the exact connection string for your compute from the IOMETE Console under Compute → select a compute → Connections tab → JDBC.

## Known Issues

A few SQL clients behave oddly with the Hive driver. Both issues below have workarounds, so you don't need to switch drivers.

Schema Selection Error

Some SQL clients (including DBeaver) throw a "schema not found" error when you select an active schema from a dropdown or top menu.

Two workarounds:

- Use the USE statement to switch schemas: USE schema_name;
- Use fully qualified table names: catalog_name.schema_name.table_name

Catalog Not Included in Fully Qualified Table Names

Some clients leave out the catalog name when they generate fully qualified table references, such as when you drag a table into a SQL editor. Queries that span catalogs then fail with a TABLE_NOT_FOUND error.

Two workarounds:

- Use the USE statement when switching between catalogs.
- Always use fully qualified names: catalog_name.schema_name.table_name

## Related Drivers

Arrow Flight SQL JDBC Driver

Binary transport over gRPC. Use it for faster queries and enterprise proxy support.

DBeaver Integration

Connect DBeaver to IOMETE using either the Hive or Arrow Flight JDBC driver.

Previous

SQLAlchemy Driver

Next

Arrow Flight SQL JDBC Driver

## ON THIS PAGE

- Download the Driver
- Using the Driver in a Java Project
- Known Issues
- Related Drivers
