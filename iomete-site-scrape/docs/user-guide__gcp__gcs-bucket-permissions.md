<!-- source: https://iomete.com/resources/user-guide/gcp/gcs-bucket-permissions | scraped 2026-11-01 -->

Page title: GCS Bucket Access | IOMETE
URL: https://iomete.com/resources/user-guide/gcp/gcs-bucket-permissions
Meta description: Learn how to provide access to external GCS buckets in IOMETE, a hybrid (cloud & on-premises based) data platform for data storage and analysis. This guide outlines simple steps to connect to GCS buckets and grant permission to the Lakehouse Service Account.

---

- GCP
- GCS Bucket Access

On this page

# GCS Bucket Access

IOMETE is a hybrid (cloud & on-premises) platform that allows users to store, manage, and analyze large amounts of data. One of the key features of IOMETE is the ability to connect any Google Cloud Storage Buckets and access data from them.

In order to do this, you need to provide permission to the Lakehouse Service Account.

Identify the Lakehouse Service Account

Go to the IOMETE Console > Settings > Data Plane > General to locate the Lakehouse Service Account email address, which will be in the form <service-account-name>@<project-id>.iam.gserviceaccount.com.

What is the Lakehouse Service Account?

The Lakehouse Service Account is a Google Cloud IAM service account that is used by IOMETE Data Plane compute resources to access GCS buckets. The Lakehouse Service Account is created during the IOMETE Data Plane installation process.

## Provide access to GCS bucket

- Go to your Google Cloud Console and select your desired bucket.
- Click on the "Permissions" tab, and then click on "Add".
- Add the Lakehouse Service Account as a member and provide the necessary permissions. See Permission Levels for the available permission levels.

### Permission Levels

Google Cloud Storage provides several permission levels that you can assign to the Lakehouse Service Account:

- Storage Object User: Allows the Lakehouse Service Account to view, create, and delete objects in the bucket (read-write access).
- Storage Object Viewer: Allows the Lakehouse Service Account to view objects in the bucket (readonly access).
- Storage Object Admin: Allows the Lakehouse Service Account to view, create, and delete objects in the bucket (full admin access).

Please, consult the IAM roles for Cloud Storage and IAM permissions for Cloud Storage documentation for more information.

Previous

Glue Catalog Permissions

Next

Docker Registry Authentication

## ON THIS PAGE

- Provide access to GCS bucket

- Permission Levels
