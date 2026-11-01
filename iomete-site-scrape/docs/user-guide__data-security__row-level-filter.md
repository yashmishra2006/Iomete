<!-- source: https://iomete.com/resources/user-guide/data-security/row-level-filter | scraped 2026-11-01 -->

Page title: Data Row Level Filter | IOMETE
URL: https://iomete.com/resources/user-guide/data-security/row-level-filter
Meta description: Enhance Data Security - IOMETE Empowers Row-Level Filtering to Control Database Access and Visibility

---

- Data Security
- Row Level Filter

On this page

# Data Row Level Filter

IOMETE Row-level Filter policies allow users to access only a subset of data based on the context in which they interact with the data. When utilizing a table with a row-filter, only a portion of rows will be visible to the user – as determined by the filter configuration within the row-filter policy.

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

| Database | Choose only one database. All available options are displayed in the selection. The search function helps you find an exact match.

| Table | Choose only one table. All available options are displayed in the selection based on the chosen database. The search function helps you find an exact match.

Wildcard

Wildcard matching is not supported in row level filter policy.

## Row Filter Conditions

| Field | Description

| Select Group |
Specify one or more groups for whom this policy should be applied.

If no group is specified, you must provide a user.

| Select User |
Specify one or more users for whom this policy should be applied.

If no user is specified, you must provide a group.

| Access Types |
Currently select is the only available access type. This will be used in conjunction with the WHERE clause specified in the Row Level Filter field.

| Row Level Filter |
To create a row filter for the specified users, groups, and roles, Click Add Row Filter, then type a valid WHERE clause in the Enter filter expression box.

To allow Select access for the specified users and groups without row-level restrictions, do not add a row filter (leave the setting as "Add Row Filter").

Filters are evaluated in the order listed in the policy. The filter at the top of the Row Filter Conditions list is applied first, then the second, then the third, and so on.

New condition

To add additional conditions, click on the Add new condition button. The conditions are evaluated in the order they appear in the policy. The top condition is applied first, followed by the second, third, and so on.

Drag items from the left-side icon  to reorder.

## Row Level Filter use cases

### Use Case: Users see only same-country customer records.

Let's use the customers table for row-level filtering feature use cases as well.

This use case focuses on implementing a row-level filtering policy for the customers table to restrict user access to customer records based on their respective countries. The objective is to ensure that users can only view records of customers located in the same country where they work. This policy will help maintain data privacy and comply with country-specific regulations.

Policy details

Target Table: customers table in default database.

Filtering rule:

- The policy enforces that users can only access customer records from their own country-specific group.
- For instance, users belonging to the us_employees group can only access customer records for customers located in the United States. Similarly, users belonging to the uk_employees group can only access customer records for customers located in the United Kingdom.
- The filtering is applied dynamically based on the user's country-specific group membership.

Group examples:

- us_employees: For users working in the United States.
- ca_employees: For users working in the Canada.
- uk_employees: For users working in the United Kingdom.
- Other country-specific groups can be created for different regions as per requirements.

info

Default access type in row-level-filter is select

Rationale:

By implementing this row-level filtering policy, we ensure that users can only access customer data relevant to their work location, minimizing the risk of unauthorized access to sensitive information.

Users are restricted to view customer records within their country, promoting data privacy compliance and adhering to the principle of least privilege.

Query Results

```
SELECT * from default.customers;

```

Sample Data Before Applying Row-Level-Filtering Policy: Consider a few records in the customers table before the Row-Level-Filtering policy is applied:

Sample Data After Row-Level-Filtering :

Once the Row-Level-Filtering policy is applied, the rows in customers table will show different results based on filtering.

User Olivia, a member of uk-employees group: The result includes only customers in UK.

User Jane, a member of ca-employees group: The result includes only customers in Canada.

Previous

Data Masking

Next

Tag-based Access Policy

## ON THIS PAGE

- Policy details
- Policy resources
- Row Filter Conditions
- Row Level Filter use cases

- Use Case: Users see only same-country customer records.
