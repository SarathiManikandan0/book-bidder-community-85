
import { useState, useEffect } from 'react';
import { Book as BookType, books, initialFilter, filterBooks } from '@/lib/data';
import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';
import SearchFilters from '@/components/SearchFilters';
import { useIsMobile } from '@/hooks/use-mobile';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Books = () => {
  const [filter, setFilter] = useState(initialFilter);
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>(books);
  const [loading, setLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSearch = () => {
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setFilteredBooks(filterBooks(books, filter));
      setLoading(false);
      
      // Close filters drawer on mobile after search
      if (isMobile) {
        setFiltersVisible(false);
      }
    }, 300);
  };
  
  useEffect(() => {
    handleSearch();
  }, []); // Initial search on mount

  const activeFilterCount = 
    (filter.title ? 1 : 0) + 
    (filter.author ? 1 : 0) + 
    (filter.minPrice > 0 ? 1 : 0) + 
    (filter.maxPrice < 100 ? 1 : 0) + 
    filter.condition.length + 
    filter.genre.length + 
    (filter.isAuction !== null ? 1 : 0);

  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="pt-20 pb-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="py-6 md:py-10">
            <h1 className="text-2xl md:text-4xl font-bold mb-6">Browse Books</h1>
            
            {isMobile ? (
              <div className="mb-6 flex items-center justify-between">
                <Sheet open={filtersVisible} onOpenChange={setFiltersVisible}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center space-x-2"
                    >
                      <Filter className="w-4 h-4" />
                      <span>Filters</span>
                      {activeFilterCount > 0 && (
                        <span className="ml-1 bg-book-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {activeFilterCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[85vw] sm:max-w-md p-0">
                    <div className="p-6 h-full overflow-y-auto">
                      <h3 className="text-lg font-medium mb-4">Filter Books</h3>
                      <SearchFilters 
                        filter={filter} 
                        setFilter={setFilter} 
                        onSearch={handleSearch}
                        isMobile={true} 
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                
                <div className="text-sm text-gray-500">
                  {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <SearchFilters 
                  filter={filter} 
                  setFilter={setFilter} 
                  onSearch={handleSearch} 
                />
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-book-accent/20 border-t-book-accent rounded-full animate-spin"></div>
              </div>
            ) : filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {filteredBooks.map((book, index) => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    className="animate-fade-in"
                    animationDelay={50 * index} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-smooth">
                <h3 className="text-xl font-medium mb-2">No books found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  className="px-4 py-2 bg-book-accent text-white rounded-md hover:bg-book-accent/90 transition-colors"
                  onClick={() => {
                    setFilter(initialFilter);
                    handleSearch();
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Simplified footer for mobile */}
      <footer className="bg-gray-100 py-6">
        <div className="container px-4 md:px-6 mx-auto text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sharebook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Books;
