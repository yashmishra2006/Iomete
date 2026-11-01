<!-- source: https://iomete.com/resources/integrations/airflow/operator-reference | scraped 2026-11-01 -->

Page title: IometeOperator Reference | IOMETE
URL: https://iomete.com/resources/integrations/airflow/operator-reference
Meta description: Reference for IometeOperator parameters, configuration overrides, templates, job run states, and retries.

---

- Airflow
- Operator Reference

On this page

# IometeOperator Reference

IometeOperator submits an existing IOMETE Spark job and monitors its run from an Airflow task. Complete Getting Started with Airflow before using this reference.

## Parameters

| Parameter | Type | Required | Default | Description

| task_id | str | Yes | — | Unique identifier for the task in the DAG.

| job_id | str | Yes | — | IOMETE Spark job ID or name.

| host | str | Yes | — | IOMETE platform URL.

| domain | str | Yes | — | IOMETE domain identifier.

| access_token | str | One token option | — | Personal access token passed as a raw string. This field is not templatable.

| access_token_variable | str | One token option | — | Name of an Airflow Variable containing the token. The plugin resolves it when the task runs.

| host_verify | bool | No | True | Verifies the IOMETE host's TLS certificate.

| config_override | dict or str | No | {} | Overrides arguments, environment variables, or Spark configuration for this run.

| polling_period_seconds | int | No | 10 | Seconds between job status checks.

| do_xcom_push | bool | No | False | Pushes job_id and job_run_id to XCom.

Set either access_token or access_token_variable, never both.

## Template Fields

Airflow applies Jinja templating to:

- job_id
- config_override
- host
- domain
- access_token_variable

The raw access_token field is intentionally excluded because Airflow stores rendered fields in its metadata database and displays them in the UI.

## Configuration Overrides

config_override accepts a dictionary or JSON string with these optional fields:

```
{
  "arguments": ["arg1", "arg2"],
  "envVars": {
    "key": "value"
  },
  "sparkConf": {
    "spark.example.variable": "sample_value"
  }
}

```

See DAG Examples for a templated runtime override.

## Job Run States

| State | Description | Final?

| ENQUEUED | Job is queued. | No

| SUBMITTED | Job is being deployed. | No

| RUNNING | Job is running. | No

| COMPLETED | Job completed successfully. | Yes

| FAILED | Job failed. | Yes

| ABORTED | Job was cancelled. | Yes

| ABORTING | Job cancellation is in progress. | No

A FAILED or ABORTED run raises an AirflowException. If the Airflow task is killed, the operator cancels the active IOMETE job run.

## Retries

Configure retries on the Airflow task with retries and retry_delay, either on the operator or in default_args. Each Airflow retry submits a new IOMETE job run, so every attempt appears in the Airflow UI with its own logs.

Keep the job's Restart Policy set to Never, the default. The operator fails the task on the first FAILED state it sees and doesn't wait for IOMETE to restart the run. With Always or OnFailure, IOMETE can restart the job after Airflow has already marked the task failed, and that restart can overlap with an Airflow retry.

## XCom Values

When do_xcom_push=True, the operator publishes:

| Key | Description

| job_id | Value passed to the operator's job_id parameter, which is either the job's ID or its name.

| job_run_id | ID of the specific job run.

See Passing Run Details with XCom for usage.

Previous

Getting Started

Next

DAG Examples

## ON THIS PAGE

- Parameters
- Template Fields
- Configuration Overrides
- Job Run States
- Retries
- XCom Values
