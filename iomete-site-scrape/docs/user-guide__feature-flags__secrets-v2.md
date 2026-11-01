<!-- source: https://iomete.com/resources/user-guide/feature-flags/secrets-v2 | scraped 2026-11-01 -->

Page title: Secrets V2 Feature Flag | IOMETE
URL: https://iomete.com/resources/user-guide/feature-flags/secrets-v2
Meta description: What the secretsV2 feature flag controls, its prerequisites and impact area, and what to check before enabling or disabling it.

---

- Feature Flags
- Secrets V2

On this page

# Secrets V2 Feature Flag

Enables structured secretObject references for compute, Spark jobs, Jupyter containers, and storage configs, backed by IOMETE-managed Kubernetes secrets or read-only HashiCorp Vault integrations. See Secrets Management for the full feature.

This is purely additive: the existing ${secrets.key} inline-placeholder syntax is a separate code path that this flag does not touch, in any of the areas below. Toggling this flag only changes whether the new secretObject syntax works — nothing that currently uses ${secrets.key} changes behavior, whether the flag is on or off.

This flag is also what makes HashiCorp Vault-backed secrets usable at all. The legacy ${secrets.key} placeholder only ever resolves IOMETE-managed Kubernetes secrets; there's no Vault path in it. A secretObject is the only way to reference a Vault-backed secret in a workload, so Vault integrations are only useful once this flag is on.

Console users are already using secretObject

The console's secret selector — "Use existing secret" / "Create new secret", the recommended way to attach a secret to a workload — produces a secretObject by default, not the legacy placeholder. If this flag is off, secrets picked through that selector won't resolve into the workload (see Impact Area), even though the selector itself doesn't check the flag before letting you pick one.

|  |

| Flag key | secretsV2

| Scope | Global only — no per-domain override

| Default | Disabled

## Prerequisites

### Minimum compatible version

IOMETE 4.0.0 or later to control it through this feature flag — before that, secretsV2 can only be set through the Helm chart value, which requires a normal redeploy to change.

### Deployment setup changes

None. No additional Helm values, infrastructure, or configuration are needed to turn this flag on or off.

### Services to restart

None when changed through the feature-flag admin API — that's what "no restart" means on this page. Toggling a domain or global override takes effect automatically, within about a minute, without restarting iom-core, iom-cluster, or any other service.

If you instead change the underlying Helm value this flag falls back to (features.secretsV2.enabled) with no override set, that's an ordinary Helm upgrade — it goes through your normal deploy process like any other chart value.

## Impact Area

Enabling secretsV2 lets API payloads use a secretObject in place of an inline ${secrets.key} placeholder, per surface below. Existing ${secrets.key} placeholders keep working regardless of the flag, so workloads can migrate one field at a time.

### Secret Object

A secretObject identifies a secret and its backend:

```
{
  "key": "secret_key_in_store",
  "source": {
    "type": "KUBERNETES | VAULT",
    "id": "<domain-name or vault-config-id>"
  }
}

```

| Field | Description

| key | Secret key name in the store

| source.type | KUBERNETES (IOMETE-managed) or VAULT (HashiCorp Vault)

| source.id | Domain name for Kubernetes, or Vault config ID for Vault

When the flag is off, a secretObject entry resolves to nothing instead of a value — the environment variable or Spark config key is simply absent from the workload, with no error at deploy time.

### Compute

Endpoint: POST/PUT /api/v2/domains/{domain}/compute

The same two secrets, expressed both ways — a DB_PASSWORD environment variable and an S3 secret key in Spark config:

- V1 — Inline Placeholders
- V2 — SecretObject

```
{
  "sparkConfig": {
    "envVars": {
      "DB_PASSWORD": "${secrets.db_password}"
    },
    "sparkConf": {
      "spark.hadoop.fs.s3a.secret.key": "${secrets.s3_secret_key}"
    }
  }
}

```

```
{
  "sparkConfig": {
    "envSecrets": [
      {
        "key": "DB_PASSWORD",
        "secretObject": {
          "key": "db_password",
          "source": { "type": "KUBERNETES", "id": "secret-domain" }
        }
      }
    ],
    "sparkConfSecrets": [
      {
        "key": "spark.hadoop.fs.s3a.secret.key",
        "secretObject": {
          "key": "s3_secret_key",
          "source": { "type": "VAULT", "id": "vault-config-id" }
        }
      }
    ]
  }
}

```

envVars/sparkConf (plain values) and envSecrets/sparkConfSecrets (secretObject references) are separate fields inside the same sparkConfig object — you can keep non-secret settings in the plain fields while migrating secrets one at a time.

### Spark Jobs

Endpoints: POST/PUT /api/v2/domains/{domain}/spark/jobs, POST/PUT /api/v2/domains/{domain}/spark/streaming/jobs, POST/PUT /api/v2/domains/{domain}/sdk/spark/jobs — all three job types use the same structure under template.

The same two secrets, expressed both ways — an API_KEY environment variable and an S3 access key in Spark config:

- V1 — Inline Placeholders
- V2 — SecretObject

```
{
  "template": {
    "envVars": {
      "API_KEY": "${secrets.api_key}"
    },
    "sparkConf": {
      "spark.hadoop.fs.s3a.access.key": "${secrets.s3_access_key}"
    }
  }
}

```

```
{
  "template": {
    "envSecrets": [
      {
        "key": "API_KEY",
        "secretObject": {
          "key": "api_key",
          "source": { "type": "VAULT", "id": "vault-config-id" }
        }
      }
    ],
    "sparkConfSecrets": [
      {
        "key": "spark.hadoop.fs.s3a.access.key",
        "secretObject": {
          "key": "s3_access_key",
          "source": { "type": "KUBERNETES", "id": "secret-domain" }
        }
      }
    ]
  }
}

```

### Jupyter Containers

Endpoint: POST/PUT /api/v1/domains/{domain}/jupyter-containers

The same secret, expressed both ways — a DB_PASSWORD environment variable:

- V1 — Inline Placeholders
- V2 — SecretObject

```
{
  "config": {
    "envVars": {
      "DB_PASSWORD": "${secrets.db_password}"
    }
  }
}

```

```
{
  "config": {
    "envSecrets": [
      {
        "key": "DB_PASSWORD",
        "secretObject": {
          "key": "db_password",
          "source": { "type": "KUBERNETES", "id": "secret-domain" }
        }
      }
    ]
  }
}

```

### Storage Configs

Endpoint: POST/PUT /api/v1/domains/{domain}/storage-configs

Unlike the other surfaces, storage configs keep a legacy plaintext field as a real fallback, not just a separate code path. The same S3 secret key, expressed both ways:

- V1 — Plaintext
- V2 — SecretObject

```
{
  "secretKey": "my-plaintext-secret-value"
}

```

```
{
  "storageSecret": {
    "key": "s3_secret_key",
    "source": { "type": "KUBERNETES", "id": "secret-domain" }
  }
}

```

When both fields are set, the structured reference takes precedence; when the flag is off, resolution falls back to the plaintext field if one was ever saved, or comes back blank if it wasn't.

### Vault Config Usage Authorization

Creating or updating a compute cluster, Spark job, streaming job, or Jupyter container checks that the requesting user has Use permission on any Vault configuration referenced in its secretObject entries, at request time, before the resource is created. While the flag is off, this check is skipped (consistent with the fact that those references won't resolve to anything anyway) — so a request containing a Vault-backed secretObject the user doesn't have Use permission for is accepted rather than rejected. This has no effect on Kubernetes-backed secrets or on ${secrets.key} placeholders, which were never gated by this permission.

## Rollout Considerations

Enabling secretsV2 requires no migration of existing workloads (see above) and can be turned on ahead of anyone actually using secretObject. The only extra setup: to reference a Vault-backed secret through secretObject, a Vault integration must already be configured for the domain — see Vault Integrations.

## Rollback Considerations

Disabling secretsV2 is a breaking change once anything is relying on it, not a safe no-op: every case in Impact Area where an entry resolves to nothing or falls back also applies here, in reverse. Concretely: any compute, Spark job, streaming job, or Jupyter container whose secrets are set only through secretObject (no ${secrets.key} placeholder) loses those environment variables/Spark config values on its next deploy, silently and without error, and any storage config set up only through a structured secret reference loses its connection secret the same way.

Before disabling, confirm nothing depends solely on a structured secret reference, and let affected users know first.

## References

- Secrets Management

See Feature Flags for other flags.

Previous

Managing Flags

Next

LDAP Group Inheritance

## ON THIS PAGE

- Prerequisites

- Minimum compatible version
- Deployment setup changes
- Services to restart

- Impact Area

- Secret Object
- Compute
- Spark Jobs
- Jupyter Containers
- Storage Configs
- Vault Config Usage Authorization

- Rollout Considerations
- Rollback Considerations
- References
