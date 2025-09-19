import Hero from "@/components/Hero";
import ArtisanSpotlight from "@/components/ArtisanSpotlight";
import AIInsights from "@/components/AIInsights";
import ProvenanceTrust from "@/components/ProvenanceTrust";
import MoodboardGenerator from "@/components/MoodboardGenerator";
import MarketInsightsDashboard from "@/components/MarketInsightsDashboard";
import StorytellingAssistant from "@/components/StorytellingAssistant";
import MarketingKitGenerator from "@/components/MarketingKitGenerator";

const Index = () => {
  return (
    <div className="min-h-screen">
      <section id="hero">
        <Hero />
      </section>

      <section id="artisan-spotlight">
        <ArtisanSpotlight />
      </section>

      <section id="ai-insights">
        <AIInsights />
      </section>

      <section id="provenance-trust">
        <ProvenanceTrust />
      </section>

      <section id="moodboard">
        <MoodboardGenerator />
      </section>

      <section id="market-insights">
        <MarketInsightsDashboard />
      </section>

      <section id="storytelling">
        <StorytellingAssistant />
      </section>

      <section id="marketing-kit">
        <MarketingKitGenerator />
      </section>
    </div>
  );
};

export default Index;