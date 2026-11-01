<!-- source: https://iomete.com/roadmap/arrow-flight-support | scraped 2026-11-01 -->

Page title: IOMETE
URL: https://iomete.com/roadmap/arrow-flight-support

---

Home

Roadmap

Arrow Flight Support

ROADMAP

# Arrow Flight Support

Status

Completed

Release Version

3.0.2

Last Updated

July 1, 2026

#### Overview

Arrow Flight is IOMETE's high-performance connectivity layer for moving query results between the platform and external tools. Built on the Apache Arrow Flight protocol, it replaces traditional row-by-row transfer with columnar, batched data streaming, delivering significantly faster and more memory-efficient reads for BI dashboards, SQL clients, and data pipelines. It ships with a custom IOMETE ODBC driver and standard JDBC support, so external engines connect directly to IOMETE Compute over a single, secure channel.

#### Features

- JDBC & ODBC connectivity — Connect any JDBC/ODBC-compatible client to IOMETE Compute over the Arrow Flight protocol.
- Custom IOMETE ODBC driver — Purpose-built driver enabling seamless integration with Power BI and other BI tools.
- Multi-catalog access — View and query multiple Spark catalogs through a single connection, rather than one catalog per connection.
- ArrowFetch (S3 offload) (from v3.12.0) — Large result sets export directly from Spark executors to S3, bypassing the driver bottleneck for faster, memory-safe exports of very large datasets.
- Bind variables / prepared statements (from v3.16.0) — Support for parameterized JDBC queries, including binding NULL values (v3.17.0).
- Spark UI monitoring (from v3.16.0 / v3.17.0) — Queries run via Arrow Flight JDBC now appear in the Spark UI, with a dedicated ArrowFlight SQL tab for monitoring sessions and operations.

#### Use cases

- BI reporting — Connect Power BI, Tableau, or similar tools directly to IOMETE for interactive dashboards on live lakehouse data.
- Large dataset extraction — Export big result sets to downstream systems, QA tools, or enterprise pipelines without hitting driver memory limits (via ArrowFetch).
- High-throughput SQL clients — Any application needing fast, columnar reads from the lakehouse.

#### Screenshots

BOOK A DEMO

## Starting with IOMETE is simple. Book a demo with us today.

The IOMETE data platform helps you achieve more. Book a personalized demo and experience the impact firsthand.

Get in touch
