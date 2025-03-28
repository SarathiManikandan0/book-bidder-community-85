
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan);
    toast({
      title: "Subscription Updated",
      description: `You are now subscribed to the ${plan} plan.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <div className="container mx-auto max-w-5xl py-24 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan that suits your book trading needs. Upgrade anytime to access premium features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="border-2 hover:border-book-accent transition-all duration-300 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-sm text-gray-500 ml-1">/month</span>
              </div>
              <CardDescription>Basic features for casual book traders</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>List up to 10 books</span>
                </li>
                <li className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>Basic search functionality</span>
                </li>
                <li className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>Message other users</span>
                </li>
                <li className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>View book details</span>
                </li>
                <li className="flex items-center opacity-50">
                  <XCircle size={18} className="text-gray-400 mr-2" />
                  <span>No access to auctions</span>
                </li>
                <li className="flex items-center opacity-50">
                  <XCircle size={18} className="text-gray-400 mr-2" />
                  <span>No priority in search results</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={selectedPlan === "Free" ? "default" : "outline"}
                onClick={() => handleSubscribe("Free")}
              >
                {selectedPlan === "Free" ? "Current Plan" : "Get Started"}
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-book-accent bg-gradient-to-b from-white to-purple-50 shadow-md scale-105 z-10">
            <CardHeader>
              <div className="bg-book-accent text-white text-xs font-semibold py-1 px-3 rounded-full w-fit">
                RECOMMENDED
              </div>
              <CardTitle className="text-2xl mt-2">Premium Plan</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$5</span>
                <span className="text-sm text-gray-500 ml-1">/month</span>
              </div>
              <CardDescription>Advanced features for serious book enthusiasts</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 size={18} className="text-book-accent mr-2" />
                  <span>Unlimited book listings</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 size={18} className="text-book-accent mr-2" />
                  <span>Priority in search results</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 size={18} className="text-book-accent mr-2" />
                  <span>Participate in rare book auctions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 size={18} className="text-book-accent mr-2" />
                  <span>Advanced analytics and insights</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 size={18} className="text-book-accent mr-2" />
                  <span>Early access to new features</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 size={18} className="text-book-accent mr-2" />
                  <span>Priority customer support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-book-accent hover:bg-book-accent/90"
                onClick={() => handleSubscribe("Premium")}
                variant={selectedPlan === "Premium" ? "default" : "default"}
              >
                {selectedPlan === "Premium" ? "Current Plan" : "Subscribe Now"}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Business Plan */}
          <Card className="border-2 hover:border-book-accent transition-all duration-300 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Business Plan</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$15</span>
                <span className="text-sm text-gray-500 ml-1">/month</span>
              </div>
              <CardDescription>For bookstores and professional sellers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>Unlimited book listings</span>
                </li>
                <li className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>Host your own auctions</span>
                </li>
                <li className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>Business analytics dashboard</span>
                </li>
                <li className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>Bulk book uploads</span>
                </li>
                <li className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>Custom storefront page</span>
                </li>
                <li className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>API access</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={selectedPlan === "Business" ? "default" : "outline"}
                onClick={() => handleSubscribe("Business")}
              >
                {selectedPlan === "Business" ? "Current Plan" : "Contact Sales"}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-4">
            All plans come with a 7-day money-back guarantee. No contracts, cancel anytime.
          </p>
          <p className="text-sm text-gray-500">
            Questions? <span className="text-book-accent cursor-pointer">Contact our sales team</span>
          </p>
        </div>
      </div>
      
      <footer className="bg-gray-100 py-6">
        <div className="container px-4 md:px-6 mx-auto text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sharebook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PricingPlans;
