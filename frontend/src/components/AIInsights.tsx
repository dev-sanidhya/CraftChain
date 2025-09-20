import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Brain, BarChart3, Globe, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import craftsShowcase from "@/assets/crafts-showcase.jpg";

const AIInsights = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleTryAI = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGenerated(true);
    setIsGenerating(false);
  };

  const handleViewReport = () => {
    // Simulate opening a detailed report
    alert("Opening detailed AI description report...\n\nThis would show:\n- Detailed quality metrics\n- A/B testing results\n- Performance analytics\n- Optimization suggestions");
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI-Powered
            <span className="text-trust block">Product Descriptions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your craft into compelling stories that sell. AI generates descriptions, 
            translations, and marketing copy that connects with buyers emotionally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Panel - Charts & Data */}
          <div className="space-y-6">
            <Card className="glass">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-success" />
                  <CardTitle className="text-lg">AI Description Quality</CardTitle>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  Live
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Emotional Appeal</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-success rounded-full" />
                      </div>
                      <span className="text-sm font-medium text-success">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">SEO Optimization</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-heritage rounded-full" />
                      </div>
                      <span className="text-sm font-medium text-heritage">87%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cultural Accuracy</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-5/6 h-full bg-primary rounded-full" />
                      </div>
                      <span className="text-sm font-medium text-primary">95%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-trust" />
                  <CardTitle className="text-lg">Multi-Language Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-success/10 to-heritage/10 rounded-lg">
                    <div className="text-2xl font-heading font-bold text-success">15+</div>
                    <div className="text-sm text-muted-foreground">Languages</div>
                    <div className="text-xs text-success font-medium">Supported</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-trust/10 rounded-lg">
                    <div className="text-2xl font-heading font-bold text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                    <div className="text-xs text-primary font-medium">Cultural Context</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Visual Insights */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="relative">
                <img 
                  src={craftsShowcase} 
                  alt="Craft showcase"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass rounded-lg p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-heritage" />
                      <span className="font-heading font-semibold">AI Insight</span>
                    </div>
                    <p className="text-sm mb-3">
                      "AI generated description increased engagement by 40%. 
                      Emotional storytelling drives higher conversion rates."
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                      onClick={handleViewReport}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      View Full Report
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-trust/5 to-heritage/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-trust" />
                  AI Description Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Smart Descriptions</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Multi-Language</span>
                  <Badge variant="default">15+ Languages</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cultural Context</span>
                  <Badge variant="default">95% Accurate</Badge>
                </div>
                <Button 
                  variant="trust" 
                  className="w-full mt-4"
                  onClick={handleTryAI}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : generated ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Generated Successfully!
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Try AI Descriptions
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInsights;