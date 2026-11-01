<!-- source: https://iomete.com/resources/deployment/on-prem/releases/2.2.0 | scraped 2026-11-01 -->

Page title: Release 2.2.0 - Upgrade Guide | IOMETE
URL: https://iomete.com/resources/deployment/on-prem/releases/2.2.0
Meta description: Updated Docker images

---

On this page

# Release 2.2.0 - Upgrade Guide

## Updated Docker images

```
iomete/iom-data-plane-init:2.2.0
iomete/iom-app:2.2.0
iomete/iom-catalog:2.2.0
iomete/iom-core:2.2.0
iomete/iom-identity:2.2.0
iomete/iom-sql:2.2.0
iomete/iom-rest-catalog:2.2.0
iomete/iom-health-checker:2.2.0
iomete/spark:3.5.3-v2
iomete/spark-py:3.5.3-v2
iomete/spark-operator:3.5.3-v2
iomete/kernel-pyspark:3.5.3-v2
iomete/kernel-spark-scala:3.5.3-v2
iomete/iom-catalog-sync:1.13.0
iomete/iom-openapi-ui:1.12.0

```

## Update Helm

```
helm repo update iomete

helm upgrade data-plane iomete/iomete-data-plane-enterprise -f values.yaml -n iomete-system

```

## Update CRDs

```
kubectl apply --server-side=true --force-conflicts -f https://raw.githubusercontent.com/iomete/iomete-deployment/main/iomete-crds.yaml

```

## Clean up webhooks

This release provides support for having single webhook for all data-plane namespaces.
If you have connected data-plane namespaces, then run the following command to remove additional webhooks and secrets.

```
kubectl delete mutatingwebhookconfiguration spark-operator-{additional-namespace}
kubectl delete secret spark-operator-webhook-certs -n {additional-namespace}

```

## Patch Webhook

This patch apply the following changes:

- Update the webhook path to /mutate--v1-pod
- Update the webhook namespace selector to iomete.com/managed: "true"
- Update the webhook scope to Namespaced

Save this as yaml file iomete-webhook-patch.yaml

```
- op: replace
  path: /webhooks/0/clientConfig/service/path
  value: /mutate--v1-pod
- op: replace
  path: /webhooks/0/namespaceSelector
  value: {"matchLabels": {"iomete.com/managed": "true"}}
- op: replace
  path: /webhooks/0/rules/0/scope
  value: "Namespaced"

```

Then run this command:

```
kubectl patch mutatingwebhookconfiguration spark-operator-iomete-system --type=json --patch-file=iomete-webhook-patch.yaml

```

## ON THIS PAGE

- Updated Docker images
- Update Helm
- Update CRDs
- Clean up webhooks
- Patch Webhook
