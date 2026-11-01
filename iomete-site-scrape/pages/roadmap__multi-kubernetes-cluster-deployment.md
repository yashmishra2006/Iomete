<!-- source: https://iomete.com/roadmap/multi-kubernetes-cluster-deployment | scraped 2026-11-01 -->

Page title: IOMETE
URL: https://iomete.com/roadmap/multi-kubernetes-cluster-deployment

---

Home

Roadmap

Multi-Kubernetes Cluster Deployment

ROADMAP

# Multi-Kubernetes Cluster Deployment

Status

In-Progress

Last Updated

July 1, 2026

### Overview

Enable the IOMETE platform to operate in a multi-cluster environment, allowing enterprise customers to run workloads across multiple regions and clusters while maintaining a unified platform that is easy to manage, eliminates redundant operational effort, and scales effectively with growing demand.

### Background

IOMETE currently operates in standalone clusters, each functioning independently with no shared state or inter-cluster communication. Every cluster maintains its own isolated configuration.

### Key Limitation

- Redundant Configuration Management
- No Single Source of Truth
- Inconsistent User Experience
- Operational Overhead for Scaling

### Scope

Given the breadth of this initiative, we will adopt an incremental approach, adapting each platform component individually to align with the overall multi-cluster vision. Based on current requirements and broader applicability, we will start with the following components.

- IAM (Users, Groups, Roles)
- Data Policies & Access Tokens
- Domains
- Spark Catalog & Metastore

The first phase will prioritize the following areas:

- Centralize configuration and metadata (IAM, Policies, Catalogs, Domains, Metastore) in a global database
- Support multi-version compatibility of IOMETE across clusters
- Implement single-cluster LDAP sync

### Design Overview

To keep the initial design simple we are going ahead with a Global Database, where all clusters will read/write to a centralized database for shared configuration. This minimizes architectural changes and accelerates adoption.

- IAM (Users, Groups, Roles): Global DB for all entities. LDAP sync handled by one control plane.
- Spark Catalog & Metastore: Global DB for spark catalog and REST catalogs across clusters.
- Domains: Metadata is global; namespace mapping remains local to the cluster.
- Data Policies & Access Tokens: Centralized management, with local caching in Spark clusters.

### Migration Plan

- Designate one cluster as the source of truth
- Migrate relevant tables to the global database
- Gradually join other clusters, with optional manual data migration
- Use feature flags to enable incremental rollout

BOOK A DEMO

## Starting with IOMETE is simple. Book a demo with us today.

The IOMETE data platform helps you achieve more. Book a personalized demo and experience the impact firsthand.

Get in touch
