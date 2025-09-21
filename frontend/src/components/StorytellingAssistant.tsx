import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Share2, Sparkles, BookOpen, Heart, Download, RefreshCw, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type StoryItem = {
  id: number;
  product: string;
  story: string;
  heritage?: string;
  technique?: string;
  tags?: string[];
};

const mockStories: StoryItem[] = [
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

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8009";

const StorytellingAssistant = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStories, setGeneratedStories] = useState<StoryItem[]>(mockStories);
  const [savedStories, setSavedStories] = useState<number[]>([]);
  const [errors, setErrors] = useState<{ product?: string; materials?: string }>({});
  const [form, setForm] = useState({
    product: "Banarasi Silk Saree",
    craft_type: "Silk Saree",
    region: "Varanasi, India",
    materials: "Silk, Gold Zari",
    technique: "Traditional Handloom",
    tone: "heritage",
    length: "medium",
    language: "en",
  });

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
    try {
      setIsGenerating(true);

      // Minimal validation
      const newErrors: { product?: string; materials?: string } = {};
      if (!form.product.trim()) {
        newErrors.product = "Product is required";
      }
      if (form.materials && form.materials.length > 200) {
        newErrors.materials = "Materials list is too long";
      }
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        toast.error("Please fix the highlighted fields.");
        return;
      }

      const payload = {
        product: form.product.trim(),
        craft_type: form.craft_type.trim(),
        region: form.region.trim(),
        materials: form.materials
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        technique: form.technique.trim(),
        tone: form.tone,
        length: form.length,
        language: form.language,
      };

      const res = await fetch(`${API_BASE}/storytelling/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`API error ${res.status}`);
      }
      const data = await res.json();

      const newStory: StoryItem = {
        id: Date.now(),
        product: data.product || payload.product,
        story: data.story,
        heritage: data.heritage || payload.region,
        technique: data.technique || payload.technique,
        tags: data.tags || payload.materials
      };

      setGeneratedStories(prev => [newStory, ...prev]);
      toast.success("New story generated!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to generate story. Showing local fallback.");
      // Local fallback mirrors backend fallback behavior
      const fallback: StoryItem = {
        id: Date.now(),
        product: form.product,
        story:
          `This handcrafted piece from ${form.region} is shaped with ${form.materials} using ${form.technique}. Every detail in ${form.product} reflects generations of learned skill and quiet dedication—a living connection between maker and wearer, tradition and today.`,
        heritage: form.region,
        technique: form.technique,
        tags: [form.craft_type, form.region, form.technique].filter(Boolean)
      };
      setGeneratedStories(prev => [fallback, ...prev]);
    } finally {
      setIsGenerating(false);
    }
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

        <div className="mb-10 max-w-5xl mx-auto">
          <Card className="glass border-heritage/20">
            <CardHeader>
              <CardTitle className="text-heritage">Provide Craft Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Input id="product" placeholder="e.g., Banarasi Silk Saree" value={form.product} onChange={(e) => { setForm({ ...form, product: e.target.value }); if (errors.product) setErrors({ ...errors, product: undefined }); }} className={errors.product ? "border-red-500" : ""} />
                  {errors.product && (
                    <p className="text-xs text-red-500">{errors.product}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="craft_type">Craft Type</Label>
                  <Input id="craft_type" placeholder="e.g., Silk Saree" value={form.craft_type} onChange={(e) => setForm({ ...form, craft_type: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Region / Origin</Label>
                  <Input id="region" placeholder="e.g., Varanasi, India" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="materials">Materials (comma-separated)</Label>
                  <Input id="materials" placeholder="e.g., Silk, Gold Zari" value={form.materials} onChange={(e) => { setForm({ ...form, materials: e.target.value }); if (errors.materials) setErrors({ ...errors, materials: undefined }); }} className={errors.materials ? "border-red-500" : ""} />
                  {errors.materials && (
                    <p className="text-xs text-red-500">{errors.materials}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technique">Technique</Label>
                  <Input id="technique" placeholder="e.g., Traditional Handloom" value={form.technique} onChange={(e) => setForm({ ...form, technique: e.target.value })} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <select id="tone" className="w-full border rounded-md h-10 px-3 bg-background" value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })}>
                      <option value="heritage">Heritage</option>
                      <option value="luxury">Luxury</option>
                      <option value="minimal">Minimal</option>
                      <option value="playful">Playful</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="length">Length</Label>
                    <select id="length" className="w-full border rounded-md h-10 px-3 bg-background" value={form.length} onChange={(e) => setForm({ ...form, length: e.target.value })}>
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="long">Long</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select id="language" className="w-full border rounded-md h-10 px-3 bg-background" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="bn">Bengali</option>
                      <option value="ta">Tamil</option>
                      <option value="te">Telugu</option>
                      <option value="mr">Marathi</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="heritage"
                  size="lg"
                  className="shimmer"
                  onClick={generateNewStory}
                  disabled={isGenerating || !form.product.trim()}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating Story...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Story
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
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
