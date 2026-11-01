<!-- source: https://iomete.com/resources/user-guide/data-catalog/data-explorer | scraped 2026-11-01 -->

Page title: Browsing with Data Explorer | IOMETE
URL: https://iomete.com/resources/user-guide/data-catalog/data-explorer
Meta description: Browse catalogs, databases, and tables in a hierarchical tree using the Data Explorer tab in IOMETE's Data Catalog.

---

- User Guide
- Data Catalog
- Data Explorer

On this page

# Browsing with Data Explorer

When you don't have a specific table in mind, the Data Explorer tab lets you browse catalogs, databases, and tables level by level.

## Navigating the Hierarchy

The hierarchy works like a file browser: start at catalogs, then drill into databases and tables. Open the Data Explorer tab to land on the catalog list, and click any name to go deeper.

At each level you'll see different columns:

- Catalog list: Name, Type, Location (monospace), Size (Iceberg tables, latest snapshot only), Databases, and Tables.
- Database list (after clicking a catalog): Name, Size, and Tables / Views (format: "N / M").
- Table list (after clicking a database): Name, Type (Table or View), Size (latest snapshot), and Number of files. The header also includes a Register Table button for adding external tables (see Register Table).

Click any table name to open the detail view.

Size Values

Size values reflect only Iceberg tables at their latest snapshot. Total storage may be higher because snapshot history and metadata aren't included.

Previous

Search

Next

Favorites

## ON THIS PAGE

- Navigating the Hierarchy
