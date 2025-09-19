import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Sparkles, RefreshCw, Heart, Download, Share2, CheckCircle } from "lucide-react";

const MoodboardGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentMood, setCurrentMood] = useState("Boho Chic");
  const [savedMoodboards, setSavedMoodboards] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const moodboards = {
    "Boho Chic": {
      colors: ["#A0522D", "#C59D5F", "#F5E6D3", "#C1D1C2"],
      patterns: ["Mandala", "Paisley", "Geometric", "Floral"],
      textures: ["Woven", "Embroidered", "Block Print", "Tie-Dye"],
      description: "Free-spirited designs with earthy tones and intricate patterns"
    },
    "Pastel Revival": {
      colors: ["#E8D5E8", "#B8E6B8", "#FFE4B5", "#E0E6FF"],
      patterns: ["Minimalist", "Watercolor", "Abstract", "Dotted"],
      textures: ["Smooth Silk", "Cotton Blend", "Linen", "Chiffon"],
      description: "Soft, dreamy aesthetics with gentle colors and flowing textures"
    },
    "Vintage Heritage": {
      colors: ["#8B4513", "#2F4F4F", "#DAA520", "#CD853F"],
      patterns: ["Traditional", "Intricate", "Royal", "Classic"],
      textures: ["Brocade", "Heavy Silk", "Velvet", "Tapestry"],
      description: "Rich, traditional designs celebrating India's royal heritage"
    }
  };

  const moods = Object.keys(moodboards);

  const generateMoodboard = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setCurrentMood(randomMood);
      setIsGenerating(false);
    }, 1500);
  };

  const saveMoodboard = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSavedMoodboards(prev => [...prev, currentMood]);
    setIsSaving(false);
    alert(`"${currentMood}" moodboard saved successfully!`);
  };

  const downloadMoodboard = async () => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const moodboardData = {
      name: currentMood,
      colors: currentBoard.colors,
      patterns: currentBoard.patterns,
      textures: currentBoard.textures,
      description: currentBoard.description,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(moodboardData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentMood.toLowerCase().replace(/\s+/g, '-')}-moodboard.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsDownloading(false);
  };

  const shareMoodboard = () => {
    const shareText = `Check out this ${currentMood} moodboard I created with AI! Colors: ${currentBoard.colors.join(', ')}`;
    if (navigator.share) {
      navigator.share({
        title: `${currentMood} Moodboard`,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Moodboard details copied to clipboard!");
    }
  };

  const currentBoard = moodboards[currentMood];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI Moodboard
            <span className="text-primary block">Generator</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover trending aesthetics and color palettes powered by AI insights 
            from global fashion markets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Moodboard Display */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-6 h-6 text-primary" />
                  <CardTitle className="text-xl">{currentMood}</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={generateMoodboard}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'Generating...' : 'Regenerate'}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{currentBoard.description}</p>
                
                {/* Color Palette */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Color Palette
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {currentBoard.colors.map((color, index) => (
                      <div key={index} className="space-y-2">
                        <div 
                          className="w-full h-20 rounded-lg shadow-md"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-xs text-center text-muted-foreground font-mono">
                          {color}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Patterns & Textures Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-heritage rounded-full" />
                      Patterns
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {currentBoard.patterns.map((pattern, index) => (
                        <Badge key={index} variant="secondary" className="justify-center py-2">
                          {pattern}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      Textures
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {currentBoard.textures.map((texture, index) => (
                        <Badge key={index} variant="outline" className="justify-center py-2">
                          {texture}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-heritage" />
                  Trending Styles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {moods.map((mood) => (
                  <Button
                    key={mood}
                    variant={mood === currentMood ? "heritage" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setCurrentMood(mood)}
                  >
                    {mood}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-heritage/5">
              <CardHeader>
                <CardTitle className="text-lg">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">High Demand</p>
                    <p className="text-xs text-muted-foreground">
                      {currentMood} style shows 60% growth in US markets
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-heritage rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Perfect Season</p>
                    <p className="text-xs text-muted-foreground">
                      Ideal for upcoming Winter 2025 collections
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-trust rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Price Range</p>
                    <p className="text-xs text-muted-foreground">
                      Optimal pricing: $80-$150 for this aesthetic
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                variant="craft" 
                className="w-full" 
                size="lg"
                onClick={saveMoodboard}
                disabled={isSaving || savedMoodboards.includes(currentMood)}
              >
                {savedMoodboards.includes(currentMood) ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Saved!
                  </>
                ) : isSaving ? (
                  <>
                    <Heart className="w-4 h-4 mr-2 animate-pulse" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Save Moodboard
                  </>
                )}
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={downloadMoodboard}
                  disabled={isDownloading}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isDownloading ? 'Downloading...' : 'Download'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={shareMoodboard}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodboardGenerator;