<!-- source: https://iomete.com/resources/user-guide/spark-jobs/nessie-integration | scraped 2026-11-01 -->

Page title: Nessie Library | IOMETE
URL: https://iomete.com/resources/user-guide/spark-jobs/nessie-integration
Meta description: Learn how to add Nessie library to Spark Resources.

---

- Spark Jobs
- Nessie Library

On this page

# Nessie Library

Starting from Data-Plane version 1.16.0, we have added support for the Nessie catalog. The extension org.projectnessie.spark.extensions.NessieSparkSessionExtensions is included by default when deploying Spark resources. IOMETE's Spark version 3.5.1-v1 includes the Nessie jar library nessie-spark-extensions-3.5_2.12 version 0.78.0. For older Spark versions, you can add the Nessie dependency to your Spark resources to access and use the Nessie catalog.

## Adding Nessie Dependency

To add the Nessie dependency, follow these steps:

Navigate to Settings:
Go to the IOMETE Console, then proceed to Settings -> Spark Settings (Global Spark Settings).

Add Dependency:
You can add the dependency using either of the following methods:

Option 1: Using Packages: Add the Nessie package from the Maven repository using the following configuration:

```
spark.jars.packages org.projectnessie.nessie-integrations:nessie-spark-extensions-3.5_2.12:0.78.0

```

Option 2: Using JAR Files: Upload the JAR file to the default lakehouse bucket specified during the IOMETE installation. This could be AWS S3 or S3-compatible storage such as Apache Ozone, Dell ECS or MinIO. Then, add the JAR file path:

```
spark.jars s3a://lakehouse_bucket/nessie-spark-extensions-3.5_2.12-0.78.0.jar

```

You can download the JAR file from the Maven Central Repository using the following command:

```
wget https://repo1.maven.org/maven2/org/projectnessie/nessie-integrations/nessie-spark-extensions-3.5_2.12/0.78.0/nessie-spark-extensions-3.5_2.12-0.78.0.jar

```

info

Make sure to use version 0.78.0. Newer version are currently incompatible with IOMETE.

note

After adding the Nessie library, restart the Lakehouses and Spark Jobs.

Previous

IOMETE SDK

Next

Log Configurations

## ON THIS PAGE

- Adding Nessie Dependency
