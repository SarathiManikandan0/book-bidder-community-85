
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PricingPlans = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Basic features for casual book lovers",
      features: [
        "Browse all books",
        "Buy books directly",
        "List up to 5 books for sale",
        "Basic search filters"
      ]
    },
    {
      name: "Premium",
      price: "₹399",
      period: "month",
      description: "Enhanced features for serious readers",
      features: [
        "All Free features",
        "Priority listing placement",
        "Unlimited book listings",
        "Participate in auctions",
        "Advanced search filters",
        "Price negotiation tool",
        "No platform fees"
      ],
      featured: true
    },
    {
      name: "Academic",
      price: "₹899",
      period: "semester",
      description: "Perfect for students and educators",
      features: [
        "All Premium features",
        "Textbook price alerts",
        "Bulk discounts",
        "Campus delivery options",
        "Academic resource access",
        "Special semester deals"
      ]
    }
  ];
  
  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    
    if (!isAuthenticated) {
      navigate("/signin", { state: { returnUrl: "/pricing", selectedPlan: planName } });
      return;
    }
    
    // Here you would handle the subscription process
    // For now, just log the selection
    console.log(`Selected plan: ${planName}`);
  };
  
  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Reading Journey</h1>
          <p className="text-gray-600 text-lg">
            Select the perfect plan to enhance your book trading experience on Sharebook
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative rounded-xl overflow-hidden border transition-all ${
                plan.featured 
                  ? "border-book-accent shadow-lg transform md:-translate-y-4"
                  : "border-gray-200 hover:shadow-md hover:border-gray-300"
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-book-accent text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full ${
                    plan.featured ? "bg-book-accent hover:bg-book-accent/90" : ""
                  }`}
                >
                  {selectedPlan === plan.name ? "Plan Selected" : `Choose ${plan.name}`}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-gray-600 max-w-2xl mx-auto">
          <p>
            All plans include our base features. You can upgrade, downgrade, or cancel your subscription at any time.
            For educational institutions seeking bulk licenses, please contact our sales team.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PricingPlans;
