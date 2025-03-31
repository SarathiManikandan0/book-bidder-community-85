
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import BookCard from "@/components/BookCard";
import { BookService } from "@/lib/bookService";
import { Book, Filter, initialFilter, filterBooks } from "@/lib/data";
import { BookOpen, Loader2, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const isMobile = useIsMobile();
  
  useEffect(() => {
    loadBooks();
    
    // Set up interval to refresh books periodically
    const intervalId = setInterval(loadBooks, 60000); // Refresh every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  const loadBooks = () => {
    setIsLoading(true);
    try {
      const allBooks = BookService.getAllBooks();
      setBooks(allBooks);
      
      // Apply initial filters
      const filtered = filterBooks(allBooks, filter);
      setFilteredBooks(filtered);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = () => {
    const filtered = filterBooks(books, filter);
    setFilteredBooks(filtered);
  };

  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Books</h1>
            <p className="text-gray-600">
              Find textbooks, fiction, and more from sellers in your community
            </p>
          </div>
          
          <div className="mb-6">
            <SearchFilters 
              filter={filter} 
              setFilter={setFilter} 
              onSearch={handleSearch}
              isMobile={isMobile}
            />
          </div>
          
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
            </p>
            
            {/* View mode toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-8 h-8",
                  viewMode === "grid" ? "text-book-accent bg-gray-100" : "text-gray-500"
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-8 h-8",
                  viewMode === "list" ? "text-book-accent bg-gray-100" : "text-gray-500"
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-book-accent" />
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className={cn(
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
                : "space-y-4"
            )}>
              {filteredBooks.map((book, index) => (
                viewMode === "grid" ? (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    animationDelay={index * 100}
                  />
                ) : (
                  <div 
                    key={book.id} 
                    className="flex bg-white rounded-md overflow-hidden shadow-smooth"
                  >
                    <div className="w-32 h-40 flex-shrink-0">
                      <img 
                        src={book.coverImage} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-1 mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {book.description.substring(0, 100)}...
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-medium">
                          ${book.price.toFixed(2)}
                        </span>
                        <Button 
                          variant="link" 
                          asChild 
                          className="p-0 h-auto text-book-accent"
                        >
                          <a href={`/books/${book.id}`}>View Details</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg">
              <BookOpen className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">No books found</h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                We couldn't find any books matching your search criteria. Try adjusting your filters or check back later.
              </p>
              <Button onClick={() => setFilter(initialFilter)}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Books;
