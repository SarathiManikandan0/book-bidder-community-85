
import { useState, useEffect } from 'react';
import { Book as BookType, books, initialFilter, filterBooks } from '@/lib/data';
import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';
import SearchFilters from '@/components/SearchFilters';

const Books = () => {
  const [filter, setFilter] = useState(initialFilter);
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>(books);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = () => {
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setFilteredBooks(filterBooks(books, filter));
      setLoading(false);
    }, 300);
  };
  
  useEffect(() => {
    handleSearch();
  }, []); // Initial search on mount

  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="pt-20 pb-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="py-10 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Browse Books</h1>
            
            <div className="mb-8">
              <SearchFilters 
                filter={filter} 
                setFilter={setFilter} 
                onSearch={handleSearch} 
              />
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-book-accent/20 border-t-book-accent rounded-full animate-spin"></div>
              </div>
            ) : filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              <div className="text-center py-16 bg-white rounded-xl shadow-smooth">
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
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container px-4 md:px-6 mx-auto text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sharebook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Books;
