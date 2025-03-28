
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, User, Mail, CalendarDays, BookOpen, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data for user stats
  const [userStats, setUserStats] = useState({
    booksListed: 0,
    booksSold: 0,
    booksPurchased: 0,
    memberSince: ""
  });
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to view your profile",
        variant: "destructive"
      });
      navigate("/signin");
    }
    
    // If we have a user, we would fetch their stats here
    // This is mock data for demonstration
    if (user) {
      setUserStats({
        booksListed: 12,
        booksSold: 8,
        booksPurchased: 15,
        memberSince: "January 2023"
      });
    }
  }, [isAuthenticated, isLoading, navigate, toast, user]);
  
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-book-paper pt-20 px-4">
        <div className="container mx-auto max-w-4xl mt-8 flex justify-center items-center">
          <div className="animate-pulse text-center">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-book-paper pt-20 px-4">
      <div className="container mx-auto max-w-4xl mt-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-book-accent transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User info card */}
          <Card className="shadow-smooth">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-book-accent to-purple-400 flex items-center justify-center text-white text-3xl">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User size={40} />
                  )}
                </div>
              </div>
              <CardTitle className="text-center">{user.name}</CardTitle>
              <CardDescription className="text-center flex justify-center items-center">
                <Mail className="w-3 h-3 mr-1" /> {user.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center mb-3">
                <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">Member since {userStats.memberSince}</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${user.role === 'admin' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <span className="text-sm font-medium">{user.role === 'admin' ? 'Administrator' : 'Member'}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Sign Out
              </Button>
            </CardFooter>
          </Card>
          
          {/* Activity summary */}
          <Card className="shadow-smooth md:col-span-2">
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
              <CardDescription>Overview of your Sharebook activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-book-accent mr-2" />
                    <h3 className="font-medium">Books Listed</h3>
                  </div>
                  <p className="text-2xl font-bold">{userStats.booksListed}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Package className="w-5 h-5 text-green-500 mr-2" />
                    <h3 className="font-medium">Books Sold</h3>
                  </div>
                  <p className="text-2xl font-bold">{userStats.booksSold}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
                    <h3 className="font-medium">Books Purchased</h3>
                  </div>
                  <p className="text-2xl font-bold">{userStats.booksPurchased}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
