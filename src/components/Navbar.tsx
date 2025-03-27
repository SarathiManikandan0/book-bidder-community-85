
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Auctions', path: '/auctions' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 z-20">
          <ShoppingBag className="w-6 h-6 text-book-accent" />
          <span className="text-xl font-medium">Sharebook</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "text-sm font-medium py-2 transition-all duration-200 relative",
                isActive(link.path) 
                  ? "text-book-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-book-accent after:rounded-full"
                  : "text-gray-600 hover:text-book-accent"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Right icons */}
        <div className="flex items-center space-x-6 z-20">
          <button className="p-1 rounded-full text-gray-600 hover:text-book-accent transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-1 rounded-full text-gray-600 hover:text-book-accent transition-colors">
            <User className="w-5 h-5" />
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-1 rounded-full text-gray-600 hover:text-book-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 right-0 h-screen bg-white pt-20 px-6 z-10 animate-slide-in">
          <nav className="flex flex-col space-y-6 mt-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "text-lg font-medium py-2 border-b border-gray-100",
                  isActive(link.path) ? "text-book-accent" : "text-gray-800"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
