import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import Register from "./pages/SignUp/Register";
import ForgotPassword from "./pages/Login/ForgotPassword";
import ProductView from "./components/Product/ProductView/ProductView";
import ProductUpload from "./components/Product/ProductUpload/ProductUpload";
import ProductList from "./components/Product/ProductList/ProductList";
import CategoryAdd from "./components/Category/CategoryAdd";
import CategoryList from "./components/Category/CategoryList";
import ProductEdit from "./components/Product/ProductEdit/ProductEdit";
import SubCatList from "./components/SubCategory/SubCatList";
import SubCategoryAdd from "./components/SubCategory/AddSubCat";
import "sweetalert2/dist/sweetalert2.min.css";

const MyContext = createContext();

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/signup";
  const isForgotPasswordPage = location.pathname === "/forgotpassword";

  const hideHeaderAndSidebar =
    isLoginPage || isRegisterPage || isForgotPasswordPage;

  return (
    <MyContext.Provider value={{ isToggleSidebar, setIsToggleSidebar }}>
      {!hideHeaderAndSidebar && <Header />}
      <div className={`${!hideHeaderAndSidebar ? "mt-[75px] flex" : ""}`}>
        {/* Sidebar */}
        {!hideHeaderAndSidebar && (
          <div
            className={`transition-all duration-300 ease-in-out ${
              isToggleSidebar ? "w-0 overflow-hidden" : "w-[15%] flex-shrink-0"
            }`}
          >
            <Sidebar />
          </div>
        )}

        {/* Main Content */}
        <div
          className={`transition-all duration-300 ease-in-out flex-grow ${
            isToggleSidebar ? "ml-0" : ""
          }`}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/product-view/:productId" element={<ProductView />} />
            <Route path="/product-upload" element={<ProductUpload />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product-edit/:productId" element={<ProductEdit />} />
            <Route path="/add-a-category" element={<CategoryAdd />} />
            <Route path="/category-list" element={<CategoryList />} />
            <Route path="/sub-category-list" element={<SubCatList />} />
            <Route path="/add-sub-category" element={<SubCategoryAdd />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default AppWrapper;
export { MyContext };
