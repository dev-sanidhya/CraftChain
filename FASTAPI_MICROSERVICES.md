# FastAPI Microservices Architecture for CraftChain X

## 🏗️ Microservices Overview

CraftChain X follows a microservices architecture with each service responsible for a specific domain. All services are built with FastAPI for high performance and automatic API documentation.

### Service Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway                            │
│              (Authentication, Rate Limiting)               │
└─────────────────────┬───────────────────────────────────────┘
                      │
     ┌────────────────┼────────────────────────────────────┐
     │                │                                    │
┌────▼────┐    ┌─────▼─────┐    ┌──────▼──────┐    ┌─────▼─────┐
│Product  │    │   ML      │    │  Analytics  │    │   Auth    │
│Service  │    │ Service   │    │   Service   │    │ Service   │
└─────────┘    └───────────┘    └─────────────┘    └───────────┘
     │                │                 │                 │
┌────▼────┐    ┌─────▼─────┐    ┌──────▼──────┐    ┌─────▼─────┐
│Pricing  │    │Blockchain │    │Notification │    │  Media    │
│Service  │    │ Service   │    │   Service   │    │ Service   │
└─────────┘    └───────────┘    └─────────────┘    └───────────┘
```

## 📋 Service Specifications

### 1. API Gateway Service

**Purpose**: Entry point, authentication, rate limiting, request routing
**Port**: 8000
**Dependencies**: Firebase Auth, Cloud Armor

**Endpoints**:

```python
# API Gateway Routes
routes = {
    "/auth/*": "auth-service",
    "/products/*": "product-service",
    "/ml/*": "ml-service",
    "/pricing/*": "pricing-service",
    "/analytics/*": "analytics-service",
    "/blockchain/*": "blockchain-service",
    "/notifications/*": "notification-service",
    "/media/*": "media-service"
}
```

### 2. Product Service

**Purpose**: Product CRUD operations, search, categorization
**Port**: 8001
**Database**: Firestore
**Dependencies**: Vision AI, Translation API

#### API Endpoints

```python
# Product Service API
from fastapi import FastAPI, HTTPException, Depends, UploadFile
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title="Product Service", version="1.0.0")

class ProductCreate(BaseModel):
    title: str
    description: str
    category: str
    subcategory: str
    price: float
    materials: List[str]
    dimensions: dict
    production_time: str
    artisan_id: str

class ProductResponse(BaseModel):
    id: str
    title: str
    description: dict  # Multi-language descriptions
    category: str
    subcategory: str
    price: float
    ai_suggested_price: dict
    images: List[str]
    materials: List[str]
    cultural_story: str
    ai_analysis: dict
    status: str
    created_at: str

@app.post("/products", response_model=ProductResponse)
async def create_product(product: ProductCreate, images: List[UploadFile]):
    """Create a new product with AI-generated descriptions"""
    # Upload images to Cloud Storage
    image_urls = await upload_images(images)

    # Generate AI description and analysis
    ai_analysis = await generate_ai_analysis(product, image_urls[0])

    # Create product in Firestore
    product_id = str(uuid.uuid4())
    product_data = {
        **product.dict(),
        "id": product_id,
        "images": image_urls,
        "ai_analysis": ai_analysis,
        "status": "active",
        "created_at": datetime.utcnow().isoformat()
    }

    await firestore_client.collection("products").document(product_id).set(product_data)

    # Trigger pricing analysis
    await trigger_pricing_analysis(product_id)

    return ProductResponse(**product_data)

@app.get("/products", response_model=List[ProductResponse])
async def list_products(
    category: Optional[str] = None,
    region: Optional[str] = None,
    price_min: Optional[float] = None,
    price_max: Optional[float] = None,
    limit: int = 20,
    offset: int = 0
):
    """List products with filtering"""
    query = firestore_client.collection("products")

    if category:
        query = query.where("category", "==", category)
    if price_min:
        query = query.where("price", ">=", price_min)
    if price_max:
        query = query.where("price", "<=", price_max)

    docs = query.limit(limit).offset(offset).stream()
    products = [ProductResponse(**doc.to_dict()) for doc in docs]

    return products

@app.get("/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    """Get product by ID"""
    doc = await firestore_client.collection("products").document(product_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Product not found")

    return ProductResponse(**doc.to_dict())

@app.put("/products/{product_id}", response_model=ProductResponse)
async def update_product(product_id: str, updates: dict):
    """Update product"""
    doc_ref = firestore_client.collection("products").document(product_id)
    doc = await doc_ref.get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="Product not found")

    updates["updated_at"] = datetime.utcnow().isoformat()
    await doc_ref.update(updates)

    updated_doc = await doc_ref.get()
    return ProductResponse(**updated_doc.to_dict())

@app.delete("/products/{product_id}")
async def delete_product(product_id: str):
    """Soft delete product"""
    await firestore_client.collection("products").document(product_id).update({
        "status": "deleted",
        "deleted_at": datetime.utcnow().isoformat()
    })
    return {"message": "Product deleted successfully"}

@app.post("/products/{product_id}/generate-story")
async def generate_cultural_story(product_id: str):
    """Generate cultural story for product"""
    doc = await firestore_client.collection("products").document(product_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Product not found")

    product_data = doc.to_dict()
    story = await generate_story(product_data)

    await firestore_client.collection("products").document(product_id).update({
        "cultural_story": story
    })

    return {"story": story}

@app.post("/products/search")
async def search_products(query: dict):
    """Advanced product search with AI"""
    # Implement semantic search using Vertex AI
    results = await semantic_search(query)
    return results
```

### 3. ML Service

**Purpose**: AI/ML model serving, predictions, analysis
**Port**: 8002
**Dependencies**: Vertex AI, BigQuery ML, Vision AI

#### API Endpoints

```python
# ML Service API
from fastapi import FastAPI, UploadFile
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI(title="ML Service", version="1.0.0")

class PricePredictionRequest(BaseModel):
    product_id: str
    category: str
    materials: List[str]
    dimensions: dict
    artisan_skill_level: int
    region: str

class DemandForecastRequest(BaseModel):
    category: str
    subcategory: str
    region: str
    time_horizon: int  # days

class ImageAnalysisResponse(BaseModel):
    color_palette: List[str]
    dominant_colors: List[dict]
    style_tags: List[str]
    objects_detected: List[str]
    quality_score: float
    suggested_improvements: List[str]

@app.post("/ml/analyze-image", response_model=ImageAnalysisResponse)
async def analyze_product_image(image: UploadFile):
    """Analyze product image using Vision AI"""
    # Upload to temporary storage
    image_path = await save_temp_image(image)

    # Vision AI analysis
    vision_results = await vision_ai_client.analyze_image(image_path)

    # Color palette extraction
    colors = await extract_color_palette(image_path)

    # Style classification using custom model
    style_tags = await classify_style(image_path)

    # Quality assessment
    quality_score = await assess_image_quality(image_path)

    return ImageAnalysisResponse(
        color_palette=colors['hex_codes'],
        dominant_colors=colors['rgb_values'],
        style_tags=style_tags,
        objects_detected=vision_results['objects'],
        quality_score=quality_score,
        suggested_improvements=await generate_photo_tips(vision_results)
    )

@app.post("/ml/predict-demand")
async def predict_demand(request: DemandForecastRequest):
    """Predict demand using ML model"""
    # Prepare features
    features = await prepare_demand_features(request)

    # Get prediction from Vertex AI model
    prediction = await vertex_ai_client.predict(
        endpoint="demand-forecasting-endpoint",
        instances=[features]
    )

    # Get market trends from BigQuery
    trends = await get_market_trends(request.category, request.region)

    return {
        "predicted_demand": prediction['demand_score'],
        "confidence": prediction['confidence'],
        "trend_direction": trends['direction'],
        "seasonal_factor": trends['seasonal_multiplier'],
        "recommendations": await generate_demand_insights(prediction, trends)
    }

@app.post("/ml/generate-description")
async def generate_product_description(product_data: dict):
    """Generate AI-powered product descriptions"""
    # Create culturally appropriate prompt
    prompt = await create_cultural_prompt(product_data)

    # Generate description using PaLM 2
    description = await vertex_ai_client.generate_text(prompt)

    # SEO optimization
    seo_keywords = await extract_seo_keywords(description, product_data['category'])
    optimized_description = await optimize_for_seo(description, seo_keywords)

    # Multi-language translation
    translations = {}
    for lang in ['hi', 'bn', 'ta', 'te', 'mr']:
        translations[lang] = await translate_text(optimized_description, lang)

    return {
        "primary_description": optimized_description,
        "translations": translations,
        "seo_keywords": seo_keywords,
        "readability_score": await calculate_readability(optimized_description)
    }

@app.post("/ml/generate-moodboard")
async def generate_moodboard(image: UploadFile):
    """Generate moodboard based on product image"""
    # Analyze uploaded image
    image_analysis = await analyze_product_image(image)

    # Find similar products
    similar_products = await find_similar_products(image_analysis.color_palette)

    # Generate trend insights
    trend_insights = await get_trend_insights(image_analysis.style_tags)

    # Create moodboard
    moodboard = await create_moodboard(
        colors=image_analysis.color_palette,
        styles=image_analysis.style_tags,
        trends=trend_insights
    )

    return {
        "moodboard_url": moodboard['url'],
        "color_palette": image_analysis.color_palette,
        "style_inspiration": trend_insights,
        "market_alignment": moodboard['market_score'],
        "similar_products": similar_products[:10]
    }

@app.post("/ml/marketing-content")
async def generate_marketing_content(product_id: str):
    """Generate marketing content for social media"""
    # Get product details
    product = await get_product_details(product_id)

    # Generate social media content
    content = await generate_social_content(product)

    # Generate hashtags
    hashtags = await generate_hashtags(product)

    # Create poster design suggestions
    poster_suggestions = await generate_poster_ideas(product)

    return {
        "social_media_posts": content,
        "hashtags": hashtags,
        "poster_designs": poster_suggestions,
        "campaign_strategy": await generate_campaign_strategy(product)
    }
```

### 4. Pricing Service

**Purpose**: Dynamic pricing, market analysis, price optimization
**Port**: 8003
**Dependencies**: BigQuery, Vertex AI, Market Data APIs

#### API Endpoints

```python
# Pricing Service API
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Pricing Service", version="1.0.0")

class PriceRequest(BaseModel):
    product_id: str
    base_cost: float
    labor_hours: float
    material_costs: List[dict]
    artisan_skill_level: int
    urgency: str  # "low", "medium", "high"

class PriceResponse(BaseModel):
    suggested_price: float
    price_range: dict
    market_factors: List[dict]
    confidence_score: float
    pricing_strategy: str

@app.post("/pricing/calculate", response_model=PriceResponse)
async def calculate_price(request: PriceRequest):
    """Calculate optimal price for product"""
    # Get market data
    market_data = await get_market_data(request.product_id)

    # Calculate base price using cost-plus model
    base_price = calculate_base_price(request)

    # Apply market adjustments
    market_adjusted_price = apply_market_factors(base_price, market_data)

    # Get ML prediction
    ml_prediction = await get_ml_price_prediction(request)

    # Combine models for final price
    final_price = combine_pricing_models(market_adjusted_price, ml_prediction)

    return PriceResponse(
        suggested_price=final_price,
        price_range={
            "minimum": final_price * 0.85,
            "optimal": final_price,
            "premium": final_price * 1.25
        },
        market_factors=market_data['factors'],
        confidence_score=ml_prediction['confidence'],
        pricing_strategy=determine_strategy(request, market_data)
    )

@app.get("/pricing/market-analysis/{category}")
async def get_market_analysis(category: str, region: Optional[str] = None):
    """Get market analysis for category"""
    # Query BigQuery for market trends
    trends = await query_market_trends(category, region)

    # Get competitor pricing
    competitor_prices = await get_competitor_pricing(category, region)

    # Calculate market insights
    insights = await calculate_market_insights(trends, competitor_prices)

    return {
        "category": category,
        "region": region,
        "average_price": insights['avg_price'],
        "price_trend": insights['trend'],
        "demand_level": insights['demand'],
        "seasonality": insights['seasonal_factors'],
        "recommendations": insights['recommendations']
    }

@app.post("/pricing/optimize")
async def optimize_pricing(product_ids: List[str]):
    """Optimize pricing for multiple products"""
    results = []

    for product_id in product_ids:
        # Get current pricing
        current_price = await get_current_price(product_id)

        # Calculate optimal price
        optimal_price = await calculate_optimal_price(product_id)

        # Estimate impact
        impact = await estimate_price_impact(product_id, current_price, optimal_price)

        results.append({
            "product_id": product_id,
            "current_price": current_price,
            "suggested_price": optimal_price,
            "potential_increase": impact['revenue_increase'],
            "demand_impact": impact['demand_change']
        })

    return {"optimization_results": results}
```

### 5. Analytics Service

**Purpose**: Business intelligence, market insights, reporting
**Port**: 8004
**Dependencies**: BigQuery, Data Studio

#### API Endpoints

```python
# Analytics Service API
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime, timedelta

app = FastAPI(title="Analytics Service", version="1.0.0")

@app.get("/analytics/dashboard/{user_id}")
async def get_user_dashboard(user_id: str, user_type: str):
    """Get personalized dashboard data"""
    if user_type == "artisan":
        return await get_artisan_dashboard(user_id)
    elif user_type == "buyer":
        return await get_buyer_dashboard(user_id)
    else:
        raise HTTPException(status_code=400, detail="Invalid user type")

async def get_artisan_dashboard(artisan_id: str):
    """Get artisan-specific analytics"""
    # Query BigQuery for artisan metrics
    metrics = await query_artisan_metrics(artisan_id)

    # Get product performance
    product_performance = await get_product_performance(artisan_id)

    # Market insights
    market_insights = await get_market_insights_for_artisan(artisan_id)

    return {
        "total_revenue": metrics['revenue'],
        "total_orders": metrics['orders'],
        "average_order_value": metrics['aov'],
        "top_performing_products": product_performance[:5],
        "market_trends": market_insights,
        "seasonal_insights": await get_seasonal_insights(artisan_id),
        "pricing_recommendations": await get_pricing_recommendations(artisan_id)
    }

@app.get("/analytics/market-trends")
async def get_market_trends(
    category: Optional[str] = None,
    region: Optional[str] = None,
    time_period: str = "30d"
):
    """Get market trends and insights"""
    # Parse time period
    days = int(time_period.replace('d', ''))
    start_date = datetime.now() - timedelta(days=days)

    # Query BigQuery for trends
    trends = await query_market_trends_bigquery(category, region, start_date)

    # Get demand signals
    demand_signals = await get_demand_signals(category, region)

    # Social media trends
    social_trends = await get_social_media_trends(category)

    return {
        "category": category,
        "region": region,
        "time_period": time_period,
        "price_trends": trends['prices'],
        "demand_trends": trends['demand'],
        "popular_styles": trends['styles'],
        "seasonal_patterns": trends['seasonality'],
        "social_signals": social_trends,
        "recommendations": await generate_trend_recommendations(trends)
    }

@app.get("/analytics/performance/{product_id}")
async def get_product_performance(product_id: str):
    """Get detailed product performance analytics"""
    # Basic metrics
    metrics = await get_product_metrics(product_id)

    # View and engagement data
    engagement = await get_engagement_metrics(product_id)

    # Conversion funnel
    funnel = await get_conversion_funnel(product_id)

    # Geographic performance
    geo_performance = await get_geographic_performance(product_id)

    return {
        "product_id": product_id,
        "views": engagement['views'],
        "likes": engagement['likes'],
        "shares": engagement['shares'],
        "conversion_rate": funnel['conversion_rate'],
        "revenue": metrics['revenue'],
        "units_sold": metrics['units_sold'],
        "geographic_breakdown": geo_performance,
        "performance_score": await calculate_performance_score(metrics, engagement)
    }

@app.post("/analytics/report")
async def generate_custom_report(report_config: dict):
    """Generate custom analytics report"""
    # Validate report configuration
    config = validate_report_config(report_config)

    # Execute queries based on config
    data = await execute_report_queries(config)

    # Generate visualizations
    charts = await generate_report_charts(data, config)

    # Create PDF report
    pdf_url = await generate_pdf_report(data, charts, config)

    return {
        "report_id": str(uuid.uuid4()),
        "data": data,
        "charts": charts,
        "pdf_url": pdf_url,
        "generated_at": datetime.utcnow().isoformat()
    }
```

### 6. Blockchain Service

**Purpose**: NFT minting, smart contracts, provenance tracking
**Port**: 8005
**Dependencies**: Web3.py, Polygon/Base RPC

#### API Endpoints

```python
# Blockchain Service API
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from web3 import Web3
import json

app = FastAPI(title="Blockchain Service", version="1.0.0")

class ProvenanceRequest(BaseModel):
    product_id: str
    artisan_id: str
    product_hash: str
    materials: List[str]
    cultural_origin: str
    fair_wage_amount: float

class NFTResponse(BaseModel):
    token_id: int
    contract_address: str
    transaction_hash: str
    provenance_data: dict

@app.post("/blockchain/mint-provenance", response_model=NFTResponse)
async def mint_provenance_nft(request: ProvenanceRequest):
    """Mint provenance NFT for product"""
    try:
        # Connect to blockchain
        w3 = Web3(Web3.HTTPProvider(POLYGON_RPC_URL))

        # Load smart contract
        contract = w3.eth.contract(
            address=PROVENANCE_CONTRACT_ADDRESS,
            abi=PROVENANCE_CONTRACT_ABI
        )

        # Prepare transaction
        tx = contract.functions.mintProvenance(
            artisan_address=request.artisan_id,
            product_hash=request.product_hash,
            provenance_data={
                "artisan_id": request.artisan_id,
                "product_hash": request.product_hash,
                "materials": request.materials,
                "cultural_origin": request.cultural_origin,
                "fair_wage_amount": request.fair_wage_amount,
                "timestamp": int(datetime.utcnow().timestamp())
            }
        ).build_transaction({
            'from': PLATFORM_WALLET_ADDRESS,
            'gas': 300000,
            'gasPrice': w3.to_wei('20', 'gwei'),
            'nonce': w3.eth.get_transaction_count(PLATFORM_WALLET_ADDRESS)
        })

        # Sign and send transaction
        signed_tx = w3.eth.account.sign_transaction(tx, PLATFORM_PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

        # Wait for confirmation
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        # Extract token ID from logs
        token_id = extract_token_id_from_logs(receipt.logs)

        # Store blockchain reference in Firestore
        await store_blockchain_reference(request.product_id, {
            "token_id": token_id,
            "contract_address": PROVENANCE_CONTRACT_ADDRESS,
            "transaction_hash": tx_hash.hex(),
            "block_number": receipt.blockNumber
        })

        return NFTResponse(
            token_id=token_id,
            contract_address=PROVENANCE_CONTRACT_ADDRESS,
            transaction_hash=tx_hash.hex(),
            provenance_data=request.dict()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Minting failed: {str(e)}")

@app.get("/blockchain/provenance/{token_id}")
async def get_provenance_data(token_id: int):
    """Get provenance data for NFT"""
    # Query blockchain for provenance data
    provenance = await query_provenance_data(token_id)

    # Get additional metadata from IPFS if available
    metadata = await get_ipfs_metadata(provenance.get('metadata_uri'))

    return {
        "token_id": token_id,
        "provenance": provenance,
        "metadata": metadata,
        "verification_status": "verified"
    }

@app.post("/blockchain/execute-payment")
async def execute_fair_pay_contract(order_id: str, payment_splits: dict):
    """Execute fair pay smart contract"""
    try:
        # Get order details
        order = await get_order_details(order_id)

        # Prepare payment contract transaction
        payment_tx = await prepare_payment_transaction(order, payment_splits)

        # Execute transaction
        tx_hash = await execute_transaction(payment_tx)

        # Update order status
        await update_order_status(order_id, "payment_executed", tx_hash)

        return {
            "order_id": order_id,
            "transaction_hash": tx_hash,
            "payment_splits": payment_splits,
            "status": "executed"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")

@app.get("/blockchain/wallet/{address}/balance")
async def get_wallet_balance(address: str):
    """Get wallet balance and transaction history"""
    # Get native token balance
    native_balance = await get_native_balance(address)

    # Get ERC-20 token balances
    token_balances = await get_token_balances(address)

    # Get recent transactions
    transactions = await get_recent_transactions(address)

    return {
        "address": address,
        "native_balance": native_balance,
        "token_balances": token_balances,
        "recent_transactions": transactions
    }
```

### 7. Notification Service

**Purpose**: Email, SMS, push notifications, webhooks
**Port**: 8006
**Dependencies**: SendGrid, Twilio, Firebase Cloud Messaging

#### API Endpoints

```python
# Notification Service API
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Notification Service", version="1.0.0")

class NotificationRequest(BaseModel):
    user_id: str
    type: str  # "email", "sms", "push", "webhook"
    template: str
    data: dict
    priority: str = "normal"  # "low", "normal", "high", "urgent"

@app.post("/notifications/send")
async def send_notification(
    request: NotificationRequest,
    background_tasks: BackgroundTasks
):
    """Send notification to user"""
    # Add to background task for async processing
    background_tasks.add_task(
        process_notification,
        request
    )

    return {
        "message": "Notification queued",
        "notification_id": str(uuid.uuid4())
    }

@app.post("/notifications/bulk")
async def send_bulk_notifications(
    notifications: List[NotificationRequest],
    background_tasks: BackgroundTasks
):
    """Send bulk notifications"""
    notification_ids = []

    for notification in notifications:
        notification_id = str(uuid.uuid4())
        notification_ids.append(notification_id)

        background_tasks.add_task(
            process_notification,
            notification,
            notification_id
        )

    return {
        "message": f"{len(notifications)} notifications queued",
        "notification_ids": notification_ids
    }

@app.post("/notifications/marketing-campaign")
async def send_marketing_campaign(campaign_data: dict):
    """Send marketing campaign to targeted users"""
    # Get target audience
    target_users = await get_target_audience(campaign_data['targeting'])

    # Create personalized messages
    personalized_messages = await create_personalized_messages(
        campaign_data['template'],
        target_users
    )

    # Queue notifications
    for user_id, message in personalized_messages.items():
        await queue_notification({
            "user_id": user_id,
            "type": "email",
            "template": "marketing_campaign",
            "data": message,
            "campaign_id": campaign_data['id']
        })

    return {
        "campaign_id": campaign_data['id'],
        "target_count": len(target_users),
        "status": "queued"
    }

async def process_notification(request: NotificationRequest, notification_id: str = None):
    """Process individual notification"""
    try:
        # Get user preferences
        user_prefs = await get_user_notification_preferences(request.user_id)

        # Check if user allows this type of notification
        if not user_prefs.get(request.type, True):
            return {"status": "skipped", "reason": "user_preference"}

        # Route to appropriate handler
        if request.type == "email":
            result = await send_email(request)
        elif request.type == "sms":
            result = await send_sms(request)
        elif request.type == "push":
            result = await send_push_notification(request)
        elif request.type == "webhook":
            result = await send_webhook(request)

        # Log notification
        await log_notification(notification_id, request, result)

        return result

    except Exception as e:
        await log_notification_error(notification_id, request, str(e))
        raise
```

### 8. Media Service

**Purpose**: Image upload, processing, optimization, CDN
**Port**: 8007
**Dependencies**: Cloud Storage, Vision AI, ImageMagick

#### API Endpoints

```python
# Media Service API
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI(title="Media Service", version="1.0.0")

@app.post("/media/upload")
async def upload_media(
    files: List[UploadFile] = File(...),
    product_id: Optional[str] = None,
    optimize: bool = True
):
    """Upload and process media files"""
    results = []

    for file in files:
        # Validate file type
        if not is_valid_media_type(file.content_type):
            raise HTTPException(status_code=400, detail=f"Invalid file type: {file.content_type}")

        # Generate unique filename
        file_id = str(uuid.uuid4())
        file_extension = file.filename.split('.')[-1]
        filename = f"{file_id}.{file_extension}"

        # Upload original file
        original_url = await upload_to_cloud_storage(file, f"originals/{filename}")

        # Process and optimize if requested
        processed_urls = {}
        if optimize:
            processed_urls = await process_image(file, file_id)

        # Extract metadata
        metadata = await extract_media_metadata(file)

        # Store metadata in Firestore
        media_data = {
            "id": file_id,
            "filename": file.filename,
            "content_type": file.content_type,
            "size": metadata['size'],
            "dimensions": metadata.get('dimensions'),
            "original_url": original_url,
            "processed_urls": processed_urls,
            "product_id": product_id,
            "uploaded_at": datetime.utcnow().isoformat()
        }

        await firestore_client.collection("media").document(file_id).set(media_data)

        results.append({
            "file_id": file_id,
            "original_url": original_url,
            "processed_urls": processed_urls,
            "metadata": metadata
        })

    return {"uploaded_files": results}

@app.get("/media/{file_id}")
async def get_media_info(file_id: str):
    """Get media file information"""
    doc = await firestore_client.collection("media").document(file_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Media file not found")

    return doc.to_dict()

@app.post("/media/{file_id}/optimize")
async def optimize_media(file_id: str, optimization_params: dict):
    """Optimize existing media file"""
    # Get original file
    media_doc = await firestore_client.collection("media").document(file_id).get()
    if not media_doc.exists:
        raise HTTPException(status_code=404, detail="Media file not found")

    media_data = media_doc.to_dict()

    # Download original file
    original_file = await download_from_cloud_storage(media_data['original_url'])

    # Apply optimizations
    optimized_files = await apply_optimizations(original_file, optimization_params)

    # Upload optimized versions
    optimized_urls = {}
    for variant, file_data in optimized_files.items():
        url = await upload_to_cloud_storage(
            file_data,
            f"optimized/{file_id}_{variant}.jpg"
        )
        optimized_urls[variant] = url

    # Update metadata
    await firestore_client.collection("media").document(file_id).update({
        "processed_urls": optimized_urls,
        "last_optimized": datetime.utcnow().isoformat()
    })

    return {"optimized_urls": optimized_urls}
```

## 🔄 Inter-Service Communication

### Service Mesh Architecture

```python
# Service communication using HTTP clients
class ServiceClient:
    def __init__(self, service_name: str, base_url: str):
        self.service_name = service_name
        self.base_url = base_url
        self.session = httpx.AsyncClient(timeout=30.0)

    async def call(self, method: str, endpoint: str, **kwargs):
        url = f"{self.base_url}{endpoint}"
        response = await self.session.request(method, url, **kwargs)
        response.raise_for_status()
        return response.json()

# Service discovery configuration
SERVICES = {
    "product": "https://product-service-hash-uc.a.run.app",
    "ml": "https://ml-service-hash-uc.a.run.app",
    "pricing": "https://pricing-service-hash-uc.a.run.app",
    "analytics": "https://analytics-service-hash-uc.a.run.app",
    "blockchain": "https://blockchain-service-hash-uc.a.run.app",
    "notification": "https://notification-service-hash-uc.a.run.app",
    "media": "https://media-service-hash-uc.a.run.app"
}

# Example: Product service calling ML service
async def generate_ai_analysis(product_data, image_url):
    ml_client = ServiceClient("ml", SERVICES["ml"])

    # Analyze image
    image_analysis = await ml_client.call(
        "POST",
        "/ml/analyze-image",
        json={"image_url": image_url}
    )

    # Generate description
    description = await ml_client.call(
        "POST",
        "/ml/generate-description",
        json=product_data
    )

    return {
        "image_analysis": image_analysis,
        "ai_description": description
    }
```

### Event-Driven Communication

```python
# Event publishing using Pub/Sub
from google.cloud import pubsub_v1

class EventPublisher:
    def __init__(self):
        self.publisher = pubsub_v1.PublisherClient()
        self.project_id = "craftchain-prod"

    async def publish_event(self, topic: str, event_data: dict):
        topic_path = self.publisher.topic_path(self.project_id, topic)

        # Add metadata
        event_data.update({
            "timestamp": datetime.utcnow().isoformat(),
            "event_id": str(uuid.uuid4())
        })

        # Publish message
        future = self.publisher.publish(
            topic_path,
            json.dumps(event_data).encode('utf-8')
        )

        return future.result()

# Event topics
EVENTS = {
    "product.created": "product-created",
    "product.updated": "product-updated",
    "order.completed": "order-completed",
    "payment.executed": "payment-executed",
    "ml.analysis.completed": "ml-analysis-completed"
}

# Example: Publishing product creation event
await event_publisher.publish_event("product.created", {
    "product_id": product_id,
    "artisan_id": product_data["artisan_id"],
    "category": product_data["category"]
})
```

## 🚀 Deployment Configuration

### Docker Configuration

```dockerfile
# Base Dockerfile for FastAPI services
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Cloud Run Configuration

```yaml
# cloud-run-service.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: product-service
  annotations:
    run.googleapis.com/ingress: all
    run.googleapis.com/execution-environment: gen2
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/minScale: "1"
        autoscaling.knative.dev/maxScale: "100"
        run.googleapis.com/cpu-throttling: "false"
        run.googleapis.com/memory: "2Gi"
        run.googleapis.com/cpu: "2"
    spec:
      containerConcurrency: 100
      containers:
        - image: gcr.io/craftchain-prod/product-service:latest
          ports:
            - name: http1
              containerPort: 8000
          env:
            - name: GOOGLE_CLOUD_PROJECT
              value: "craftchain-prod"
            - name: FIRESTORE_DATABASE
              value: "(default)"
            - name: ENVIRONMENT
              value: "production"
          resources:
            limits:
              cpu: "2000m"
              memory: "2Gi"
          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 10
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 8000
            initialDelaySeconds: 5
            periodSeconds: 5
```

This comprehensive FastAPI microservices architecture provides a scalable, maintainable foundation for CraftChain X with clear separation of concerns and robust inter-service communication patterns.
