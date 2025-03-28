
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Users, TrendingUp, PackageCheck } from "lucide-react";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 248,
    newUsersToday: 12,
    totalBooks: 1892,
    booksListedToday: 34,
    totalAuctions: 156,
    activeAuctions: 42,
    totalSales: 876,
    salesToday: 15
  });
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access the dashboard",
        variant: "destructive"
      });
      navigate("/signin");
      return;
    }
    
    if (!isLoading && isAuthenticated && user?.role !== 'admin') {
      toast({
        title: "Access denied",
        description: "You don't have permission to view this page",
        variant: "destructive"
      });
      navigate("/");
    }
    
    // We would fetch real dashboard data here
    // This is mock data for demonstration
  }, [isAuthenticated, isLoading, navigate, toast, user]);
  
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-book-paper pt-20 px-4">
        <div className="container mx-auto max-w-6xl mt-8 flex justify-center items-center">
          <div className="animate-pulse text-center">
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-book-paper pt-20 px-4">
      <div className="container mx-auto max-w-6xl mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate("/books")}>
              View Books
            </Button>
          </div>
        </div>
        
        {/* Dashboard stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-book-accent mr-3" />
                <div>
                  <div className="text-2xl font-bold">{dashboardData.totalUsers}</div>
                  <p className="text-xs text-green-600">+{dashboardData.newUsersToday} today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Books Listed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{dashboardData.totalBooks}</div>
                  <p className="text-xs text-green-600">+{dashboardData.booksListedToday} today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-purple-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{dashboardData.activeAuctions}</div>
                  <p className="text-xs text-gray-500">of {dashboardData.totalAuctions} total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PackageCheck className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{dashboardData.totalSales}</div>
                  <p className="text-xs text-green-600">+{dashboardData.salesToday} today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Dashboard content */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="auctions">Auctions</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest users who joined Sharebook</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 text-gray-500">
                  User list would appear here in a real implementation
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="books" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recently Listed Books</CardTitle>
                <CardDescription>Books added in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 text-gray-500">
                  Book list would appear here in a real implementation
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="auctions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Auctions</CardTitle>
                <CardDescription>Currently ongoing book auctions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 text-gray-500">
                  Auction list would appear here in a real implementation
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Books sold in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 text-gray-500">
                  Sales list would appear here in a real implementation
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
