
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { books } from '@/lib/data';
import Navbar from '@/components/Navbar';
import BookDetail from '@/components/BookDetail';
import BookDetailMobile from '@/components/BookDetailMobile';
import BookCard from '@/components/BookCard';
import { useIsMobile } from '@/hooks/use-mobile';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  
  const book = books.find(book => book.id === id);
  
  // Similar books based on genre
  const similarBooks = book 
    ? books
        .filter(b => 
          b.id !== book.id && 
          b.genre.some(g => book.genre.includes(g))
        )
        .slice(0, isMobile ? 2 : 4)
    : [];
  
  useEffect(() => {
    // Simulate loading
    const timeout = setTimeout(() => {
      setLoading(false);
      
      if (!book) {
        navigate('/books', { replace: true });
      }
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [book, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-book-paper flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-book-accent/20 border-t-book-accent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!book) return null;

  // Handle navigation back
  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className={`pt-20 pb-20 ${isMobile ? 'px-0' : ''}`}>
        <div className={`container ${isMobile ? 'px-0' : 'px-4 md:px-6'} mx-auto`}>
          {!isMobile && (
            <Link to="/books" className="inline-flex items-center text-gray-600 hover:text-book-accent mb-8 transition-colors px-4">
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span>Back to Books</span>
            </Link>
          )}
            
          {isMobile ? (
            <BookDetailMobile book={book} onNavigateBack={handleNavigateBack} />
          ) : (
            <BookDetail book={book} />
          )}
          
          {/* Similar Books Section */}
          {similarBooks.length > 0 && (
            <div className={`mt-12 ${isMobile ? 'px-4' : ''}`}>
              <h2 className="text-xl font-bold mb-6">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {similarBooks.map((book, index) => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    className="animate-fade-in"
                    animationDelay={100 * index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer - simplified for mobile */}
      <footer className="bg-gray-100 py-6">
        <div className="container px-4 md:px-6 mx-auto text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sharebook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BookDetails;
