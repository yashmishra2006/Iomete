<!-- source: https://iomete.com/roadmap/model-gateway | scraped 2026-11-01 -->

Page title: IOMETE
URL: https://iomete.com/roadmap/model-gateway

---

Home

Roadmap

✨ Model Gateway

ROADMAP

# ✨ Model Gateway

Status

In-Progress

Last Updated

September 30, 2026

#### Overview

The Model Gateway will be one entry point that IOMETE's AI features and agents use to call models. It will run inside your IOMETE deployment, so every call will be authenticated, held to rate and spend limits, and recorded in one place. When it forwards a request to a cloud provider, the prompt and the response go through that provider, on your own account with them.

#### What it will do

- Offer one OpenAI-compatible chat API, including streamed responses, that works with the standard OpenAI SDKs.
- Keep provider keys in IOMETE's secret store. Callers sign in with their IOMETE credentials and never see the keys.
- Record every call: who made it, which model answered, tokens, latency and cost.
- Enforce rate and spend limits on each model endpoint.

#### Model providers

- Cloud AI providers, such as OpenAI and Google Cloud.
- Your own model endpoint that is compatible with the OpenAI or Claude API, so model traffic can stay inside your network.

#### Where it fits

The Model Gateway comes after MCP Server for AI Agents. IOMETE's AI agents, such as the Troubleshooting Agent, will reach models only through it.

####

BOOK A DEMO

## Starting with IOMETE is simple. Book a demo with us today.

The IOMETE data platform helps you achieve more. Book a personalized demo and experience the impact firsthand.

Get in touch
