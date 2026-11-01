<!-- source: https://iomete.com/resources/user-guide/groups | scraped 2026-11-01 -->

Page title: Groups | IOMETE
URL: https://iomete.com/resources/user-guide/groups
Meta description: Learn how to create and manage groups to organize users and control access across admin roles, domain ownership, domain authorization, and resource bundles.

---

- Identity and Account
- Groups

On this page

# Groups

## Overview

Instead of granting permissions one user at a time, groups let you manage access collectively. Add users to a group, then assign that group wherever access is needed: admin roles, domain ownership, domain authorization (domain bundles), or resource bundles. Every member inherits the group's permissions automatically.

Groups come from three sources. IOMETE groups are created manually in the console. LDAP groups sync from your directory service and can form parent-child hierarchies. IDP groups are provisioned through SCIM.

## Creating a Group

You'll typically create a group when a new team or project needs shared permissions.

- In the Admin Console sidebar, go to IAM > Groups.
- Click New group in the top-right corner.

- A drawer opens with two fields:

- Name (required): a unique identifier for the group, up to 255 characters. You can't change this after creation.
- Description (optional): a short note about the group's purpose.

- Click Create.

You're redirected to the new group's detail page. If a group with that name already exists, the Name field displays a validation error instead.

Permission Required

The New group button is disabled unless you have the IAM_MANAGER admin role.

## Viewing Group Details

To check who's in a group or how it fits into a hierarchy, open its detail page by clicking any group name in the list.

### General Info

The top of the page displays the group's core metadata:

| Field | Description

| Name | The group's unique identifier

| Origin | Where the group was created: IOMETE, LDAP, or IDP

| Added by | Who created the group and when

| Description | Optional description text

### Users Tab

The Users tab (selected by default) lists every assigned user with their username and full name. Each row links to that user's detail page. For long lists, the search bar filters by email, first name, last name, or username.

### Sub Groups and Parent Groups Tabs

These tabs show where a group sits in a hierarchy. Both display a searchable, read-only table of group names that link to each group's detail page.

LDAP Only

Group hierarchies come from LDAP sync when the ldapGroupInheritance feature flag is enabled. You can't create or edit parent-child relationships through the console.

## Editing a Group

Need to clarify a group's purpose? You can update its description at any time, though the name is locked after creation.

- Click Edit in the header.
- A drawer opens with the Name field grayed out. Update the Description.
- Click Save changes.

## Managing Users

Once a group exists, you'll want to add the right people. Assign or remove users from the Users tab on the group's detail page.

### Assigning Users to a Group

- Select the Users tab.
- Click the Assign user dropdown. A scrollable list appears with users not already in the group.
- Search by name or username, then select one or more users to assign them.

### Removing a User from a Group

- On the Users tab, find the user you want to remove.
- Click the delete icon on that row. The user is removed immediately with no confirmation dialog.

## Deleting a Group

When a team dissolves or a project wraps up, delete its group to keep your IAM tidy. You can do this from either the detail page or the list page.

From the detail page:

- Click the three-dot actions menu in the header.
- Click Delete group.
- Confirm by clicking Yes, delete it.

From the list page:

- Click the three-dot actions menu on the group's row.
- Click Delete, then confirm with Yes, delete it.

Irreversible Action

Deleting a group removes all its user and admin role assignments. This action can't be undone.

## Access Permissions

Before you start managing groups, make sure you have the right role. Any admin role lets you view groups, but you need IAM_MANAGER to make changes. Without it, all create, edit, delete, and assign buttons are disabled.

| Permission | View groups | Create / Edit / Delete | Assign or remove users | Assign or remove admin roles

| Any admin role | ✅ | ❌ | ❌ | ❌

| IAM_MANAGER | ✅ | ✅ | ✅ | ✅

## Group Origins

Not every group is created by hand. The Origin field tells you where a group came from, and IOMETE sets it automatically at creation time.

| Origin | Description

| IOMETE | Created manually through the Admin Console

| LDAP | Synced from an LDAP directory. See LDAP Configuration

| IDP | Provisioned from an identity provider via SCIM. See SCIM provisioning

## Related Features

- Users: manage individual user accounts assigned to groups
- Roles: understand the role model that groups inherit
- LDAP Configuration: configure LDAP sync that creates groups and hierarchies

Previous

Users

Next

Admin Roles

## ON THIS PAGE

- Overview
- Creating a Group
- Viewing Group Details

- General Info
- Users Tab
- Sub Groups and Parent Groups Tabs

- Editing a Group
- Managing Users

- Assigning Users to a Group
- Removing a User from a Group

- Deleting a Group
- Access Permissions
- Group Origins
- Related Features
