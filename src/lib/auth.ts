
import { toast } from "@/hooks/use-toast";

// Types for authentication
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock database of users
const mockUsers = [
  {
    id: "1",
    email: "admin@sharebook.com",
    password: "admin123",
    name: "Admin User",
    role: 'admin' as const,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250"
  },
  {
    id: "2",
    email: "user@sharebook.com",
    password: "user123",
    name: "Regular User",
    role: 'user' as const,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=250"
  }
];

// Local storage keys
const TOKEN_KEY = "sharebook_auth_token";
const USER_KEY = "sharebook_user";

// Simulate API calls with promises
const simulateApiCall = <T>(data: T, shouldSucceed: boolean = true, delay: number = 800): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(data);
      } else {
        reject(new Error("API call failed"));
      }
    }, delay);
  });
};

// Function to get stored auth data
export const getStoredAuth = (): AuthState => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    const user = userStr ? JSON.parse(userStr) : null;
    
    return {
      user,
      token,
      isAuthenticated: !!token && !!user,
      isLoading: false
    };
  } catch (error) {
    console.error("Failed to get stored auth:", error);
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    };
  }
};

// Function to store auth data
export const storeAuth = (user: User, token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Function to clear auth data
export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  try {
    // In a real app, this would be an API call to your backend
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      await simulateApiCall(null, false);
      throw new Error("Invalid credentials");
    }
    
    // Simulate API delay
    await simulateApiCall(null, true);
    
    const { password: _, ...userData } = user;
    const token = `mock-jwt-token-${userData.id}-${Date.now()}`;
    
    // Store in localStorage
    storeAuth(userData, token);
    
    toast({
      title: "Login successful",
      description: `Welcome back, ${userData.name}!`
    });
    
    return userData;
  } catch (error) {
    console.error("Login failed:", error);
    toast({
      title: "Login failed",
      description: error instanceof Error ? error.message : "Invalid credentials",
      variant: "destructive"
    });
    throw error;
  }
};

// Register function
export const register = async (email: string, password: string, name: string): Promise<User> => {
  try {
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      await simulateApiCall(null, false);
      throw new Error("Email already in use");
    }
    
    // Simulate API delay
    await simulateApiCall(null, true);
    
    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password, // In a real app, this would be hashed
      name,
      role: 'user' as const,
      avatar: `https://avatars.dicebear.com/api/initials/${encodeURIComponent(name)}.svg`
    };
    
    // Add to mock database
    mockUsers.push(newUser);
    
    const { password: _, ...userData } = newUser;
    const token = `mock-jwt-token-${userData.id}-${Date.now()}`;
    
    // Store in localStorage
    storeAuth(userData, token);
    
    toast({
      title: "Registration successful",
      description: "Your account has been created successfully"
    });
    
    return userData;
  } catch (error) {
    console.error("Registration failed:", error);
    toast({
      title: "Registration failed",
      description: error instanceof Error ? error.message : "Failed to create account",
      variant: "destructive"
    });
    throw error;
  }
};

// Logout function
export const logout = () => {
  clearAuth();
  toast({
    title: "Logged out",
    description: "You have been successfully logged out"
  });
};
