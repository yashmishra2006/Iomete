<!-- source: https://iomete.com/resources/user-guide/notebook/using-jupyterlab | scraped 2026-11-01 -->

Page title: Using JupyterLab | IOMETE
URL: https://iomete.com/resources/user-guide/notebook/using-jupyterlab
Meta description: Open JupyterLab, connect to Spark clusters, and work with Git and S3 in Jupyter Containers.

---

- Jupyter Containers
- Using JupyterLab

On this page

# Using JupyterLab

## Opening JupyterLab

Once a container is Active, you can open its JupyterLab interface directly from the IOMETE console.

- Open the container's detail page.
- Click Open JupyterLab in the header.

The button is enabled only when the container is Active, the JupyterLab endpoint is available, and you have VIEW permission on the container. JupyterLab opens in a new browser tab. Authentication is handled automatically. Each container has a unique token embedded in the URL, so no separate login step is required. The token is generated when the container is created and persists across restarts.

You can also open JupyterLab from the list view by selecting Open JupyterLab in the row's context menu.

## Connecting to IOMETE Compute Clusters

Jupyter Containers connect to IOMETE compute clusters through Spark Connect. This gives your notebooks access to distributed Spark processing without running a local Spark instance.

- Open a compute cluster's detail page in the IOMETE console.
- Go to the Connections tab and copy the Spark Connect connection string.
- In a JupyterLab notebook, create a Spark session using the connection string:

```
from pyspark.sql import SparkSession

# Paste the connection string from the Compute cluster's Connections tab
spark = SparkSession.builder.remote("sc://...").getOrCreate()

# Query your data
df = spark.sql("SHOW DATABASES")
df.show()

```

Manual connection setup

There is no automatic Spark session configuration. You must set up the Spark Connect connection manually in each notebook.

## Working with Git and S3

Your container includes Git and AWS CLI tools for integration with external systems.

### Git

Clone repositories and manage version control directly from the JupyterLab terminal:

```
# Clone a project repository
git clone https://github.com/your-org/data-project.git

```

Manual credential setup

Git credentials and SSH keys are not automatically mounted into the container. You must configure authentication manually (e.g., personal access tokens, git credential store, or SSH key setup) each time the container starts, unless you persist your configuration in the attached volume.

### S3-Compatible Storage

Use the AWS CLI to interact with S3-compatible object storage:

```
# Configure AWS CLI credentials
aws configure

# Upload results to S3
aws s3 cp results.csv s3://your-bucket/analysis/

```

Use environment variables for credentials

Instead of running aws configure interactively, set your AWS credentials as environment variables in the Configurations tab (using secret-backed references for sensitive values). This avoids re-entering credentials after each restart.

Previous

Manage Containers

Next

Overview

## ON THIS PAGE

- Opening JupyterLab
- Connecting to IOMETE Compute Clusters
- Working with Git and S3

- Git
- S3-Compatible Storage
