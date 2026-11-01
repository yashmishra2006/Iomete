<!-- source: https://iomete.com/roadmap/apache-comet | scraped 2026-11-01 -->

Page title: IOMETE
URL: https://iomete.com/roadmap/apache-comet

---

Home

Roadmap

Apache Comet

ROADMAP

# Apache Comet

Status

Planned

Last Updated

July 1, 2026

#### Overview

Comet is a Spark plugin that swaps Spark's row-based physical operators for Arrow-native ones backed by the DataFusion (Rust) engine, with a JVM fallback for anything unsupported. It needs no query changes - you turn it on via config. It delivers roughly a 2x speedup on TPC-DS at SF 1000, i.e. about 50% cost savings, but that's a scan/join/aggregation-heavy benchmark - your mileage depends entirely on how much of your plan stays native vs. falls back to Spark.

BOOK A DEMO

## Starting with IOMETE is simple. Book a demo with us today.

The IOMETE data platform helps you achieve more. Book a personalized demo and experience the impact firsthand.

Get in touch
