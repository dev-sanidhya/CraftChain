# 🚀 CraftChain X - AI + ML + Blockchain for Fair Trade & Demand Intelligence

> **Data-driven AI & blockchain marketplace that empowers artisans with demand forecasting, fair pricing, and transparent provenance tracking.**

[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-Platform-blue.svg)](https://cloud.google.com/)
[![Blockchain](https://img.shields.io/badge/Blockchain-Polygon-purple.svg)](https://polygon.technology/)

## 🎯 Project Overview

**CraftChain X** is a comprehensive platform that solves critical problems in the artisan marketplace through AI-powered demand forecasting, intelligent pricing, and blockchain-verified provenance. It goes beyond simple storytelling to provide data-driven insights that help artisans produce what sells, price fairly, and reach global markets transparently.

### 🌟 Core Features

#### 🔮 AI Demand Forecasting

- **Google Trends Integration**: Real-time market demand analysis
- **Social Media Signals**: Pinterest/Instagram trend detection
- **BigQuery Analytics**: Historical data and seasonality patterns
- **Predictive Insights**: "What will sell, where, and when"

#### 🧠 Smart Pricing Engine

- **ML Regression Models**: Fair market price calculation
- **Cost Analysis**: Material costs + labor + market factors
- **Competitive Intelligence**: Real-time competitor pricing
- **Dynamic Pricing**: Demand-based price optimization

#### 🔗 Blockchain Provenance

- **Proof-of-Origin NFTs**: Immutable authenticity certificates
- **Smart Contracts**: Automated fair-pay distribution
- **Transparent Supply Chain**: Full production tracking
- **ESG Impact Scoring**: Sustainability and community benefit metrics

#### 🎨 AI-Powered Tools

- **Smart Product Descriptions**: Multi-lingual, culturally tailored content
- **Moodboard Generation**: Visual trend analysis and inspiration
- **Marketing Kit Creation**: Social media content and campaigns
- **Storytelling Assistant**: Heritage stories that build emotional connection

## 🏗️ Project Structure

```
CraftChain/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Application pages
│   │   └── assets/          # Static assets
│   ├── public/              # Public assets
│   └── package.json         # Frontend dependencies
├── backend/                 # Python FastAPI backend
│   ├── services/            # Microservices
│   │   ├── api-gateway/     # Main API gateway
│   │   ├── product-service/ # Product management
│   │   ├── ml-service/      # AI/ML models
│   │   ├── pricing-service/ # Dynamic pricing
│   │   ├── analytics-service/ # Business intelligence
│   │   ├── blockchain-service/ # NFT & smart contracts
│   │   ├── notification-service/ # Communications
│   │   └── media-service/   # Image processing
│   ├── shared/              # Shared utilities
│   └── infrastructure/      # IaC and deployment
├── docs/                    # Technical documentation
│   ├── IMPLEMENTATION_PLAN.md
│   ├── GCP_SERVICES_CONFIG.md
│   └── FASTAPI_MICROSERVICES.md
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Frontend**: Node.js 18.0+, npm/yarn
- **Backend**: Python 3.11+, Google Cloud SDK
- **Infrastructure**: Docker, Terraform
- **Blockchain**: Web3 wallet (MetaMask recommended)

### Frontend Development

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

### Backend Development

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Set up Python environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Start services**
   ```bash
   # Start individual services
   cd services/product-service
   uvicorn main:app --reload --port 8001
   ```

## 🎨 Features in Detail

### 1. 🏠 Artisan Dashboard

**Location**: `/artisan-spotlight`

The core workspace where artisans upload their products and get AI assistance.

**Features**:

- **Image Upload**: Drag & drop or click to upload product images
- **Smart AI Generation**: AI analyzes your product and generates content based on type
- **Multi-tab Interface**:
  - **Description**: AI-generated compelling product descriptions
  - **Translations**: Multi-language support (Hindi, Tamil, Telugu, Bengali, Gujarati)
  - **Insights**: Market demand, pricing, and target audience analysis
  - **Marketing**: AI-generated marketing tips and strategies
- **Export Options**: Copy to clipboard or download as files

**Demo Data**: Try uploading different product types:

- **Sarees**: Get wedding-focused content with heritage stories
- **Pottery**: Receive home decor and gifting positioning
- **Other Crafts**: Generic cultural and traditional content

### 2. 🤖 AI Descriptions

**Location**: `/ai-insights`

Advanced AI-powered description generation with quality metrics.

**Features**:

- **Quality Metrics**: Real-time scoring for emotional appeal, SEO optimization, and cultural accuracy
- **Multi-Language Support**: 15+ languages with 95% cultural accuracy
- **Live Generation**: Click "Try AI Descriptions" to see the AI in action
- **Performance Analytics**: Detailed reports on description effectiveness

**Interactive Elements**:

- ✅ **Try AI Descriptions** - Generates new content with loading animation
- ✅ **View Full Report** - Detailed analytics and optimization suggestions

### 3. 📊 Market Intelligence

**Location**: `/market-insights`

Comprehensive market analysis and trend forecasting.

**Features**:

- **Seasonal Trends**: Interactive charts showing demand patterns
- **Regional Analysis**: Sales performance across different markets
- **Product Performance**: Pie charts showing category breakdowns
- **AI Forecasts**: Predictive insights for upcoming trends

**Interactive Elements**:

- ✅ **Refresh Data** - Updates market data with loading animation
- ✅ **Download Report** - Exports comprehensive market analysis as JSON
- ✅ **Optimize Strategy** - AI-generated business recommendations

### 4. 🎨 Visual Creator (Moodboard Generator)

**Location**: `/moodboard`

AI-powered design inspiration and color palette generation.

**Features**:

- **Trending Styles**: Boho Chic, Pastel Revival, Vintage Heritage
- **Color Palettes**: AI-generated color combinations with hex codes
- **Patterns & Textures**: Curated design elements for each style
- **Market Insights**: Demand data and pricing recommendations

**Interactive Elements**:

- ✅ **Regenerate** - Creates new random moodboards
- ✅ **Style Selection** - Switch between different aesthetic styles
- ✅ **Save Moodboard** - Save favorites with visual feedback
- ✅ **Download** - Export moodboard data as JSON
- ✅ **Share** - Copy details to clipboard or use native share

### 5. 📖 Storytelling AI

**Location**: `/storytelling`

Transform crafts into compelling heritage stories that connect with customers.

**Features**:

- **Heritage Stories**: AI-generated narratives with cultural context
- **Technique Details**: Information about traditional crafting methods
- **Emotional Connection**: Stories that resonate with buyers
- **Multiple Formats**: Ready for product listings, social media, and marketing

**Interactive Elements**:

- ✅ **Generate New Story** - Creates new AI-generated stories
- ✅ **Copy Story** - Copies text to clipboard with toast notification
- ✅ **Share Story** - Uses native share or clipboard fallback
- ✅ **Download Story** - Exports story as JSON file
- ✅ **Save Story** - Saves to favorites with visual feedback

### 6. 🛠️ Marketing Tools

**Location**: `/marketing-kit`

Complete marketing toolkit for artisans.

**Features**:

- **Content Templates**: Pre-designed marketing materials
- **Social Media Assets**: Ready-to-use posts and stories
- **Email Templates**: Professional communication templates
- **Brand Guidelines**: Consistent visual identity tools

## �� Use Cases

### For Artisans

- **Upload your craft** → Get AI-generated descriptions and translations
- **Understand market trends** → Make informed pricing and inventory decisions
- **Create compelling stories** → Connect emotionally with customers
- **Generate marketing materials** → Professional content without hiring designers

### For Buyers

- **Discover authentic crafts** → Learn about heritage and techniques
- **Multi-language support** → Access content in your preferred language
- **Cultural context** → Understand the significance and value of each piece

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Sonner
- **Routing**: React Router DOM

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- �� Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🚀 Getting Started for Developers

### Project Structure
