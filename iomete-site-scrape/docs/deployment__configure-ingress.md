<!-- source: https://iomete.com/resources/deployment/configure-ingress | scraped 2026-11-01 -->

Page title: Configure ISTIO Ingress | IOMETE
URL: https://iomete.com/resources/deployment/configure-ingress
Meta description: Configure ISTIO as an ingress controller on a Kubernetes cluster and configure it for use with IOMETE

---

- Deployment
- Advanced Settings
- Configure Ingress

On this page

# Configure ISTIO Ingress

This guide walks you through the process of installing ISTIO as an ingress controller on a Kubernetes cluster and configuring it for use with IOMETE.

## Deploying ISTIO

note

For AWS, GCP, and Azure deployments, terraform script is already deployed ISTIO as an ingress controller. If that's the case, you can skip this section.

### Adding the ISTIO Helm Repository

```
helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo update

```

### Deploy ISTIO Components via Helm

Execute these commands to install the necessary ISTIO components:

```
helm upgrade --install -n istio-system base istio/base --version 1.17.2
helm upgrade --install -n istio-system istiod istio/istiod --version 1.17.2
helm upgrade --install -n istio-system istio-ingress istio/gateway --version 1.17.2

```

## Configuring the Gateway

You need to configure the ISTIO ingress gateway to access the IOMETE Data Plane UI.

### For HTTP (Non-TLS Mode)

Apply the following configuration for an HTTP gateway:

Required file: gateway-http.yaml

```
# Download the HTTP gateway configuration:
wget https://raw.githubusercontent.com/iomete/iomete-deployment/main/istio-ingress/gateway-http.yaml

# Apply the HTTP gateway configuration:
kubectl -n istio-system apply -f gateway-http.yaml

```

### For HTTPS (TLS Mode)

To set up a secure gateway using TLS:

- Create a TLS Secret: Use the template below, replacing placeholder values with your actual base64 encoded certificate and key.
- Deploy the HTTPS Gateway: After creating the secret, apply the HTTPS gateway configuration.

#### Prerequisites

Before you begin, ensure you have the following ready:

- DNS Configuration: The DNS for your IOMETE Data Plane must be set up. See Configure Custom DNS for IOMETE Data Plane.
- TLS Certificate and Private Key: You need a TLS certificate and a private key, valid for your IOMETE Data Plane's DNS name.

Why do I need a custom DNS?

In order to set up HTTPS, you need to have a DNS address. This ensures that the TLS certificate is valid for the DNS name. Technically, you can enable HTTPs without a DNS, but creating TLS certificates for IP addresses is not recommended.

Where can I get a TLS certificate?

You can obtain a TLS certificate from a certificate authority (CA) or generate a self-signed certificate. Please, ask your network administrator or IT department for assistance. Alternatively, you can use services like Let's Encrypt to get a free TLS certificate.

#### Create a TLS Secret

Once you have your TLS certificate and private key, you need to create a Kubernetes secret to store them. This secret will be used by the ISTIO ingress gateway to enable TLS traffic.

Given that the certificate and key are stored in tls.crt and tls.key files, respectively. You can create a secret using the following command:

```
kubectl -n istio-system \
  create secret tls tls-secret \
   --key tls.key --cert tls.crt

```

Alternatively, you can create a secret using a YAML file with the following content:

tls-secret.yaml

```
apiVersion: v1
kind: Secret
metadata:
  name: tls-secret # Replace with your secret name
  namespace: istio-system
type: kubernetes.io/tls
data:
  tls.crt: <base64-encoded certificate>
  tls.key: <base64-encoded key>

```

#### Deploy the HTTPS Gateway

After creating the secret, apply the HTTPS gateway configuration. If you use a different secret name, update the tls-secret value in the gateway-https.yaml file.

Required file: gateway-https.yaml

```
# Download the HTTPS gateway configuration:
wget https://raw.githubusercontent.com/iomete/iomete-deployment/main/istio-ingress/gateway-https.yaml

# Apply the HTTPS gateway configuration:
kubectl -n istio-system apply -f gateway-https.yaml

```

Also, make sure in the ingress.httpsEnabled=true in the data plane values. If not set, set it to true and upgrade the data plane.

## Follow-Up Steps

If you want to set up a custom DNS for your IOMETE Data Plane, refer to the Configure Custom DNS guide.

Previous

Minio Deployment

Next

Custom DNS

## ON THIS PAGE

- Deploying ISTIO

- Adding the ISTIO Helm Repository
- Deploy ISTIO Components via Helm

- Configuring the Gateway

- For HTTP (Non-TLS Mode)
- For HTTPS (TLS Mode)

- Follow-Up Steps
