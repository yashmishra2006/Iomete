// Every statement on this page is taken from iomete.com (scraped 2026-11-01).
// `src` on each item points at the page it came from so sales can verify it.

export const SITE = 'https://iomete.com';

export const SOURCES = {
  home: `${SITE}/`,
  faq: `${SITE}/faq`,
  pricing: `${SITE}/pricing`,
  freePlan: `${SITE}/pricing/free-plan`,
  deployment: `${SITE}/product/deployment`,
  security: `${SITE}/product/architecture/data-security`,
  overview: `${SITE}/product/data-platform/platform-overview`,
  principles: `${SITE}/product/data-platform/design-principles`,
  openSource: `${SITE}/product/architecture/open-source`,
  integrations: `${SITE}/product/architecture/integrations-ecosystem`,
  mesh: `${SITE}/product/architecture/data-mesh`,
  ai: `${SITE}/product/data-platform/artificial-intelligence`,
  about: `${SITE}/about-us`,
  roadmap: `${SITE}/roadmap`,
  partners: `${SITE}/partner-program`,
  university: `${SITE}/university`,
  contact: `${SITE}/contact-us`,
  gartner: `${SITE}/resources/blog/iomete-gartner-market-guide-2025`,
  databricksAlt: `${SITE}/resources/blog/databricks-alternatives`,
  tco: `${SITE}/resources/blog/fortune-500-cost-reduction-self-hosted-vs-saas-tco`,
  dremio: `${SITE}/resources/blog/dremio-sap-migration-guide`,
  comet: `${SITE}/resources/blog/apache-datafusion-comet-spark-acceleration`,
  mcp: `${SITE}/roadmap/mcp-server-for-ai-agents`,
  docs: `${SITE}/resources`,
};

export const HERO = {
  eyebrow: 'The data platform for the AI era',
  title: 'The sovereign data lakehouse. Self-hosted, in your environment.',
  lead:
    'Run it on-premises, in your cloud, or hybrid. Your data never leaves your trust perimeter.',
  badges: ['SOC2 Certified', 'HIPAA Compliant', 'GDPR Compliant'],
  gartner: 'Featured in the 2025 Gartner® Market Guide for Data Lakehouse Platforms',
  src: SOURCES.home,
};

// 15-second system overview. Four scenes, ~3.75 s each.
export const SCENES = [
  {
    id: 'where',
    title: 'Runs where you already run Kubernetes',
    caption:
      'On-premises data centers, AWS EKS, Azure AKS, Google GKE, OpenShift, VMware Tanzu, or all of them (hybrid). Air-gapped works too.',
    src: SOURCES.deployment,
  },
  {
    id: 'inside',
    title: 'One platform inside your perimeter',
    caption:
      'Apache Spark compute on Kubernetes. Apache Iceberg tables on your own object storage. A data catalog with row, column and tag-based access control.',
    src: SOURCES.overview,
  },
  {
    id: 'tools',
    title: 'Your tools plug in as they are',
    caption:
      'Tableau, Power BI, Superset over JDBC/ODBC. Jupyter, dbt, Airflow, Spark Connect, Arrow Flight. An MCP server for AI agents (beta).',
    src: SOURCES.integrations,
  },
  {
    id: 'control',
    title: 'Nothing leaves. You keep the bill.',
    caption:
      'No IOMETE data plane outside your network. License is $500 per vCPU per year; infrastructure is billed by your own provider, with your own discounts.',
    src: SOURCES.tco,
  },
];

// Zones. `keys` are the words the guide matches against.
export const ZONES = [
  {
    id: 'deploy',
    audience: 'Platform & infrastructure teams',
    title: 'On-premises, private cloud, public cloud, or all of them.',
    lead: 'Built for Kubernetes from the ground up. Same deployment and management experience everywhere.',
    keys: [
      'on-prem', 'onprem', 'on prem', 'premise', 'data center', 'datacenter', 'kubernetes', 'k8s',
      'openshift', 'tanzu', 'air-gap', 'airgap', 'air gap', 'hybrid', 'private cloud', 'self-host',
      'self host', 'sovereign', 'eks', 'aks', 'gke', 'bare metal', 'infrastructure', 'deploy', 'host',
    ],
    points: [
      'Any Kubernetes distribution on your own hardware, with air-gapped support',
      'Managed Kubernetes in public cloud: Amazon EKS, Azure AKS, Google GKE',
      'Private cloud: OpenShift, VMware Tanzu, custom distributions',
      'Hybrid: multi-cluster management, cross-cluster data access, unified governance',
      'Horizontal and vertical pod scaling, node auto-scaling, self-healing, zero-downtime updates',
    ],
    compare: [
      ['Runs on-premises / private cloud', 'yes', 'no', 'Snowflake and Databricks only run on the three main US public clouds.'],
      ['Air-gapped environments', 'yes', 'no', 'IOMETE can be fully deployed and operated in isolated networks.'],
      ['Hybrid on-prem + cloud under one platform', 'yes', 'no', 'Multi-cluster management with unified governance.'],
    ],
    more: [
      'IOMETE runs on Kubernetes across all environments. It handles deploying Spark clusters, scaling resources up and down, isolating workloads between teams, and recovering from failures. This works on AWS EKS, Azure AKS, Google GKE, or your own on-premises clusters.',
      'You can deploy clusters in different geographic regions for data locality and disaster recovery, run across different cloud providers, or combine cloud and on-premises infrastructure.',
      'Honest note from IOMETE: operational responsibility for the Kubernetes cluster is yours. Teams without existing Kubernetes operations experience will have an infrastructure learning curve.',
    ],
    srcs: [SOURCES.deployment, SOURCES.faq, SOURCES.databricksAlt],
  },
  {
    id: 'security',
    audience: 'Security, compliance & risk',
    title: 'Your data never leaves your trust perimeter.',
    lead: 'Self-hosted by design, so you decide where data lives, who sees it, and how long it stays.',
    keys: [
      'security', 'secure', 'compliance', 'compliant', 'gdpr', 'hipaa', 'soc', 'soc2', 'dora', 'nis2',
      'privacy', 'cloud act', 'audit', 'masking', 'pii', 'phi', 'encryption', 'sso', 'ldap', 'saml',
      'residency', 'breach', 'regulat', 'ciso', 'risk', 'zero trust', 'access control', 'governance',
    ],
    points: [
      'Row-level security, column-level security, dynamic data masking, tag-based policies',
      'SAML 2.0, OAuth, LDAP / Active Directory, multi-factor authentication',
      'Comprehensive audit logs that stay inside your infrastructure',
      'Encryption at rest and in transit; network isolation through Kubernetes',
      'SOC2 Certified, HIPAA Compliant, GDPR Compliant',
    ],
    compare: [
      ['Who controls infrastructure and data', 'yes', 'no', 'IOMETE: customer-controlled. SaaS: vendor-controlled, which may result in vendor lock-in.'],
      ['US CLOUD Act exposure', 'yes', 'no', 'None with IOMETE (data in your infrastructure). Present for US-incorporated SaaS vendors.'],
      ['DORA Art. 28 third-party ICT risk', 'yes', 'partial', 'IOMETE is software on your cluster, not an external ICT service. Managed lakehouse: high documentation overhead.'],
    ],
    more: [
      'IOMETE operates entirely within the customer’s trust perimeter, whether on-premises or in the customer’s cloud account. Thanks to the self-hosted architecture, it’s impossible for IOMETE to lose your data simply because it is stored in your trusted environment.',
      'Access controls are enforced at query time inside your infrastructure, integrated with your identity provider. Access logs stay in your governance perimeter.',
      'Protect sensitive data by automatically replacing it with realistic but fictional values, so teams can use data for development, testing and analytics without compromising privacy.',
      'Government agencies and defense contractors use IOMETE for classified workloads because it can run in secure, air-gapped, or government-cloud environments.',
    ],
    srcs: [SOURCES.security, SOURCES.home, SOURCES.faq, SOURCES.databricksAlt],
  },
  {
    id: 'cost',
    audience: 'CFO, FinOps & procurement',
    title: 'One license price. Your infrastructure at your rates.',
    lead: '$500 per vCPU per year. No credits, no per-query fees, no vendor markup on compute.',
    keys: [
      'cost', 'price', 'pricing', 'expensive', 'bill', 'budget', 'tco', 'save', 'saving', 'cheap',
      'credit', 'dbu', 'markup', 'spend', 'finops', 'cfo', 'discount', 'reserved', 'spot', 'roi',
      'free', 'trial', 'license',
    ],
    points: [
      'Free plan: zero license cost up to 100 vCPUs, core features, community support',
      'Enterprise: $500 per vCPU per year ($100,000 per year, 200 vCPU minimum)',
      'Use your existing cloud discounts, reserved instances and spot instances',
      'Cost visibility by team, project, cluster or job, with resource quotas',
      'IOMETE’s published estimate: most organizations save 30–60% versus SaaS data platforms',
    ],
    compare: [
      ['Pricing model', 'yes', 'no', 'IOMETE: fixed license per vCPU. Snowflake: credits at $2–$4 each. Databricks: DBUs plus infrastructure.'],
      ['Use your own cloud discounts and spot capacity', 'yes', 'no', 'SaaS platforms don’t allow you to use these discounts.'],
      ['Per-query or per-user fees', 'yes', 'no', 'None on IOMETE. Consumption-based on SaaS.'],
    ],
    more: [
      'IOMETE licensing is per-vCPU regardless of deployment location. Run 500 vCPUs across AWS, Azure and GCP and you pay $250K per year total; infrastructure is billed directly by each provider at standard rates.',
      'IOMETE’s own break-even guidance: typically 50–100 TB of data and 50+ users. Below that, SaaS consumption pricing can be competitive. Startups with less than 5 TB and fewer than 10 users might pay less on Snowflake.',
      'Licensing is annual but non-committal beyond one year. Scale down vCPUs next year if requirements change.',
    ],
    srcs: [SOURCES.pricing, SOURCES.faq, SOURCES.tco],
  },
  {
    id: 'engineering',
    audience: 'Data engineers & analysts',
    title: 'SQL, Spark, streaming and BI on the same tables.',
    lead: 'A built-in SQL editor, Spark jobs with orchestration, and real-time streams from Kafka, Kinesis and Pulsar.',
    keys: [
      'sql', 'bi', 'dashboard', 'tableau', 'power bi', 'powerbi', 'superset', 'looker', 'qlik', 'etl',
      'pipeline', 'stream', 'kafka', 'kinesis', 'pulsar', 'dbt', 'airflow', 'engineer', 'analyst',
      'analytics', 'warehouse', 'lake', 'iceberg', 'spark', 'jdbc', 'odbc', 'arrow', 'query', 'ingest',
    ],
    points: [
      'SQL editor with autocompletion, query history and visual explain plans',
      'Spark jobs: schedule, monitor and recover ETL with built-in orchestration',
      'Structured Streaming from Apache Kafka, Amazon Kinesis and Apache Pulsar',
      'dbt (dbt-spark adapter), Apache Airflow, Apache NiFi, Prefect',
      'JDBC, Spark Connect and Arrow Flight for BI, Python and large result sets',
    ],
    compare: [
      ['Open table format', 'yes', 'partial', 'IOMETE stores everything as Apache Iceberg. Any Iceberg engine (Trino, Flink, DuckDB, PyIceberg) reads the same files.'],
      ['Works with Tableau, Power BI, Looker, Qlik, Superset', 'yes', 'yes', 'All major BI tools connect via JDBC or ODBC.'],
      ['Scale to petabytes, thousands of users', 'yes', 'yes', 'Storage and compute scale independently; workload isolation per team.'],
    ],
    more: [
      'Spin up multiple lakehouses tailored to specific needs: separate environments for development, testing and production, or dedicated lakehouses for business units, regions or data domains.',
      'Apache Iceberg gives ACID transactions, time travel, schema evolution, partition evolution and hidden partitioning. Branches and tags work like Git for your data.',
      'Apache DataFusion Comet in IOMETE 4.0 cut total TPC-DS runtime by 42% (28.6 to 16.5 minutes, 103 queries, 100 GB scale factor, single run) with the same SQL. IOMETE notes four queries were slower and that the switch can be turned off per compute.',
    ],
    srcs: [SOURCES.home, SOURCES.faq, SOURCES.integrations, SOURCES.comet],
  },
  {
    id: 'ai',
    audience: 'Data science, ML & AI leads',
    title: 'Train, score and serve AI on data that never left home.',
    lead: 'Jupyter, GPU clusters, MLflow, TensorFlow and PyTorch inside your own environment.',
    keys: [
      'ai', 'ml', 'machine learning', 'llm', 'agent', 'gpu', 'notebook', 'jupyter', 'data science',
      'scientist', 'model', 'mcp', 'pytorch', 'tensorflow', 'mlflow', 'training', 'inference',
      'genai', 'generative', 'copilot',
    ],
    points: [
      'Jupyter notebooks in Python, R or SQL with built-in distributed kernels',
      'GPU-accelerated clusters for deep learning training and inference',
      'MLflow, TensorFlow, PyTorch and Scikit-learn integrate; data stays in your environment',
      'MCP Server for AI Agents: completed (beta), September 30, 2026',
      'Model Gateway and Workload Optimization: in progress on the public roadmap',
    ],
    compare: [
      ['AI governance: data never leaves your controlled environment', 'yes', 'no', 'Enforce policies and audit trails more effectively than with black-box SaaS solutions.'],
      ['Spark-based feature engineering and batch scoring', 'yes', 'yes', 'IOMETE uses the same Apache Spark engine Databricks is built on.'],
      ['Fully managed MLflow, AutoML and model serving as a service', 'partial', 'yes', 'IOMETE: MLflow can be deployed in your environment. IOMETE itself says Databricks offers a more fully managed ML experience.'],
    ],
    more: [
      'IOMETE cites research that 87% of AI projects fail to reach production due to data quality issues, and positions automated validation, schema enforcement, anomaly detection and lineage as the foundation for AI.',
      'By running in your infrastructure of choice you avoid the SaaS markup and can optimize compute with spot and reserved instances, scaling clusters with workload intensity.',
      'IOMETE’s own guidance: for teams that rely heavily on Databricks’ managed MLflow server, AutoML or model serving as a fully operated service, evaluate what operational responsibility shifts to your team before migrating.',
    ],
    srcs: [SOURCES.faq, SOURCES.ai, SOURCES.roadmap, SOURCES.databricksAlt],
  },
  {
    id: 'migrate',
    audience: 'Teams leaving Snowflake, Databricks, Cloudera, Dremio or Hadoop',
    title: 'Move one table at a time. Keep both running until you trust it.',
    lead: 'Iceberg-native, so standard Spark jobs and SQL transfer with little or no rewriting.',
    keys: [
      'snowflake', 'databricks', 'cloudera', 'hadoop', 'hive', 'dremio', 'sap', 'oracle', 'teradata',
      'migrat', 'replace', 'move', 'switch', 'leave', 'alternative', 'exit', 'lock-in', 'lock in',
      'delta', 'unity', 'repatriat',
    ],
    points: [
      'Register existing Iceberg tables in place; no data copy',
      'Run SaaS and self-hosted side by side until validation is complete',
      'Pure Spark jobs and most SQL workloads transfer with little or no rewriting',
      'IOMETE’s stated timelines: days to weeks per domain; 4–6 months for most organizations',
      'Query federation to MySQL, PostgreSQL, SQL Server, Oracle, Snowflake and object storage',
    ],
    compare: [
      ['Leave without rewriting data or queries', 'yes', 'no', 'IOMETE uses Apache Iceberg, Spark SQL and standard S3/ADLS/GCS. Proprietary formats require complete data rewrites.'],
      ['Multi-year spend commitment required', 'yes', 'no', 'IOMETE licensing is annual. SaaS discounts typically lock in $500K–$2M annual spend.'],
      ['Proprietary acceleration layers to rebuild', 'yes', 'partial', 'Dremio Reflections do not move to any other platform. On IOMETE you build acceleration with pre-aggregated tables, partitioning and compaction.'],
    ],
    more: [
      'From Databricks: if your environment already uses Iceberg tables, the data format step is eliminated. Jobs that depend on Databricks-specific ML runtime features or Unity Catalog APIs need more evaluation.',
      'From Hadoop or legacy warehouses: export data or convert Hive tables to Iceberg, migrate pipelines to IOMETE Spark clusters, repoint BI tools, run both in parallel, then decommission.',
      'From Dremio (now SAP): tables, catalog, permissions, audit history and lineage all need to come with you. IOMETE recommends rehearsing an exit on a few real tables.',
    ],
    srcs: [SOURCES.databricksAlt, SOURCES.tco, SOURCES.dremio, SOURCES.faq],
  },
  {
    id: 'industries',
    audience: 'Regulated and sovereign industries',
    title: 'Built for the organisations that cannot send data out.',
    lead: 'Banks, public sector, defense, healthcare and manufacturers with sovereignty rules.',
    keys: [
      'bank', 'finance', 'financial', 'fintech', 'insurance', 'public sector', 'government', 'ministry',
      'defense', 'defence', 'military', 'classified', 'healthcare', 'hospital', 'manufactur', 'iot',
      'telecom', 'energy', 'retail', 'ecommerce', 'e-commerce', 'eu', 'europe',
    ],
    cards: [
      {
        name: 'Banking & financial services',
        text: 'DORA Article 28 third-party risk and CLOUD Act exposure are infrastructure questions. IOMETE is software you license and operate, not a service your data flows through.',
        src: SOURCES.databricksAlt,
      },
      {
        name: 'Public sector & defense',
        text: 'Runs in secure, air-gapped or government-cloud environments with zero-trust requirements and full audit trails.',
        src: SOURCES.faq,
      },
      {
        name: 'Healthcare',
        text: 'HIPAA Compliant. Runtime PII and PHI masking, row-level security and retention policies you control.',
        src: SOURCES.home,
      },
      {
        name: 'Manufacturing & IoT',
        text: 'Published example: an industrial IoT manufacturer with 200 factories moved 150 TB on-premise, 1,200 vCPUs licensed, 38% lower cost than Snowflake.',
        src: SOURCES.tco,
      },
    ],
    compare: [
      ['Air-gapped or classified workloads', 'yes', 'no', 'IOMETE runs in isolated networks with zero internet connectivity. IOMETE’s case study: Snowflake couldn’t support air-gapped environments.'],
      ['Data residency you can audit', 'yes', 'partial', 'IOMETE: infrastructure topology you control. Managed lakehouse: vendor-controlled settings.'],
      ['Incident timeline under your control', 'yes', 'no', 'Your monitoring stack versus vendor notification dependent.'],
    ],
    more: [
      'IOMETE’s stated best fit: financial institutions, healthcare organizations and enterprises in regulated industries where data sovereignty and DORA/GDPR compliance drive platform decisions, with existing Kubernetes operations or platform engineering capacity.',
    ],
    srcs: [SOURCES.databricksAlt, SOURCES.faq, SOURCES.tco],
  },
];

// Hand-offs between sections. Each one closes the concept just covered and
// opens the next question a buyer naturally asks. `primary` is the recommended
// stop; `alts` are the other directions the reader might want instead.
export const BRIDGES = {
  overview: { hook: 'That is the whole model. Tell us your situation and we will put the right sections first.', primary: ['guide', 'Find my path'], alts: [['zones', 'Browse all audiences'], ['compare', 'Straight to the comparison']] },
  guide: { hook: 'No path chosen? Start where most buyers do: where the platform runs.', primary: ['deploy', 'Where it runs'], alts: [['security', 'Who can see the data'], ['cost', 'What it costs']] },
  deploy: { hook: 'Where it runs is settled. The next question security teams ask is who can see what.', primary: ['security', 'Who sees the data'], alts: [['cost', 'What it costs to run there'], ['migrate', 'Moving existing workloads']] },
  security: { hook: 'Locked inside your perimeter. Now, what does that control cost per year?', primary: ['cost', 'The price list'], alts: [['industries', 'Who else needs this'], ['compare', 'Side by side with SaaS']] },
  cost: { hook: 'One number, no surprises. What matters more right now: the full comparison, or what your engineers get?', primary: ['compare', 'The full comparison'], alts: [['engineering', 'What engineers get'], ['pricing', 'Plans and estimator']] },
  engineering: { hook: 'Same tables, every tool. AI teams then ask whether models can train on them in place.', primary: ['ai', 'AI on private data'], alts: [['migrate', 'Bringing pipelines over'], ['pricing', 'Plans and estimator']] },
  ai: { hook: 'Models stay home. The last worry is usually the move itself.', primary: ['migrate', 'How a migration works'], alts: [['compare', 'IOMETE vs Databricks ML'], ['proof', 'Published proof']] },
  migrate: { hook: 'Who has already done this in your industry?', primary: ['industries', 'Industries'], alts: [['proof', 'Migration examples'], ['pricing', 'Plans and estimator']] },
  industries: { hook: 'Now put IOMETE next to the platforms you are weighing it against.', primary: ['compare', 'Compare side by side'], alts: [['pricing', 'Plans and estimator'], ['contact', 'Talk to IOMETE']] },
  compare: { hook: 'You have seen the trade-offs. Here is the price list behind the IOMETE column.', primary: ['pricing', 'Pricing and estimator'], alts: [['proof', 'Published proof'], ['guide', 'Re-plan my path']] },
  pricing: { hook: 'Numbers are easy to claim. Here is what IOMETE has published to back them.', primary: ['proof', 'Proof'], alts: [['faq', 'Questions buyers ask'], ['contact', 'Book a demo']] },
  proof: { hook: 'Still weighing it? These are the questions most buyers ask first.', primary: ['faq', 'FAQ'], alts: [['contact', 'Book a demo'], ['guide', 'Re-plan my path']] },
  faq: { hook: 'Everything else is a conversation.', primary: ['contact', 'Book a demo or get the free plan'], alts: [['overview', 'Back to the start']] },
};

export const GUIDE_CHIPS = [
  { label: 'We need on-prem or air-gapped', q: 'We need to run on-premises and air-gapped on our own Kubernetes' },
  { label: 'Security & compliance (GDPR, DORA, HIPAA)', q: 'Security compliance GDPR DORA HIPAA audit' },
  { label: 'Our Snowflake / Databricks bill is too high', q: 'Snowflake Databricks cost too expensive, want to cut the bill' },
  { label: 'AI / ML on private data', q: 'Run AI and machine learning with GPUs and notebooks on private data' },
  { label: 'Replace Cloudera / Hadoop', q: 'Migrate from Cloudera Hadoop Hive to a modern lakehouse' },
  { label: 'BI, SQL and streaming pipelines', q: 'SQL analytics dashboards Tableau Power BI streaming Kafka dbt' },
  { label: 'We are a bank / public body', q: 'Bank public sector government regulated' },
];

export const COMPARE = {
  columns: ['IOMETE', 'Databricks', 'Snowflake', 'DIY Spark + Iceberg'],
  groups: [
    {
      name: 'Deployment & control',
      rows: [
        { f: 'Runs on-premises / private cloud', v: [['yes', 'Any Kubernetes distribution; OpenShift, Tanzu'], ['no', 'US public clouds only'], ['no', 'US public clouds only'], ['yes', 'Your cluster']], src: SOURCES.faq },
        { f: 'Air-gapped deployment', v: [['yes', 'Fully deployed and operated offline'], ['na', 'Not covered on iomete.com'], ['no', 'IOMETE case study: Snowflake couldn’t support air-gapped environments'], ['yes', '']], src: SOURCES.tco },
        { f: 'Hybrid: on-prem + cloud in one platform', v: [['yes', 'Multi-cluster, unified governance'], ['no', 'Public cloud only'], ['no', 'Public cloud only'], ['partial', 'Build it yourself']], src: SOURCES.home },
        { f: 'Who controls infrastructure and data', v: [['yes', 'Customer-controlled'], ['no', 'Vendor-controlled'], ['no', 'Vendor-controlled'], ['yes', 'Customer-controlled']], src: SOURCES.home },
        { f: 'Data plane outside your network', v: [['yes', 'None'], ['no', 'Vendor runs the data plane'], ['no', 'Vendor runs the data plane'], ['yes', 'None']], src: SOURCES.databricksAlt },
      ],
    },
    {
      name: 'Compliance',
      rows: [
        { f: 'US CLOUD Act exposure', v: [['yes', 'None: data in your infrastructure'], ['no', 'Present (US-incorporated vendor)'], ['no', 'Present (US-incorporated vendor)'], ['yes', 'None']], src: SOURCES.databricksAlt },
        { f: 'DORA Art. 28 third-party ICT risk', v: [['yes', 'Software dependency, not external ICT service'], ['partial', 'High documentation overhead'], ['partial', 'High documentation overhead'], ['yes', 'Same as self-hosted']], src: SOURCES.databricksAlt },
        { f: 'Audit logs generated inside your perimeter', v: [['yes', 'Your infrastructure generates logs'], ['no', 'Vendor-generated logs'], ['no', 'Vendor-generated logs'], ['yes', '']], src: SOURCES.databricksAlt },
        { f: 'Row / column security and masking', v: [['yes', 'Enforced at query time in your infrastructure'], ['yes', 'Platform-enforced (Unity Catalog, a Databricks-managed service)'], ['na', 'Not covered on iomete.com'], ['partial', 'Build your own']], src: SOURCES.databricksAlt },
      ],
    },
    {
      name: 'Cost',
      rows: [
        { f: 'Pricing model', v: [['yes', '$500 per vCPU per year license + your infrastructure at provider rates'], ['no', 'DBU consumption + cloud infrastructure'], ['no', 'Credits, $2–$4 each depending on edition'], ['partial', 'Infrastructure + your engineering time']], src: SOURCES.tco },
        { f: 'Use your cloud discounts, reserved instances, spot', v: [['yes', 'All existing agreements apply'], ['no', 'Not allowed per IOMETE FAQ'], ['no', 'Not allowed per IOMETE FAQ'], ['yes', '']], src: SOURCES.faq },
        { f: 'Per-query or per-user fees', v: [['yes', 'None'], ['no', 'Consumption-based'], ['no', 'Consumption-based'], ['yes', 'None']], src: SOURCES.faq },
        { f: 'Free tier', v: [['yes', 'Up to 100 vCPUs, core features, forever'], ['na', 'Not covered on iomete.com'], ['na', 'Not covered on iomete.com'], ['yes', 'Open-source software, your hardware']], src: SOURCES.freePlan },
        { f: 'Operational overhead', v: [['partial', 'Medium: you operate Kubernetes'], ['yes', 'Low'], ['yes', 'Low'], ['no', 'High: build everything']], src: SOURCES.databricksAlt },
      ],
    },
    {
      name: 'Data & ML',
      rows: [
        { f: 'Open table format', v: [['yes', 'Apache Iceberg native'], ['partial', 'Delta Lake; Iceberg now supported alongside it'], ['partial', 'Proprietary native format; can read Iceberg tables'], ['yes', 'Iceberg or Hudi']], src: SOURCES.databricksAlt },
        { f: 'Managed ML extras (AutoML, model serving as a service)', v: [['partial', 'Spark ML, Jupyter, MLflow deployable in your environment'], ['yes', 'More fully managed ML experience (IOMETE’s words)'], ['na', 'Not covered on iomete.com'], ['no', 'Build your own']], src: SOURCES.databricksAlt },
        { f: 'Proprietary data-sharing marketplace', v: [['no', 'Not replicated; Iceberg tables are readable by Snowflake, BigQuery, Athena'], ['na', 'Not covered on iomete.com'], ['yes', 'Proprietary data sharing model'], ['no', '']], src: SOURCES.tco },
        { f: 'Engine', v: [['yes', 'Apache Spark (+ DataFusion Comet acceleration in 4.0)'], ['yes', 'Apache Spark'], ['na', 'Not covered on iomete.com'], ['yes', 'Apache Spark']], src: SOURCES.comet },
      ],
    },
  ],
  // IOMETE's own words about when it is not the right choice.
  notFit: [
    'You don’t have Kubernetes expertise: the operational overhead of deploying and managing IOMETE exceeds SaaS convenience.',
    'Your workloads are small and intermittent: under 5 TB and fewer than 10 users might pay less on consumption pricing. Break-even is typically 50–100 TB and 50+ users.',
    'You prioritise vendor-managed infrastructure and would rather spend engineering on products than on a data platform.',
  ],
  notFitSrc: SOURCES.tco,
};

export const TCO_PROFILES = [
  { name: 'Mid-sized analytics', spec: '50 TB, 100 users, daily ETL', snowflake: '$120K – $180K', databricks: '$180K – $300K', iomete: '$100K – $120K', note: '200 vCPUs licensed' },
  { name: 'Enterprise platform', spec: '200 TB, streaming, ML', snowflake: '$600K – $1.2M', databricks: '$960K – $1.8M', iomete: '$480K – $720K', note: '1,000 vCPUs licensed' },
  { name: 'Global deployment', spec: '1 PB+, thousands of users, multi-cloud', snowflake: '$2.4M – $6M', databricks: '$3.6M – $7.2M', iomete: '$1.44M – $3M', note: '3,000–5,000 vCPUs, hybrid' },
];

export const PLANS = [
  {
    name: 'Free',
    tag: 'The world’s most generous free plan',
    price: 'Zero',
    unit: 'license cost',
    rows: [['Max vCPUs', '100'], ['Deployment', 'Self-hosted, on-premises'], ['Features', 'Core features'], ['Support', 'Community']],
    cta: 'Start now',
    href: SOURCES.freePlan,
  },
  {
    name: 'Enterprise',
    tag: 'Scale and performance with peace of mind',
    price: '$500',
    unit: 'per vCPU per year',
    foot: '$100,000 per year (200 vCPU) minimum commitment',
    rows: [['Max vCPUs', 'Unlimited'], ['Deployment', 'Self-hosted, on-premises'], ['Features', 'Core + data masking, role-level security, disaster zone, auditing'], ['Support', 'Enterprise support']],
    cta: 'Get in touch',
    href: SOURCES.contact,
    featured: true,
  },
  {
    name: 'Business Critical',
    tag: 'Tailored for mission-critical infrastructure',
    price: 'Custom',
    unit: 'license cost',
    foot: '$250,000 per year minimum commitment',
    rows: [['Max vCPUs', 'Unlimited'], ['Deployment', 'Self-hosted, on-premises or hybrid'], ['Features', 'Enterprise + multi-region'], ['Support', 'Enterprise + dedicated engineers']],
    cta: 'Get in touch',
    href: SOURCES.contact,
  },
];

export const SUPPORT = [
  { name: 'Silver', sev1: '1 hour', sev2: '1 business day', sev3: '1 business day', sev4: '1 business day', tickets: 'Max 5 per month', scope: 'Non-custom break/fix' },
  { name: 'Gold', sev1: '1 hour', sev2: '4 hours', sev3: '8 hours', sev4: '1 business day', tickets: 'Unlimited', scope: 'Break/fix + general technical inquiries' },
  { name: 'Platinum', sev1: 'Dedicated expert', sev2: '—', sev3: '—', sev4: '—', tickets: 'Unlimited via portal and Slack/email', scope: 'Break/fix + general technical inquiries' },
];

export const PROOF = [
  { k: '2025', l: 'Gartner® Market Guide for Data Lakehouse Platforms: IOMETE featured', src: SOURCES.gartner },
  { k: '42%', l: 'less total TPC-DS runtime with Comet acceleration in IOMETE 4.0, same SQL', src: SOURCES.comet },
  { k: '100', l: 'vCPUs free, forever, with all core features', src: SOURCES.freePlan },
  { k: 'YC', l: 'Founded 2021 by Vusal Dadalov and Piet Jan de Bruin; Y Combinator, early 2022', src: SOURCES.about },
];

export const CASES = [
  { who: 'Fintech, $300M revenue', from: 'Snowflake, $540K/yr', to: 'IOMETE on AWS in EU data centers, 500 vCPUs', result: '20% lower cost; DORA requirement met', src: SOURCES.tco },
  { who: 'E-commerce, $2B GMV', from: 'Databricks, $1.44M/yr', to: 'IOMETE on GCP with Kafka + Flink, 2,000 vCPUs', result: 'Operational independence; sub-10-minute freshness', src: SOURCES.tco },
  { who: 'Manufacturer, 200 factories', from: 'Snowflake, $960K/yr', to: 'IOMETE on-premise, existing Kubernetes, 1,200 vCPUs', result: '38% lower cost; on-premise sovereignty', src: SOURCES.tco },
];

// Logos shown in the marquee on the iomete.com homepage (files copied from the site's CDN).
export const LOGOS = [
  { name: 'Dell Technologies', file: 'dell.svg' },
  { name: 'Y Combinator', file: 'ycombinator.svg' },
  { name: 'Pasha Bank', file: 'pasha-bank.svg' },
  { name: 'Mercury Bank', file: 'mercury-bank.svg' },
  { name: 'Central Bank of Azerbaijan', file: 'cbar.svg' },
  { name: 'OverDrive', file: 'overdrive.svg' },
  { name: 'Pasha Technology', file: 'pasha-technology.svg' },
  { name: 'Central Bank of Uzbekistan', file: 'cbu.svg' },
  { name: 'Kapital Bank', file: 'kapital-bank.svg' },
  { name: 'Ministry of Economy of Azerbaijan', file: 'ministry-economy-az.png' },
  { name: 'Ministry of Digital Technologies of Uzbekistan', file: 'ministry-digital-uz.svg' },
  { name: 'UZcard', file: 'uzcard.svg' },
];

export const FAQ = [
  { q: 'What is IOMETE?', a: 'IOMETE is a state-of-the-art, fast, scalable, user-friendly Data Lakehouse Platform for AI and Analytics. It offers flexibility and can be deployed anywhere: on-premises, in the cloud, or in a hybrid environment.' },
  { q: 'How is IOMETE different from Snowflake or Databricks?', a: 'Unlike SaaS platforms such as Snowflake or Databricks, IOMETE runs entirely on your infrastructure. This ensures data sovereignty, enables usage of your cloud discounts, and provides full control over security and deployment. IOMETE runs on-premises, in your data centers, in your private cloud, your public cloud or all of the above (hybrid), whereas Snowflake and Databricks only run on the three main US public clouds (AWS, Azure and Google Cloud).' },
  { q: 'Can one platform really replace both my data warehouse and data lake?', a: 'Yes, that’s exactly what a lakehouse does. Your structured business data, raw logs, ML training datasets and IoT streams all live together. You get ACID transactions and SQL query performance on the same data you use for machine learning and analytics.' },
  { q: 'Can IOMETE meet GDPR, HIPAA, and SOC 2 requirements?', a: 'Yes, because you control the entire deployment. You decide where data lives (data residency), who can access it (granular permissions), how long to keep it (retention policies), and you maintain complete audit trails.' },
  { q: 'How much money can I save with IOMETE?', a: 'Most organizations save 30-60% compared to SaaS data platforms. Savings come from paying only infrastructure costs without vendor markup, using existing cloud discounts and reserved instances, no per-query or per-user fees, running non-critical workloads on spot instances, and complete visibility into what’s driving costs.' },
  { q: 'Can I run IOMETE alongside my existing data platform?', a: 'Yes, and many organizations do this during migration. Start with one team or use case. IOMETE can read from your existing data lake or warehouse, so you can gradually move workloads while keeping legacy systems running.' },
  { q: 'Can I use GPUs with IOMETE?', a: 'Absolutely. IOMETE supports GPU-accelerated clusters, enabling faster model training and inference for deep learning workloads.' },
  { q: 'What does air-gapped deployment mean?', a: 'Air-gapped means the system runs in an environment with zero internet connectivity, common in defense, intelligence and highly secure industries. IOMETE can be fully deployed and operated in these isolated networks.' },
];

// Visitors who are not buyers: the site serves them too.
export const ALSO = [
  { name: 'Partners', text: 'Technology, implementation and reseller partnerships with revenue share, dedicated partner support and co-marketing.', cta: 'Partner program', href: SOURCES.partners },
  { name: 'Engineers', text: 'Hard-working, smart and kind? IOMETE is growing quickly and making foundational hires across a fully remote team.', cta: 'Open roles', href: `${SITE}/about-us` },
  { name: 'Investors', text: 'IOMETE is looking for visionary partners who share its passion for growth as it scales.', cta: 'Get in touch', href: SOURCES.contact },
];

export const COMPANY = {
  address: '1049 El Monte Avenue, Mountain View, CA 94040, United States of America',
  copyright: '© 2025 IOMETE Inc. All Rights Reserved.',
  careers: 'careers@iomete.com',
  team: 'Built by engineers, for engineers. Fully remote, spanning seven different countries. Team roots at Amazon, Google, Meta and Uber.',
  fde: 'Forward-deployed engineers can become an extension of your team.',
};
