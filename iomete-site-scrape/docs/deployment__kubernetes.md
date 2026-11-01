<!-- source: https://iomete.com/resources/deployment/kubernetes | scraped 2026-11-01 -->

Page title: Kubernetes Setup Guide | IOMETE
URL: https://iomete.com/resources/deployment/kubernetes
Meta description: Kubernetes cluster recommendations for IOMETE deployments

---

- Deployment
- Advanced Settings
- Kubernetes Setup Guide

On this page

# Kubernetes Setup Guide

IOMETE requires a Kubernetes cluster to run. For production environments, use your company's existing production-ready Kubernetes cluster. If you don't have access to a Kubernetes cluster or need something quick for demos and proof-of-concepts, we recommend k3s Kubernetes Cluster.

## Why k3s?

k3s is perfect for getting started because it's:

- Lightweight - Uses minimal resources
- Fast - Installs easily

## When to use k3s

IOMETE recommends k3s for:

- Demos and POCs - Quick setup for evaluations
- Development and testing
- Small and non-critical production workloads

## Quick single-node installation

Critical: firewall rules to set before install. See: https://docs.k3s.io/installation/requirements

Install k3s with a single command:

```
curl -sfL https://get.k3s.io | sh -

# Verify: 
kubectl get nodes

```

See: https://docs.k3s.io/quick-start

Previous

Nutanix NKP

Next

Multi-Cluster Setup

## ON THIS PAGE

- Why k3s?
- When to use k3s
- Quick single-node installation
