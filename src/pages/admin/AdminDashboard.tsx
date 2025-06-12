
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, TrendingUp, Users, Database } from "lucide-react";

const AdminDashboard = () => {
  // Mock data - in real app this would come from your data source
  const stats = [
    { title: "Total SKUs", value: "6", icon: Package },
    { title: "Active Categories", value: "5", icon: Database },
    { title: "Popular SKUs", value: "2", icon: TrendingUp },
    { title: "Admin Users", value: "3", icon: Users },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Link to="/admin/skus/add">
                <Button>Add New SKU</Button>
              </Link>
              <Link to="/admin/skus">
                <Button variant="outline">Manage SKUs</Button>
              </Link>
              <Link to="/admin/categories">
                <Button variant="outline">Manage Categories</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database Status</span>
                <span className="text-sm font-medium text-green-600">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Sync</span>
                <span className="text-sm font-medium">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Status</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
