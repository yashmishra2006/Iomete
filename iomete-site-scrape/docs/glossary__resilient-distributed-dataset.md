<!-- source: https://iomete.com/resources/glossary/resilient-distributed-dataset | scraped 2026-11-01 -->

Page title: Resilient Distributed Dataset (RDD) | IOMETE
URL: https://iomete.com/resources/glossary/resilient-distributed-dataset
Meta description: RDDs, Spark's API, are immutable distributed collections across nodes, enabling parallel operations through a low-level interface with transformations and actions.

---

# Resilient Distributed Dataset (RDD)

October 22, 2026

## What is Resilient Distributed Dataset (RDD)?

RDDs have been the primary user-facing API in Spark since its inception. At their core, RDDs are immutable distributed collections of data elements that are partitioned across nodes in a cluster, allowing for parallel operation using a low-level API that offers transformations and actions.

If you're wondering when to use RDDs, here are five reasons:

- You need low-level control over your dataset, including transformations and actions.
- Your data is unstructured, such as media streams or streams of text.
- You prefer to manipulate your data using functional programming constructs rather than domain-specific expressions.
- You don't require a schema, such as a columnar format, while processing or accessing data attributes by name or column.
- You're willing to forgo some optimization and performance benefits available with DataFrames and Datasets for structured and semi-structured data.

Newer post

Real-Time Retail

Older post

Retrieval Augmented Generation
