<!-- source: https://iomete.com/resources/deployment/ozone-deployment | scraped 2026-11-01 -->

Page title: Deploy Apache Ozone & Prepare Buckets | IOMETE
URL: https://iomete.com/resources/deployment/ozone-deployment
Meta description: Deploy Apache Ozone as S3-compatible object storage and prepare buckets for the IOMETE deployment.

---

- Deployment
- Advanced Settings
- Apache Ozone Deployment

On this page

# Deploy Apache Ozone & Prepare Buckets

Apache Ozone is an open-source (Apache License 2.0) distributed object store with an S3-compatible API. IOMETE connects to it through Ozone's S3 Gateway, the same way it connects to any S3-compatible storage.

Production use

The values files on this page set up Ozone for testing: one datanode, one copy of each object, and no authentication or TLS.

You can run Apache Ozone in production, but you install and operate it yourself. Plan for:

- Three Ozone Managers and three Storage Container Managers for high availability, and enough datanodes for three copies of each object.
- Kerberos authentication and TLS.
- Fast, mirrored disks (SSD or NVMe) for Ozone's metadata.
- Upgrades, monitoring, and capacity planning.

See Installing Ozone In Production in the Apache Ozone documentation.

## Deploying Apache Ozone

The deployment uses the official Apache Ozone Helm chart. Add its repository:

Add the Apache Ozone Helm repository

```
helm repo add ozone-helm https://apache.github.io/ozone-helm-charts/
helm repo update

```

The chart's defaults run without persistent volumes, so all data is lost when a pod restarts. The values file below adds persistent volumes and sizes Ozone for testing:

- One Ozone Manager (OM) and one Storage Container Manager (SCM), each with a 10Gi volume.
- One datanode with a 100Gi volume, which gives about 100GB of usable space.
- One copy of each object, with safe mode turned off and no redundancy.
- securityContext.fsGroup: 1000, so Ozone can write to its volumes.
- A 2GB free-space reserve on the datanode volume, instead of the default 20GB.

Required file: ozone-values.yaml

Install Apache Ozone

```
# Download Apache Ozone values (test) file
wget https://raw.githubusercontent.com/iomete/iomete-deployment/main/ozone/ozone-values.yaml

helm upgrade --install ozone ozone-helm/ozone \
  --version 0.3.0 \
  -n iomete-system \
  -f ozone-values.yaml

```

The release name ozone sets the Service names. The S3 Gateway Service is ozone-s3g-rest, on port 9878.

Wait until all pods are running. It takes about 3-5 minutes:

Watch the Ozone pods

```
kubectl get pods -n iomete-system \
  -l app.kubernetes.io/instance=ozone --watch

```

You should see ozone-om-0, ozone-scm-0, ozone-s3g-0 and ozone-datanode-0, all 1/1 Running. The datanode may restart once or twice while the SCM starts.

Ozone accepts writes once the datanode has an open pipeline, which takes a few minutes after the pods start. Check it before you continue:

Check that Ozone accepts writes

```
kubectl exec -n iomete-system ozone-scm-0 -c scm -- ozone admin pipeline list

```

The output should list a RATIS/ONE pipeline in the OPEN state.

Other Ozone deployment examples

- ozone-values-local-path.yaml: for clusters without a default StorageClass. It stores the volumes on the node's disk through the local-path provisioner, which doesn't enforce volume sizes, so Ozone can use all free space on that disk. Install the provisioner first:

```
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.37/deploy/local-path-storage.yaml

```

Other Ozone settings

- To use a specific storage class, set storageClassName for om, scm and datanode in ozone-values.yaml.
- To see every setting the chart supports, run helm show values ozone-helm/ozone --version 0.3.0.
- Don't add env entries for settings the chart already sets, such as hdds.scm.safemode.min.datanode. Helm 4 rejects duplicate environment variable names.
- Persistent volume settings can't be changed on an existing installation. To change them, uninstall the release, delete its PersistentVolumeClaims and install again.

## Preparing the Lakehouse Bucket

This bucket will store the data lakehouse (data lake).

Open a port-forward to the S3 Gateway in a separate terminal:

Forward the S3 Gateway port

```
kubectl port-forward -n iomete-system svc/ozone-s3g-rest 9878:9878

```

Then create the bucket:

Create the lakehouse bucket

```
# Without Kerberos, Ozone accepts any access key and secret key,
# but requests must still be signed. Use the same keys in the IOMETE values file.
export AWS_ACCESS_KEY_ID=admin
export AWS_SECRET_ACCESS_KEY=password
export AWS_REGION=us-east-1
export AWS_ENDPOINT_URL=http://localhost:9878

# create s3 bucket
aws s3 mb s3://lakehouse

# verify buckets
aws s3 ls

```

## Configuring IOMETE to Use Ozone

Set the storage section of your IOMETE values file to the Ozone S3 Gateway:

example-data-plane-values.yaml

```
storage:
  bucketName: "lakehouse"
  type: "s3_compatible"
  s3CompatibleSettings:
    endpoint: "http://ozone-s3g-rest.iomete-system.svc.cluster.local:9878"
    accessKey: "admin"
    secretKey: "password"

```

IOMETE uses path-style requests for S3-compatible storage, which Ozone requires. For versions earlier than 3.19.1, and for all storage settings, see Object Storage.

Previous

Integrations

Next

Minio Deployment

## ON THIS PAGE

- Deploying Apache Ozone
- Preparing the Lakehouse Bucket
- Configuring IOMETE to Use Ozone
