import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import axios from "axios";
import Footer from "./pages/Footer";
import Product from "./pages/Product";
import Cart from "./pages/Cart/Cart";
import SignIn from "./pages/Login/Login";
import Listing from "./pages/Listing/Listing";
import Profile from "./pages/Profile/Profile";
import Checkout from "./pages/Checkout/Checkout";
import PaymentResult from "./pages/Checkout/PaymentResult";
import Orders from "./pages/Orders/Orders";
import OrderDetail from "./pages/Orders/OrderDetail";
import "sweetalert2/dist/sweetalert2.min.css";
import { showError } from "./utils/sweetAlert";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Context for sharing data across components
const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  
  // User authentication state
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // Initialize user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLogin(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,cca2,flags"
        );
        setCountryList(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        showError(
          "Failed to Load Countries",
          "Could not load country list. Some features may not work properly."
        );
      }
    };

    fetchCountries();
  }, []);

  // Login function
  const login = (userData, token) => {
    setUser(userData);
    setIsLogin(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const values = {
    countryList,
    setCountryList,
    selectedCountry,
    setSelectedCountry,
    // Auth
    user,
    setUser,
    isLogin,
    setIsLogin,
    login,
    logout,
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <MyContext.Provider value={values}>
              <Header />
              <Routes>
                <Route path="/" exact={true} element={<Home />} />
                <Route path="/signIn" exact={true} element={<SignIn />} />
                <Route path="/login" exact={true} element={<SignIn />} />
                <Route path="/cat/:id" exact={true} element={<Listing />} />
                <Route path="/product/:id" exact={true} element={<Product />} />
                <Route path="/cart" exact={true} element={<Cart />} />
                <Route path="/checkout" exact={true} element={<Checkout />} />
                <Route path="/payment/result" exact={true} element={<PaymentResult />} />
                <Route path="/orders" exact={true} element={<Orders />} />
                <Route path="/orders/:orderId" exact={true} element={<OrderDetail />} />
                <Route path="/profile" exact={true} element={<Profile />} />
              </Routes>
              <Footer />
            </MyContext.Provider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
