import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "consultant";
  location?: string;
  phone?: string;
  createdAt: string;
  lastActive: string;
  status: "active" | "suspended" | "pending";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users database (in real app, this would come from backend)
  const mockUsers: Record<string, User> = {
    "admin@wisebox.com": {
      id: "admin-1",
      name: "System Administrator",
      email: "admin@wisebox.com",
      role: "admin",
      location: "System",
      phone: "+1-800-WISEBOX",
      createdAt: "2024-01-01",
      lastActive: "Just now",
      status: "active"
    },
    "ahmed.rahman@email.com": {
      id: "user-1",
      name: "Ahmed Rahman",
      email: "ahmed.rahman@email.com",
      role: "user",
      location: "Toronto, Canada",
      phone: "+1-416-555-0123",
      createdAt: "2024-01-15",
      lastActive: "5 minutes ago",
      status: "active"
    },
    "consultant@wisebox.com": {
      id: "consultant-1", 
      name: "Dr. Sarah Khan",
      email: "consultant@wisebox.com",
      role: "consultant",
      location: "Dhaka, Bangladesh",
      phone: "+880-1234-567890",
      createdAt: "2024-01-10",
      lastActive: "2 hours ago",
      status: "active"
    }
  };

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("wisebox_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers[email];
    if (foundUser && foundUser.status === "active") {
      setUser(foundUser);
      localStorage.setItem("wisebox_user", JSON.stringify(foundUser));
    } else {
      throw new Error("Invalid credentials or account suspended");
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("wisebox_user");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export mock users for admin management
export const getAllUsers = (): User[] => {
  return [
    {
      id: "admin-1",
      name: "System Administrator", 
      email: "admin@wisebox.com",
      role: "admin",
      location: "System",
      phone: "+1-800-WISEBOX",
      createdAt: "2024-01-01",
      lastActive: "Just now",
      status: "active"
    },
    {
      id: "user-1",
      name: "Ahmed Rahman",
      email: "ahmed.rahman@email.com", 
      role: "user",
      location: "Toronto, Canada",
      phone: "+1-416-555-0123",
      createdAt: "2024-01-15",
      lastActive: "5 minutes ago",
      status: "active"
    },
    {
      id: "user-2",
      name: "Fatima Khatun",
      email: "fatima.khatun@email.com",
      role: "user", 
      location: "London, UK",
      phone: "+44-20-7946-0958",
      createdAt: "2024-01-20",
      lastActive: "1 day ago",
      status: "active"
    },
    {
      id: "consultant-1",
      name: "Dr. Sarah Khan",
      email: "consultant@wisebox.com",
      role: "consultant",
      location: "Dhaka, Bangladesh", 
      phone: "+880-1234-567890",
      createdAt: "2024-01-10",
      lastActive: "2 hours ago",
      status: "active"
    },
    {
      id: "consultant-2",
      name: "Advocate Rafiq Uddin",
      email: "rafiq.legal@email.com",
      role: "consultant",
      location: "Chittagong, Bangladesh",
      phone: "+880-1876-543210", 
      createdAt: "2024-01-12",
      lastActive: "6 hours ago",
      status: "active"
    },
    {
      id: "user-3",
      name: "Mohammad Ali",
      email: "mohammad.ali@email.com",
      role: "user",
      location: "New York, USA",
      phone: "+1-212-555-0199",
      createdAt: "2024-02-01",
      lastActive: "3 days ago", 
      status: "suspended"
    }
  ];
};