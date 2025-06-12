
import { useState } from "react";
import { Search, Package, TrendingUp, Clock, Calendar, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SKU {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: {
    ppuTokens: number;
    monthlyTokens: number;
    oneYearTokens: number;
    threeYearTokens: number;
  };
  features: string[];
  popular?: boolean;
}

const mockSKUs: SKU[] = [
  {
    id: "M10001",
    name: "Producer Micro APP Core",
    description: "Essential microservice core with input, output, bandwidth and storage capabilities",
    category: "Core Services",
    pricing: {
      ppuTokens: 144,
      monthlyTokens: 26352,
      oneYearTokens: 21082,
      threeYearTokens: 15811
    },
    features: ["Input/Output Processing", "Bandwidth Management", "Storage Included", "24/7 Support"]
  },
  {
    id: "M10002",
    name: "Remote Commentator",
    description: "Advanced remote commentary service requiring Producer Core integration",
    category: "Communication",
    pricing: {
      ppuTokens: 144,
      monthlyTokens: 26352,
      oneYearTokens: 21082,
      threeYearTokens: 15811
    },
    features: ["Real-time Commentary", "Producer Core Required", "Multi-language Support", "Analytics Dashboard"],
    popular: true
  },
  {
    id: "M10003",
    name: "Popup Channel",
    description: "Flexible popup channel service excluding input, output, bandwidth and storage",
    category: "Channels",
    pricing: {
      ppuTokens: 272,
      monthlyTokens: 0,
      oneYearTokens: 0,
      threeYearTokens: 0
    },
    features: ["Pay-per-use Only", "Instant Deployment", "Custom Branding", "Basic Analytics"]
  },
  {
    id: "M10004",
    name: "Premium Channel",
    description: "Full-featured channel with comprehensive input, output, bandwidth and storage",
    category: "Channels",
    pricing: {
      ppuTokens: 0,
      monthlyTokens: 11904,
      oneYearTokens: 11904,
      threeYearTokens: 11904
    },
    features: ["Full I/O Support", "Unlimited Storage", "Priority Support", "Advanced Analytics"],
    popular: true
  },
  {
    id: "M10005",
    name: "TVU Grid Subscription",
    description: "Professional grid subscription with one output for unlimited use",
    category: "Professional",
    pricing: {
      ppuTokens: 0,
      monthlyTokens: 0,
      oneYearTokens: 5208,
      threeYearTokens: 4687
    },
    features: ["One Output Channel", "Unlimited Usage", "Grid Interface", "Professional Support"]
  },
  {
    id: "S00001",
    name: "Advanced User Subscription",
    description: "Premium subscription for advanced users with enhanced capabilities",
    category: "Subscriptions",
    pricing: {
      ppuTokens: 0,
      monthlyTokens: 0,
      oneYearTokens: 0,
      threeYearTokens: 0
    },
    features: ["Enhanced Features", "Priority Access", "Advanced Tools", "Dedicated Support"]
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(mockSKUs.map(sku => sku.category)))];
  
  const filteredSKUs = mockSKUs.filter(sku => {
    const matchesSearch = sku.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sku.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sku.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || sku.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatTokens = (tokens: number) => {
    if (tokens === 0) return "N/A";
    return tokens.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SKU Pricing Guide</h1>
              <p className="text-gray-600 mt-1">Professional pricing solutions for your business needs</p>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-sm text-gray-500">Billing Service</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search SKUs by name, description, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* SKU Grid */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredSKUs.map((sku) => (
            <Card key={sku.id} className={`relative hover:shadow-lg transition-shadow ${sku.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {sku.popular && (
                <Badge className="absolute -top-2 left-4 bg-blue-600">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {sku.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {sku.id}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {sku.category}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mt-2">{sku.description}</p>
              </CardHeader>

              <CardContent>
                {/* Pricing Table */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Token Pricing</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs py-2">Plan Type</TableHead>
                        <TableHead className="text-xs py-2 text-right">Tokens</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-xs py-2 font-medium">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Pay-per-Use
                          </div>
                        </TableCell>
                        <TableCell className="text-xs py-2 text-right font-mono">
                          {formatTokens(sku.pricing.ppuTokens)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs py-2 font-medium">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Monthly
                          </div>
                        </TableCell>
                        <TableCell className="text-xs py-2 text-right font-mono">
                          {formatTokens(sku.pricing.monthlyTokens)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs py-2 font-medium">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            1 Year
                          </div>
                        </TableCell>
                        <TableCell className="text-xs py-2 text-right font-mono">
                          {formatTokens(sku.pricing.oneYearTokens)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs py-2 font-medium">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            3 Years
                          </div>
                        </TableCell>
                        <TableCell className="text-xs py-2 text-right font-mono">
                          {formatTokens(sku.pricing.threeYearTokens)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSKUs.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No SKUs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Pricing</h3>
              <p className="text-sm text-gray-600">
                Choose from pay-per-use, monthly, or long-term plans to fit your business needs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Token-Based System</h3>
              <p className="text-sm text-gray-600">
                Our transparent token system ensures you only pay for what you use.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Enterprise Support</h3>
              <p className="text-sm text-gray-600">
                All plans include professional support and service level agreements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
