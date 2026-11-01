<!-- source: https://iomete.com/roadmap/spark-4-0-upgrade | scraped 2026-11-01 -->

Page title: IOMETE
URL: https://iomete.com/roadmap/spark-4-0-upgrade

---

Home

Roadmap

Spark 4.x Upgrade

ROADMAP

# Spark 4.x Upgrade

Status

In-Progress

Last Updated

July 1, 2026

#### Overview

IOMETE is upgrading its underlying compute engine from Apache Spark 3.5 to the Spark 4.1 line. Because this spans a major version boundary, it brings the full weight of the Spark 4.x generation — a modernized SQL engine, a matured Spark Connect architecture, stronger support for semi-structured data, and significant stability and performance improvements for large workloads — into the IOMETE lakehouse. The upgrade keeps IOMETE aligned with the current, actively maintained Spark release train and unlocks new engine capabilities for SQL, Python, and ML users.

#### Features (what the upgrade brings)

Highlights from the Spark 4.0 → 4.1 generation that become available to IOMETE users:

- VARIANT data type (GA) — VARIANT is GA with shredding for faster reads on semi-structured data, plus recursive CTE support and new approximate data sketches (KLL and Theta).
- SQL Scripting (GA) — SQL Scripting is GA and enabled by default, with improved error handling and cleaner declarations.
- Modernized SQL engine — the 4.x line adds SQL user-defined functions, session variables, pipe syntax, and string collation, along with ANSI SQL mode as the default (a notable behavior change to plan migrations around).
- Matured Spark Connect — a lightweight Python client, full API compatibility for the Java client, and a new spark.api.mode configuration to turn Spark Connect on or off, strengthening IOMETE's existing Spark Connect / remote-execution story.
- ML on Spark Connect (GA) — Spark ML on Connect is GA for the Python client, with smarter model caching and memory management.
- PySpark developer experience — the generation adds a native plotting API, a new Python Data Source API, support for Python UDTFs, and unified profiling for PySpark UDFs.
- Large-workload stability & performance — improved stability for large workloads via zstd-compressed protobuf plans, chunked Arrow result streaming, and enhanced support for large local relations. (Chunked Arrow streaming pairs well with IOMETE's Arrow Flight connectivity.)

BOOK A DEMO

## Starting with IOMETE is simple. Book a demo with us today.

The IOMETE data platform helps you achieve more. Book a personalized demo and experience the impact firsthand.

Get in touch
