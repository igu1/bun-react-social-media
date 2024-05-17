import { apiRoute } from "@/api/api";
import React, { useEffect } from "react";
import { z } from 'zod';
import { userSchema, createUserSchema } from "@server/routes/auth";

interface AuthContextValue {
  isAuthenticated: boolean;
  user: any;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
  setUser: (user: any) => void;
  signUp: (data: SignUp) => void;
}

const AuthContext = React.createContext<AuthContextValue>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  setUser: () => {},
  signUp: () => {},
});

type User = z.infer<typeof userSchema>;
type SignUp = z.infer<typeof createUserSchema>;

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (data: { email: string; password: string }) => {
    await apiRoute.auth.login.$post({ json: data }).then(async (res) => {
      if (!res) {
        throw new Error("Server Error");
      }
      if (res.status === 401) {
        return alert("Invalid Credentials");
      }
      const { data } = await res.json();
      if (!data) {
        throw new Error("Server Error");
      }
      localStorage.setItem("user", JSON.stringify(data));
      setIsAuthenticated(true);
      setUser(data as User);
    })
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  const signUp = async (data: SignUp) => {
    await apiRoute.auth.signup.$post({ json: data }).then(async (res) => {
      if (!res) {
        throw new Error("Server Error");
      }
      const { data } = await res.json();
      if (!data) {
        throw new Error("Server Error");
      }
      setIsAuthenticated(true);
      setUser(data as User);
      localStorage.setItem("user", JSON.stringify(data));
    });
  };

  const contextValue: AuthContextValue = {
    isAuthenticated,
    user,
    login,
    logout,
    setUser,
    signUp
  };

  return contextValue;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authContext = useAuth();

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { useAuth };
