import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import SiginIn from "./pages/Auth/Login";
import SiginUp from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Payment from "./components/order/Payment";
import Thanks from "./components/order/Thanks";
import Filter from "./pages/Filter/Filter";
import AboutUs from "./pages/InformationPage/AboutUs";
import ExchangePolicy from "./pages/InformationPage/ExchangePolicy";
import PrivacyPolicy from "./pages/InformationPage/PrivacyPolicy";
import Contact from "./pages/InformationPage/Contact";
import ListProduct from "./components/product/ListProduct";
import Dashboard from "./pages/Dashboard";
import AddVoucher from "./pages/Voucher/AddVoucher";
import VouchersBatch from "./pages/Voucher/VouchersBatch";
import Vouchers from "./pages/Voucher/Vouchers";
import { useStateContext } from "./context/ContextProvider";
import Sidebar from "./components/Sidebar";
import AdminFooter from "./components/Footer/AdminFooter";
import AdminNavbar from "./components/header/AdminNavbar";
import Header from "./pages/Header";

import "./App.css";
import ProductManagement from "./pages/ProductMangement";
import AddProduct from "./pages/ProductMangement/AddProduct";
import Brands from "./pages/Brand/Brands";
import AddBrands from "./pages/Brand/AddBrands";
import Categories from "./pages/Category/Categories";
import AddCategory from "./pages/Category/AddCategory";
import AddProductBatch from "./pages/ProductMangement/AddProductBatch";
import ViewProductBatch from "./pages/ProductMangement/ViewProductBatch";
import EditProduct from "./pages/ProductMangement/EditProduct";

const App = () => {
  const { currentMode, activeMenu, themeSettings } = useStateContext();

  const result = JSON.parse(localStorage.getItem("result")) || null;
  useEffect(() => {
    const checkToken = async () => {
      // if (result !== null) {
      //   await fetchRefreshToken(result)
      //     .then((res) => {
      //       localStorage.setItem("result", JSON.stringify(res.data.result));
      //     })
      //     .catch((error) => {
      //       localStorage.clear();
      //       window.location.reload();
      //     });
      // }
    };
    checkToken();
  }, []);

  const isAuthenticatedAdmin = localStorage.getItem("isAdmin") === "true";
  const isAuthenticatedStaff = localStorage.getItem("isStaff") === "true";
  return (
    <div>
      <BrowserRouter>
        {isAuthenticatedStaff ? (
          <>
            <div className="dark:bg-main-dark-bg relative flex">
              {activeMenu ? (
                <div className="sidebar dark:bg-secondary-dark-bg fixed w-72 bg-white">
                  <Sidebar isAuthenticatedStaff={isAuthenticatedStaff} />
                </div>
              ) : (
                <div className="dark:bg-secondary-dark-bg w-0">
                  <Sidebar isAuthenticatedStaff={isAuthenticatedStaff} />
                </div>
              )}
              <div
                className={
                  activeMenu
                    ? "dark:bg-main-dark-bg bg-main-bg min-h-screen w-full md:ml-72"
                    : "bg-main-bg dark:bg-main-dark-bg flex-2 min-h-screen w-full"
                }
              >
                <div className="bg-main-bg dark:bg-main-dark-bg navbar fixed w-full md:static">
                  <AdminNavbar isAuthenticatedStaff={isAuthenticatedStaff} />
                </div>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard isAuthenticatedStaff={isAuthenticatedStaff} />
                    }
                  />
                  <Route path="/products" element={<ProductManagement />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/voucher-batch" element={<VouchersBatch />} />
                  <Route path="/add-voucher" element={<AddVoucher />} />
                  <Route path="/voucher-batch/:id" element={<Vouchers />} />
                  <Route
                    path="/add-product-batch"
                    element={<AddProductBatch />}
                  />
                  <Route path="/product-batch" element={<ViewProductBatch />} />
                  <Route path="/brands" element={<Brands />} />
                  <Route path="/add-brand" element={<AddBrands />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/add-category" element={<AddCategory />} />
                </Routes>
              </div>
                <Route path="/products" element={<ProductManagement />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/add-product-batch" element={<AddProductBatch />} />
                <Route path="/product-batch" element={<ViewProductBatch />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/add-brand" element={<AddBrands />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/add-category" element={<AddCategory />} />
                <Route path="/product" element ={<EditProduct />} />
            </div>
            <AdminFooter />
          </>
        ) : isAuthenticatedAdmin ? (
          <>
            <div className="dark:bg-main-dark-bg relative flex">
              {activeMenu ? (
                <div className="sidebar dark:bg-secondary-dark-bg fixed w-72 bg-white">
                  <Sidebar isAuthenticatedAdmin={isAuthenticatedAdmin} />
                </div>
              ) : (
                <div className="dark:bg-secondary-dark-bg w-0">
                  <Sidebar isAuthenticatedAdmin={isAuthenticatedAdmin} />
                </div>
              )}
              <div
                className={
                  activeMenu
                    ? "dark:bg-main-dark-bg bg-main-bg min-h-screen w-full md:ml-72"
                    : "bg-main-bg dark:bg-main-dark-bg flex-2 min-h-screen w-full"
                }
              >
                <div className="bg-main-bg dark:bg-main-dark-bg navbar fixed w-full md:static">
                  <AdminNavbar isAuthenticatedAdmin={isAuthenticatedAdmin} />
                </div>

                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard isAuthenticatedAdmin={isAuthenticatedAdmin} />
                    }
                  />
                </Routes>
              </div>
            </div>
            <AdminFooter />
          </>
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<SiginIn />} />
              <Route path="/product" element={<Product />} />
              <Route path="/register" element={<SiginUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/list-products" element={<ListProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/thanks" element={<Thanks />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="/about_us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/exchange_policy" element={<ExchangePolicy />} />
              <Route path="/privacy_policy" element={<PrivacyPolicy />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
