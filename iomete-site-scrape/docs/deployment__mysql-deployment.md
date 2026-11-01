<!-- source: https://iomete.com/resources/deployment/mysql-deployment | scraped 2026-11-01 -->

Page title: MySQL Deployment | IOMETE
URL: https://iomete.com/resources/deployment/mysql-deployment
Meta description: Deploy a MySQL database for the IOMETE deployment.

---

- Deployment
- Advanced Settings
- MySQL Deployment

# MySQL Deployment

IOMETE requires a database to store metadata and other information. Refer Backend Databases for more details.

You can use your own database, or you can use the provided mysql database.

info

This mysql database is for testing purpose only. For production, please use your own database that is optimized for production use.

Add bitnami helm repo if you haven't done so.

```
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

```

Deploy mysql database, and wait for it to be ready.

Required file: mysql-values.yaml

```
wget https://raw.githubusercontent.com/iomete/iomete-deployment/main/database/mysql/mysql-values.yaml

helm upgrade --install -n iomete-system \
  mysql bitnami/mysql -f mysql-values.yaml

```

Wait for mysql pod to be ready. It takes about ~1 minute

```
kubectl get pods -n iomete-system \
  -l app.kubernetes.io/name=mysql --watch

```

note

When admin user credentials are provided to IOMETE deployment, IOMETE will create necessary users and databases automatically. If you want to create users and databases manually, you can use the following script: database-init-mysql.sql

Previous

PostgreSQL Deployment

Next

Life Cycle Management (LCM)
