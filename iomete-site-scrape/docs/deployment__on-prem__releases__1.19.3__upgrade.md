<!-- source: https://iomete.com/resources/deployment/on-prem/releases/1.19.3/upgrade | scraped 2026-11-01 -->

Page title: On-Premises - Upgrade notes for 1.19.3 | IOMETE
URL: https://iomete.com/resources/deployment/on-prem/releases/1.19.3/upgrade
Meta description: Upgrade notes for IOMETE On-Premises 1.19.3

---

On this page

# On-Premises - Upgrade notes for 1.19.3

## Updated Docker images

No docker images are updated in this release.

## Update Helm Repository

```
helm repo add iomete https://chartmuseum.iomete.com
helm repo update iomete

```

## Upgrade IOMETE Data Plane

Ensure your data-plane-values.yaml file is correctly configured before deploying the IOMETE Data Plane:

```
helm repo update iomete

helm upgrade --install -n iomete-system data-plane \
  iomete/iomete-data-plane-enterprise \
  -f example-data-plane-values.yaml --version 1.19.3

```

## ON THIS PAGE

- Updated Docker images
- Update Helm Repository
- Upgrade IOMETE Data Plane
