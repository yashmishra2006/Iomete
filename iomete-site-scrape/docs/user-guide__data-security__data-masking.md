<!-- source: https://iomete.com/resources/user-guide/data-security/data-masking | scraped 2026-11-01 -->

Page title: Data Masking Policy | IOMETE
URL: https://iomete.com/resources/user-guide/data-security/data-masking
Meta description: IOMETE enables dynamic data masking for enhanced security. Safeguard sensitive info like PII, PCI, PHI with column anonymization in query results.

---

- Data Security
- Data Masking

On this page

# Data Masking Policy

IOMETE allows you to protect sensitive data using data masking. With this feature, you can create policies that mask or anonymize specific columns containing sensitive data, such as PII, PCI, and PHI, dynamically in the query output.

## Policy details
Policy details includes the following properties.

| Field | Description

| Policy name | Enter an appropriate policy name. This name cannot be duplicated in another policy.

| Enabled & Disabled | The policy is enabled by default. If disabled, the policy will not affect user queries.

| Normal & Override | When switched to Override, the access permissions in the policy override the access permissions in existing policies.

| Add Validity Period | Specify a start and end time for the policy. (Optional)

| Description | Describe the purpose of the policy. (Optional)

## Policy resources

| Field | Description

| Catalog | Choose a catalog. All available options are displayed in the selection. The search function helps you find an exact match.

| Database | Choose only one database. All available options are displayed in the selection based on the chosen catalog. The search function helps you find an exact match.

| Table | Choose only one table. All available options are displayed in the selection based on the chosen catalog and database. The search function helps you find an exact match.

| Column | Choose only one column. All available options are displayed in the selection based on the chosen catalog, database, and table. The dropdown shows the column name and data type.

Wildcard

Wildcard matching is not supported in data masking policy.

## Mask Conditions

IOMETE provides the mask conditions for the management of fine-grained data masking. The condition includes the following properties.

| Field | Description

| Select Group |
Specify one or more groups for whom this policy should be applied. If no group is specified, you must provide a user.

| Select User |
Specify one or more users for whom this policy should be applied. If no user is specified, you must provide a group. Two special entries are available: {USER} (current user) and {OWNER} (table owner).

| Masking options |
To create a masking filter for the specified users, groups, click Select Masking Option, then select a masking type:
- Mask -- mask all alphabetic characters with "x" and all numeric characters with "n".
- Mask Show Last 4 -- Show only the last four characters.
- Mask Show First 4 -- Show only the first four characters.
-  Mask Hash -- Replace all characters with a hash of the entire cell value.
-  Mask Null -- Replace the value with a NULL value.
- Mask None (retain original value) -- No masking is applied.
- Mask Date (Show Year) -- Show only the year portion of a date string and default the month and day to 01/01.
- Custom -- Apply a user-provided SQL masking expression. See Custom masking expressions.

Sensitive selection warning

When you select the public group or {USER}, all users in the organization can access the data -- not just the selected group. Review your selection to avoid exposing sensitive data.

New condition

To add additional conditions, click on the Add new condition button. The conditions are evaluated in the order they appear in the policy. The top condition is applied first, followed by the second, third, and so on.

Drag items from the left-side icon  to reorder.

## Custom masking expressions

When you select Custom as the masking option, two additional fields appear:

- Masking Expression (required) -- the SQL expression that replaces the column value. Use {col} to reference the target column.
- Condition Expression (optional) -- a WHERE-style condition that determines when the mask applies. Use {col} to reference the target column.

Masking expression examples

| Expression | Description

| md5({col}) | Hash the column value

| regexp_replace({col}, '[0-9]', 'X') | Replace all digits with X

| substr({col}, 1, 4) || '-XXXX-XXXX-' || substr({col}, -4) | Keep first and last 4 digits of a credit card

| case when department='HR' then null else {col} end | Hide value for HR department

Condition expression examples

| Expression | Description

| {col} is not null | Apply mask only to non-null values

| {col} = 'US' | Apply mask when value equals US

| {col} in ('US', 'UK', 'CA') | Apply mask for specific countries

| {col} like '%test%' | Apply mask when value contains "test"

## Create a masking policy

- Go to Data Security > Masking and click New Policy.
- In Policy details, enter a name (required) and optional description. Adjust Enabled/Disabled and Normal/Override toggles as needed. Optionally set a validity period.
- In Resources, select a Catalog, Database, Table, and Column. To mask additional columns, click Add resource.
- In Mask Conditions, select the groups or users who should see masked data, then choose a masking option. For custom masking, enter the masking expression and optional condition expression.
- To add more conditions with different masking rules, click Add condition.
- Click Create.

## Edit, duplicate, and delete

- Edit -- Click a policy name in the list to open the edit form. The policy name cannot be changed. Click Save to apply changes.
- Duplicate -- From the actions menu (⋮) in the policy list, click Duplicate. A copy of the policy opens with -copy appended to the name. Modify as needed and click Create.
- Delete -- From the actions menu in the policy list or from the edit form, click Delete. Confirm the deletion in the dialog.

Permission

All data masking operations require the Data Security and Audit Manager admin role.

## Data masking policy use cases

### Use case: Masking phone number in Customers Table

Let's use the customers table for data-masking feature use cases as well.

This use case focuses on implementing a masking policy for the phone_number column within the customers table. The objective is to provide a certain level of data privacy while granting access to the data for the public group.

Policy details:

- Target Table: customers
- Target Column: phone_number

Masking rule:

- The policy enforces that members of the public group can only view the last 4 digits of the phone_number column.
- All other digits preceding the last 4 should be masked or obfuscated, ensuring that sensitive information remains protected.

Access permissions:

- The public group is granted read access to the phone_number column within the customers table.
- This allows the public group members to view the partially masked phone numbers for customers while ensuring that critical digits are concealed.

Query results

```
SELECT * from default.customers;

```

Sample Data Before Applying Masking Policy for public group: Consider a few records in the customers table before the masking policy is applied:

Sample Data After Applying Masking Policy public group: Once the masking policy is applied, the phone_number column will show different results based on the user group's access level.

Previous

Access Policy

Next

Row Level Filter

## ON THIS PAGE

- Policy details
- Policy resources
- Mask Conditions
- Custom masking expressions
- Create a masking policy
- Edit, duplicate, and delete
- Data masking policy use cases

- Use case: Masking phone number in Customers Table
