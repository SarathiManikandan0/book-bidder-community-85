
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SearchFilters from '@/components/SearchFilters';
import BookCard from '@/components/BookCard';
import FeaturedBook from '@/components/FeaturedBook';
import { BookService } from '@/lib/bookService';
import { Book, Filter, initialFilter, filterBooks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';

const Index = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load books dynamically from BookService
    const loadBooks = () => {
      setIsLoading(true);
      try {
        const books = BookService.getAllBooks();
        setAllBooks(books);
        
        // Apply filters
        const filtered = filterBooks(books, filter);
        setFilteredBooks(filtered);
        
        // Set featured books (auctions with high demand)
        const featured = books
          .filter(book => book.isAuction && book.auctionData?.highDemand)
          .slice(0, 2);
        setFeaturedBooks(featured);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBooks();
    
    // Set up interval to refresh books periodically
    const intervalId = setInterval(loadBooks, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [filter]);

  const handleSearch = () => {
    const filtered = filterBooks(allBooks, filter);
    setFilteredBooks(filtered);
  };

  return (
    <div className="bg-book-paper min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Discover and Trade Books with Your Community
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Buy, sell, and bid on textbooks, fiction, and more. Connect with readers and sellers in your area.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/books">
                  <Button size="lg" className="bg-book-accent hover:bg-book-accent/90">
                    Browse Books
                  </Button>
                </Link>
                <Link to="/sell">
                  <Button variant="outline" size="lg">
                    Sell a Book
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredBooks.length > 0 ? (
                  featuredBooks.map((book, index) => (
                    <FeaturedBook key={book.id} book={book} index={index} />
                  ))
                ) : isLoading ? (
                  <div className="col-span-2 h-80 bg-gray-100 animate-pulse rounded-xl"></div>
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center h-80 bg-white rounded-xl p-8 text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No featured auctions yet</h3>
                    <p className="text-gray-500 mb-4">Be the first to list an auction with high demand!</p>
                    <Link to="/sell">
                      <Button>List a Book</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Search Section */}
        <section className="container mx-auto px-4 mb-10">
          <SearchFilters 
            filter={filter}
            setFilter={setFilter}
            onSearch={handleSearch}
          />
        </section>
        
        {/* Recent Books Section */}
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recently Listed Books</h2>
            <Link 
              to="/books" 
              className="text-book-accent hover:underline flex items-center"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-96 bg-gray-100 animate-pulse rounded-md"></div>
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks
                .sort((a, b) => new Date(b.listedDate || '').getTime() - new Date(a.listedDate || '').getTime())
                .slice(0, 8)
                .map((book, index) => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    className="animate-fade-in" 
                    animationDelay={index * 100}
                  />
                ))
              }
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No books found</h3>
              <p className="text-gray-500 mb-6">
                {Object.values(filter).some(v => v && (Array.isArray(v) ? v.length > 0 : true))
                  ? 'Try adjusting your search filters'
                  : 'Be the first to list a book for sale!'}
              </p>
              <Link to="/sell">
                <Button>List a Book</Button>
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
