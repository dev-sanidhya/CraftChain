import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QrCode, Shield, CheckCircle, MapPin, DollarSign, Leaf } from "lucide-react";

const ProvenanceTrust = () => {
  const [isScanning, setIsScanning] = useState(false);

  const mockProvenanceData = {
    productId: "CC-TX-001",
    name: "Handwoven Banarasi Silk Saree",
    artisan: "Priya Sharma",
    location: "Varanasi, Uttar Pradesh",
    materials: "100% Pure Silk, Natural Dyes",
    craftTime: "45 Days",
    artisanPayout: "75%",
    carbonFootprint: "Low",
    certifications: ["Fair Trade", "Organic Materials", "Blockchain Verified"],
    blockchainHash: "0x1a2b3c4d5e6f...",
    esGScore: 92
  };

  const handleScanDemo = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transparency Through
            <span className="text-trust block">Blockchain Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every craft comes with complete provenance tracking, ensuring 
            authenticity and fair compensation for artisans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* QR Scan Demo */}
          <div className="text-center">
            <Card className="glass max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <QrCode className="w-6 h-6 text-trust" />
                  Scan for Provenance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-trust/20 to-heritage/20 rounded-xl flex items-center justify-center">
                  {isScanning ? (
                    <div className="animate-pulse">
                      <div className="w-32 h-32 border-4 border-trust border-dashed rounded-lg animate-spin" />
                    </div>
                  ) : (
                    <QrCode className="w-32 h-32 text-trust/60" />
                  )}
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="trust" 
                      size="lg" 
                      className="w-full"
                      onClick={handleScanDemo}
                    >
                      {isScanning ? "Scanning..." : "Try QR Demo"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-trust" />
                        Product Provenance Report
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Product Info */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">{mockProvenanceData.name}</CardTitle>
                          <p className="text-muted-foreground">ID: {mockProvenanceData.productId}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{mockProvenanceData.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-success" />
                              <span className="text-sm">Artisan Payout: {mockProvenanceData.artisanPayout}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {mockProvenanceData.certifications.map((cert, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* ESG Score */}
                      <Card className="bg-gradient-to-r from-success/10 to-heritage/10">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Leaf className="w-5 h-5 text-success" />
                            ESG Impact Score
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4">
                            <div className="text-4xl font-heading font-bold text-success">
                              {mockProvenanceData.esGScore}
                            </div>
                            <div className="flex-1">
                              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-success to-heritage rounded-full transition-all duration-1000"
                                  style={{ width: `${mockProvenanceData.esGScore}%` }}
                                />
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">
                                Excellent sustainability and fair trade practices
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Blockchain Verification */}
                      <Card className="border-trust/20">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <Shield className="w-8 h-8 text-trust" />
                            <div>
                              <h4 className="font-semibold">Blockchain Verified</h4>
                              <p className="text-xs text-muted-foreground font-mono">
                                {mockProvenanceData.blockchainHash}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Trust Features */}
          <div className="space-y-6">
            <Card className="border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-success" />
                  Authenticity Guaranteed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every product is verified through immutable blockchain records, 
                  ensuring 100% authenticity and traceability from artisan to buyer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-heritage/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-heritage" />
                  Fair Trade Certified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Transparent payment tracking ensures artisans receive fair 
                  compensation for their craftsmanship, with up to 75% revenue share.
                </p>
              </CardContent>
            </Card>

            <Card className="border-trust/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-success" />
                  Sustainable Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track environmental and social impact with comprehensive ESG 
                  scoring, supporting sustainable craft practices worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvenanceTrust;