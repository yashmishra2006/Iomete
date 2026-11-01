<!-- source: https://iomete.com/resources/user-guide/spark-catalogs/external-jdbc | scraped 2026-11-01 -->

Page title: JDBC Catalog Integration | IOMETE
URL: https://iomete.com/resources/user-guide/spark-catalogs/external-jdbc
Meta description: Configure IOMETE to connect to existing JDBC resources.

---

- Spark Catalogs
- External Catalogs
- JDBC Catalog Integration

# JDBC Catalog Integration

You can connect IOMETE to any existing JDBC (Java Database Connectivity) resource, which facilitates communication with relational database management systems (RDBMS). This integration enables you to use JDBC resources in various queries and Spark jobs, enhancing your data processing capabilities and allowing for seamless interaction with your existing database systems.

To set up this connection, you must provide:

- Name : Name of the catalog
- URL: The JDBC URL
- Username: A valid username to connect with to the JDBC Resource
- Password: The password associated with the Username
- Driver: The JDBC driver for your database

Test the connection to ensure proper setup.

For more details, refer to the Iceberg JDBC Integration.

Previous

Enterprise Catalog

Next

REST Iceberg Catalog Integration
