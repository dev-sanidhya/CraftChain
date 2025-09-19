import ArtisanCard from "./ArtisanCard";
import artisan1 from "@/assets/artisan-1.jpg";
import artisan2 from "@/assets/artisan-2.jpg";

const ArtisanSpotlight = () => {
  const artisans = [
    {
      name: "Priya Sharma",
      image: artisan1,
      craft: "Handloom Weaving",
      location: "Varanasi, UP",
      rating: 4.9,
      verified: true,
      speciality: "Banarasi Silk Sarees"
    },
    {
      name: "Rajesh Kumar",
      image: artisan2,
      craft: "Pottery & Ceramics",
      location: "Khurja, UP",
      rating: 4.8,
      verified: true,
      speciality: "Blue Pottery"
    },
    {
      name: "Meera Devi",
      image: artisan1,
      craft: "Block Printing",
      location: "Jaipur, RJ",
      rating: 4.9,
      verified: true,
      speciality: "Bagru Prints"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our Master
            <span className="text-primary block">Artisans</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the talented craftspeople behind every authentic piece, 
            verified through blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan, index) => (
            <ArtisanCard key={index} {...artisan} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="font-heading text-lg text-primary hover:text-heritage transition-colors underline underline-offset-4">
            View All Artisans →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtisanSpotlight;