import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchDataFromApi, postDataToApi } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);

          // Optionally verify token with server
          try {
            const response = await fetchDataFromApi(
              "/api/users/profile",
              false
            );
            if (response.success) {
              setUser(response.data);
              localStorage.setItem("user", JSON.stringify(response.data));
            }
          } catch (error) {
            // Token might be expired, clear auth
            console.log("Token verification failed:", error.message);
            logout();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    const response = await postDataToApi(
      "/api/users/login",
      { email, password },
      false
    );

    if (response.success) {
      const { user: userData, token: authToken } = response.data;

      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);

      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true, user: userData };
    }

    throw new Error(response.message || "Login failed");
  };

  // Register function
  const register = async (userData) => {
    const response = await postDataToApi(
      "/api/users/register",
      userData,
      false
    );

    if (response.success) {
      const { user: newUser, token: authToken } = response.data;

      setToken(authToken);
      setUser(newUser);
      setIsAuthenticated(true);

      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(newUser));

      return { success: true, user: newUser };
    }

    throw new Error(response.message || "Registration failed");
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Update user profile
  const updateProfile = async (updates) => {
    const response = await fetchDataFromApi("/api/users/profile", {
      method: "PUT",
      body: JSON.stringify(updates),
    });

    if (response.success) {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      return { success: true, user: response.data };
    }

    throw new Error(response.message || "Update failed");
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
