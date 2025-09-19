import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Sparkles, 
  Globe, 
  TrendingUp, 
  FileText, 
  Image as ImageIcon,
  Download,
  Copy,
  CheckCircle
} from "lucide-react";

const ArtisanDashboard = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const exportContent = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIContent = async () => {
    setIsGenerating(true);
    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate different content based on product name
    const productType = productName.toLowerCase();
    let mockContent;
    
    if (productType.includes('saree') || productType.includes('sari')) {
      mockContent = {
        description: "Exquisite handwoven Kanjivaram silk saree featuring traditional temple motifs in rich gold zari work. Each thread tells a story of centuries-old craftsmanship passed down through generations. Perfect for special occasions, this masterpiece embodies the cultural heritage of Tamil Nadu. The intricate patterns are woven by master artisans using techniques perfected over 2000 years.",
        translations: {
          hindi: "शानदार हाथ से बुना कांचीवरम रेशमी साड़ी, जिसमें पारंपरिक मंदिर के नमूने और सोने के जरी का काम है। यह कलाकृति तमिलनाडु की सांस्कृतिक विरासत का प्रतीक है।",
          tamil: "பாரம்பரிய கோயில் வடிவங்கள் மற்றும் தங்க ஜரி வேலையுடன் கைத்தறி காஞ்சிவரம் பட்டு சேலை. இது 2000 ஆண்டுகளாக பரிமாணிக்கப்பட்ட கைவினைத் திறனின் வெளிப்பாடு.",
          telugu: "సంప్రదాయ దేవాలయ నమూనాలు మరియు బంగారు జరి పనితో చేతితో నేసిన కాంచీవరం పట్టు సారీ. ఇది తమిళనాడు సాంస్కృతిక వారసత్వాన్ని ప్రతిబింబిస్తుంది.",
          bengali: "ঐতিহ্যবাহী মন্দিরের নকশা এবং সোনার জরি কাজ সহ হাতে বোনা কাঞ্চীভরম সিল্ক শাড়ি। এটি তামিলনাড়ুর সাংস্কৃতিক ঐতিহ্যের প্রতীক।"
        },
        marketInsights: {
          demand: "Very High",
          priceRange: "₹18,000 - ₹35,000",
          trendingKeywords: ["Wedding", "Festival", "Heritage", "Luxury", "Traditional"],
          targetAudience: "Urban women aged 25-50, cultural enthusiasts, wedding planners",
          seasonality: "Peak during wedding season (Oct-Mar)"
        },
        marketingTips: [
          "Emphasize the 2000-year weaving tradition and heritage value",
          "Use emotional storytelling about the artisan's family legacy",
          "Highlight the investment value - sarees appreciate over time",
          "Target wedding season with 'Bridal Collection' positioning",
          "Create video content showing the weaving process"
        ]
      };
    } else if (productType.includes('pottery') || productType.includes('ceramic')) {
      mockContent = {
        description: "Handcrafted blue pottery from Jaipur, featuring intricate floral patterns and traditional motifs. Each piece is individually shaped and painted by skilled artisans using techniques passed down through generations. The distinctive blue glaze is achieved through a secret family recipe, making each piece truly unique and collectible.",
        translations: {
          hindi: "जयपुर की हस्तनिर्मित नीली मिट्टी की कलाकृति, जिसमें जटिल फूलदार पैटर्न और पारंपरिक नमूने हैं।",
          tamil: "ஜெய்ப்பூரின் கைவினை நீல மட்பாண்டம், சிக்கலான பூக்களின் வடிவங்கள் மற்றும் பாரம்பரிய அமைப்புகளுடன்.",
          telugu: "జైపూర్ యొక్క చేతితో తయారు చేసిన నీలి మట్టి కళాకృతి, సంక్లిష్టమైన పుష్ప నమూనాలు మరియు సంప్రదాయ అమరికలతో.",
          gujarati: "જયપુરની હસ્તનિર્મિત નીલી માટીની કલાકૃતિ, જટિલ ફૂલદાર પેટર્ન અને પરંપરાગત નમૂનાઓ સાથે."
        },
        marketInsights: {
          demand: "High",
          priceRange: "₹800 - ₹3,500",
          trendingKeywords: ["Handmade", "Decorative", "Gift", "Home Decor", "Artisan"],
          targetAudience: "Interior designers, gift buyers, art collectors aged 30-60",
          seasonality: "Consistent year-round, slight peak during festivals"
        },
        marketingTips: [
          "Highlight the unique blue glaze technique and family secrets",
          "Position as home decor and gifting option",
          "Create content showing the pottery-making process",
          "Target interior designers and home decor enthusiasts",
          "Emphasize the collectible and heirloom value"
        ]
      };
    } else {
      // Default content for other products
      mockContent = {
        description: "Beautiful handcrafted item showcasing traditional techniques and cultural heritage. Each piece is carefully created by skilled artisans using time-honored methods passed down through generations. The attention to detail and quality craftsmanship makes this a truly special piece that tells a story of cultural pride and artistic excellence.",
        translations: {
          hindi: "पारंपरिक तकनीकों और सांस्कृतिक विरासत को दर्शाता हुआ सुंदर हस्तनिर्मित वस्तु।",
          tamil: "பாரம்பரிய நுட்பங்கள் மற்றும் கலாச்சார பாரம்பரியத்தை வெளிப்படுத்தும் அழகான கைவினைப் பொருள்.",
          telugu: "సంప్రదాయ సాంకేతికతలు మరియు సాంస్కృతిక వారసత్వాన్ని ప్రదర్శించే అందమైన చేతితో తయారు చేసిన వస్తువు.",
          bengali: "ঐতিহ্যবাহী কৌশল এবং সাংস্কৃতিক ঐতিহ্য প্রদর্শনকারী সুন্দর হস্তনির্মিত আইটেম।"
        },
        marketInsights: {
          demand: "Medium",
          priceRange: "₹500 - ₹2,000",
          trendingKeywords: ["Handmade", "Traditional", "Cultural", "Artisan", "Unique"],
          targetAudience: "Cultural enthusiasts, gift buyers, tourists aged 25-55",
          seasonality: "Peak during cultural festivals and tourist season"
        },
        marketingTips: [
          "Focus on the cultural significance and traditional techniques",
          "Create storytelling content about the artisan's background",
          "Target cultural festivals and tourist markets",
          "Emphasize the unique, one-of-a-kind nature",
          "Use social media to showcase the making process"
        ]
      };
    }
    
    setGeneratedContent(mockContent);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI Sales
            <span className="text-heritage block">Co-Pilot</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your craft, and let AI help you create compelling descriptions, 
            translations, and marketing strategies that actually sell.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Your Craft
              </CardTitle>
              <CardDescription>
                Upload an image of your product to get started with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image-upload">Product Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded product" 
                        className="w-full h-48 object-cover rounded-lg mx-auto"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => setUploadedImage(null)}
                        className="w-full"
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div>
                        <Label htmlFor="image-upload" className="cursor-pointer">
                          <Button variant="outline" asChild>
                            <span>Choose Image</span>
                          </Button>
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    placeholder="e.g., Handwoven Kanjivaram Silk Saree"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-description">Basic Description (Optional)</Label>
                  <Textarea
                    id="product-description"
                    placeholder="Tell us about your craft, materials used, techniques..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <Button 
                onClick={generateAIContent}
                disabled={!uploadedImage || isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    AI is working...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* AI Generated Content */}
          <div className="space-y-6">
            {generatedContent ? (
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="translations">Translations</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="marketing">Marketing</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        AI-Generated Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {generatedContent.description}
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(generatedContent.description, 'description')}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copiedText === 'description' ? 'Copied!' : 'Copy'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => exportContent(generatedContent.description, `${productName || 'product'}-description.txt`)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="translations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Multi-Language Translations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(generatedContent.translations).map(([lang, text]) => (
                        <div key={lang} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="font-medium capitalize">{lang}</Label>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => copyToClipboard(text as string, `translation-${lang}`)}
                            >
                              <Copy className="w-4 h-4" />
                              {copiedText === `translation-${lang}` ? 'Copied!' : 'Copy'}
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                            {text as string}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Market Intelligence
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Demand Level</Label>
                          <Badge variant={generatedContent.marketInsights.demand === "High" ? "default" : "secondary"}>
                            {generatedContent.marketInsights.demand}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Price Range</Label>
                          <p className="text-sm text-muted-foreground">
                            {generatedContent.marketInsights.priceRange}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Trending Keywords</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {generatedContent.marketInsights.trendingKeywords.map((keyword: string) => (
                            <Badge key={keyword} variant="outline">{keyword}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Target Audience</Label>
                        <p className="text-sm text-muted-foreground">
                          {generatedContent.marketInsights.targetAudience}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="marketing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Marketing Strategy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {generatedContent.marketingTips.map((tip: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-heritage mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Ready to Get Started?</h3>
                  <p className="text-muted-foreground">
                    Upload your craft image and basic details to generate AI-powered content that helps you sell better.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;
