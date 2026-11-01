<!-- source: https://iomete.com/resources/user-guide/single-sign-on/okta | scraped 2026-11-01 -->

Page title: SSO to IOMETE with Okta | IOMETE
URL: https://iomete.com/resources/user-guide/single-sign-on/okta
Meta description: Learn how to integrate Okta SSO with the IOMETE Data Plane

---

- Identity and Account
- SSO Configuration
- SSO to IOMETE with Okta

On this page

# SSO to IOMETE with Okta

This guide explains how to use Okta with SAML 2.0 to authenticate users in the IOMETE account console. Follow the steps below to integrate Okta for Single Sign-On (SSO) with IOMETE.

## Okta SSO Configuration Steps

### 1. Retrieve the IOMETE Redirect URL

- In the IOMETE console, navigate to Settings > Single Sign-On under IAM.
- Select SAML 2.0.
- Copy the IOMETE redirect URL displayed on the SAML configuration page. You will need this when setting up your application in Okta.

### 2. Create an IOMETE Application in Okta

- Log in to the Okta Admin Console.
- From the sidebar, go to Applications and click Create App Integration.
- Choose SAML 2.0 as the sign-on method and click Next.

For App Name, enter the name of your app and click Next.

Single sign-on URL: Paste the IOMETE redirect URL you copied earlier.

Audience URI (SP Entity ID): Paste the IOMETE redirect URL again.

Name ID format: Choose Persistent.

### 3. Configure Attribute Statements

In the Attribute Statements section, set up the following attributes to map user details from Okta to IOMETE:

| Name | Name Format | Value

| username | Unspecified | user.login

| email | Unspecified | user.email

| firstName | Unspecified | user.firstName

| lastName | Unspecified | user.lastName

Click Next to proceed.

### 4. Obtain SAML Integration Information

After the setup is complete, Okta will provide you with the following details. These are required to configure IOMETE:

- Identity Provider Issuer (Entity ID).
- Single Sign-On URL (also known as the SAML endpoint).
- X.509 Certificate.

### 5. Configure Okta in IOMETE

Go back to the IOMETE SSO configuration page and enter the information obtained from Okta:

- Entity ID: Paste the Okta Issuer URL.
- Single Sign-On URL: Paste the Okta SAML endpoint.
- X.509 Certificate: Upload the certificate provided by Okta.

Click Save to save your settings, and then click Enable SAML SSO to activate Single Sign-On.

### 6. Assign Users to the IOMETE Application in Okta

After configuring SAML SSO, ensure users have access to the IOMETE app in Okta:

- In the Okta Admin Console, navigate to Applications > Assignments.
- Assign users or groups who should have access to IOMETE.

### Conclusion

After successfully configuring Okta SSO with IOMETE, you can test the integration. Try logging out of the IOMETE page, and you should see the Okta login page!

Tip

During the SSO testing phase, it's advisable to keep the IOMETE account console open in a separate browser window to avoid being locked out.

Previous

OIDC

Next

SSO to IOMETE with OneLogin

## ON THIS PAGE

- Okta SSO Configuration Steps

- 1. Retrieve the IOMETE Redirect URL
- 2. Create an IOMETE Application in Okta
- 3. Configure Attribute Statements
- 4. Obtain SAML Integration Information
- 5. Configure Okta in IOMETE
- 6. Assign Users to the IOMETE Application in Okta
- Conclusion
