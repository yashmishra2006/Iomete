<!-- source: https://iomete.com/resources/deployment/on-prem/releases/2.0.1 | scraped 2026-11-01 -->

Page title: On-Premises - Upgrade notes for 2.0.1 | IOMETE
URL: https://iomete.com/resources/deployment/on-prem/releases/2.0.1
Meta description: Upgrade notes for IOMETE On-Premises 2.0.1

---

On this page

# On-Premises - Upgrade notes for 2.0.1

## Updated Docker images

```
iomete/iom-data-plane-init:2.0.1
iomete/iom-app:2.0.1
iomete/iom-catalog:2.0.1
iomete/iom-core:2.0.1
iomete/iom-identity:2.0.1
iomete/iom-sql:2.0.1
iomete/iom-rest-catalog:2.0.1

iomete/spark:3.5.1-v6
iomete/spark-py:3.5.1-v6
iomete/kernel-pyspark:3.5.1-v6
iomete/kernel-spark-scala:3.5.1-v6

```

## Fetch Helm Repository

```
helm repo add iomete https://chartmuseum.iomete.com
helm repo update iomete

```

## Data Plane Helm

```
helm upgrade --install -n iomete-system data-plane \
  iomete/iomete-data-plane-enterprise \
  -f example-data-plane-values.yaml --version 2.0.1

```

## ON THIS PAGE

- Updated Docker images
- Fetch Helm Repository
- Data Plane Helm
