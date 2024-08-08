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
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User/Users";
import AddStaff from "./pages/User/AddStaff";
import InputBills from "./pages/Warehouse/InputBills";
// import Products from "./pages/Product/Products";
import BillDetail from "./pages/Warehouse/BillDetail";
import AwaitOrderDetail from "./pages/Order/AwaitOrderDetail";
import OrderDetail from "./pages/Order/OrderDetail";
import ApprovedOrder from "./pages/Order/Orders";
import ProductsWarehouse from "./pages/Warehouse/ProductsWarehouse";

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

  // const isAuthenticatedAdmin =
  //   localStorage.getItem("isAuthenticatedAdmin") === "true";
  // const isAuthenticatedStaff =
  //   localStorage.getItem("isAuthenticatedStaff") === "true";

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/list-products" element={<ListProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>

        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard isAuthenticatedAdmin={true} />}
          />
          <Route path="/users" element={<Users />} />
          <Route path="/add-staff" element={<AddStaff />} />
          {/* <Route path="/products" element={<Products />} /> */}
          <Route path="/orders" element={<ApprovedOrder />} />
          <Route path="/await-orderDetail" element={<AwaitOrderDetail />} />
          <Route path="/order-detail" element={<OrderDetail />} />
          <Route path="/input-bills" element={<InputBills />} />
          <Route path="/bill-detail" element={<BillDetail />} />
          <Route path="/products-warehouse" element={<ProductsWarehouse />} />
        </Routes>

        {/* admin */}
        {/* <div>
          {activeMenu ? (
            <div className="sidebar dark:bg-secondary-dark-bg fixed w-72 bg-white">
              <Sidebar
                isAuthenticatedAdmin={false}
                isAuthenticatedStaff={false}
              />
            </div>
          ) : (
            <div className="dark:bg-secondary-dark-bg w-0">
              <Sidebar
                isAuthenticatedAdmin={false}
                isAuthenticatedStaff={false}
              />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "bg-main-bg dark:bg-main-dark-bg min-h-screen w-full md:ml-72"
                : "flex-2 bg-main-bg dark:bg-main-dark-bg min-h-screen w-full"
            }
          >
            <div className="navbar bg-main-bg dark:bg-main-dark-bg fixed w-full md:static">
              <Navbar isAuthenticatedAdmin={false} />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
             
            </div>
          </div>
        </div> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
