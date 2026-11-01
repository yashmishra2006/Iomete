<!-- source: https://iomete.com/resources/user-guide/node-types/performance-benchmarking | scraped 2026-11-01 -->

Page title: Performance Benchmarking | IOMETE
URL: https://iomete.com/resources/user-guide/node-types/performance-benchmarking
Meta description: Benchmark results showing the impact of CPU allocation on Spark query performance.

---

- User Guide
- Node Types
- Performance Benchmarking

On this page

# Performance Benchmarking

## Benchmark Results

CPU allocation directly affects query speed. Allocating less than 1 vCPU (e.g., 300m) can drastically slow Spark jobs because of CPU throttling. The benchmark below compares different CPU configurations on TPC-DS queries 1 through 4 (1 GB dataset), with results in seconds.

Key takeaways:

- Always allocate at least 1 vCPU for both driver and executor nodes.
- Bumping executors to 2 or 4 vCPU noticeably improves throughput on compute-intensive workloads.
- For detailed sizing guidance, see Node Type Sizing Best Practices.

Previous

Default Node Types

Next

Node Type Sizing

## ON THIS PAGE

- Benchmark Results
