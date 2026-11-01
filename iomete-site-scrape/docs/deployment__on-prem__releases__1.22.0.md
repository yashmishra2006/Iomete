<!-- source: https://iomete.com/resources/deployment/on-prem/releases/1.22.0 | scraped 2026-11-01 -->

Page title: On-Premises - Upgrade notes for 1.22.0 | IOMETE
URL: https://iomete.com/resources/deployment/on-prem/releases/1.22.0
Meta description: Upgrade notes for IOMETE On-Premises 1.22.0

---

On this page

# On-Premises - Upgrade notes for 1.22.0

## Updated Docker images

```
iomete/iom-app:1.22.0
iomete/iom-catalog:1.22.0
iomete/iom-core:1.22.0
iomete/iom-data-plane-init:1.22.0
iomete/iom-identity:1.22.0
iomete/iom-sql:1.22.0

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
  -f example-data-plane-values.yaml --version 1.22.0

```

## ON THIS PAGE

- Updated Docker images
- Fetch Helm Repository
- Data Plane Helm
