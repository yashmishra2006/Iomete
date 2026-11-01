<!-- source: https://iomete.com/resources/user-guide/roles | scraped 2026-11-01 -->

Page title: Roles | IOMETE
URL: https://iomete.com/resources/user-guide/roles
Meta description: Learn how to create and manage Roles, their permissions, responsibilities, and best practices for effective management.

---

- Identity and Account
- Roles

On this page

# Roles

Welcome to the documentation for Roles! This document aims to provide a comprehensive guide to understanding roles within data plane.

The system initially generates some roles with full permissions. Users have the ability to create new role or duplicate existing role from role list.

## Role create

Lets create new role (with Admin account) and assign it to user. In the role create page contains following inputs:

- Name
- Description
- Permissions that covering areas such as Lakehouse, Spark Connect, Spark Jobs, Jupyter Notebook, Data Governance, Settings, Secrets.

### Permissions Overview

Each permission includes the following access levels:

Can List: Grants permission to view a list of resources.

Can Create: Provides permission to create new resources.

Can Manage: Offers the ability to edit, remove, or manage select or all resources. This includes the option to Start and Terminate the Lakehouse.

Can View: Allows users to view detailed information about a resource.

Can Attach: Grants permission to attach roles to users, roles to groups, users to groups, etc.

To activate a specific access item, simply check the related checkbox. The default setting is (All) for each access item. However, you can customize options for everything except View and Manage as needed.

### Assign role

After creating a role, go to the user list and click on a user to whom you want to assign the role. First, remove any existing roles added by the system. Then, click the Assign Role button and choose the role we created.

note

Groups can have roles assigned, and all users in a group automatically inherit the group's role.

### Result

After being assigned the role, log in to the current user account. Navigate to the lakehouse list and click on test-lakehouse. You can view the lakehouse, but you can't manage it.

Previous

Admin Roles

Next

LDAP Configuration

## ON THIS PAGE

- Role create

- Permissions Overview
- Assign role
- Result
