
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, TrendingUp } from 'lucide-react';
import BookCard from '@/components/BookCard';
import FeaturedBook from '@/components/FeaturedBook';
import Navbar from '@/components/Navbar';
import { books, featuredBooks } from '@/lib/data';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading to ensure animations work properly
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className={`${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="inline-block px-3 py-1 bg-book-accent/10 text-book-accent rounded-full text-sm font-medium mb-6">
                  Sharebook Community
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                  Where Book Lovers <br />
                  <span className="text-book-accent">Trade and Connect</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  A community-driven platform for buying, selling, and bidding on books. Find rare editions, connect with fellow readers, and share your passion for literature.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/books" 
                    className="px-6 py-3 bg-book-accent text-white rounded-md hover:bg-book-accent/90 transition-colors"
                  >
                    Explore Books
                  </Link>
                  <a 
                    href="#featured" 
                    className="px-6 py-3 bg-white border border-gray-200 text-gray-800 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    View Auctions
                  </a>
                </div>
              </div>
              
              <div className={`relative ${isLoaded ? 'animate-fade-in' : 'opacity-0'} animate-delay-500`} style={{ animationDelay: '500ms' }}>
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-book-cover rounded-lg shadow-book transform rotate-6 z-10"></div>
                  <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-white rounded-lg shadow-book transform -rotate-6 z-20"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&auto=format&fit=crop"
                    alt="Books arrangement" 
                    className="absolute inset-0 m-auto w-full h-full object-cover rounded-lg shadow-book z-30"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4 p-6 border border-gray-100 rounded-xl shadow-smooth">
                <div className="w-12 h-12 flex items-center justify-center bg-book-accent/10 text-book-accent rounded-full">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">10,000+</p>
                  <p className="text-gray-600">Books Available</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 border border-gray-100 rounded-xl shadow-smooth">
                <div className="w-12 h-12 flex items-center justify-center bg-book-accent/10 text-book-accent rounded-full">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">5,000+</p>
                  <p className="text-gray-600">Community Members</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 border border-gray-100 rounded-xl shadow-smooth">
                <div className="w-12 h-12 flex items-center justify-center bg-book-accent/10 text-book-accent rounded-full">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-gray-600">Active Auctions</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Auctions Section */}
        <section id="featured" className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Auctions</h2>
                <p className="text-gray-600 max-w-2xl">
                  Discover rare and collectible books that are currently up for auction. Bid on your favorites before they're gone!
                </p>
              </div>
              <Link to="/auctions" className="flex items-center text-book-accent mt-4 md:mt-0 hover:underline">
                <span>View all auctions</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredBooks.map((book, index) => (
                <FeaturedBook key={book.id} book={book} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Recent Books Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Listings</h2>
                <p className="text-gray-600 max-w-2xl">
                  Browse the latest books added to our community marketplace. Find your next great read!
                </p>
              </div>
              <Link to="/books" className="flex items-center text-book-accent mt-4 md:mt-0 hover:underline">
                <span>Browse all books</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.slice(0, 8).map((book, index) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  className={`animate-scale-up`}
                  animationDelay={100 * index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-book-cover text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Sign up today to start buying, selling, and bidding on books. Connect with fellow book lovers and build your personal library.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-white text-book-cover rounded-md hover:bg-gray-100 transition-colors">
                Sign Up
              </button>
              <button className="px-6 py-3 bg-transparent border border-white text-white rounded-md hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-6">
                <BookOpen className="w-6 h-6 text-book-accent" />
                <span className="text-xl font-medium">Sharebook</span>
              </div>
              <p className="text-gray-600 max-w-md">
                A community-driven platform for book lovers to buy, sell, and bid on books of all genres and conditions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-4">Platform</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-book-accent">How it Works</a></li>
                  <li><a href="#" className="hover:text-book-accent">Pricing</a></li>
                  <li><a href="#" className="hover:text-book-accent">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-book-accent">About Us</a></li>
                  <li><a href="#" className="hover:text-book-accent">Careers</a></li>
                  <li><a href="#" className="hover:text-book-accent">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-book-accent">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-book-accent">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-book-accent">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Sharebook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
