import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { LogIn, User } from "lucide-react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "artisan-spotlight", label: "Artisan Dashboard" },
  { id: "ai-insights", label: "AI Descriptions" },
  { id: "provenance-trust", label: "Heritage Stories" },
  { id: "moodboard", label: "Visual Creator" },
  { id: "market-insights", label: "Market Intelligence" },
  { id: "storytelling", label: "Storytelling AI" },
  { id: "marketing-kit", label: "Marketing Tools" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const SectionNav: React.FC = () => {
  const [active, setActive] = useState<string>("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const opts = { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, opts);

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current!.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <nav aria-label="Sections" className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-4">
        {/* Main Navigation */}
        <div className="flex gap-2 bg-white/30 backdrop-blur-md rounded-full p-1 shadow-lg glass">
          {sections.map((s) => (
            <Button
              key={s.id}
              variant={active === s.id ? "primary" : "ghost"}
              size="sm"
              onClick={() => {
                // If on root, scroll to the section. Otherwise navigate to the page.
                if (location.pathname === "/") {
                  scrollTo(s.id);
                } else {
                  // route mapping
                  const routeMap: Record<string, string> = {
                    "hero": "/",
                    "artisan-spotlight": "/artisan-spotlight",
                    "ai-insights": "/ai-insights",
                    "provenance-trust": "/provenance-trust",
                    "moodboard": "/moodboard",
                    "market-insights": "/market-insights",
                    "storytelling": "/storytelling",
                    "marketing-kit": "/marketing-kit",
                  };
                  const to = routeMap[s.id] ?? "/";
                  navigate(to);
                }
              }}
              aria-current={active === s.id ? "true" : undefined}
              className="px-3 py-1 text-sm"
            >
              {s.label}
            </Button>
          ))}
        </div>
        
        {/* Auth Buttons - Separate Container */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/login")}
            className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
          <Button
            variant="heritage"
            size="sm"
            onClick={() => navigate("/signup")}
          >
            <User className="w-4 h-4 mr-2" />
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default SectionNav;
