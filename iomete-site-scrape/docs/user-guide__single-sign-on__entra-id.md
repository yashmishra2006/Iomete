<!-- source: https://iomete.com/resources/user-guide/single-sign-on/entra-id | scraped 2026-11-01 -->

Page title: SSO to IOMETE with Microsoft Entra ID | IOMETE
URL: https://iomete.com/resources/user-guide/single-sign-on/entra-id
Meta description: Learn how to integrate Microsoft Entra ID SSO with the IOMETE Data Plane

---

- Identity and Account
- SSO Configuration
- SSO to IOMETE with Microsoft Entra ID

On this page

# SSO to IOMETE with Microsoft Entra ID

This guide explains how to use Microsoft Entra ID with SAML 2.0 to authenticate users in the IOMETE account console. Follow the steps below to integrate Microsoft Entra ID for Single Sign-On (SSO) with IOMETE.

## Microsoft Entra SSO Configuration Steps

### 1. Retrieve the IOMETE Redirect URL

- In the IOMETE console, navigate to Settings > Single Sign-On under IAM.
- Select SAML 2.0.
- Copy the IOMETE Redirect URL displayed on the SAML configuration page. You will need this when setting up your application in Microsoft Entra ID.

### 2. Add the IOMETE Application in Microsoft Entra ID

- Sign in to the Microsoft Entra admin center as a Cloud Application Administrator.
- Navigate to Enterprise Applications > New Application.
- In the gallery, select a custom app for SAML integration.
- Once the app is added, go to Single sign-on and select SAML as the method.

### 3. Configure Basic SAML Settings

- In the Basic SAML Configuration section, configure the following:

- Identifier (Entity ID): Paste the IOMETE Redirect URL.
- Reply URL (Assertion Consumer Service URL): Paste the same URL from IOMETE.
- Sign-on URL: Paste the IOMETE Redirect URL.
- Unique User Identifier: Set the Name ID format to user.mail.

### 4. Download SAML Signing Certificate

- In the SAML Signing Certificate section, download the Federation Metadata XML. You’ll need this certificate to upload to IOMETE.

### 5. Configure Microsoft Entra in IOMETE

- Go back to the IOMETE SSO configuration page and input the following information:

- Entity ID: Paste the Identifier (Entity ID) from Microsoft Entra.
- Single Sign-On URL: Paste the Login URL from Microsoft Entra.
- X.509 Certificate: Upload the downloaded certificate from Microsoft Entra.

Click Save and then Enable SAML SSO to activate Single Sign-On.

### 6. Assign Users to the IOMETE Application in Microsoft Entra ID

- In the Microsoft Entra admin center, go to Users and groups under the IOMETE application.
- Assign users or groups that should have access to IOMETE.

### 7. Test and Enable SSO

- Test the configuration by logging out and attempting to sign back in. If successful, you will be redirected to the Microsoft Entra login page.

### Conclusion

After configuring Microsoft Entra SSO with IOMETE, test the setup by logging out of the IOMETE page. You should see the Microsoft Entra ID login page!

Previous

SSO to IOMETE with OneLogin

Next

SCIM

## ON THIS PAGE

- Microsoft Entra SSO Configuration Steps

- 1. Retrieve the IOMETE Redirect URL
- 2. Add the IOMETE Application in Microsoft Entra ID
- 3. Configure Basic SAML Settings
- 4. Download SAML Signing Certificate
- 5. Configure Microsoft Entra in IOMETE
- 6. Assign Users to the IOMETE Application in Microsoft Entra ID
- 7. Test and Enable SSO
- Conclusion
