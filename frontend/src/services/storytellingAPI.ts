// Storytelling API Service - Connects React frontend to Python storytelling backend
const API_BASE_URL = (import.meta as any).env?.VITE_STORYTELLING_API_URL || 'http://127.0.0.1:8009';

export interface ProductInfo {
  name: string;
  category: string;
  materials?: string;
  techniques?: string;
  region?: string;
  description?: string;
}

export interface CulturalContext {
  region: string;
  historical_period: string;
  cultural_significance: string;
}

export interface HeritageStory {
  product_name: string;
  heritage_story: string;
  cultural_context: CulturalContext;
  heritage_facts: string[];
  heritage_tags: string[];
}

export interface StoryResponse {
  success: boolean;
  story: HeritageStory;
  quality_score: number;
  generation_time_ms: number;
  model_used: string;
  error?: string;
}

export class StorytellingAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Check if the API is healthy and accessible
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        return false;
      }
      
      const data = await response.json();
      return data.status === 'ok';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  /**
   * Generate a heritage story for a craft product
   */
  async generateStory(productInfo: ProductInfo): Promise<StoryResponse> {
    try {
      const requestBody = {
        product: productInfo.name,
        craft_type: productInfo.category,
        region: productInfo.region,
        materials: productInfo.materials ? productInfo.materials.split(',').map(m => m.trim()) : undefined,
        technique: productInfo.techniques,
        tone: 'heritage',
        length: 'medium',
        language: 'en'
      };

      const response = await fetch(`${this.baseUrl}/storytelling/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Transform the API response to match our frontend interface
      return {
        success: true,
        story: {
          product_name: data.product || productInfo.name,
          heritage_story: data.story || 'Unable to generate story at this time.',
          cultural_context: {
            region: data.heritage || productInfo.region || 'Unknown',
            historical_period: 'Traditional Era',
            cultural_significance: 'Represents traditional craftsmanship and cultural heritage'
          },
          heritage_facts: [],
          heritage_tags: data.tags || []
        },
        quality_score: 0.85, // Default score for fallback responses
        generation_time_ms: 1000,
        model_used: data.model || 'fallback',
        error: undefined
      };
    } catch (error) {
      console.error('Story generation failed:', error);
      return {
        success: false,
        story: {
          product_name: productInfo.name,
          heritage_story: '',
          cultural_context: {
            region: 'Unknown',
            historical_period: 'Unknown',
            cultural_significance: 'Unknown'
          },
          heritage_facts: [],
          heritage_tags: []
        },
        quality_score: 0,
        generation_time_ms: 0,
        model_used: 'none',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get API information and available endpoints
   */
  async getAPIInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/docs`, {
        method: 'GET',
      });
      
      return {
        available: response.ok,
        docs_url: `${this.baseUrl}/docs`,
        endpoints: [
          'GET /health - Health check',
          'POST /storytelling/generate - Generate heritage story'
        ]
      };
    } catch (error) {
      console.error('API info request failed:', error);
      return {
        available: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export a singleton instance
export const storytellingAPI = new StorytellingAPI();