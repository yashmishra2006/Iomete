<!-- source: https://iomete.com/resources/blog/new-iomete-features-september-2022 | scraped 2026-11-01 -->

Page title: New IOMETE features | September 2022 | IOMETE
URL: https://iomete.com/resources/blog/new-iomete-features-september-2022
Meta description: In September 2022, IOMETE released a number of new platform features including new single domain for IOMETE console, a new access control system, pricing module, improved metrics dashboard, billing and role-based integrations.

---

# New IOMETE features | September 2022

September 21, 2022 · 3 min read

Fuad Musayev
Software Engineer @ IOMETE

In September 2022, we released a number of new and improved platform features:

- New single domain for IOMETE console
- Transparent pricing
- New Access Control System
- New metrics dashboard
- Account switching
- Billing

## New single domain for IOMETE console

The console became easier to access through one single domain at. The old <account_number>.iomete.com domains have been removed. Use your 12-digit account number to sign in.

## Transparent pricing

We are proud to offer the most transparent pricing in the industry. Users pay the AWS on-demand compute price. No markups. You may select the AWS machine types supported by IOMETE from the interface and view the AWS price for that machine; IOMETE will charge you the same amount as AWS would charge you. Please keep in mind that prices vary depending on your AWS region.

## New Access Control System

Simply manage IOMETE permissions through the Access Control System. Detailed roles and permissions can be assigned to individuals and groups. Resource-based permissions are also supported. For a smooth transition, we enabled systems default permissions and allocated them to each user.

## Improved dashboard

The improved dashboard makes it easy to analyze your tasks and discover pain points. With the Grafana tool one can easily optimize spark jobs.

## Switch between accounts

Users can now easily switch between multiple IOMETE accounts. To switch between accounts, click on the profile button found on the left bottom side.

## Billing console

Users can quickly review and download invoices and arrange payment directly from IOMETE’s billing console.

## Role-based integrations

We removed “External Storage Integration”. Now we support only role-based and user-based integrations. Reason for this change was that the external type was not recommended by AWS and led to confusion.

## Lakehouse connection

To use lakehouse connection from Database Tools (for example, DataGrip) or Python (SQL Alchemy), you will have to update your connection details. For further details check the datagrip lakehouse connection and SQL alchemy driver documentation.

## Smaller updates and fixes

� Superset BI now supports async query executions.

� IOMETE’s built-in SQL Editor was optimized for a better experience.

� UI improvements (Users, Groups, Storage Integrations now moved to Settings).

� Many technical improvements to make your experience even better.

Last updated on Oct 22, 2026

Newer post

Data Governance in 2023

Older post

Spark SQL Cheat Sheet for Apache Iceberg
