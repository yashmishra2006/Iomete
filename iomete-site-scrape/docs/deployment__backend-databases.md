<!-- source: https://iomete.com/resources/deployment/backend-databases | scraped 2026-11-01 -->

Page title: IOMETE Backend Databases | IOMETE
URL: https://iomete.com/resources/deployment/backend-databases
Meta description: Explore IOMETE's backend database requirements for MySQL and PostgreSQL, tailored for small to large scale users. Learn about CPU, memory, and disk space needs for managing internal and data lake metadata, with tips on enhancing performance and safeguarding data.

---

- Deployment
- Advanced Settings
- Backend Databases

On this page

# IOMETE Backend Databases

IOMETE requires a backend database to efficiently store and manage metadata. This database is essential for two primary types of metadata:

- IOMETE Internal Metadata: This includes information about the operational and structural elements of IOMETE's architecture.
- Data Lake Metadata: Specifically tailored for the Hive Metastore and Iceberg Metastore, this involves detailed metadata regarding data lake databases, tables, partitions, columns, and more.

For optimal functionality, IOMETE supports the use of either MySQL or PostgreSQL databases. These databases are chosen for their reliability, scalability, and widespread support in the industry.

## Database Load

### IOMETE Internal Metadata

The database requirements for managing internal metadata are typically moderate. This includes operations such as creating and updating various IOMETE resources like clusters, spark jobs, users, etc.

### Metadata of Data Lake

This section pertains to the metadata storage for Hive Metastore and Iceberg Metastore. The load on these databases is directly influenced by the number of users and the volume of tables within the data lake.

## Database Resource Requirements

The IOMETE database has been optimized to operate effectively with modest resource requirements. The following specifications provide a guideline based on different user scales:

info

The resource requirements outlined below are based on the assumption that both MySQL and PostgreSQL provide similar performance characteristics thus applicable to both databases.

### Small Scale (1-10 Users)

- CPU: 1-2 cores
- Memory: 4GB
- Disk Space: 20GB

### Medium Scale (10-100 Users)

- CPU: 4 cores
- Memory: 16GB
- Disk Space: 50GB

### Large Scale (100-1000 Users)

- CPU: 8 cores
- Memory: 32GB
- Disk Space: 50GB

info

Disk size depends on the data lake size and number of tables in the data lake. Typically, a range between 20GB to 100GB suffices.

tip

For enhanced database performance, especially in data-intensive operations, the use of SSD or NVMe SSD disk type is recommended.

important

It is crucial to ensure that the database is configured with reliable backup and recovery mechanisms to safeguard data integrity and continuity.

Previous

Custom DNS

Next

PostgreSQL Deployment

## ON THIS PAGE

- Database Load

- IOMETE Internal Metadata
- Metadata of Data Lake

- Database Resource Requirements

- Small Scale (1-10 Users)
- Medium Scale (10-100 Users)
- Large Scale (100-1000 Users)
