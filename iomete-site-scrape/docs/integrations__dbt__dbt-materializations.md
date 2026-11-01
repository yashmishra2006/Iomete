<!-- source: https://iomete.com/resources/integrations/dbt/dbt-materializations | scraped 2026-11-01 -->

Page title: Materializations | IOMETE
URL: https://iomete.com/resources/integrations/dbt/dbt-materializations
Meta description: DBT Materializations on IOMETE platform. Learn how to set different materialization types (view, table, incremental) and understand their pros & cons

---

- DBT
- Materializations

On this page

# DBT Materializations

Materializations determine how dbt persists your models in the warehouse, and the choice you make has a direct impact on query speed, freshness, and build time. The dbt-iomete adapter supports three of them:

- table
- view
- incremental

## Configuring Materializations

dbt uses view materialization by default. You can override this globally in dbt_project.yml or per model in the model file itself. See the configuration reference for every IOMETE-specific model setting.

### Option 1. Globally

Set the materialization in dbt_project.yml to apply it across folders of models at once.

```
# The following dbt_project.yml configures a project that looks like this:
# .
# └── models
#     ├── csvs
#     │   ├── employees.sql
#     │   └── goals.sql
#     └── events
#         ├── stg_event_log.sql
#         └── stg_event_sessions.sql

name: my_project
version: 1.0.0
config-version: 2

models:
  my_project:
    events:
      # materialize all models in models/events as tables
      +materialized: table
    csvs:
      # this is redundant, and does not need to be set
      +materialized: view

```

### Option 2. Per Model

Set the materialization directly inside a model's SQL file when you want to override the project default for a single model.

```
{{ config(materialized='table') }}

select *
from ...

```

## Materializations

Each materialization trades off freshness, query speed, and build time differently. Pick the one that fits how the model will be used downstream.

### View

With the view materialization, dbt rebuilds your model as a view on every run using a create view as statement.

- Pros: No extra data is stored, and views over source data always reflect the latest records.
- Cons: Views that perform heavy transformations, or stack on top of other views, are slow to query.
- Advice:

- Start with views and switch to another materialization only when you hit performance issues.
- Views work best for lightweight transformations like renaming or recasting columns.

### Table

With the table materialization, dbt rebuilds your model as a table on every run using a create table as statement.

- Pros: Tables are fast to query.
- Cons:

- Tables can take a long time to rebuild, especially for complex transformations.
- New records in the underlying source data don't flow into the table automatically.

- Advice:

- Use tables for any model queried by BI tools, so end users get a faster experience.
- Use tables for slow transformations that feed many downstream models.

### Incremental

incremental models let dbt insert or update only the records that changed since the last run, which keeps build times short on large datasets.

- Pros: Build times drop significantly because dbt only transforms new records.
- Cons: Incremental models need extra configuration and are an advanced dbt pattern. See Incremental models on IOMETE for details.
- Advice:

- Incremental models suit event-style data best.
- Reach for them when your dbt run gets too slow. Don't start there.

Previous

Configuration Reference

Next

Incremental Models

## ON THIS PAGE

- Configuring Materializations

- Option 1. Globally
- Option 2. Per Model

- Materializations

- View
- Table
- Incremental
