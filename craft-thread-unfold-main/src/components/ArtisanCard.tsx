import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, Star } from "lucide-react";

interface ArtisanCardProps {
  name: string;
  image: string;
  craft: string;
  location: string;
  rating: number;
  verified: boolean;
  speciality: string;
}

const ArtisanCard = ({ 
  name, 
  image, 
  craft, 
  location, 
  rating, 
  verified, 
  speciality 
}: ArtisanCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {verified && (
          <div className="absolute top-4 right-4 glass rounded-full p-2">
            <CheckCircle className="w-5 h-5 text-trust" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
              {name}
            </h3>
            <p className="text-muted-foreground font-medium">{craft}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-heritage text-heritage" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{location}</span>
        </div>

        <Badge variant="secondary" className="mb-4">
          {speciality}
        </Badge>

        <Button variant="craft" className="w-full group-hover:shadow-lg">
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArtisanCard;