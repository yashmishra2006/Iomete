<!-- source: https://iomete.com/resources/integrations/bi/apache-superset | scraped 2026-11-01 -->

Page title: Apache Superset - Connecting to IOMETE | IOMETE
URL: https://iomete.com/resources/integrations/bi/apache-superset
Meta description: This guide explains how to effortlessly integrate iomete with one of the most popular BI tools Apache Superset

---

- BI Integrations
- Apache Superset

On this page

# Apache Superset - Connecting to IOMETE

Hi! In this guide, we will explain how to effortlessly integrate IOMETE with one of the most popular BI tools: Apache Superset.

## Apache Superset - Connecting to IOMETE

Apache Superset is a modern data exploration and visualization platform. Superset is fast, lightweight, intuitive, and loaded with options that make it easy for users of all skill sets to explore and visualize their data, from simple line charts to highly detailed geospatial charts.

## Adding iomete database drivers in docker

Superset requires a Python database driver to be installed for each additional type of database you want to connect to. When setting up Superset locally via docker-compose, the drivers and packages contained in requirements.txt and requirements-dev.txt will be installed automatically.

In this section, we'll walk through how to install the connector library for iomete lakehouse.

### Install driver for iomete

As we are currently running inside a Docker container via docker-compose, we cannot simply run pip install py-hive-iomete on our local shell and expect the drivers to be installed within the Docker containers for superset.

In order to address this, the Superset docker-compose setup comes with a mechanism for you to install packages locally, which will be ignored by Git for the purposes of local development. Please follow these steps:

Create requirements-local.txt

```
# From the repo root...
touch ./docker/requirements-local.txt

```

Add the driver selected in the step above:

```
echo "py-hive-iomete" >> ./docker/requirements-local.txt

```

Rebuild your local image with the new driver baked in:

```
docker-compose build --force-rm

```

After the rebuild of the Docker images is complete (which make take a few minutes), you can relaunch using the following command:

```
docker-compose up

```

The other option is to start Superset via Docker Compose using the recipe in docker-compose-non-dev.yml, which will use pre-built frontend assets and skip the building of front-end assets:

```
docker-compose -f docker-compose-non-dev.yml pull
docker-compose -f docker-compose-non-dev.yml up

```

## Connect to iomete

Now that you've got a py-hive-iomete driver installed locally, you should be able to test it out.

We can now create a Datasource in Superset that can be used to connect the iomete lakehouse. Assuming your Lakehouse cluster is running and can be accessed.

### Get connection details from iomete

For connection details, go to the iomete app, select the lakehouse you want to connect to, and in the Connection details, you will find all the required information.

Change highlighted parameters:

- access_token: Generated Tokens are used instead of password for connecting to lakehouse.
- Database: default database is specified in the connection string. If you want to use other database change it.

### Add a connection to Superset

Use the following connection string in “SQL Alchemy URI”, by going to Sources > Databases > + icon (to add a new datasource) in Superset.

```
# Connection template
iomete://admin:{accessToken}@dev.iomete.cloud/default?lakehouse=demo

```

Then click “Test Connection”, which should give you an OK message. If not, please look at your terminal for error messages, and reach out for help.

## Create a sample chart

### Add dataset

Once connected to iomete, we can add datasets from iomete to Superset and create charts.

### Create chart

Click on the added dataset to create a sample chart

That’s all! Repeat the same process to add other datasets and enjoy the rich set of chart libraries of Superset.

Previous

Metabase

Next

Overview

## ON THIS PAGE

- Apache Superset - Connecting to IOMETE
- Adding iomete database drivers in docker

- Install driver for iomete

- Connect to iomete

- Get connection details from iomete
- Add a connection to Superset

- Create a sample chart

- Add dataset
- Create chart
