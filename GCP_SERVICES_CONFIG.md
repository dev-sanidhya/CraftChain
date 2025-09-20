# Google Cloud Services Configuration for CraftChain X

## 🎯 Service Selection Rationale

### Core Infrastructure Services

#### 1. Cloud Run (Serverless Container Platform)

**Purpose**: Host FastAPI microservices
**Justification**:

- **Serverless**: No infrastructure management needed
- **Auto-scaling**: Scales to zero when not in use, handles traffic spikes
- **Cost-effective**: Pay only for actual usage
- **Container-based**: Easy deployment with Docker
- **Global**: Multi-region deployment for low latency

**Configuration**:

```yaml
# cloud-run-config.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: product-service
  annotations:
    run.googleapis.com/ingress: all
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/minScale: "0"
        autoscaling.knative.dev/maxScale: "100"
        run.googleapis.com/cpu-throttling: "false"
    spec:
      containerConcurrency: 100
      containers:
        - image: gcr.io/craftchain/product-service:latest
          ports:
            - containerPort: 8000
          env:
            - name: GOOGLE_CLOUD_PROJECT
              value: "craftchain-prod"
          resources:
            limits:
              cpu: "2"
              memory: "2Gi"
```

#### 2. API Gateway

**Purpose**: API management, security, and routing
**Justification**:

- **Unified entry point**: Single endpoint for all microservices
- **Security**: Authentication, authorization, rate limiting
- **Monitoring**: Request logging and analytics
- **Versioning**: API version management

**Configuration**:

```yaml
# api-gateway-config.yaml
swagger: "2.0"
info:
  title: CraftChain API
  version: "1.0"
host: api.craftchain.com
schemes:
  - https
security:
  - firebase: []
paths:
  /products:
    get:
      summary: List products
      x-google-backend:
        address: https://product-service-hash-uc.a.run.app
        protocol: h2
  /ml/predict-price:
    post:
      summary: Predict product price
      x-google-backend:
        address: https://ml-service-hash-uc.a.run.app
        protocol: h2
```

### Data & Storage Services

#### 3. Firestore (NoSQL Database)

**Purpose**: Primary operational database
**Justification**:

- **Real-time**: Live updates for user interfaces
- **Scalable**: Automatic scaling and sharding
- **Offline support**: Works offline on mobile
- **Strong consistency**: ACID transactions
- **Firebase integration**: Easy authentication

**Database Structure**:

```javascript
// Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Products are readable by all, writable by owner
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null &&
        request.auth.uid == resource.data.artisan_id;
    }

    // Orders are private to participants
    match /orders/{orderId} {
      allow read, write: if request.auth != null &&
        (request.auth.uid == resource.data.buyer_id ||
         request.auth.uid == resource.data.seller_id);
    }
  }
}
```

#### 4. BigQuery (Data Warehouse)

**Purpose**: Analytics, ML, and business intelligence
**Justification**:

- **Serverless**: No infrastructure management
- **ML integration**: Built-in ML capabilities
- **Petabyte scale**: Handles massive datasets
- **Cost-effective**: Pay for queries and storage
- **Fast analytics**: Columnar storage for quick queries

**Dataset Structure**:

```sql
-- Create datasets
CREATE SCHEMA `craftchain.analytics`
OPTIONS(
  description="Analytics and reporting data",
  location="US"
);

CREATE SCHEMA `craftchain.ml`
OPTIONS(
  description="Machine learning models and features",
  location="US"
);

-- Partitioned table for performance
CREATE TABLE `craftchain.analytics.sales_events`
(
  event_id STRING,
  timestamp TIMESTAMP,
  user_id STRING,
  product_id STRING,
  event_type STRING,
  event_data JSON,
  region STRING,
  device_type STRING
)
PARTITION BY DATE(timestamp)
CLUSTER BY region, event_type;
```

#### 5. Cloud Storage (Object Storage)

**Purpose**: Media files, ML models, static assets
**Justification**:

- **Unlimited scale**: Petabyte storage capacity
- **Global CDN**: Fast content delivery worldwide
- **Lifecycle management**: Automatic archiving and deletion
- **Security**: IAM and encryption
- **Integration**: Works with all GCP services

**Bucket Configuration**:

```json
{
  "name": "craftchain-media-prod",
  "location": "US",
  "storageClass": "STANDARD",
  "versioning": {
    "enabled": true
  },
  "lifecycle": {
    "rule": [
      {
        "action": { "type": "SetStorageClass", "storageClass": "NEARLINE" },
        "condition": { "age": 30 }
      },
      {
        "action": { "type": "SetStorageClass", "storageClass": "COLDLINE" },
        "condition": { "age": 365 }
      }
    ]
  },
  "cors": [
    {
      "origin": ["https://craftchain.com"],
      "method": ["GET", "POST"],
      "responseHeader": ["Content-Type"],
      "maxAgeSeconds": 3600
    }
  ]
}
```

### AI/ML Services

#### 6. Vertex AI (ML Platform)

**Purpose**: ML model training, deployment, and serving
**Justification**:

- **Managed MLOps**: End-to-end ML workflow
- **Auto-scaling**: Model endpoints scale automatically
- **Model monitoring**: Drift detection and retraining
- **Pre-trained models**: Ready-to-use foundation models
- **Custom training**: Support for TensorFlow, PyTorch, etc.

**Model Deployment**:

```python
# vertex-ai-deployment.py
from google.cloud import aiplatform

aiplatform.init(project="craftchain-prod", location="us-central1")

# Deploy demand forecasting model
model = aiplatform.Model.upload(
    display_name="demand-forecasting-v1",
    artifact_uri="gs://craftchain-ml-models/demand-forecasting/",
    serving_container_image_uri="gcr.io/cloud-aiplatform/prediction/sklearn-cpu.1-0:latest",
)

endpoint = model.deploy(
    machine_type="n1-standard-2",
    min_replica_count=1,
    max_replica_count=10,
    traffic_percentage=100
)
```

#### 7. Vision AI (Image Analysis)

**Purpose**: Product image analysis and categorization
**Justification**:

- **Pre-trained models**: No training required
- **High accuracy**: State-of-the-art computer vision
- **Fast processing**: Real-time image analysis
- **Multiple features**: Object detection, OCR, safe search
- **Custom models**: AutoML Vision for specific needs

**Implementation**:

```python
# vision-ai-integration.py
from google.cloud import vision

def analyze_product_image(image_path):
    client = vision.ImageAnnotatorClient()

    with open(image_path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    # Object detection
    objects = client.object_localization(image=image).localized_object_annotations

    # Color detection
    colors = client.image_properties(image=image).dominant_colors_annotation

    # Text detection (for any text on products)
    texts = client.text_detection(image=image).text_annotations

    return {
        "objects": [obj.name for obj in objects],
        "colors": [color.color for color in colors.colors[:5]],
        "text": texts[0].description if texts else "",
        "confidence_scores": {
            "objects": [obj.score for obj in objects],
            "colors": [color.score for color in colors.colors[:5]]
        }
    }
```

#### 8. Natural Language AI (Text Processing)

**Purpose**: Content generation, sentiment analysis, SEO
**Justification**:

- **Multi-language**: 100+ languages supported
- **Pre-trained**: Ready-to-use models
- **Custom training**: Domain-specific models
- **Real-time**: Low-latency processing
- **Accurate**: State-of-the-art NLP

**Usage Examples**:

```python
# nlp-service.py
from google.cloud import language_v1

def analyze_product_description(text):
    client = language_v1.LanguageServiceClient()
    document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)

    # Sentiment analysis
    sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment

    # Entity extraction
    entities = client.analyze_entities(request={'document': document}).entities

    # Keywords extraction
    response = client.analyze_syntax(request={'document': document})
    keywords = [token.text.content for token in response.tokens
                if token.part_of_speech.tag in ['NOUN', 'ADJ']]

    return {
        "sentiment": {
            "score": sentiment.score,
            "magnitude": sentiment.magnitude
        },
        "entities": [{"name": entity.name, "type": entity.type_.name} for entity in entities],
        "keywords": keywords[:10]
    }
```

#### 9. Translation API (Multi-language Support)

**Purpose**: Real-time translation for global reach
**Justification**:

- **100+ languages**: Comprehensive language support
- **High quality**: Neural machine translation
- **Fast**: Real-time translation
- **Cost-effective**: Pay per character
- **Detection**: Automatic language detection

### Analytics & Monitoring Services

#### 10. Cloud Monitoring (System Monitoring)

**Purpose**: Infrastructure and application monitoring
**Justification**:

- **Comprehensive**: Metrics, logs, traces in one place
- **Alerting**: Proactive issue detection
- **Dashboards**: Custom visualization
- **SLA monitoring**: Track uptime and performance
- **Integration**: Works with all GCP services

**Monitoring Configuration**:

```yaml
# monitoring-config.yaml
alertPolicy:
  displayName: "High Error Rate Alert"
  conditions:
    - displayName: "Error rate > 5%"
      conditionThreshold:
        filter: 'resource.type="cloud_run_revision"'
        comparison: COMPARISON_GREATER
        thresholdValue: 0.05
        duration: "300s"
  notificationChannels:
    - "projects/craftchain-prod/notificationChannels/email-alerts"
```

#### 11. Cloud Logging (Centralized Logging)

**Purpose**: Centralized log collection and analysis
**Justification**:

- **Centralized**: All logs in one place
- **Searchable**: Powerful query capabilities
- **Real-time**: Live log streaming
- **Retention**: Configurable retention policies
- **Export**: BigQuery integration for analytics

#### 12. Data Studio (Business Intelligence)

**Purpose**: Business dashboards and reporting
**Justification**:

- **Free**: No additional cost
- **Integration**: Direct BigQuery connection
- **Collaborative**: Share dashboards easily
- **Interactive**: Real-time data exploration
- **Customizable**: Rich visualization options

### Security & Identity Services

#### 13. Cloud IAM (Identity & Access Management)

**Purpose**: Fine-grained access control
**Justification**:

- **Principle of least privilege**: Minimal required permissions
- **Service accounts**: Secure service-to-service communication
- **Conditional access**: Context-aware access control
- **Audit logs**: Complete access audit trail
- **Integration**: Works with all GCP services

**IAM Policy Example**:

```json
{
  "bindings": [
    {
      "role": "roles/run.invoker",
      "members": [
        "serviceAccount:api-gateway@craftchain-prod.iam.gserviceaccount.com"
      ]
    },
    {
      "role": "roles/datastore.user",
      "members": [
        "serviceAccount:product-service@craftchain-prod.iam.gserviceaccount.com"
      ]
    },
    {
      "role": "roles/ml.developer",
      "members": [
        "serviceAccount:ml-service@craftchain-prod.iam.gserviceaccount.com"
      ]
    }
  ]
}
```

#### 14. Cloud KMS (Key Management)

**Purpose**: Encryption key management
**Justification**:

- **Hardware security**: HSM-backed keys
- **Centralized**: Single key management system
- **Rotation**: Automatic key rotation
- **Audit**: Complete key usage logs
- **Integration**: Encrypt data at application level

### Additional Services

#### 15. Cloud Scheduler (Cron Jobs)

**Purpose**: Scheduled tasks and batch processing
**Justification**:

- **Serverless**: No infrastructure to manage
- **Reliable**: Guaranteed execution
- **Flexible**: Cron expression support
- **Monitoring**: Built-in monitoring and alerting
- **Integration**: Trigger Cloud Functions, Cloud Run

**Scheduler Configuration**:

```yaml
# scheduler-jobs.yaml
jobs:
  - name: "update-market-trends"
    schedule: "0 6 * * *" # Daily at 6 AM
    timeZone: "Asia/Kolkata"
    httpTarget:
      uri: "https://analytics-service-hash-uc.a.run.app/update-trends"
      httpMethod: "POST"
      headers:
        "Content-Type": "application/json"
      body: '{"source": "scheduler"}'
```

#### 16. Cloud Functions (Event-driven Functions)

**Purpose**: Event processing and integrations
**Justification**:

- **Event-driven**: Respond to events automatically
- **Serverless**: No server management
- **Cost-effective**: Pay per execution
- **Fast scaling**: Handle traffic spikes
- **Integration**: Connect different services

## 📊 Service Cost Analysis

### Monthly Cost Breakdown (Estimated for 10K users, 1K artisans)

| Service Category | Service                  | Monthly Usage                       | Estimated Cost  |
| ---------------- | ------------------------ | ----------------------------------- | --------------- |
| **Compute**      | Cloud Run (5 services)   | 2M requests, 1M vCPU-seconds        | $60             |
| **Database**     | Firestore                | 2M reads, 500K writes, 10GB storage | $55             |
| **Analytics**    | BigQuery                 | 200GB storage, 2TB queries          | $65             |
| **Storage**      | Cloud Storage            | 1TB storage, 2TB egress             | $50             |
| **ML/AI**        | Vertex AI                | 20K predictions, 10 models          | $250            |
| **ML/AI**        | Vision AI                | 100K image analyses                 | $150            |
| **ML/AI**        | Natural Language         | 1M characters                       | $15             |
| **ML/AI**        | Translation API          | 500K characters                     | $10             |
| **Networking**   | Cloud CDN                | 3TB transfer                        | $60             |
| **Monitoring**   | Cloud Monitoring/Logging | Standard usage                      | $25             |
| **Security**     | Cloud KMS                | 10K operations                      | $5              |
| **Scheduling**   | Cloud Scheduler          | 100 jobs                            | $1              |
| **Total**        |                          |                                     | **~$746/month** |

### Cost Optimization Strategies

#### 1. Committed Use Discounts

- **Vertex AI**: 1-year commitment for 20% discount
- **BigQuery**: Flat-rate pricing for predictable workloads
- **Cloud Storage**: Long-term pricing for archival data

#### 2. Automatic Scaling

- **Cloud Run**: Scale to zero when not in use
- **Vertex AI**: Auto-scaling model endpoints
- **Firestore**: Pay only for actual usage

#### 3. Data Lifecycle Management

- **Cloud Storage**: Automatic archiving to cheaper tiers
- **BigQuery**: Table expiration for temporary data
- **Logging**: Retention policies to avoid unnecessary costs

## 🔒 Security Configuration

### Data Protection

```yaml
# security-config.yaml
encryption:
  at_rest:
    - service: "Cloud Storage"
      method: "Google-managed keys"
    - service: "Firestore"
      method: "Google-managed keys"
    - service: "BigQuery"
      method: "Customer-managed keys (KMS)"

  in_transit:
    - protocol: "TLS 1.3"
      enforcement: "mandatory"
    - service_mesh: "Istio"
      mtls: "enabled"

access_control:
  authentication:
    - method: "Firebase Auth"
      providers: ["Google", "Apple", "Phone"]

  authorization:
    - model: "RBAC"
      roles: ["artisan", "buyer", "admin"]

  api_security:
    - rate_limiting: "1000 requests/minute per user"
    - ddos_protection: "Cloud Armor"
    - input_validation: "API Gateway"
```

### Compliance Measures

```yaml
compliance:
  gdpr:
    - data_residency: "EU regions available"
    - right_to_deletion: "implemented"
    - consent_management: "Firebase Auth"

  indian_data_protection:
    - data_localization: "asia-south1 region"
    - audit_logs: "Cloud Audit Logs"
    - encryption: "256-bit AES"
```

## 🚀 Deployment Architecture

### Multi-Environment Setup

```yaml
environments:
  development:
    project_id: "craftchain-dev"
    region: "us-central1"
    min_instances: 0
    max_instances: 10

  staging:
    project_id: "craftchain-staging"
    region: "us-central1"
    min_instances: 1
    max_instances: 50

  production:
    project_id: "craftchain-prod"
    region: "asia-south1"
    min_instances: 2
    max_instances: 100
    backup_region: "us-central1"
```

### Traffic Management

```yaml
traffic_management:
  load_balancing:
    - type: "Global HTTP(S) Load Balancer"
      ssl_certificates: "Google-managed"
      cdn_enabled: true

  api_gateway:
    - quota: "10000 requests/day per user"
    - authentication: "Firebase JWT"
    - cors_enabled: true

  cloud_cdn:
    - cache_mode: "CACHE_ALL_STATIC"
    - default_ttl: "3600s"
    - max_ttl: "86400s"
```

This comprehensive Google Cloud services configuration provides a robust, scalable, and cost-effective foundation for CraftChain X. The architecture leverages Google Cloud's AI/ML capabilities while ensuring security, compliance, and optimal performance.
