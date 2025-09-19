import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArtisanSpotlightPage from "./pages/ArtisanSpotlightPage";
import AIInsightsPage from "./pages/AIInsightsPage";
import ProvenanceTrustPage from "./pages/ProvenanceTrustPage";
import MoodboardPage from "./pages/MoodboardPage";
import MarketInsightsPage from "./pages/MarketInsightsPage";
import StorytellingPage from "./pages/StorytellingPage";
import MarketingKitPage from "./pages/MarketingKitPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SectionNav from "./components/SectionNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SectionNav />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artisan-spotlight" element={<ArtisanSpotlightPage />} />
          <Route path="/ai-insights" element={<AIInsightsPage />} />
          <Route path="/provenance-trust" element={<ProvenanceTrustPage />} />
          <Route path="/moodboard" element={<MoodboardPage />} />
          <Route path="/market-insights" element={<MarketInsightsPage />} />
          <Route path="/storytelling" element={<StorytellingPage />} />
          <Route path="/marketing-kit" element={<MarketingKitPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
