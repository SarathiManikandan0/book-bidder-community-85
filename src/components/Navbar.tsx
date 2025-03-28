
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ArrowLeft, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isAuthenticated, user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Auctions', path: '/auctions' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
  ];

  // Add scroll detection for better mobile header UI
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const showBackButton = location.pathname !== '/';

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
      isScrolled 
        ? "bg-white/95 backdrop-blur-sm shadow-sm" 
        : "glassmorphism border-b border-gray-100"
    )}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center z-20">
          {isMobile && showBackButton ? (
            <button 
              onClick={() => window.history.back()}
              className="mr-2 p-1 rounded-full text-gray-600 hover:text-book-accent transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : null}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-book-accent" />
            <span className="text-xl font-medium">Sharebook</span>
          </Link>
        </div>
        
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
        <div className="flex items-center space-x-4 z-20">
          <button className="p-1 rounded-full text-gray-600 hover:text-book-accent transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full text-gray-600 hover:text-book-accent transition-colors">
                  <User className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-4 bg-white z-[100]" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{user?.name}</span>
                    <span className="text-xs text-gray-500">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                {user?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/signin" className="p-2 rounded-full text-gray-600 hover:text-book-accent transition-colors">
              <User className="w-5 h-5" />
            </Link>
          )}
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full text-gray-600 hover:text-book-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu - improved for better mobile UX */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white pt-20 px-6 z-10 animate-fade-in overflow-auto"
        >
          <nav className="flex flex-col space-y-6 mt-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "text-lg font-medium py-4 border-b border-gray-100 flex items-center",
                  isActive(link.path) ? "text-book-accent" : "text-gray-800"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/signin"
                  className="text-lg font-medium py-4 border-b border-gray-100 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup"
                  className="text-lg font-medium py-4 border-b border-gray-100 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/profile"
                  className="text-lg font-medium py-4 border-b border-gray-100 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/dashboard"
                    className="text-lg font-medium py-4 border-b border-gray-100 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button 
                  className="text-lg font-medium py-4 border-b border-gray-100 flex items-center text-red-500"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
