<!-- source: https://iomete.com/resources/user-guide/aws/glue-catalog-permissions | scraped 2026-11-01 -->

Page title: AWS Glue Catalog Access | IOMETE
URL: https://iomete.com/resources/user-guide/aws/glue-catalog-permissions
Meta description: Learn how to provide access to the AWS Glue Catalog in IOMETE, a hybrid (cloud & on-premises based) data platform for data storage and analysis. This guide outlines simple steps to connect to the AWS Glue Catalog and grant permission to the Lakehouse role.

---

- AWS
- Glue Catalog Permissions

On this page

# AWS Glue Catalog Access

In IOMETE, when you add AWS Glue Catalog as a catalog, you need to provide permission to the Lakehouse Role to access the Glue Catalog.

info

To find the Lakehouse role, go to the IOMETE Console > Settings > Data Plane > General and look for the Lakehouse Role ARN field.

### Attaching the IAM Role Policy

To attach the IAM role policy to the Lakehouse role, you need to navigate to the IAM console.

- Go to your IAM console and select Roles from the left-hand menu.
- Search for the Lakehouse role in the list of roles and click on it.
- Click on the Permissions tab, and then click on Add inline policy.
- See below for the example to create a policy. You can copy and paste the policy into the JSON editor.
- Click on Review policy. Give your policy a name and click on Create policy.

You have now successfully attached the IAM role policy to the Lakehouse role. IOMETE can now access the Glue Catalog.

note

Alternative to Inline policy, you can also create a Managed policy from Policies in the IAM console and attach it to the Lakehouse role.

### Glue Catalog IAM Policy Template

Below is an example of an IAM policy template that provides full access to the Glue Catalog for the Lakehouse role.

iomete-glue-catalog-policy.json

```
{
   "Version": "2012-10-17", 
    "Statement": [
      {
         "Sid": "AllConnectors",
         "Effect": "Allow",
         "Action": [
            "glue:*"
         ],
         "Resource": [
            "arn:aws:glue:<region>:<aws-account-number>:*"
         ]
      }
   ]
}

```

Please replace <region> and <aws-account-number> with your AWS region and account number respectively.

Example

Here is an example of a policy that provides full access to the Glue Catalog for the Lakehouse role in the us-east-1 region.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllConnectors",
            "Effect": "Allow",
            "Action": [
                "glue:*"
            ],
            "Resource": [
                "arn:aws:glue:us-east-1:680330367469:*"
            ]
        }
    ]
}

```

For more granular permissions, please consult the AWS Glue Catalog documentation.

Previous

S3 Buckets Access

Next

GCS Bucket Access

## ON THIS PAGE

- Attaching the IAM Role Policy
- Glue Catalog IAM Policy Template
