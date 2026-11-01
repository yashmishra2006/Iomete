<!-- source: https://iomete.com/resources/integrations/bi/metabase | scraped 2026-11-01 -->

Page title: Metabase | IOMETE
URL: https://iomete.com/resources/integrations/bi/metabase
Meta description: Connect Metabase to IOMETE to build dashboards and explore your data without writing SQL.

---

- BI Integrations
- Metabase

On this page

# Connecting Metabase to IOMETE

Metabase is an open-source business intelligence tool that lets teams build dashboards and explore data without writing SQL. It also supports SQL queries for advanced users.

This guide walks you through connecting Metabase to your IOMETE compute cluster.

## Running Metabase Locally

Skip this section if you already have a Metabase instance running.

You can run Metabase locally using Docker:

```
docker pull metabase/metabase:latest

docker run -d -p 3000:3000 --name metabase metabase/metabase

```

Metabase will be available at http://localhost:3000. See the Metabase installation docs for other deployment options.

## Adding IOMETE as a Data Source

You can add IOMETE during the initial Metabase setup or later from Admin Settings.

- Select Spark SQL as your database type.

- Fill in the connection fields using values from the compute cluster details page in the IOMETE console.

| Property | Value

| Host | {domain or IP address}

| Port | {server port}

| Database | {database name}

| Username (User ID) | {your user name}

| Password | {personal access token}

| Additional JDBC options | ;transportMode=http;ssl=true;httpPath=data-plane/{namespace}/lakehouse/{compute_cluster_name}

- After connecting, Metabase syncs metadata from IOMETE. You can track progress in the bottom-right corner.

## Exploring Data and Building Dashboards

Once the sync completes, your tables appear in the Metabase database explorer.

From here you can create dashboards and visualizations.

Previous

DAG Examples

Next

Apache Superset

## ON THIS PAGE

- Running Metabase Locally
- Adding IOMETE as a Data Source
- Exploring Data and Building Dashboards
