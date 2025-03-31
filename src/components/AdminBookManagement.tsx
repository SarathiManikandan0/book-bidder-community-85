
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookService } from "@/lib/bookService";
import { Book } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Edit, 
  Trash2,
  Search,
  Loader2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Input } from "@/components/ui/input";

interface BookWithSeller extends Book {
  sellerId: string;
}

const AdminBookManagement = () => {
  const [books, setBooks] = useState<BookWithSeller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const loadBooks = () => {
    setIsLoading(true);
    try {
      const allBooks = BookService.getAllBooks();
      setBooks(allBooks);
    } catch (error) {
      console.error("Error loading books:", error);
      toast({
        title: "Failed to load books",
        description: "Please try refreshing the page",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
    
    // Set up interval to refresh books periodically
    const intervalId = setInterval(loadBooks, 60000); // Refresh every minute
    
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
          description: "The book has been removed from the marketplace",
        });
        loadBooks(); // Reload books
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

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Books</h2>
        <Link to="/sell">
          <Button>Add New Book</Button>
        </Link>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search books by title or author..." 
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-book-accent" />
        </div>
      ) : (
        <>
          {filteredBooks.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Listed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="w-12 h-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>${book.price.toFixed(2)}</TableCell>
                      <TableCell>{book.condition}</TableCell>
                      <TableCell>{book.seller.name}</TableCell>
                      <TableCell>{new Date(book.listedDate || '').toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/books/${book.id}`}
                            className="h-8 w-8 p-0 flex items-center justify-center text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Link>
                          <Link
                            to={`/books/edit/${book.id}`}
                            className="h-8 w-8 p-0 flex items-center justify-center text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="h-8 w-8 p-0 flex items-center justify-center text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg">
              <p className="text-gray-500">No books found matching your search</p>
            </div>
          )}
        </>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!bookToDelete} onOpenChange={() => setBookToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this book from the marketplace. This action cannot be undone.
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
    </div>
  );
};

export default AdminBookManagement;
