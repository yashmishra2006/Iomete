<!-- source: https://iomete.com/resources/deployment/connect-namespace | scraped 2026-11-01 -->

Page title: Install Data-Plane to Kubernetes Namespace | IOMETE
URL: https://iomete.com/resources/deployment/connect-namespace
Meta description: Learn how to install and connect a new Data-Plane to IOMETE Control-Plane.

---

- Deployment
- Advanced Settings
- Install Data-Plane (Namespace)

On this page

# Install Data-Plane to Kubernetes Namespace

This document will guide you through the process of installing and connecting a new Data-Plane to the IOMETE Control-Plane.

Namespace names

In this document, we use data-plane-ns and iomete-system as the namespace names for the Data-Plane and Control-Plane instances. You can replace it with your desired namespace name.
Note that the Control-Plane namespace should be the same as the one you used during the Control-Plane installation.

### Create new namespace for Data-Plane instance

```
# Change `new-data-plane` to your desired namespace name
kubectl create namespace data-plane-ns

# Label the namespace for IOMETE
kubectl label namespace data-plane-ns iomete.com/managed=true

```

### Add the Namespace to Your Values File

In the values.yaml file of the IOMETE Control Plane, add the new namespace to the namespaces section:

```
# Multi-Namespace Support: Spark resources can now be deployed to separate namespaces,
# allowing teams to manage their own CPU and memory resources independently.
# The data plane's namespace is automatically managed and doesn't need to be specified.
namespaces:
  - data-plane-ns

```

### Create the Service Account and Role

The new namespace needs lakehouse-service-account with its Role and RoleBinding.

- If serviceAccount.create is true in values.yaml, skip this step. The Helm upgrade below creates them.
- If it is false, have a Kubernetes administrator re-create the file from step 1 of Option 2 in the install guide and apply it before you upgrade. The file covers every namespace listed in values.yaml, so it includes the new one.
- On 3.19.0 or earlier, create them manually before you upgrade, as shown in Installing 3.19.0 or Earlier.

### Add the Namespace to the Webhook

Skip this step if webhook.create is true. Helm updates the webhook during the upgrade.

If an administrator created the webhook with the install guide commands, add the new namespace to it. List the Control Plane namespace and every namespace from values.yaml:

```
kubectl patch mutatingwebhookconfiguration spark-operator-iomete-system \
  --type=strategic \
  -p='{"webhooks":[{"name":"webhook.sparkoperator.k8s.io","namespaceSelector":{"matchExpressions":[{"key":"kubernetes.io/metadata.name","operator":"In","values":["iomete-system","data-plane-ns"]}]}}]}'

```

If the webhook was created with gencerts.sh, skip this step. The iomete.com/managed=true label you added to the namespace is enough.

### Upgrade IOMETE

Use the chart version you already run, so the upgrade doesn't move you to a newer release:

```
export IOMETE_VERSION="<chart-version>"   # the version you installed, for example 3.19.1

helm upgrade --install -n iomete-system data-plane iomete/iomete-data-plane-enterprise \
  --version "$IOMETE_VERSION" \
  -f values.yaml

```

### Installing 3.19.0 or Earlier
Manual steps for chart versions 3.19.0 and earlier

On these versions, create the service account and Role by hand before the Helm upgrade. Required file: service-account.yaml

```
wget https://raw.githubusercontent.com/iomete/iomete-deployment/main/service-account.yaml

kubectl apply -n data-plane-ns -f service-account.yaml

wget https://raw.githubusercontent.com/iomete/iomete-deployment/main/role-binding-to-control-plane.yaml

export CP_NAMESPACE=iomete-system

sed -i "s/{{control-plane-namespace}}/$CP_NAMESPACE/g" role-binding-to-control-plane.yaml
#For macOS use the following command
# sed -i '' "s/{{control-plane-namespace}}/$CP_NAMESPACE/g" role-binding-to-control-plane.yaml

kubectl apply -n data-plane-ns -f role-binding-to-control-plane.yaml

```

Previous

Network Policies

Next

Nutanix NKP

## ON THIS PAGE

- Create new namespace for Data-Plane instance
- Add the Namespace to Your Values File
- Create the Service Account and Role
- Add the Namespace to the Webhook
- Upgrade IOMETE
- Installing 3.19.0 or Earlier
