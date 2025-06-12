
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash } from "lucide-react";

const Categories = () => {
  const [newCategory, setNewCategory] = useState("");
  
  // Mock categories data
  const [categories, setCategories] = useState([
    { id: 1, name: "Core Services", skuCount: 1, description: "Essential core services and infrastructure" },
    { id: 2, name: "Communication", skuCount: 1, description: "Communication and collaboration tools" },
    { id: 3, name: "Channels", skuCount: 2, description: "Various channel types and configurations" },
    { id: 4, name: "Professional", skuCount: 1, description: "Professional-grade solutions" },
    { id: 5, name: "Subscriptions", skuCount: 1, description: "User subscription services" },
  ]);

  const addCategory = () => {
    if (newCategory.trim()) {
      const newCat = {
        id: Date.now(),
        name: newCategory.trim(),
        skuCount: 0,
        description: ""
      };
      setCategories([...categories, newCat]);
      setNewCategory("");
    }
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <AdminLayout title="Category Management">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
          <p className="text-gray-600">Organize your SKUs into categories</p>
        </div>

        {/* Add New Category */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Category name..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCategory()}
              />
              <Button onClick={addCategory}>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle>Categories ({categories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>SKU Count</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-gray-600">{category.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{category.skuCount} SKUs</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteCategory(category.id)}
                          disabled={category.skuCount > 0}
                        >
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

        {/* Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                <strong>Note:</strong> Categories with existing SKUs cannot be deleted. 
                Please reassign or remove SKUs before deleting a category.
              </p>
              <p>
                Categories help organize your SKUs and make them easier to find in both 
                the admin interface and customer-facing pricing page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Categories;
