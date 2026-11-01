<!-- source: https://iomete.com/resources/user-guide/data-security/tag-based-data-masking | scraped 2026-11-01 -->

Page title: Tag-based Data Masking | IOMETE
URL: https://iomete.com/resources/user-guide/data-security/tag-based-data-masking
Meta description: In IOMETE, the tag-based masking policy anonymizes data from a chosen column using its database, table, and column names based on tags.

---

- Data Security
- Tag-based Data Masking

On this page

# Tag-based Data Masking

In IOMETE, the tag-based masking policy anonymizes data from a chosen column using its database, table, and column names based on tags.

## Policy details
Policy details includes the following properties.

| Field | Description

| Policy name | Enter an appropriate policy name. This name cannot be duplicated in another policy.

| Enabled & Disabled | The policy is enabled by default. If disabled, the policy will not affect user queries.

| Normal & Override | When switched to Override, the access permissions in the policy override the access permissions in existing policies.

| Add Validity Period | Specify a start and end time for the policy. (Optional)

| Description | Describe the purpose of the policy. (Optional)

## Policy resources

Tags: Provide the relevant tag name that should be applied.

## Mask Conditions

IOMETE provides the mask conditions for the management of fine-grained data masking. The condition includes the following properties.

| Field | Description

| Select Group |
Specify one or more groups for whom this policy should be applied. If no group is specified, you must provide a user.

| Select User |
Specify one or more users for whom this policy should be applied. If no user is specified, you must provide a group.

| Masking options |
To create a masking filter for the specified users, groups, click Select Masking Option, then select a masking type:
- Redact – mask all alphabetic characters with "x" and all numeric characters with "n".
- Partial mask: show last 4 – Show only the last four characters.
- Partial mask: show first 4 – Show only the first four characters.
-  Hash – Replace all characters with a hash of the entire cell value.
-  Nullify – Replace all characters with a NULL value.
- Unmasked (retain original value) – No masking is applied.
- Date: show only year – Show only the year portion of a date string and default the month and day to 01/01.

New condition

To add additional conditions, click on the Add new condition button. The conditions are evaluated in the order they appear in the policy. The top condition is applied first, followed by the second, third, and so on.

Drag items from the left-side icon  to reorder.

Previous

Tag-based Access Policy

Next

Check Access

## ON THIS PAGE

- Policy details
- Policy resources
- Mask Conditions
