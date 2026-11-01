<!-- source: https://iomete.com/resources/user-guide/access-tokens/expiry-notifications | scraped 2026-11-01 -->

Page title: Access Token Expiry Notifications | IOMETE
URL: https://iomete.com/resources/user-guide/access-tokens/expiry-notifications
Meta description: Configure email alerts for access token expiry so token owners and service account owners are notified before tokens expire.

---

- User Guide
- Access Tokens
- Expiry Notifications

On this page

# Access Token Expiry Notifications

Expired tokens break integrations without warning, so IOMETE can email token owners ahead of time.

A scheduler runs every day and sends alerts at two configurable thresholds: a warning level and a critical level, each measured in days before expiry.

Both personal and service account tokens are covered (system tokens are excluded).

Prerequisites

Notifications only fire when both conditions are met:

- At least one threshold is set to a positive integer in System Config. See Configuring Thresholds.
- An SMTP server is configured. See Email Configuration.

## Configuring Thresholds

Both thresholds default to 0, which disables notifications. An admin sets them to positive integers in System Config to turn them on.

| System config key | Default | Description

| access-tokens.notifications.warning | 0 (disabled) | Days before expiry to send the warning email

| access-tokens.notifications.critical | 0 (disabled) | Days before expiry to send the critical email

Set one or both. If you set only the critical threshold, recipients get a single alert close to expiry with no earlier heads-up.

## Who Gets Notified

Recipients depend on the token type:

| Token type | Recipients

| Personal token | The token owner's email address

| Service account token | The account's owners

A user owner gets the email at their own address. A group owner sends it to that group's direct members. Run-as principals aren't notified.

Each token gets at most one email per threshold level. The scheduler tracks which levels have already been sent, so a warning email won't repeat, and the critical email only goes out once its threshold is reached.

Previous

Service Account Tokens

Next

Global Spark Settings

## ON THIS PAGE

- Configuring Thresholds
- Who Gets Notified
