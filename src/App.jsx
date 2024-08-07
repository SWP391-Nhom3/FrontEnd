import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { Navbar, Sidebar, ThemeSettings } from "./components";
import { useStateContext } from "./context/ContextProvider";

import "./App.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "antd/dist/reset.css";

import AdminRouter from "./router/AdminRouter";
import AuthRouter from "./router/AuthRouter";

import Header from "./pages/Header";
import Home from "./pages/Home";
import MainFooter from "./components/Footer";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Payment from "./components/order/Payment";
import Thanks from "./components/order/Thanks";
import ListProduct from "./components/product/ListProduct";

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

  const isAuthenticatedAdmin =
    localStorage.getItem("isAuthenticatedAdmin") === "true";
  const isAuthenticatedStaff =
    localStorage.getItem("isAuthenticatedStaff") === "true";

  return (
    <div>
      <BrowserRouter>
        <div className="dark:bg-main-dark-bg relative flex">
          {isAuthenticatedStaff ? (
            <>
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
                  <Navbar isAuthenticatedStaff={isAuthenticatedStaff} />
                </div>
                <div>
                  {themeSettings && <ThemeSettings />}
                  {/* <StaffRouter /> */}
                </div>
              </div>
            </>
          ) : isAuthenticatedAdmin ? (
            <>
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
                  <Navbar isAuthenticatedAdmin={isAuthenticatedAdmin} />
                </div>
                <div>
                  {themeSettings && <ThemeSettings />}
                  <AdminRouter />
                </div>
              </div>
            </>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar isAuthenticatedAdmin={true} />
            </div>
          )}
        </div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/list-products" element={<ListProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
        <MainFooter />
      </BrowserRouter>
    </div>
  );
};

export default App;
