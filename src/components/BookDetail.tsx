
import { Book } from '@/lib/data';
import { Check, Award, Clock, AlertCircle } from 'lucide-react';

interface BookDetailProps {
  book: Book;
}

const BookDetail = ({ book }: BookDetailProps) => {
  const { 
    title, 
    author, 
    coverImage, 
    description,
    price,
    condition,
    genre,
    language,
    isAuction,
    auctionData,
    seller,
    publishedDate,
    isbn,
    pageCount,
    views
  } = book;
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(isAuction ? auctionData?.currentBid || 0 : price);
  
  const timeLeft = () => {
    if (!auctionData) return '';
    
    const end = new Date(auctionData.endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Auction ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days > 0 ? `${days} days, ` : ''}${hours} hours, ${minutes} minutes`;
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left column - Image */}
        <div className="relative">
          <div className="relative bg-book-paper rounded-lg overflow-hidden shadow-book aspect-[3/4]">
            <img 
              src={coverImage} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Seller info */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-smooth">
            <div className="flex items-center space-x-3">
              <img 
                src={seller.avatar} 
                alt={seller.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-gray-500">Listed by</p>
                <p className="font-medium">{seller.name}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(seller.rating) ? "text-amber-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
              <span className="ml-1 text-sm text-gray-700">{seller.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        {/* Right column - Details */}
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {genre.map(g => (
              <span key={g} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                {g}
              </span>
            ))}
            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
              {condition}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-xl text-gray-600 mb-6">by {author}</p>
          
          <div className="mb-8 prose prose-gray max-w-none">
            <p>{description}</p>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">ISBN:</span>
                <span>{isbn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Language:</span>
                <span>{language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Published:</span>
                <span>{formatDate(publishedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Page Count:</span>
                <span>{pageCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Views:</span>
                <span>{views}</span>
              </div>
            </div>
          </div>
          
          {/* Price or Auction section */}
          <div className="p-5 rounded-lg bg-gray-50 border border-gray-100">
            {isAuction && auctionData ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Bid</p>
                    <p className="text-3xl font-bold text-book-bidding">{formattedPrice}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {auctionData.bidsCount} {auctionData.bidsCount === 1 ? 'bid' : 'bids'} so far
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-gray-700 mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{timeLeft()}</span>
                    </div>
                    
                    {auctionData.highDemand && (
                      <div className="flex items-center text-amber-500">
                        <Award className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">High Demand Item</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <BidInterface book={book} />
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-3xl font-bold text-gray-900">{formattedPrice}</p>
                  <p className="flex items-center text-green-600 text-sm mt-1">
                    <Check className="w-4 h-4 mr-1" />
                    In Stock
                  </p>
                </div>
                
                <button className="px-6 py-3 bg-book-accent text-white rounded-md hover:bg-book-accent/90 transition-colors">
                  Buy Now
                </button>
              </div>
            )}
          </div>
          
          {/* Shipping notice */}
          <div className="mt-6 flex items-start space-x-3 text-gray-600">
            <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              This {isAuction ? 'auction' : 'item'} includes free shipping. Please allow 3-5 business days for delivery after {isAuction ? 'auction end' : 'purchase'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BidInterface = ({ book }: { book: Book }) => {
  const { auctionData } = book;
  
  if (!auctionData) return null;
  
  const minBid = auctionData.currentBid + 1;
  
  return (
    <div>
      <div className="flex space-x-2">
        <div className="flex-grow">
          <input
            type="number"
            min={minBid}
            step="1"
            defaultValue={minBid}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-book-accent/20 focus:border-book-accent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">Enter {minBid.toFixed(2)} or more</p>
        </div>
        <button className="px-6 py-2 bg-book-bidding text-white rounded-md hover:bg-book-bidding/90 transition-colors">
          Place Bid
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
