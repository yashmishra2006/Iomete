<!-- source: https://iomete.com/resources/deployment/minio-deployment | scraped 2026-11-01 -->

Page title: Deploy Minio & Prepare Buckets | IOMETE
URL: https://iomete.com/resources/deployment/minio-deployment
Meta description: Deploy Minio and prepare buckets for the IOMETE deployment.

---

- Deployment
- Advanced Settings
- Minio Deployment

On this page

# Deploy Minio & Prepare Buckets

## Test Minio deployment

Required file: minio-test-deployment.yaml

```
# Download Minio deployment (test) file
wget https://raw.githubusercontent.com/iomete/iomete-deployment/main/minio/minio-test-deployment.yaml

kubectl apply -n iomete-system -f minio-test-deployment.yaml

```

Other Minio deployment examples

- minio-test-deployment-with-hostpath-pvc.yaml

info

This Minio deployment is for testing purposes only. For production, please use your own object storage that is optimized for production use.

## Prepare Lakehouse Bucket

This bucket will store the data lakehouse (data lake).

```
# export access key and secret key
# If you changed the default values, please update the following values accordingly
export AWS_ACCESS_KEY_ID=admin
export AWS_SECRET_ACCESS_KEY=password
export AWS_REGION=us-east-1
export AWS_ENDPOINT_URL=http://localhost:9000

# create s3 bucket
aws s3 mb s3://lakehouse

# verify buckets
aws s3 ls

```

Previous

Apache Ozone Deployment

Next

Configure Ingress

## ON THIS PAGE

- Test Minio deployment
- Prepare Lakehouse Bucket
