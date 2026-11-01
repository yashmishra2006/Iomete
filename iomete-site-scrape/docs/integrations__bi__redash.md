<!-- source: https://iomete.com/resources/integrations/bi/redash | scraped 2026-11-01 -->

Page title: Redash | IOMETE
URL: https://iomete.com/resources/integrations/bi/redash
Meta description: Connect Redash to IOMETE to query your data and build visualizations.

---

- BI Integrations
- Redash

On this page

# Connecting Redash to IOMETE

Redash is an open-source business intelligence platform for data visualization and collaboration. It connects to various data sources, lets you write queries, and share dashboards with your team.

This guide walks you through connecting Redash to your IOMETE compute cluster.

## Adding IOMETE as a Data Source

- Click the Settings icon, then click New Data Source.

- Select Apache Hive from the list of available data sources. Available connector names may vary by Redash version/build.

- Fill in the connection fields using the values from your IOMETE compute cluster connection details.

| Property | Value

| Host | {domain or IP address}

| Port | {server port}

| HTTP Path | /data-plane/{namespace}/lakehouse/{compute_cluster_name}

| Username (User ID) | {your user name}

| Password | {personal access token}

| Database | {database name}

| HTTP Scheme | http/https

You can find these values on the compute cluster details page in the IOMETE console:

- Click Test Connection to verify the connection.

## Running Your First Query

Once connected, navigate to Queries in the navbar. Select your IOMETE data source from the dropdown, write a query in the editor, and click Execute.

Previous

Thrift

Next

DBeaver

## ON THIS PAGE

- Adding IOMETE as a Data Source
- Running Your First Query
