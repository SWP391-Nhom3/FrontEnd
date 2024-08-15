import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/main/index";
import SiginIn from "./pages/Auth/Login";
import Home from "./pages/Home";
import GuestGuard from "./guards/GuestGuard";
import AuthGuard from "./guards/AuthGuard";
import DashboardLayout from "./layouts/dashboard/index";
import Authenticate from "./pages/Auth/Google/Authenticate";
import Products from "./pages/dashboard/Product/ProductManagementPage";
import CreateProductForm from "./pages/dashboard/Product/CreateProductForm";
import CreateBatchForm from "./pages/dashboard/Batch/CreateBatchForm";
import Cart from "./pages/Cart/index";
import CheackoutPage from "./components/cart/CheckoutPage";
import SuccessPage from "./components/cart/SuccessPage";
import CancelPage from "./components/cart/CancelPage";
import OrderInfor from "./components/order/OrderInfor";
import Product from "./pages/Product/index";

import "./App.css";
import { element } from "prop-types";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { element: <Products />, index: true },
      { path: "/dashboard/products", element: <Products /> },
      { path: "/dashboard/product/add", element: <CreateProductForm /> },
      { path: "/dashboard/batches/add", element: <CreateBatchForm /> },
    ],
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
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: (
          <AuthGuard>
            <CheackoutPage />
          </AuthGuard>
        ),
      },
      {
        path: "/order",
        element: (
          <AuthGuard>
            <OrderInfor />
          </AuthGuard>
        ),
      },
      { path: "/product", element: <Product /> },
      {
        path: "/authenticate",
        element: <Authenticate />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
      { path: "/cancel", element: <CancelPage /> },
    ],
  },
]);

export default router;
