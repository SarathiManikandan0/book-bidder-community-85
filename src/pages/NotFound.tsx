
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { HomeIcon, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-book-paper p-4">
      <div className="max-w-md w-full text-center animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Search className="w-10 h-10 text-gray-400" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">We couldn't find the page you're looking for</p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-book-accent text-white rounded-md hover:bg-book-accent/90 transition-colors"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Go to Home
          </Link>
          
          <Link 
            to="/books" 
            className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-200 text-gray-800 rounded-md hover:bg-gray-50 transition-colors"
          >
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
