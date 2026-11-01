<!-- source: https://iomete.com/resources/user-guide/single-sign-on/scim | scraped 2026-11-01 -->

Page title: SCIM | IOMETE
URL: https://iomete.com/resources/user-guide/single-sign-on/scim
Meta description: Learn how to provision users and groups with SCIM standards

---

- Identity and Account
- SSO Configuration
- SCIM

On this page

# SCIM

System for Cross-domain Identity Management (SCIM) is a standard for automating the exchange of user identity information between identity domains, or IT systems.

You can implement SCIM to add, manage, and remove organization members' access to IOMETE. For example, an administrator can deprovision an organization member or group using SCIM and automatically remove the member or group from the organization.

IOMETE provides APIs to support user and group provisioning/deprovisioning. To integrate IOMETE SCIM APIs you need followings:

- SCIM Version: 2.0
- SCIM connector base URL: https://dev.iomete.cloud/api/v1/identity/scim/v2 (Replace https://dev.iomete.cloud with the IOMETE base URL specific to your environment—the same URL you use to access the IOMETE console)

- In order to (de)provision CRUD operations for users, requests should be sent to <scim_connector_base_url>/Users (see Scim User Resource in IAM Service definition in API Reference for detailed info about all endpoints)
- In order to (de)provision CRUD operations for groups, requests should be sent to <scim_connector_base_url>/Groups (see Scim Group Resource in IAM Service definition in API Reference for detailed info about all endpoints)

- Unique identifier field for users: userName
- Headers:

- Content-Type: application/scim+json
- Authorization: Bearer <access_token> (see here how to generate access token)

## SCIM APIs

### Users

#### 1. Search Users

To search users in IOMETE database, endpoint expects some query params. In case they are not present, endpoint applies default values to search. Expected query params are these

- filter - if not present no filter is applied as default behavior
- startIndex - if not present 0 is default value
- count - if not present 10 is default value

filter query param should be provided in SCIM standards. filter={attribute}{op}{value}

URL decoded: /api/v1/identity/scim/v2/Users?filter=userName eq "johndoe"

URL encoded: /api/v1/identity/scim/v2/Users?filter=userName%20eq%20%22johndoe%22

IOMETE attempts to parse the specified filter value and apply it to the search operation. If the filter cannot be parsed, then request is considered as failed and SCIM Error response is sent to client.

The response structure for list users request is below

```
{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "totalResults": 1,
    "Resources": [
        {
            "schemas": [
                "urn:ietf:params:scim:schemas:core:2.0:User"
            ],
            "id": "johndoe",
            "userName": "johndoe",
            "name": {
                "familyName": "Doe",
                "givenName": "John"
            },
            "emails": [
                {
                    "value": "johndoe@example.com",
                    "primary": true
                }
            ]
        }
    ]
}

```

#### 2. Get User

It is possible to get user details by userName. In case user does not exists in database, SCIM Error response is sent to client. Otherwise, response structure looks like below

```
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "id": "johndoe",
    "userName": "johndoe",
    "name": {
        "familyName": "Doe",
        "givenName": "John"
    },
    "emails": [
        {
            "value": "johndoe@example.com",
            "primary": true
        }
    ]
}

```

#### 3. Create User

IOMETE expects SCIM structured payload to create a new user. The payload should be structured as below.

```
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "id": "johndoe",
    "externalId": "97fabe4b-1bd5-4ba1-9902-1aa27933bfc4",
    "userName": "johndoe",
    "name": {
        "familyName": "Doe",
        "givenName": "John"
    },
    "emails": [
        {
            "value": "johndoe@example.com",
            "primary": true
        }
    ]
}

```

Please ensure that field names in the payload that your IdP provides are exactly the same. In email list, IOMETE only looks for primary = true, and gets the first one that passes the check.

Before creating the user, IOMETE ensures that there is not existing user with given userName value in database. It does not matter how the user has been created before (could be created manually, could be synced from LDAP, or could be provisioned by IdP). In case, user with given userName value does exist, then request is considered as failed and SCIM Error response is sent to client.

#### 4. Update User

IOMETE expects SCIM structured payload to update existing user. The payload should be structured as below.

```
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "id": "johndoe",
    "externalId": "b51a190b-662a-45c7-81f8-a312d7dfa1da",
    "userName": "johndoe",
    "name": {
        "familyName": "Doe",
        "givenName": "John"
    },
    "active": true|false,
    "emails": [
        {
            "value": "johndoe@example.com",
            "primary": true
        }
    ]
}

```

Please ensure that field names in the payload that your IdP provides are exactly the same. In email list, IOMETE only looks for primary = true, and gets the first one that passes the check. If update request payload contains active field, and it’s value is false then IOMETE deletes the user by given userName, otherwise IOMETE just updates user information.

Before user modification, IOMETE ensures that user exists in database. At this point, IOMETE does not care about user origin (IOMETE, LDAP, IDP). If user does not exist in database, then request is considered as failed, and SCIM Error response is sent to client.

#### 5. Delete User

To provision deleted user IdP is expected to send a request to delete endpoint of IOMETE. Username value is expected to be in url as path variable. Based on this variable IOMETE checks if user exists in database. At this point, IOMETE does not care about user origin (IOMETE, LDAP, IDP). If user does not exist in database, then request is considered as failed, and SCIM Error response is sent to client.

Warning

Please note that all group and role mappings associated with a deleted user will also be removed.

### Groups

#### 1. Search Groups

To search groups in IOMETE database, endpoint expects some query params. In case they are not present, endpoint applies default values to search. Expected query params are these

- filter - if not present no filter is applied as default behavior
- startIndex - if not present 0 is default value
- count - if not present 10 is default value

filter query param should be provided in SCIM standards. filter={attribute}{op}{value}

URL decoded: /api/v1/identity/scim/v2/Groups?filter=displayName eq "Engineers"

URL encoded: /api/v1/identity/scim/v2/Groups?filter=displayName%20eq%20%22Engineers%22

IOMETE attempts to parse the specified filter value and apply it to the search operation. If the filter cannot be parsed, then request is considered as failed and SCIM Error response is sent to client.

The response structure for list users request is below

```
{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "totalResults": 1,
    "Resources": [
        {
            "schemas": [
                "urn:ietf:params:scim:schemas:core:2.0:Group"
            ],
            "id": "Engineers",
            "displayName": "Engineers",
            "members": [
                {
                    "value": "johndoe",
                    "display": "johndoe"
                }
            ]
        }
    ]
}

```

#### 2. Get Group

It is possible to get group details by name. In case group does not exist in database, SCIM Error response is sent to client. Otherwise, response structure looks like below

```
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    "id": "Engineers",
    "displayName": "Engineers",
    "members": [
        {
            "value": "johndoe",
            "display": "johndoe"
        }
    ]
}

```

#### 3. Create Group

IOMETE expects SCIM structured payload to create a new group. The payload should be structured as below.

```
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    "id": "Engineers",
    "displayName": "Engineers",
    "members": [
        {
            "value": "johndoe",
            "display": "johndoe"
        },
        {
            "value": "janedoe",
            "display": "janedoe"
        }
    ]
}

```

Please ensure that field names in the payload that your IdP provides are exactly the same. members list very important as it affects to user-group mappings.

Before creating the group, IOMETE ensures that there is not existing group with given displayName value in database. It does not matter how the user has been created before (could be created manually, could be synced from LDAP, or could be provisioned by IdP). In case, group with given displayName does exist, then request is considered as failed and SCIM Error response is sent to client.

#### 4. Update Group

IOMETE supports PUT and PATCH requests for group modification. IOMETE expects SCIM structured payload to update existing user. The payload should be structured as below.

```
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    "id": "Engineers",
    "displayName": "Engineers",
    "members": [
        {
            "value": "johndoe",
            "display": "johndoe"
        },
        {
            "value": "janedoe",
            "display": "janedoe"
        }
    ]
}

```

Please ensure that field names in the payload that your IdP provides are exactly the same. members list very important as it affects to user-group mappings.

Before group modification, IOMETE ensures that group exists in database. At this point, IOMETE does not care about group origin (IOMETE, LDAP, IDP). If group does not exist in database, then request is considered as failed, and SCIM Error response is sent to client.

#### 4. Delete Group

To provision deleted group IdP is expected to send a request to delete group endpoint of IOMETE. Group name is expected to be in url as path variable. Based on this variable IOMETE checks if group exists in database. At this point, IOMETE does not care about group origin (IOMETE, LDAP, IDP). If user does not exist in database, then request is considered as failed, and SCIM Error response is sent to client.

warning

Please note that all user and role mappings associated with a deleted group will also be removed.

### User-Group Mappings Provision

In IOMETE's create and update group request payloads for the IdP, the members field is required to manage user-group mappings. Users listed in the members field will be associated with the specified group upon provisioning. Any pre-existing users not included in this list will be removed from the group. This approach ensures that the members field provides a complete, authoritative list of group members, facilitating both user assignments and removals in a single operation.

Before establishing mappings, IOMETE verifies each member in the members list to ensure they exist in the database. Although members are generally expected to be present in the database, missing entries are not considered blockers. IOMETE will skip over any non-existent members, log them for reference, and proceed with mapping only those members that do exist.

IOMETE requires that all existing members originate from the IDP. If a member exists in the database but has an origin other than IDP, IOMETE skips that member, and log it for reference.

### SCIM Error Response

Error response looks like below

```
{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:Error"
    ],
    "status": "400",
    "scimType": "invalidFilter",
    "detail": "Unexpected character '\"' at position 0 for token starting at 0"
}

```

Previous

SSO to IOMETE with Microsoft Entra ID

Next

SCIM Okta Configuration

## ON THIS PAGE

- SCIM APIs

- Users
- Groups
- User-Group Mappings Provision
- SCIM Error Response
