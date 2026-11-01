<!-- source: https://iomete.com/resources/user-guide/email-settings | scraped 2026-11-01 -->

Page title: Email Configuration | IOMETE
URL: https://iomete.com/resources/user-guide/email-settings
Meta description: Configure a global SMTP server so IOMETE can send transactional and notification emails from your platform.

---

- User Guide
- Email Configuration

On this page

# Email Configuration

Email configuration allows IOMETE to send transactional and notification emails through your SMTP server. Only one configuration can exist at a time, and it applies across the entire account. Once configured, features such as notification settings automatically use this SMTP server for event-driven emails.

This page acts as both the setup screen and the management view. If no configuration exists, you’ll see a blank form ready for setup. After saving, the page switches to edit mode and displays your stored values (except the password), so you can update them anytime.

## Configuring Email

Setting up email for the first time takes a single form. The fields are grouped into four areas: server connection, security, authentication, and sender information.

- Go to Admin Console > Email Config in the sidebar.
- The form loads with defaults: connection security set to STARTTLS, port set to 587, and authentication enabled.
- Fill in the fields described in the sections below.
- Click Save.

If everything validates, a "Saved" notification appears and the form switches to edit mode.

### SMTP Host and Port

These two fields identify your mail server.

- SMTP host (required): your mail server's address (for example, smtp.gmail.com).
- Port (required): the SMTP port number, from 1 to 65535. This updates automatically when you change the security type:

| Security type | Suggested port

| STARTTLS | 587

| SSL/TLS | 465

| No encryption | 25

You can always override the suggested port after selecting a security type.

### Connection Security

This controls how the connection between IOMETE and your SMTP server is encrypted. Three options appear as radio cards:

- STARTTLS (recommended): a secure, encrypted connection supported by most modern email providers. This is the default.
- SSL/TLS (legacy): a fully encrypted connection from the start, supported by some older providers.
- No encryption (not secure): sends email without encryption. Use this only for internal or testing environments.

Self-Signed Certificates

If your SMTP server uses a self-signed or internal certificate, add it to the truststore.

Changing the security type has two side effects:

- The Port field updates to the suggested port for that type.
- If you select anything other than No encryption, the Require authentication checkbox locks on and can't be unchecked.

### Authentication

The Require authentication checkbox controls whether IOMETE sends credentials to the SMTP server.

- With STARTTLS or SSL/TLS, authentication is required. The checkbox stays checked and disabled, showing the message: "Authentication is required for encrypted SMTP connections."
- With No encryption, you can uncheck the box to allow anonymous connections.

When authentication is on, two extra fields appear:

- Username (required): your SMTP server username.
- Password (required): your SMTP server password.

### Sender Information

These fields control the "From" line on outgoing emails.

- Default sender email (required): the address that appears in the "From" field (for example, noreply@example.com). Must be a valid email format.
- Default sender name (required): the display name shown alongside the sender email (for example, Example Company).

## Updating the Configuration

If a configuration already exists, the form loads in edit mode with your stored values pre-filled. Here's what to do when you need to change something.

- Go to Admin Console > Email Config.
- Modify whatever fields you need.
- Re-enter your SMTP password. The password field is always cleared on page load for security, so you'll see a "Re-enter your SMTP password" placeholder.
- Click Update.

If the update succeeds, a "Saved" notification appears.

Password Re-Entry Required

You must re-enter your SMTP password every time you update the configuration. The stored password is never sent back to the browser. If you click Update without entering the password, validation blocks the submission.

## Testing the Connection

Before you commit to saving, try firing off a test email to verify your SMTP settings. The test uses the current form values without persisting them, so it's safe to experiment.

- Fill in all required fields in the email configuration form.
- Click Test Connection (in the form footer, next to Save or Update).
- If any required fields are empty or invalid, a notification reads: "Please fill in all required email configuration fields first." Fix the errors and try again.
- If validation passes, a Test Connection modal opens.

- The Select email recipients field is pre-filled with your email address. Change it to any valid address if you prefer.
- Click Send Test Email.

If the test succeeds, a notification confirms: "Connection successful! A test email was sent, please check your inbox." The modal closes and a green checkmark appears on the Test Connection button.

The test email arrives with the subject "IOMETE Email Configuration Test" and a message confirming your email integration works.

Test Doesn't Save

The test sends form values directly to your SMTP server without saving them. You still need to click Save or Update to persist the configuration.

## Deleting the Configuration

If you no longer need email, deleting the configuration removes all stored SMTP settings. Any features that depend on email (like notification settings) stop sending until you create a new configuration.

- Click the actions menu (three-dot icon) at the top-right corner of the page.
- Click Delete config.
- A confirmation dialog asks: "Are you sure?"
- Click Yes, delete it to confirm, or Cancel to back out.

After deleting, the form resets to create mode so you can set up a new configuration right away.

Immediate Deletion

Deleting the email configuration takes effect immediately. Any active notification settings that rely on email delivery stop working until you configure a new SMTP server.

## Access Permissions

Only administrators can manage email configuration. The table below lists the required roles for each action.

| Action | Required role | Description

| View configuration | Any admin role | Any user with Admin Console access can view the email configuration.

| Create or update | ADMINISTRATION_MANAGER | Needed to save or modify the SMTP configuration.

| Delete | ADMINISTRATION_MANAGER | Needed to remove the configuration.

| Test connection | ADMINISTRATION_MANAGER | Needed to send a test email.

The ADMINISTRATION_MANAGER role covers system configurations and event logs. Users without it can view the form but can't make changes.

## Related Resources

- Truststore: add self-signed or internal certificates so IOMETE can connect to private SMTP servers over encrypted connections.

Previous

Docker Tag Aliases

Next

Webhooks

## ON THIS PAGE

- Configuring Email

- SMTP Host and Port
- Connection Security
- Authentication
- Sender Information

- Updating the Configuration
- Testing the Connection
- Deleting the Configuration
- Access Permissions
- Related Resources
