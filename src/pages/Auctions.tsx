
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { books } from '@/lib/data';
import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Auctions = () => {
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // Filter for auction books only
  const auctionBooks = books.filter(book => book.isAuction);
  
  // Categories for auction books
  const endingSoon = auctionBooks
    .filter(book => {
      if (!book.auctionData) return false;
      const end = new Date(book.auctionData.endsAt);
      const now = new Date();
      const diff = end.getTime() - now.getTime();
      // Less than 24 hours left
      return diff > 0 && diff < 24 * 60 * 60 * 1000;
    })
    .sort((a, b) => {
      const endA = new Date(a.auctionData?.endsAt || 0).getTime();
      const endB = new Date(b.auctionData?.endsAt || 0).getTime();
      return endA - endB;
    });
  
  const highDemand = auctionBooks.filter(book => book.auctionData?.highDemand);
  
  const newArrivals = auctionBooks
    .sort((a, b) => {
      const dateA = new Date(a.listedDate || "").getTime();
      const dateB = new Date(b.listedDate || "").getTime();
      return dateB - dateA;
    })
    .slice(0, 8);
  
  useEffect(() => {
    // Simulate loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-book-paper flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-book-accent/20 border-t-book-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="pt-20 pb-20">
        <div className={`container ${isMobile ? 'px-4' : 'px-4 md:px-6'} mx-auto`}>
          {!isMobile && (
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="inline-flex items-center text-gray-600 hover:text-book-accent transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>Back to Home</span>
              </Link>
              
              <h1 className="text-3xl font-bold">Live Auctions</h1>
              
              <div className="w-24"></div> {/* Empty div for flex spacing */}
            </div>
          )}
          
          {isMobile && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Live Auctions</h1>
              <p className="text-gray-600">Bid on rare and popular books</p>
            </div>
          )}
          
          {/* Ending Soon Section */}
          {endingSoon.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Ending Soon</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/books?filter=ending-soon">View all</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {endingSoon.slice(0, 4).map((book, index) => (
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
          
          {/* High Demand Section */}
          {highDemand.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">High Demand</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/books?filter=high-demand">View all</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {highDemand.slice(0, 4).map((book, index) => (
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
          
          {/* New Arrivals Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Arrivals</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/books?filter=new-arrivals">View all</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newArrivals.slice(0, 4).map((book, index) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  className="animate-fade-in"
                  animationDelay={100 * index}
                />
              ))}
            </div>
          </div>
          
          {/* How Auctions Work */}
          <div className="bg-white rounded-lg p-6 shadow-smooth mb-8">
            <h2 className="text-xl font-bold mb-4">How Auctions Work</h2>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-book-paper rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Find a Book</h3>
                <p className="text-gray-600 text-sm">Browse our selection of books available for auction</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-book-paper rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Place Your Bid</h3>
                <p className="text-gray-600 text-sm">Enter a bid higher than the current price</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-book-paper rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Win & Checkout</h3>
                <p className="text-gray-600 text-sm">If you're the highest bidder when the auction ends, the book is yours</p>
              </div>
            </div>
          </div>
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

export default Auctions;
