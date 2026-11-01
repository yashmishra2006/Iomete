<!-- source: https://iomete.com/faq | scraped 2026-11-01 -->

Page title: FAQ | IOMETE
URL: https://iomete.com/faq
Meta description: Explore IOMETE’s FAQ — find clear answers about our self-hosted data lakehouse, deployment, security, pricing, and more. Fast, reliable support for your data infrastructure needs.

---

Home

Faq

faq

# Platform Overview

What is IOMETE?

IOMETE is a state-of-the-art, fast, scalable, user-friendly Data Lakehouse Platform for AI and Analytics. It offers flexibility and can be deployed anywhere – on-premises, in the cloud, or in a hybrid environment.

What's the difference between a data lakehouse and a data warehouse?

A traditional data warehouse only handles structured data and uses proprietary formats. A data lakehouse, like IOMETE, supports structured, semi-structured, and unstructured data using open formats while still delivering warehouse-like query performance. You get the flexibility of a data lake with the speed and reliability of a warehouse, all in one platform.

Why do companies choose self-hosted data platforms over SaaS?

Companies choose self-hosted platforms for three main reasons: full control over their data and where it lives, predictable costs without vendor markup, and the ability to meet strict compliance requirements. When you host it yourself, you're not locked into a vendor's pricing model or forced to send sensitive data to third-party systems.

How is IOMETE different from Snowflake or Databricks?

Unlike SaaS platforms such as Snowflake or Databricks, IOMETE runs entirely on your infrastructure. This ensures data sovereignty, enables usage of your cloud discounts, and provides full control over security and deployment. It's built for teams who value flexibility, transparency, and ownership. In addition, IOMETE runs on on-premises, in your data centers, in your private cloud, your public cloud or all of the above (hybrid), whereas Snowflake and Databricks only run on the three main US public clouds (AWS, Azure and Google Cloud).

Can one platform really replace both my data warehouse and data lake?

Yes, that's exactly what a lakehouse does. You can retire separate systems and manage everything in one place. Your structured business data, raw logs, ML training datasets, and IoT streams all live together. You get ACID transactions and SQL query performance on the same data you use for machine learning and analytics.

faq

## Technical Architecture & Performance

What is Apache Iceberg and why should I care?

Apache Iceberg is a modern table format that solves problems older formats couldn't handle. It gives you ACID transactions (so concurrent users don't corrupt data), time travel (query data as it was yesterday or last month), and schema evolution (add columns without breaking things). It's designed for massive datasets and keeps queries fast even with billions of files.

How does IOMETE handle real-time data?

IOMETE uses Apache Spark Structured Streaming to ingest and process real-time data from Kafka, Kinesis, and other streaming sources. Data is written to Iceberg tables and immediately available for SQL analytics, making it ideal for fraud detection, live dashboards, and operational analytics.

What is time travel and when would I use it?

Time travel lets you query your data as it looked at any point in the past. Every change creates a snapshot, so you can compare today's data with last week's, recover from accidental deletions, reproduce analysis exactly as it was run before, or audit changes for compliance. It's like version control for your data.

Can IOMETE scale to petabytes of data?

Yes. IOMETE separates storage from compute, so each scales independently. Storage uses cloud object stores (like S3) that handle virtually unlimited data. Compute scales by adding more nodes to your Spark clusters. The Iceberg format keeps queries fast by using smart metadata that skips irrelevant data - even with petabytes stored.

Does IOMETE work on Kubernetes?

IOMETE is built for Kubernetes from the ground up. It handles everything automatically: deploying Spark clusters, scaling resources up and down, isolating workloads between teams, and recovering from failures. This works on any Kubernetes platform - AWS EKS, Azure AKS, Google GKE, or your own on-premises clusters.

How fast are queries on large datasets?

Query speed depends on how you design your tables, but IOMETE is built for performance. Iceberg automatically skips irrelevant data using metadata, columnar formats only read the columns you need, Spark processes data in memory, and smart partitioning can give you sub-second responses on billion-row tables. Properly designed tables feel as fast as traditional databases.

Can IOMETE support thousands of users at once?

Yes, through workload isolation. You can run multiple Spark clusters - one for your data science team, another for BI users, another for batch jobs. Each cluster operates independently, so heavy workloads don't slow down other users. Clusters automatically scale up during peak usage and scale down during quiet periods.

Does IOMETE work across multiple regions or cloud providers?

Yes. You can deploy IOMETE clusters in different geographic regions for data locality and disaster recovery. You can even run it across different cloud providers (AWS, Azure, Google Cloud) or combine cloud and on-premises infrastructure. This flexibility is essential for global organizations and hybrid cloud strategies.

faq

## Security, Compliance & Cost

How secure is IOMETE?

IOMETE provides enterprise-grade security: encryption for data at rest and in transit, role-based access control down to the table and column level, integration with your existing SSO and LDAP systems, comprehensive audit logging, and network isolation through Kubernetes. Since you control the deployment, you can add additional security layers specific to your needs.

Can IOMETE meet GDPR, HIPAA, and SOC 2 requirements?

Yes, because you control the entire deployment. You decide where data lives (data residency), who can access it (granular permissions), how long to keep it (retention policies), and you maintain complete audit trails. Many regulated organizations choose IOMETE specifically because it gives them the control needed for compliance without depending on third-party data processors.

What does air-gapped deployment mean?

Air-gapped means the system runs in an environment with zero internet connectivity—common in defense, intelligence, and highly secure industries. IOMETE can be fully deployed and operated in these isolated networks. All components run on your controlled infrastructure, ensuring classified or sensitive data never touches external networks.

Is IOMETE suitable for government and defense use?

Yes. Government agencies and defense contractors use IOMETE for classified workloads because it can run in secure, air-gapped, or government-cloud environments. You maintain complete control over data, meet zero-trust architecture requirements, and get full audit trails—all without sending data to commercial SaaS providers.

How do I control where my data is stored?

You have complete control over data location. Choose which cloud regions, availability zones, or on-premises data centers to use. This matters for data sovereignty laws (like GDPR, requiring EU data to stay in the EU) and for organizations operating across multiple jurisdictions with different regulations.

How much money can I save with IOMETE?

Most organizations save 30-60% compared to SaaS data platforms. Savings come from multiple sources: you pay only infrastructure costs without vendor markup, you can use your existing cloud discounts and reserved instances, there are no per-query or per-user fees, you can run non-critical workloads on cheap spot instances, and you have complete visibility into what's driving costs.

Can I use my existing cloud discounts?

Absolutely. Since IOMETE runs on your infrastructure, all your existing cloud agreements apply, including AWS Reserved Instances, Azure Reserved VMs, Google Committed Use Discounts, and enterprise discount programs. SaaS platforms don't allow you to use these discounts, so this alone can save you 30-70% on compute costs.

Does IOMETE work with spot instances?

Yes. You can run batch jobs and non-critical workloads on spot instances (AWS), preemptible VMs (Google Cloud), or low-priority VMs (Azure) to save 60-90% on compute. IOMETE handles interruptions gracefully and automatically retries tasks if instances are reclaimed.

How do I track and control costs?

IOMETE shows you exactly where money is being spent—by team, project, cluster, or job. You can set resource quotas, allocate costs to different departments, and identify expensive queries or workloads. This transparency helps you optimize spending and ensures teams stay within budget.

faq

## Integration, Tools & Migration

What BI tools work with IOMETE?

IOMETE works with all major BI tools using standard connectors. Power BI, Tableau, Looker, Qlik, and other tools connect via JDBC or ODBC. Apache Superset connects natively through Spark SQL. Your analysts can use their familiar tools while querying data stored in IOMETE's lakehouse.

Can I use DBT with IOMETE?

Yes. DBT works seamlessly with IOMETE using the dbt-spark adapter. You can build transformation pipelines, test data quality, document your models, and follow analytics engineering best practices—all running against your Iceberg tables in a self-hosted environment.

Does IOMETE support Jupyter notebooks and Python?

Yes. Data scientists can connect Jupyter notebooks to IOMETE's Spark clusters and work with data using SQL, PySpark, or pandas. You can query tables interactively, build machine learning models, and share notebooks with colleagues—all while working with production data under proper governance.

How do I build data pipelines in IOMETE?

You have multiple options depending on your team's skills and needs. Use SQL for simple transformations, write PySpark or Scala code for complex logic, integrate with orchestration tools like Airflow or Prefect, use dbt for analytics engineering, or leverage Spark Structured Streaming for real-time pipelines. IOMETE provides the foundation while you choose the right tools.

How do I migrate from Hadoop or legacy data warehouses?

Migration usually happens in phases to reduce risk. First, export data to cloud storage or convert Hive tables to Iceberg format. Then migrate your data pipelines and jobs to run on IOMETE's Spark clusters. Update BI tools to connect to the new platform. Finally, run both systems in parallel while validating results before decommissioning the old system. The timeline depends on data volume and pipeline complexity.

Can I run IOMETE alongside my existing data platform?

es, and many organizations do this during migration. Start with one team or use case—maybe your data science group or a single department. IOMETE can read from your existing data lake or warehouse, so you can gradually move workloads while keeping legacy systems running. This phased approach reduces risk and lets you validate everything before committing fully.

faq

## AI & Machine Learning

Can I run machine learning workloads directly on IOMETE?

Yes. IOMETE is built on Apache Spark, which provides native support for distributed ML workloads. You can also integrate popular frameworks like TensorFlow, PyTorch, and Scikit-learn, while keeping all data in your own environment.

How does IOMETE help reduce the cost of AI/ML training and inference?

By running in your infrastructure of choice—on-premise, private cloud, or hybrid—you avoid the SaaS markup. You can optimize compute with spot and reserved instances and scale clusters up or down depending on workload intensity.

Can I use GPUs with IOMETE?

Absolutely. IOMETE supports GPU-accelerated clusters, enabling faster model training and inference for deep learning workloads.

How do data scientists connect their notebooks or IDEs to IOMETE?

Data scientists can use Jupyter, VS Code, or other tools and connect securely via IOMETE’s APIs and JDBC/ODBC connectors. They can query data directly in Iceberg tables and run ML pipelines seamlessly.

What advantages does IOMETE offer for AI/ML compared to cloud SaaS platforms?

Full control over where your data lives (on-premise, sovereign cloud, hybrid). Lower costs without SaaS taxBetter performance by keeping compute close to data. No vendor lock-in, open-source foundation.

How does IOMETE support MLOps?

IOMETE integrates with tools like MLflow and Kubernetes for experiment tracking, model versioning, and deployment. This allows teams to manage the entire ML lifecycle in one secure, cost-efficient environment.

How does IOMETE handle AI governance and compliance?

Since data never leaves your controlled environment, you can enforce governance policies, audit trails, and compliance with regulations (GDPR, HIPAA, etc.) more effectively than with black-box SaaS solutions.

BOOK A DEMO

## Starting with IOMETE is simple. Book a demo with us today.

The IOMETE data platform helps you achieve more. Book a personalized demo and experience the impact firsthand.

Get in touch
