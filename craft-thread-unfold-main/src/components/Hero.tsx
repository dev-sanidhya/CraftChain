import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 gradient-heritage opacity-80" />
      <div className="absolute inset-0 fabric-texture" />
      

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="float">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your AI Sales
            <span className="block text-heritage drop-shadow-lg">
              Co-Pilot
            </span>
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform your craft into compelling stories that sell. AI-powered assistance for 
          descriptions, translations, market insights, and customer connections.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="glass rounded-full px-6 py-3 flex items-center gap-2 text-white/90">
            <Sparkles className="w-5 h-5 text-heritage" />
            <span className="font-medium">Smart Descriptions</span>
          </div>
          <div className="glass rounded-full px-6 py-3 flex items-center gap-2 text-white/90">
            <Shield className="w-5 h-5 text-trust" />
            <span className="font-medium">Market Insights</span>
          </div>
          <div className="glass rounded-full px-6 py-3 flex items-center gap-2 text-white/90">
            <Zap className="w-5 h-5 text-success" />
            <span className="font-medium">Multi-Language Support</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="heritage" 
            size="xl" 
            className="shadow-2xl"
            onClick={() => navigate('/signup')}
          >
            Start Selling Better
          </Button>
          <Button 
            variant="trust" 
            size="xl" 
            className="shadow-2xl"
            onClick={() => navigate('/ai-insights')}
          >
            See AI in Action
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-heading font-bold text-heritage mb-2">40%</div>
            <div className="text-white/80">Higher Sales</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-heading font-bold text-heritage mb-2">15+</div>
            <div className="text-white/80">Languages Supported</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-heading font-bold text-heritage mb-2">2.5x</div>
            <div className="text-white/80">Faster Listing</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 craft-pattern rounded-full opacity-30" />
      <div className="absolute bottom-20 right-10 w-32 h-32 craft-pattern rounded-full opacity-20" />
    </section>
  );
};

export default Hero;