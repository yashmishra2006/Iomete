<!-- source: https://iomete.com/resources/user-guide/data-security/tag-based-access-policy | scraped 2026-11-01 -->

Page title: Tag-based Access Policy | IOMETE
URL: https://iomete.com/resources/user-guide/data-security/tag-based-access-policy
Meta description: IOMETE uses tag-based data policy access, using tags to enable the allocation of access policies, or permissions, to users or groups.

---

- Data Security
- Tag-based Access Policy

On this page

# Tag-based Access Policy

IOMETE uses tag-based data policy access, using tags to enable the allocation of access policies, or permissions, to users or groups.

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

## Policy Conditions

IOMETE provides the following access conditions for managing fine-grained access control:

- Allow conditions: "Allow" is a positive permission that grants users or groups the explicit right to access a specific resource or perform particular actions. When a user or group is granted "Allow" permissions, they are explicitly permitted to perform the specified operations on the defined resource.
- Exclude from Allow Conditions: "Exclude from Allow" is a negative permission that can be used to exclude certain users or groups from an "Allow" policy. This means that even if a broader "Allow" rule exists, any user or group listed in the "Exclude from Allow" will be denied access, effectively overriding the broader permission.
- Deny Conditions: "Deny" is a negative permission that explicitly prohibits users or groups from accessing a resource or performing specific actions. When a user or group is listed in a "Deny" policy, they will be denied access, regardless of any "Allow" permissions that might exist.
- Exclude from Deny Conditions: "Exclude from Deny" is a positive permission that can be used to override a broader "Deny" rule. If a user or group is included in the "Exclude from Deny" list, they will be allowed access, even if there is a general "Deny" policy affecting other users or groups.

Each condition includes the following properties.

| Field | Description

| Select Group |
Specify one or more groups for whom this policy should be applied. If no group is specified, you must provide a user.

| Select User |
Specify one or more users for whom this policy should be applied. If no user is specified, you must provide a group.

| Permissions |
Add or edit permissions: Select Update Create Drop  Alter Index Lock All ReplAdmin  Service Admin Select/Deselect All.

info

To add additional conditions, click on the Add new condition button. The conditions are evaluated in the order they appear in the policy. The top condition is applied first, followed by the second, third, and so on.

Drag items from the left-side icon  to reorder.

## Tag-based Access Policy evaluation flow

## Tag-based policy use cases

Tag-based policies use "tags" as labels for data like files or tables in a database. These tags classify data based on things like sensitivity or data type. Tag-based access policies then use these tags to create access rules.

Here's how it works:

Tagging Data: Data administrators or users label data with tags that describe their features. For instance, a financial dataset could have tags like "Confidential" and "Finance," while a marketing dataset might be tagged as "Public" and "Marketing."

Defining Policies: Access policies are then defined using these tags. Instead of specifying access control rules based on individual users or groups, policies are linked to tags. For instance, a policy might be set up to allow only users with the "Finance" tag to access data tagged as "Confidential."

Dynamic Access Control: When a user wants to access data, IOMETE checks if the user's tag matches the data's tag-based access rule. If they match, access is allowed. If not, access is blocked.

Flexibility and Automation: Tag-based access policies offer a more dynamic and flexible approach to access control. As data changes or new data assets are added, the tagging system can be adjusted, and the corresponding access policies will automatically apply without the need for constant policy updates.

Tag-based access policies improve data security, simplify access control, and ensure only authorized people can access sensitive information by using specific tags tied to data.

Previous

Row Level Filter

Next

Tag-based Data Masking

## ON THIS PAGE

- Policy details
- Policy resources
- Policy Conditions
- Tag-based Access Policy evaluation flow
- Tag-based policy use cases
