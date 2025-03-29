
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Users, TrendingUp, PackageCheck, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  booksListed: number;
  booksPurchased: number;
}

interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  condition: string;
  seller: string;
  listingDate: string;
}

interface Sale {
  id: string;
  book: string;
  seller: string;
  buyer: string;
  price: string;
  date: string;
}

interface Auction {
  id: string;
  bookTitle: string;
  startingPrice: string;
  currentBid: string;
  endDate: string;
  status: string;
}

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  
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

  // Mock user data
  const [users, setUsers] = useState<User[]>([
    { 
      id: "u1", 
      name: "John Doe", 
      email: "john@example.com", 
      role: "user", 
      joinDate: "2023-09-15", 
      booksListed: 8, 
      booksPurchased: 5 
    },
    { 
      id: "u2", 
      name: "Jane Smith", 
      email: "jane@example.com", 
      role: "user", 
      joinDate: "2023-10-02", 
      booksListed: 3, 
      booksPurchased: 12 
    },
    { 
      id: "u3", 
      name: "Robert Johnson", 
      email: "robert@example.com", 
      role: "admin", 
      joinDate: "2023-08-10", 
      booksListed: 15, 
      booksPurchased: 7 
    }
  ]);

  // Mock books data
  const [books, setBooks] = useState<Book[]>([
    {
      id: "b1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: "₹450",
      condition: "Good",
      seller: "John Doe",
      listingDate: "2023-12-01"
    },
    {
      id: "b2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: "₹380",
      condition: "Excellent",
      seller: "Jane Smith",
      listingDate: "2023-12-05"
    },
    {
      id: "b3",
      title: "1984",
      author: "George Orwell",
      price: "₹520",
      condition: "Fair",
      seller: "Robert Johnson",
      listingDate: "2023-12-10"
    }
  ]);

  // Mock sales data
  const [sales, setSales] = useState<Sale[]>([
    {
      id: "s1",
      book: "The Great Gatsby",
      seller: "John Doe",
      buyer: "Jane Smith",
      price: "₹450",
      date: "2023-12-15"
    },
    {
      id: "s2",
      book: "To Kill a Mockingbird",
      seller: "Jane Smith",
      buyer: "Robert Johnson",
      price: "₹380",
      date: "2023-12-18"
    },
    {
      id: "s3",
      book: "1984",
      seller: "Robert Johnson",
      buyer: "John Doe",
      price: "₹520",
      date: "2023-12-20"
    }
  ]);

  // Mock auctions data
  const [auctions, setAuctions] = useState<Auction[]>([
    {
      id: "a1",
      bookTitle: "Rare First Edition - Dune",
      startingPrice: "₹1200",
      currentBid: "₹1800",
      endDate: "2024-01-15",
      status: "active"
    },
    {
      id: "a2",
      bookTitle: "Signed Copy - Harry Potter",
      startingPrice: "₹3500",
      currentBid: "₹4200",
      endDate: "2024-01-10",
      status: "active"
    },
    {
      id: "a3",
      bookTitle: "Vintage Collection - Sherlock Holmes",
      startingPrice: "₹2500",
      currentBid: "₹3100",
      endDate: "2023-12-25",
      status: "ended"
    }
  ]);
  
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

  // Filter functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = userFilter === "all" || 
                          (userFilter === "admin" && user.role === "admin") || 
                          (userFilter === "user" && user.role === "user");
    return matchesSearch && matchesFilter;
  });
  
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
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all users in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-10" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">Regular Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Books Listed</TableHead>
                        <TableHead>Books Purchased</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
                            </TableCell>
                            <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                            <TableCell>{user.booksListed}</TableCell>
                            <TableCell>{user.booksPurchased}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No users found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="books" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Books Management</CardTitle>
                <CardDescription>View all books currently listed on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Listing Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.map(book => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.price}</TableCell>
                          <TableCell>{book.condition}</TableCell>
                          <TableCell>{book.seller}</TableCell>
                          <TableCell>{new Date(book.listingDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="auctions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Auctions</CardTitle>
                <CardDescription>View all ongoing and past auctions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Starting Price</TableHead>
                        <TableHead>Current Bid</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auctions.map(auction => (
                        <TableRow key={auction.id}>
                          <TableCell className="font-medium">{auction.bookTitle}</TableCell>
                          <TableCell>{auction.startingPrice}</TableCell>
                          <TableCell>{auction.currentBid}</TableCell>
                          <TableCell>{new Date(auction.endDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              auction.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {auction.status === 'active' ? 'Active' : 'Ended'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales</CardTitle>
                <CardDescription>Track book sales across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sales.map(sale => (
                        <TableRow key={sale.id}>
                          <TableCell className="font-medium">{sale.book}</TableCell>
                          <TableCell>{sale.seller}</TableCell>
                          <TableCell>{sale.buyer}</TableCell>
                          <TableCell>{sale.price}</TableCell>
                          <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
