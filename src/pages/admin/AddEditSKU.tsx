
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Plus, X, Save, ArrowLeft } from "lucide-react";

interface SKUFormData {
  id: string;
  name: string;
  description: string;
  category: string;
  ppuTokens: number;
  monthlyTokens: number;
  oneYearTokens: number;
  threeYearTokens: number;
  features: string[];
  popular: boolean;
  status: "active" | "inactive";
}

const AddEditSKU = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [newFeature, setNewFeature] = useState("");
  
  const form = useForm<SKUFormData>({
    defaultValues: {
      id: "",
      name: "",
      description: "",
      category: "",
      ppuTokens: 0,
      monthlyTokens: 0,
      oneYearTokens: 0,
      threeYearTokens: 0,
      features: [],
      popular: false,
      status: "active"
    }
  });

  const { watch, setValue } = form;
  const features = watch("features");

  const addFeature = () => {
    if (newFeature.trim()) {
      setValue("features", [...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setValue("features", features.filter((_, i) => i !== index));
  };

  const onSubmit = (data: SKUFormData) => {
    console.log("SKU Data:", data);
    // Here you would save to your data source
    navigate("/admin/skus");
  };

  return (
    <AdminLayout title={isEditing ? "Edit SKU" : "Add New SKU"}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/skus")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to SKUs
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit SKU" : "Add New SKU"}
            </h2>
            <p className="text-gray-600">
              {isEditing ? "Modify SKU details and pricing" : "Create a new SKU with pricing information"}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU ID</FormLabel>
                        <FormControl>
                          <Input placeholder="M10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Producer Micro APP Core" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Detailed description of the SKU..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Core Services" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="popular"
                        checked={watch("popular")}
                        onChange={(e) => setValue("popular", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="popular">Popular SKU</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="active"
                        checked={watch("status") === "active"}
                        onChange={(e) => setValue("status", e.target.checked ? "active" : "inactive")}
                        className="rounded"
                      />
                      <Label htmlFor="active">Active</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Token Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="ppuTokens"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pay-per-Use Tokens</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="144"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="monthlyTokens"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Tokens</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="26352"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="oneYearTokens"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>1 Year Tokens</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="21082"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="threeYearTokens"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>3 Year Tokens</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="15811"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-1 hover:bg-gray-300 rounded"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? "Update SKU" : "Create SKU"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/skus")}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AddEditSKU;
