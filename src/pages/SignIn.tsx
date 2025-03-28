
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeft, LogIn, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-book-paper flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-book-accent transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>Back to Home</span>
          </Link>
        </div>
      
        <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-smooth p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Sign In to Sharebook</h1>
            <p className="text-gray-600 mt-1">Enter your details to access your account</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        autoComplete="email"
                        disabled={isLoading}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your password" 
                        type="password" 
                        autoComplete="current-password"
                        disabled={isLoading}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-sm text-right">
                <Link to="/forgot-password" className="text-book-accent hover:underline">
                  Forgot Password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-book-accent hover:underline font-medium">
              Sign Up
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Demo accounts: 
            </p>
            <p className="text-xs text-gray-500">
              Admin: admin@sharebook.com / admin123
            </p>
            <p className="text-xs text-gray-500">
              User: user@sharebook.com / user123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
