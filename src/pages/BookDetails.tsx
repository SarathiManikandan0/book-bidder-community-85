
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { books } from '@/lib/data';
import Navbar from '@/components/Navbar';
import BookDetail from '@/components/BookDetail';
import BookCard from '@/components/BookCard';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const book = books.find(book => book.id === id);
  
  // Similar books based on genre
  const similarBooks = book 
    ? books
        .filter(b => 
          b.id !== book.id && 
          b.genre.some(g => book.genre.includes(g))
        )
        .slice(0, 4)
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

  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="pt-20 pb-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="py-10">
            <Link to="/books" className="inline-flex items-center text-gray-600 hover:text-book-accent mb-8 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span>Back to Books</span>
            </Link>
            
            <BookDetail book={book} />
            
            {/* Similar Books Section */}
            {similarBooks.length > 0 && (
              <div className="mt-20">
                <h2 className="text-2xl font-bold mb-6">You might also like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

export default BookDetails;
