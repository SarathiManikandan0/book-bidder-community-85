
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import SellBookForm from "@/components/SellBookForm";
import Navbar from "@/components/Navbar";

const SellPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list books for sale",
        variant: "destructive"
      });
      navigate("/signin");
    }
  }, [isAuthenticated, isLoading, navigate, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-book-paper pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            Loading...
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Sell Your Books</h1>
          <p className="text-gray-600 mb-8">
            List your textbooks, novels, or any other books for sale in our community marketplace.
            Fill out the details below to get started.
          </p>
          
          <SellBookForm />
        </div>
      </main>
    </div>
  );
};

export default SellPage;
