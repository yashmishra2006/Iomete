<!-- source: https://iomete.com/resources/user-guide/troubleshooting/sql-query-errors | scraped 2026-11-01 -->

Page title: SQL Query Errors | IOMETE
URL: https://iomete.com/resources/user-guide/troubleshooting/sql-query-errors
Meta description: This documentation provides details to help investigate user errors in SQL queries

---

- Troubleshooting
- SQL Query Errors

On this page

# SQL Query Errors

## Invalid Namespace Error

When you encounter an Invalid Namespace error while running a query, it means your query is missing a valid database reference. This happens when:

- You haven't specified a database in your query
- The specified database doesn't exist
- You don't have access to the specified database

To resolve this:

- Select a database from the dropdown menu in the top-right corner of the IOMETE SQL Editor
- OR explicitly include the database name in your query (e.g., SELECT * FROM database_name.table_name)

The database reference is required for all queries in IOMETE to ensure they execute in the correct context.

Previous

Troubleshooting OOM kills on the Lakehouse driver pod

## ON THIS PAGE

- Invalid Namespace Error
