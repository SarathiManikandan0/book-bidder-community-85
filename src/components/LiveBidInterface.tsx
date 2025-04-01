
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, Award } from 'lucide-react';
import { Book } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { BookService } from '@/lib/bookService';

interface LiveBidInterfaceProps {
  book: Book;
}

const LiveBidInterface = ({ book }: LiveBidInterfaceProps) => {
  const { auctionData } = book;
  const [bidAmount, setBidAmount] = useState<number | ''>('');
  const [currentBid, setCurrentBid] = useState(auctionData?.currentBid || 0);
  const [bidsCount, setBidsCount] = useState(auctionData?.bidsCount || 0);
  const [timeLeft, setTimeLeft] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Calculate minimum bid (current bid + 1)
  const minBid = currentBid + 1;
  
  // Function to calculate and update time left
  const updateTimeLeft = () => {
    if (!auctionData) return '';
    
    const end = new Date(auctionData.endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) {
      setTimeLeft('Auction ended');
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    let timeString = '';
    if (days > 0) timeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    else if (hours > 0) timeString = `${hours}h ${minutes}m ${seconds}s`;
    else timeString = `${minutes}m ${seconds}s`;
    
    setTimeLeft(timeString);
  };
  
  // Simulate polling for new bids
  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(updateTimeLeft, 1000);
    
    // Simulate polling for bid updates every 5 seconds
    const bidPollInterval = setInterval(() => {
      // In a real app, this would be an API call to get latest bid
      console.log('Polling for latest bid data...');
      
      // For this demo, randomly update the bid (1 in 5 chance)
      if (Math.random() < 0.2 && auctionData) {
        const newBid = currentBid + Math.floor(Math.random() * 5) + 1;
        setCurrentBid(newBid);
        setBidsCount(prevCount => prevCount + 1);
        
        toast({
          title: "New bid!",
          description: `Someone just bid ${BookService.formatPrice(newBid)}`,
          variant: "default",
        });
      }
    }, 5000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(bidPollInterval);
    };
  }, [currentBid, auctionData, toast]);
  
  // Handle bid submission
  const handleBid = () => {
    if (!bidAmount || bidAmount <= currentBid) {
      toast({
        title: "Invalid bid",
        description: `Your bid must be at least ${BookService.formatPrice(minBid)}`,
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentBid(Number(bidAmount));
      setBidsCount(prevCount => prevCount + 1);
      setBidAmount('');
      setLoading(false);
      
      toast({
        title: "Bid placed!",
        description: `Your bid of ${BookService.formatPrice(Number(bidAmount))} was successful`,
        variant: "default",
      });
    }, 1000);
  };
  
  if (!auctionData) return null;
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <p className="text-sm text-gray-500">Current Bid</p>
          <p className="text-3xl font-bold text-book-bidding">{BookService.formatPrice(currentBid)}</p>
          <p className="text-sm text-gray-500 mt-1">
            {bidsCount} {bidsCount === 1 ? 'bid' : 'bids'} so far
          </p>
        </div>
        
        <div className="flex flex-col items-start sm:items-end">
          <div className="flex items-center text-gray-700 mb-1">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{timeLeft}</span>
          </div>
          
          {auctionData.highDemand && (
            <div className="flex items-center text-amber-500">
              <Award className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">High Demand Item</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-grow">
          <Input
            type="number"
            min={minBid}
            step="1"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value ? Number(e.target.value) : '')}
            placeholder={`${BookService.formatPrice(minBid)} or more`}
            className="w-full"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">Enter {BookService.formatPrice(minBid)} or more</p>
        </div>
        <Button 
          className="bg-book-bidding hover:bg-book-bidding/90"
          onClick={handleBid}
          disabled={loading || !bidAmount || bidAmount <= currentBid}
        >
          {loading ? (
            <span className="flex items-center">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Place Bid
            </span>
          )}
        </Button>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 p-3 rounded-md text-amber-800 text-sm">
        <p className="flex items-start">
          <Award className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
          <span>This book is in high demand with multiple interested bidders. Bid now to secure your chance.</span>
        </p>
      </div>
    </div>
  );
};

export default LiveBidInterface;
