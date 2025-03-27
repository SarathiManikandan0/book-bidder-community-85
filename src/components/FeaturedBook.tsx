
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Award } from 'lucide-react';
import { Book } from '@/lib/data';
import { cn } from '@/lib/utils';

interface FeaturedBookProps {
  book: Book;
  index: number;
}

const FeaturedBook = ({ book, index }: FeaturedBookProps) => {
  const { 
    id, 
    title, 
    author, 
    coverImage, 
    description,
    auctionData
  } = book;
  
  const timeLeft = () => {
    if (!auctionData) return '';
    
    const end = new Date(auctionData.endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days, ${hours} hours left`;
    
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `${hours} hours, ${minutes} minutes left`;
    
    return `${minutes} minutes left`;
  };

  return (
    <div 
      className={cn(
        "group relative bg-white rounded-xl overflow-hidden shadow-book",
        "opacity-0 animate-fade-in-up",
        index === 0 ? "animate-fade-in-up" : "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      
      <div className="relative bg-book-paper aspect-[5/3] overflow-hidden">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
        <div className="flex items-center mb-4 space-x-3">
          <div className="flex items-center space-x-2 bg-book-bidding rounded-full px-3 py-1">
            <span className="text-sm font-medium">Hot Auction</span>
            {auctionData?.highDemand && <Award className="w-4 h-4" />}
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{timeLeft()}</span>
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{title}</h2>
        <p className="text-sm md:text-base mb-2 opacity-90">by {author}</p>
        <p className="text-sm opacity-80 line-clamp-2 mb-6">{description}</p>
        
        <Link 
          to={`/books/${id}`} 
          className="inline-flex items-center text-white hover:text-book-accent transition-colors duration-300"
        >
          <span className="font-medium">Bid now</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBook;
