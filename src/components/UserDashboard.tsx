
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, PackageCheck, TrendingUp, ShoppingCart, Edit, Trash2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BookService } from "@/lib/bookService";
import { Book } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface UserBook extends Book {
  sellerId: string;
}

interface UserBid {
  id: string;
  bookId: string;
  bookTitle: string;
  amount: string;
  date: string;
  status: "active" | "won" | "lost";
}

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [myBooks, setMyBooks] = useState<UserBook[]>([]);
  const [myBids, setMyBids] = useState<UserBid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Load user's books from BookService
  const loadUserBooks = () => {
    if (!user) return;
    
    try {
      const books = BookService.getBooksBySeller(user.id);
      setMyBooks(books as UserBook[]);
    } catch (error) {
      console.error("Error fetching user books:", error);
      toast({
        title: "Failed to load your books",
        description: "Please try refreshing the page",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Load user's books
        loadUserBooks();
        
        // Mock bid data for demonstration
        const mockBids: UserBid[] = [
          {
            id: "bid-1",
            bookId: "book-123",
            bookTitle: "Harry Potter and the Philosopher's Stone",
            amount: "350",
            date: new Date().toISOString(),
            status: "active",
          },
          {
            id: "bid-2",
            bookId: "book-456",
            bookTitle: "The Great Gatsby",
            amount: "220",
            date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            status: "won",
          },
        ];
        setMyBids(mockBids);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Failed to load your data",
          description: "Please try refreshing the page",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [isAuthenticated, user, toast]);

  const handleDeleteBook = (bookId: string) => {
    setBookToDelete(bookId);
  };

  const confirmDeleteBook = () => {
    if (!bookToDelete) return;
    
    try {
      const success = BookService.deleteBook(bookToDelete);
      if (success) {
        toast({
          title: "Book deleted",
          description: "Your book has been removed from the marketplace",
        });
        loadUserBooks(); // Reload books
      } else {
        toast({
          title: "Failed to delete book",
          description: "Book not found or already deleted",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      });
    } finally {
      setBookToDelete(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Dashboard</CardTitle>
          <CardDescription>Sign in to view your activity and manage your books</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Link
            to="/signin"
            className="px-4 py-2 bg-book-accent text-white rounded-md hover:bg-book-accent/90 transition-colors"
          >
            Sign In
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Dashboard</span>
          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="text-sm font-normal text-book-accent hover:underline"
            >
              Admin Dashboard
            </Link>
          )}
        </CardTitle>
        <CardDescription>
          Welcome back, {user?.name}! Here's your recent activity
        </CardDescription>
      </CardHeader>
      
      <div className="px-6 pb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-50">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-blue-100">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">My Books</p>
              <p className="text-xl font-semibold">{myBooks.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-purple-100">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Bids</p>
              <p className="text-xl font-semibold">
                {myBids.filter(bid => bid.status === "active").length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-green-100">
              <ShoppingCart className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Purchases</p>
              <p className="text-xl font-semibold">
                {myBids.filter(bid => bid.status === "won").length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 rounded-full bg-orange-100">
              <PackageCheck className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sales</p>
              <p className="text-xl font-semibold">0</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <CardContent>
        <Tabs defaultValue="books">
          <TabsList className="mb-4">
            <TabsTrigger value="books">My Books</TabsTrigger>
            <TabsTrigger value="bids">My Bids</TabsTrigger>
          </TabsList>
          
          <TabsContent value="books" className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4">Loading your books...</div>
            ) : myBooks.length > 0 ? (
              <div className="space-y-3">
                {myBooks.map((book) => (
                  <div key={book.id} className="p-3 border rounded-lg flex items-center">
                    <div className="w-16 h-16 mr-3 flex-shrink-0">
                      <img 
                        src={book.coverImage} 
                        alt={book.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-sm text-gray-500">
                        {book.author} · {book.condition} · ${book.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">
                        Listed {new Date(book.listedDate || '').toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/books/${book.id}`}
                        className="text-xs px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        to={`/books/edit/${book.id}`}
                        className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 border rounded-lg flex flex-col items-center p-8">
                <AlertCircle className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">You haven't listed any books yet</p>
                <Link
                  to="/sell"
                  className="px-4 py-2 bg-book-accent text-white rounded-md hover:bg-book-accent/90 transition-colors"
                >
                  List a book for sale
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bids" className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4">Loading your bids...</div>
            ) : myBids.length > 0 ? (
              <div className="space-y-3">
                {myBids.map((bid) => (
                  <div key={bid.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{bid.bookTitle}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        bid.status === "active" ? "bg-blue-100 text-blue-700" :
                        bid.status === "won" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Bid: ${bid.amount} · {new Date(bid.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 border rounded-lg flex flex-col items-center p-8">
                <AlertCircle className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">You haven't placed any bids yet</p>
                <Link
                  to="/auctions"
                  className="px-4 py-2 bg-book-accent text-white rounded-md hover:bg-book-accent/90 transition-colors"
                >
                  Browse auctions
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!bookToDelete} onOpenChange={() => setBookToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this book listing. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteBook} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default UserDashboard;
