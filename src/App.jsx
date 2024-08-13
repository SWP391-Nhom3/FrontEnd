import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/main/index";
import SiginIn from "./pages/Auth/Login";
import SiginUp from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
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
import Sidebar from "./components/Sidebar";
import AdminFooter from "./components/Footer/AdminFooter";
import AdminNavbar from "./components/header/AdminNavbar";
import Header from "./pages/Header";
import GuestGuard from "./guards/GuestGuard";
import DashboardLayout from "./layouts/dashboard/index";
import Authenticate from "./pages/Auth/Google/Authenticate";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { element: <Home />, index: true },
      { path: "/list-products", element: <Product /> },
      {
        path: "/login",
        element: (
          <GuestGuard>
            <SiginIn />
          </GuestGuard>
        ),
      },
      {
        path: "/authenticate",
        element: <Authenticate />,
      },
    ],
  },
]);

export default router;
