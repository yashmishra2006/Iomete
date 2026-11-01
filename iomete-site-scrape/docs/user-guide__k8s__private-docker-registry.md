<!-- source: https://iomete.com/resources/user-guide/k8s/private-docker-registry | scraped 2026-11-01 -->

Page title: Private Docker Registry Authentication | IOMETE
URL: https://iomete.com/resources/user-guide/k8s/private-docker-registry
Meta description: Providing access to private Docker registries in IOMETE platform using Kubernetes. Learn how to add a new private Docker registry authentication secret and use it in your jobs.

---

- Kubernetes
- Docker Registry Authentication

On this page

# Private Docker Registry Authentication

When you create a Spark job, you may want to use a custom Docker image stored in your private registry. At this time, you need to authenticate with the private Docker registry to pull the image.

To do this, create an image pull secret and add it to the lakehouse-service-account Kubernetes service account. Every pod that runs under this service account, including IOMETE services and Spark pods, can then pull images from your private registry.

## Creating an Authentication Secret

Use the following YAML configuration to create an Image Pull Secret:

iomete-image-pull-secret.yaml

```
apiVersion: v1
kind: Secret
metadata:
  name: iomete-image-pull-secret
type: kubernetes.io/dockerconfigjson
stringData:
  .dockerconfigjson: |
    {
      "auths": {
        "https://index.docker.io/v1/": {
          "auth": "base64(username:password)"  # Base64 encoded "username:password"
        }
      }
    }

```

info

Replace username:password with your Docker Hub credentials encoded in base64.

Apply the secret in the IOMETE namespace and in every Spark namespace listed under namespaces in your values.yaml. Kubernetes only reads pull secrets from the pod's own namespace, and IOMETE does not copy the secret for you.

```
kubectl apply -n iomete-system -f iomete-image-pull-secret.yaml

```

## Adding the Secret to the Lakehouse Service Account

How you add the secret depends on who created lakehouse-service-account. See Create Cluster-Level Resources for the options.

### Helm Creates the Service Account

From 3.19.1, if you set serviceAccount.create: true, list the secret in your values.yaml:

values.yaml

```
docker:
  imagePullSecrets:
    - name: iomete-image-pull-secret

```

Then run helm upgrade. Helm adds the secret to the service account in every namespace.

If a cluster administrator creates the service account from the chart instead, add the same setting to values.yaml and ask the administrator to render and apply the service account again.

### You Created the Service Account Yourself

If you created lakehouse-service-account with kubectl, or you run 3.19.0 or earlier, patch it directly:

```
kubectl patch serviceaccount \
  -n iomete-system lakehouse-service-account \
  -p '{"imagePullSecrets": [{"name": "iomete-image-pull-secret"}]}'

```

Run the same command for every Spark namespace, replacing iomete-system with the namespace name.

note

You can use a different name for the secret. Use the same name in values.yaml or in the patch command.

Previous

GCS Bucket Access

Next

Spark Executor Shuffle Storage Options

## ON THIS PAGE

- Creating an Authentication Secret
- Adding the Secret to the Lakehouse Service Account

- Helm Creates the Service Account
- You Created the Service Account Yourself
