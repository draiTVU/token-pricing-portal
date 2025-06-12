
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash, Copy } from "lucide-react";

// Mock data - same as in Index.tsx but for admin management
const mockSKUs = [
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
    popular: false,
    status: "active"
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
    popular: true,
    status: "active"
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
    popular: false,
    status: "active"
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
    popular: true,
    status: "active"
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
    popular: false,
    status: "active"
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
    popular: false,
    status: "inactive"
  }
];

const SKUManagement = () => {
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
    if (tokens === 0) return "-";
    return tokens.toLocaleString();
  };

  return (
    <AdminLayout title="SKU Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">SKU Management</h2>
            <p className="text-gray-600">Manage your product SKUs and pricing</p>
          </div>
          <Link to="/admin/skus/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New SKU
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
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
          </CardContent>
        </Card>

        {/* SKU Table */}
        <Card>
          <CardHeader>
            <CardTitle>SKUs ({filteredSKUs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>PPU Tokens</TableHead>
                  <TableHead>Monthly</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSKUs.map((sku) => (
                  <TableRow key={sku.id}>
                    <TableCell className="font-mono text-sm">{sku.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{sku.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {sku.description}
                        </div>
                        {sku.popular && (
                          <Badge className="mt-1" variant="secondary">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{sku.category}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatTokens(sku.pricing.ppuTokens)}
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatTokens(sku.pricing.monthlyTokens)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={sku.status === "active" ? "default" : "secondary"}
                      >
                        {sku.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/admin/skus/edit/${sku.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SKUManagement;
