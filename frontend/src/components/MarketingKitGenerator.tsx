import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Share2, Instagram, Facebook, MessageCircle, Palette, Sparkles, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const mockCaptions = {
  english: {
    main: "✨ Handwoven with love in the heart of Rajasthan ✨\n\nThis exquisite blue pottery vase carries 300 years of royal craftsmanship. Each brush stroke tells a story of desert winds and palace gardens. 🏺💙\n\nBringing centuries-old tradition to your modern home. \n\n#HandmadeCrafts #BluePottery #RajasthaniArt #FairTrade #CraftChainX",
    hashtags: "#HandmadeCrafts #BluePottery #RajasthaniArt #IndianCrafts #FairTrade #SustainableArt #TraditionalCrafts #HomeDecor #UniqueGifts #CraftChainX #ArtisanMade #CulturalHeritage #HandcraftedWithLove #SupportArtisans #AuthenticCrafts",
    short: "300 years of royal craftsmanship in every piece 🏺✨ #BluePottery #HandmadeCrafts"
  },
  hindi: {
    main: "राजस्थान के दिल से प्रेम के साथ बुना गया ✨\n\nयह अनुपम नीली मिट्टी का फूलदान 300 साल की शाही कारीगरी को संजोए है। हर ब्रश स्ट्रोक रेगिस्तानी हवाओं और महलों के बगीचों की कहानी कहता है। 🏺💙\n\n#हस्तनिर्मित #नीलीमिट्टी #राजस्थानीकला #निष्पक्षव्यापार",
    hashtags: "#हस्तनिर्मित #नीलीमिट्टी #राजस्थानीकला #भारतीयशिल्प #निष्पक्षव्यापार #पारंपरिकशिल्प #घरकीसजावट #अनोखेउपहार #कारीगरीसेबना",
    short: "हर टुकड़े में 300 साल की शाही कारीगरी 🏺✨ #नीलीमिट्टी #हस्तनिर्मित"
  }
};

const posterTemplates = [
  {
    id: 1,
    name: "Festival Special",
    theme: "Diwali Collection",
    colors: ["#C59D5F", "#2C2A5A", "#F5E6D3"],
    mockPreview: "🪔 DIWALI SPECIAL 🪔\nHandcrafted Blue Pottery\n25% OFF Limited Time"
  },
  {
    id: 2,
    name: "Heritage Pride",
    theme: "Royal Collection",
    colors: ["#A0522D", "#C59D5F", "#2C2A5A"],
    mockPreview: "ROYAL HERITAGE\nAuthentic Rajasthani Craft\nDirect from Artisan"
  },
  {
    id: 3,
    name: "Modern Minimalist",
    theme: "Contemporary Style",
    colors: ["#C1D1C2", "#F5E6D3", "#2C2A5A"],
    mockPreview: "HANDMADE\nMODERN LIVING\nTimeless Craft"
  }
];

const MarketingKitGenerator = () => {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const shareToSocial = (platform: string, content: string) => {
    toast.success(`Opening ${platform} with your content...`);
    // In real implementation, this would open the respective social media apps
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background via-trust/5 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            AI Marketing Kit Generator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional social media content, captions, and posters for your crafts in seconds
          </p>
        </div>

        {/* Product Selection Mock */}
        <div className="mb-8 text-center">
          <Card className="max-w-md mx-auto glass border-heritage/20">
            <CardContent className="p-6">
              <div className="w-32 h-32 bg-gradient-to-br from-heritage/20 to-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-heritage" />
              </div>
              <h3 className="font-heading font-semibold mb-2">Blue Pottery Vase</h3>
              <p className="text-sm text-muted-foreground mb-4">Rajasthani Royal Collection</p>
              <Button variant="craft" size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Marketing Kit
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Social Media Captions */}
          <Card className="lg:col-span-2 glass border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <MessageCircle className="w-5 h-5" />
                Social Media Captions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="english" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="hindi">हिंदी</TabsTrigger>
                </TabsList>
                
                <TabsContent value="english" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-card rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">Main Post</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(mockCaptions.english.main, "Caption")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm whitespace-pre-line">{mockCaptions.english.main}</p>
                    </div>
                    
                    <div className="p-4 bg-card rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">Hashtags</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(mockCaptions.english.hashtags, "Hashtags")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{mockCaptions.english.hashtags}</p>
                    </div>
                    
                    <div className="p-4 bg-card rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">Story/Short Post</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(mockCaptions.english.short, "Short caption")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm">{mockCaptions.english.short}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="hindi" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-card rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">मुख्य पोस्ट</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(mockCaptions.hindi.main, "Caption")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm whitespace-pre-line">{mockCaptions.hindi.main}</p>
                    </div>
                    
                    <div className="p-4 bg-card rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">हैशटैग</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(mockCaptions.hindi.hashtags, "Hashtags")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{mockCaptions.hindi.hashtags}</p>
                    </div>
                    
                    <div className="p-4 bg-card rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">छोटी पोस्ट</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(mockCaptions.hindi.short, "Short caption")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm">{mockCaptions.hindi.short}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Quick Share Buttons */}
              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareToSocial("WhatsApp", mockCaptions.english.main)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareToSocial("Instagram", mockCaptions.english.main)}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareToSocial("Facebook", mockCaptions.english.main)}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Poster Templates */}
          <Card className="glass border-heritage/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-heritage">
                <Palette className="w-5 h-5" />
                Poster Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {posterTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm">{template.name}</h4>
                      <p className="text-xs text-muted-foreground">{template.theme}</p>
                    </div>
                    <div className="flex gap-1">
                      {template.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Mock Poster Preview */}
                  <div 
                    className="aspect-square bg-gradient-to-br rounded-lg p-4 flex items-center justify-center text-center text-white text-xs font-semibold leading-tight"
                    style={{ 
                      background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})` 
                    }}
                  >
                    {template.mockPreview.split('\n').map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button variant="trust" size="sm" className="flex-1">
                      <Share2 className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="heritage" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate More Templates
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="glass border-success/20">
            <CardHeader>
              <CardTitle className="text-center text-success">
                🚀 Marketing Kit Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="bg-heritage/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-heritage" />
                  </div>
                  <h4 className="font-semibold mb-2">Multi-language</h4>
                  <p className="text-sm text-muted-foreground">
                    Captions in English, Hindi, and regional languages
                  </p>
                </div>
                <div>
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Custom Designs</h4>
                  <p className="text-sm text-muted-foreground">
                    Posters matching your craft's heritage and style
                  </p>
                </div>
                <div>
                  <div className="bg-trust/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Share2 className="w-6 h-6 text-trust" />
                  </div>
                  <h4 className="font-semibold mb-2">One-Click Sharing</h4>
                  <p className="text-sm text-muted-foreground">
                    Direct sharing to WhatsApp, Instagram, Facebook
                  </p>
                </div>
                <div>
                  <div className="bg-success/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-success" />
                  </div>
                  <h4 className="font-semibold mb-2">AI-Optimized</h4>
                  <p className="text-sm text-muted-foreground">
                    SEO-friendly content that drives engagement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketingKitGenerator;