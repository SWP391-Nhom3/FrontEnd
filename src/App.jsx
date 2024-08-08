import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import SiginIn from "./pages/Auth/Login";
import SiginUp from "./pages/Auth/Register";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Payment from "./components/order/Payment";
import Thanks from "./components/order/Thanks";
import AboutUs from "./pages/InformationPage/AboutUs";
import ExchangePolicy from "./pages/InformationPage/ExchangePolicy";
import PrivacyPolicy from "./pages/InformationPage/PrivacyPolicy";
import Contact from "./pages/InformationPage/Contact";
import ListProduct from "./components/product/ListProduct";
import Dashboard from "./pages/Dashboard";
import { useStateContext } from "./context/ContextProvider";

import "./App.css";

const App = () => {
  const { currentMode, activeMenu } = useStateContext();

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SiginIn />} />
          <Route path="/product" element={<Product />} />
          <Route path="/register" element={<SiginUp />} />
          <Route path="/list-products" element={<ListProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/exchange_policy" element={<ExchangePolicy />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route
            path="/dashboard"
            element={<Dashboard isAuthenticatedAdmin={true} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
