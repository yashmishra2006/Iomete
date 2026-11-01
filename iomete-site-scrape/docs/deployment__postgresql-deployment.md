<!-- source: https://iomete.com/resources/deployment/postgresql-deployment | scraped 2026-11-01 -->

Page title: PostgreSQL Deployment | IOMETE
URL: https://iomete.com/resources/deployment/postgresql-deployment
Meta description: Deploy a PostgreSQL database for the IOMETE deployment.

---

- Deployment
- Advanced Settings
- PostgreSQL Deployment

# PostgreSQL Deployment

IOMETE requires a PostgreSQL database to store metadata and other information. Refer Backend Databases for more details.

You can use your own database, or you can use the provided postgresql database.

info

This postgresql database is for testing purpose only. For production, please use your own database that is optimized for production use.

Add bitnami helm repo if you haven't done so.

```
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

```

Deploy postgresql database, and wait for it to be ready.

Required file: postgresql-values.yaml

```
wget https://raw.githubusercontent.com/iomete/iomete-deployment/main/database/postgresql/postgresql-values.yaml

helm upgrade --install -n iomete-system \
  postgresql bitnami/postgresql -f postgresql-values.yaml

```

Wait for postgresql pod to be ready. It takes about ~1 minute

```
kubectl get pods -n iomete-system \
  -l app.kubernetes.io/name=postgresql --watch

```

note

When admin user credentials are provided to IOMETE deployment, IOMETE will create necessary users and databases automatically. If you want to create users and databases manually, you can use the following script: database-init-postgres.sql

Previous

Backend Databases

Next

MySQL Deployment
