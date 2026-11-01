<!-- source: https://iomete.com/resources/aws/read-files-from-aws-s3 | scraped 2026-11-01 -->

Page title: Querying Files in AWS S3 | IOMETE
URL: https://iomete.com/resources/aws/read-files-from-aws-s3
Meta description: Querying Files in AWS S3 with IOMETE. This is an end-to-end guide about how to query and move files from your AWS S3 to IOMETE

---

- AWS
- Querying Files in AWS S3

On this page

# Querying Files in AWS S3

This is an end-to-end guide about how to move files from your AWS S3 to IOMETE.

Your files in AWS S3

Let's assume you have an external bucket in AWS S3 with the files you want to query in IOMETE. In this example, we will use the area-for-iomete bucket with a countries.json file.

## Provide permissions to IOMETE

In order to access files in this external S3 bucket, IOMETE requires permissions to read/write the files. Follow this guide to provide the necessary permissions.

## Querying files in AWS S3

It's extremely easy to query files in AWS S3 with IOMETE. You just need to provide the bucket name and the path to the file you want to query.

Use the s3a:// Scheme

Always reference S3 paths with s3a://, not s3:// or s3n://. IOMETE's Spark runtime only supports the s3a:// scheme, so s3:// raises No FileSystem for scheme: s3.

```
SELECT  * FROM json.`s3a://area-for-iomete/countries.json`;

```

Learn more about querying files like CSV, JSON, Parquet, ORC and more detailed configuration options in the following guides:

CSV Files

Learn how to query CSV files in IOMETE and options to configure the CSV data source

JSON Files

Learn how to query JSON files in IOMETE and options to configure the JSON data source

Parquet Files

Learn how to query Parquet files in IOMETE and options to configure the Parquet data source

ORC Files

Learn how to query ORC files in IOMETE and options to configure the ORC data source

## Moving data into the lakehouse

If you want to move files to IOMETE Lakehouse, which provides a managed data lake experience, you can use the following commands to create tables and insert data into them.

### Non-partitioned Table

- Option 1. Create a table from select

```
-- Create table directly from the query
CREATE TABLE countries
AS SELECT  * FROM json.`s3a://area-for-iomete/countries.json`;

-- To inspect the table use the following query
DESC TABLE EXTENDED countries;

```

- Option 2. Insert into to existing table

```
-- just append data
INSERT INTO countries
SELECT  * FROM json.`s3a://area-for-iomete/countries.json`;

-- first clean an existing data and then insert new data
INSERT OVERWRITE TABLE countries
SELECT  * FROM json.`s3a://area-for-iomete/countries.json`;

```

- Option 3. Merge with existing data

```
MERGE INTO countries
    USING (SELECT  * FROM json.`s3a://area-for-iomete/countries.json`) updates
ON countries.id = updates.id
WHEN MATCHED THEN
    UPDATE SET *
WHEN NOT MATCHED
    THEN INSERT *;

```

### Partitioned Table

Partitioning data to speed up queries or DML that have predicates involving the partition columns. Here we use country_code as a partition column

- Option 1. Create a partitioned table from select

```
-- Create a partitioned table directly from the query
CREATE TABLE countries_partitioned
  PARTITIONED BY (country_code)
AS SELECT * FROM json.`s3a://area-for-iomete/countries.json`
ORDER BY country_code;

-- To inspect the table use the following query
DESC TABLE EXTENDED countries_partitioned;

```

- Option 2. Insert into to existing table

```
-- just append data
INSERT INTO countries_partitioned
  SELECT  * FROM json.`s3a://area-for-iomete/countries.json`
  ORDER BY country_code;

-- or you can use the following command to overwerite data
INSERT OVERWRITE TABLE countries_partitioned
  SELECT  * FROM json.`s3a://area-for-iomete/countries.json`
  ORDER BY country_code;

```

- Option 3. Merge with existing data

```
MERGE INTO countries_partitioned
  USING (SELECT  * FROM json.`s3a://area-for-iomete/countries.json`) updates
ON countries_partitioned.id = updates.id
WHEN MATCHED THEN
  UPDATE SET *
WHEN NOT MATCHED
  THEN INSERT *;

```

## Conclusion

It's extremly easy to query files in AWS S3 with IOMETE. You just need to provide the bucket name and the path to the file you want to query.

Previous

Export as CSV

Next

Compaction behavior - Copy on Write(COW) vs Merge on Read(MOR)

## ON THIS PAGE

- Provide permissions to IOMETE
- Querying files in AWS S3
- Moving data into the lakehouse

- Non-partitioned Table
- Partitioned Table

- Conclusion
