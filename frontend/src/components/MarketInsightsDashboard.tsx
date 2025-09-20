import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, MapPin, ShoppingBag, Calendar, Download, RefreshCw, Target, AlertCircle } from "lucide-react";
import { useState } from "react";

const salesData = [
  { month: 'Jan', sarees: 45, shawls: 32, pottery: 18 },
  { month: 'Feb', sarees: 52, shawls: 28, pottery: 22 },
  { month: 'Mar', sarees: 48, shawls: 35, pottery: 25 },
  { month: 'Apr', sarees: 61, shawls: 42, pottery: 30 },
  { month: 'May', sarees: 55, shawls: 38, pottery: 28 },
  { month: 'Jun', sarees: 67, shawls: 45, pottery: 32 },
  { month: 'Jul', sarees: 59, shawls: 41, pottery: 29 },
  { month: 'Aug', sarees: 73, shawls: 48, pottery: 35 },
  { month: 'Sep', sarees: 68, shawls: 52, pottery: 38 },
  { month: 'Oct', sarees: 82, shawls: 58, pottery: 42 },
  { month: 'Nov', sarees: 95, shawls: 65, pottery: 48 },
  { month: 'Dec', sarees: 88, shawls: 61, pottery: 45 },
];

const regionData = [
  { region: 'Delhi NCR', sales: 2400 },
  { region: 'Mumbai', sales: 1800 },
  { region: 'Bangalore', sales: 1600 },
  { region: 'Kolkata', sales: 1400 },
  { region: 'Chennai', sales: 1200 },
  { region: 'International', sales: 800 },
];

const productPerformance = [
  { name: 'Silk Sarees', value: 35, color: 'hsl(var(--heritage-gold))' },
  { name: 'Cotton Shawls', value: 25, color: 'hsl(var(--primary))' },
  { name: 'Handmade Pottery', value: 20, color: 'hsl(var(--trust))' },
  { name: 'Embroidered Bags', value: 20, color: 'hsl(var(--secondary))' },
];

const MarketInsightsDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [insights, setInsights] = useState([
    { id: 1, type: "trending", title: "Pastel Shawls", description: "Expected 60% demand increase in Europe for Winter 2025", active: true },
    { id: 2, type: "seasonal", title: "Festival Collection", description: "Diwali collection showing early interest. Start promoting now!", active: true },
    { id: 3, type: "new-market", title: "Corporate Gifting", description: "Growing demand for handmade corporate gifts in tech companies", active: true }
  ]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
    alert("Market data refreshed! New insights available.");
  };

  const handleDownloadReport = () => {
    const reportData = {
      salesData,
      regionData,
      productPerformance,
      insights,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `market-insights-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOptimizeStrategy = () => {
    alert("AI Strategy Optimization:\n\n1. Increase inventory for Delhi NCR market\n2. Launch pastel shawl collection for European market\n3. Create corporate gifting catalog\n4. Prepare Diwali festival collection\n5. Partner with local wedding planners");
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Market Insights Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            AI-powered insights to help artisans understand market trends and optimize their craft business
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
            </Button>
            <Button 
              onClick={handleDownloadReport}
              variant="heritage"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button 
              onClick={handleOptimizeStrategy}
              variant="trust"
            >
              <Target className="w-4 h-4 mr-2" />
              Optimize Strategy
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Seasonal Trends Card */}
          <Card className="lg:col-span-2 glass border-heritage/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-heritage">
                <Calendar className="w-5 h-5" />
                Delhi Wedding Season Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sarees" 
                    stroke="hsl(var(--heritage-gold))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--heritage-gold))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-heritage/10 rounded-lg">
                <p className="text-heritage font-medium">
                  🎉 Your silk sarees see a 45% spike during Nov-Dec wedding season in Delhi! 
                  Consider increasing inventory and offering wedding collection bundles.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Product Performance */}
          <Card className="glass border-trust/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-trust">
                <ShoppingBag className="w-5 h-5" />
                Product Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={productPerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {productPerformance.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Badge variant="secondary">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regional Sales */}
          <Card className="lg:col-span-2 glass border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <MapPin className="w-5 h-5" />
                Regional Sales Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="region" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-primary font-medium">
                  🌍 Delhi NCR is your strongest market! Consider partnering with local wedding planners 
                  and boutiques for increased visibility.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="glass border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <TrendingUp className="w-5 h-5" />
                AI Trend Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <Badge className="mb-2" variant="secondary">Trending Up</Badge>
                <p className="text-sm font-medium">Pastel Shawls</p>
                <p className="text-xs text-muted-foreground">
                  Expected 60% demand increase in Europe for Winter 2025
                </p>
              </div>
              <div className="p-3 bg-heritage/10 rounded-lg">
                <Badge className="mb-2" variant="secondary">Seasonal Opportunity</Badge>
                <p className="text-sm font-medium">Festival Collection</p>
                <p className="text-xs text-muted-foreground">
                  Diwali collection showing early interest. Start promoting now!
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Badge className="mb-2" variant="secondary">New Market</Badge>
                <p className="text-sm font-medium">Corporate Gifting</p>
                <p className="text-xs text-muted-foreground">
                  Growing demand for handmade corporate gifts in tech companies
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketInsightsDashboard;