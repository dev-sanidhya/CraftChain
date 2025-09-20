import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Sparkles, BookOpen, Heart, Download, RefreshCw, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const mockStories = [
  {
    id: 1,
    product: "Banarasi Silk Saree",
    story: "This exquisite Banarasi silk saree traces its golden threads to the ancient looms of Varanasi, where master weavers have perfected their craft for over 500 years. Each intricate motif tells a story of devotion, woven with the same techniques passed down through generations of artisan families. The paisley patterns dance across the silk like prayers offered to the sacred Ganges, carrying with them the blessings of tradition and the promise of timeless beauty.",
    heritage: "Varanasi, 16th Century",
    technique: "Traditional Handloom",
    tags: ["Heritage", "Silk", "Wedding", "Traditional"]
  },
  {
    id: 2,
    product: "Kashmiri Pashmina Shawl",
    story: "High in the mystical valleys of Kashmir, where the Himalayan winds whisper ancient secrets, the finest pashmina is born from the soft undercoat of Changthangi goats. This shawl embodies the soul of Kashmir - each delicate thread spun by hands that have known these mountains for centuries. The intricate embroidery patterns, inspired by the eternal spring of Kashmiri gardens, transform this shawl into a wearable poem of love and resilience.",
    heritage: "Kashmir Valley, 15th Century",
    technique: "Hand-spun & Embroidered",
    tags: ["Luxury", "Pashmina", "Kashmir", "Handspun"]
  },
  {
    id: 3,
    product: "Blue Pottery Vase",
    story: "In the royal city of Jaipur, where pink sandstone palaces touch the sky, this blue pottery vase emerges from the ancient craft brought by Persian artisans centuries ago. Each piece is shaped without a potter's wheel, fired at low temperatures, and painted with cobalt blue that mirrors the endless Rajasthani sky. This vase carries within its curves the stories of desert winds, royal patronage, and the unwavering spirit of Rajasthani craftspeople.",
    heritage: "Jaipur, 18th Century",
    technique: "Wheel-less Pottery",
    tags: ["Pottery", "Royal", "Jaipur", "Persian"]
  }
];

const StorytellingAssistant = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStories, setGeneratedStories] = useState(mockStories);
  const [savedStories, setSavedStories] = useState<number[]>([]);

  const copyStory = (story: string) => {
    navigator.clipboard.writeText(story);
    toast.success("Story copied to clipboard!");
  };

  const shareStory = (story: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Craft Heritage Story',
        text: story,
      });
    } else {
      copyStory(story);
    }
  };

  const downloadStory = (story: any) => {
    const storyData = {
      product: story.product,
      story: story.story,
      heritage: story.heritage,
      technique: story.technique,
      tags: story.tags,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(storyData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${story.product.toLowerCase().replace(/\s+/g, '-')}-story.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Story downloaded!");
  };

  const saveStory = (storyId: number) => {
    setSavedStories(prev => [...prev, storyId]);
    toast.success("Story saved to favorites!");
  };

  const generateNewStory = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newStory = {
      id: Date.now(),
      product: "AI Generated Craft Story",
      story: "This remarkable piece embodies the perfect fusion of traditional craftsmanship and modern innovation. Each element tells a story of cultural heritage passed down through generations, while embracing contemporary design sensibilities. The intricate details speak of countless hours of dedicated work by skilled artisans who have mastered their craft over decades. This creation represents not just a product, but a living testament to the enduring spirit of handmade excellence.",
      heritage: "AI Generated, 2024",
      technique: "AI-Enhanced Traditional",
      tags: ["AI Generated", "Heritage", "Modern", "Unique"]
    };
    
    setGeneratedStories(prev => [newStory, ...prev]);
    setIsGenerating(false);
    toast.success("New story generated!");
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-secondary/5 via-heritage/5 to-secondary/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            AI Storytelling Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your crafts into compelling stories that connect with customers' hearts and showcase your heritage
          </p>
        </div>

        <div className="mb-8 text-center">
          <Button 
            variant="heritage" 
            size="lg" 
            className="shimmer"
            onClick={generateNewStory}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating Story...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate New Story
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {generatedStories.map((item) => (
            <Card key={item.id} className="glass border-heritage/20 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-heritage font-heading">
                  <BookOpen className="w-5 h-5" />
                  {item.product}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Heritage Info */}
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-heritage/10 rounded">
                    <span className="font-medium text-heritage">Heritage:</span>
                    <span className="text-muted-foreground">{item.heritage}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-primary/10 rounded">
                    <span className="font-medium text-primary">Technique:</span>
                    <span className="text-muted-foreground">{item.technique}</span>
                  </div>
                </div>

                {/* Story Text */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-card via-card/95 to-heritage/5 p-4 rounded-lg border border-heritage/10">
                    <p className="text-sm leading-relaxed text-foreground/90 font-body">
                      {item.story}
                    </p>
                  </div>
                  <Heart className="absolute -top-2 -right-2 w-6 h-6 text-heritage/30 transform rotate-12" />
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyStory(item.story)}
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="trust"
                      size="sm"
                      onClick={() => shareStory(item.story)}
                      className="flex-1"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadStory(item)}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant={savedStories.includes(item.id) ? "heritage" : "outline"}
                      size="sm"
                      onClick={() => saveStory(item.id)}
                      className="flex-1"
                    >
                      {savedStories.includes(item.id) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Generation Tips */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="glass border-success/20">
            <CardHeader>
              <CardTitle className="text-center text-success">
                ✨ How AI Creates Your Stories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="bg-heritage/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-heritage" />
                  </div>
                  <h4 className="font-semibold mb-2">Heritage Research</h4>
                  <p className="text-sm text-muted-foreground">
                    AI analyzes your craft's historical origins and cultural significance
                  </p>
                </div>
                <div>
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Emotional Connection</h4>
                  <p className="text-sm text-muted-foreground">
                    Creates compelling narratives that resonate with customers
                  </p>
                </div>
                <div>
                  <div className="bg-trust/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Share2 className="w-6 h-6 text-trust" />
                  </div>
                  <h4 className="font-semibold mb-2">Ready to Share</h4>
                  <p className="text-sm text-muted-foreground">
                    Optimized for product listings, social media, and marketing
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

export default StorytellingAssistant;