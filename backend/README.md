# CraftChain X - Backend Services

## 🏗️ Project Structure

```
backend/
├── services/                 # Microservices
│   ├── api-gateway/         # Main API gateway service
│   ├── product-service/     # Product management service
│   ├── ml-service/          # AI/ML model serving service
│   ├── pricing-service/     # Dynamic pricing engine
│   ├── analytics-service/   # Business intelligence service
│   ├── blockchain-service/  # Blockchain integration service
│   ├── notification-service/ # Communication service
│   ├── media-service/       # Media upload and processing
│   └── auth-service/        # Authentication service
├── shared/                  # Shared libraries and utilities
│   ├── models/             # Pydantic models and schemas
│   ├── utils/              # Common utility functions
│   └── config/             # Configuration management
└── infrastructure/         # Infrastructure as Code
    ├── terraform/          # Terraform configurations
    ├── docker/             # Docker configurations
    └── k8s/               # Kubernetes manifests
```

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Google Cloud SDK
- Docker
- Terraform (for infrastructure)

### Development Setup

1. Set up virtual environment for each service
2. Install dependencies using requirements.txt
3. Configure Google Cloud credentials
4. Set up local development database (Firestore emulator)

### Service Ports

- API Gateway: 8000
- Product Service: 8001
- ML Service: 8002
- Pricing Service: 8003
- Analytics Service: 8004
- Blockchain Service: 8005
- Notification Service: 8006
- Media Service: 8007
- Auth Service: 8008
- Storytelling Service: 8009

## 🔧 Technology Stack

- **Framework**: FastAPI
- **Database**: Google Firestore
- **Analytics**: Google BigQuery
- **ML/AI**: Google Vertex AI, Vision AI
- **Storage**: Google Cloud Storage
- **Blockchain**: Web3.py, Polygon/Base L2
- **Monitoring**: Google Cloud Monitoring
- **Deployment**: Google Cloud Run

## 📝 Development Guidelines

### Service Development

1. Each service is an independent FastAPI application
2. Follow the shared models and schemas
3. Use dependency injection for database and external services
4. Implement proper error handling and logging
5. Add comprehensive tests for each endpoint

### API Design

- RESTful API design principles
- Consistent response formats
- Proper HTTP status codes
- API versioning support
- Comprehensive OpenAPI documentation

### Security

- JWT token-based authentication
- Input validation and sanitization
- Rate limiting and CORS policies
- Secure environment variable management
- HTTPS only in production

## 🧪 Testing Strategy

### Unit Tests

- Test individual functions and methods
- Mock external dependencies
- Use pytest framework

### Integration Tests

- Test service-to-service communication
- Test database operations
- Test external API integrations

### End-to-End Tests

- Test complete user workflows
- Test API gateway routing
- Test authentication flows

## 🚀 Deployment

### Local Development

```bash
# Start individual service
cd services/product-service
uvicorn main:app --reload --port 8001
```

To start the Storytelling Service locally:

```bash
uvicorn backend.services.storytelling_service.main:app --reload --port 8009
```

### Production Deployment

- Services deployed on Google Cloud Run
- Infrastructure managed via Terraform
- CI/CD pipeline with GitHub Actions
- Environment-specific configurations

## 📊 Monitoring and Observability

- **Logging**: Structured logging with Google Cloud Logging
- **Metrics**: Custom metrics with Google Cloud Monitoring
- **Tracing**: Distributed tracing with Google Cloud Trace
- **Health Checks**: Service health endpoints
- **Alerting**: Proactive alerting for critical issues

## 🔗 Inter-Service Communication

- **Synchronous**: HTTP/REST APIs via service discovery
- **Asynchronous**: Google Pub/Sub for event-driven communication
- **Service Mesh**: Istio for advanced traffic management
- **Load Balancing**: Google Cloud Load Balancer

## 📈 Scalability Considerations

- **Auto-scaling**: Based on CPU and memory metrics
- **Database**: Firestore automatic scaling
- **Caching**: Redis for frequently accessed data
- **CDN**: Google Cloud CDN for static assets
- **Rate Limiting**: Per-user and per-service limits
