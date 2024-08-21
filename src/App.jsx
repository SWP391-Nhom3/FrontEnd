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
import Sidebar from "./components/Sidebar";
import AdminNavbar from "./components/header/AdminNavbar";
import Header from "./pages/Header";
import ProductManagement from "./pages/ProductMangement";
import AddProduct from "./pages/ProductMangement/AddProduct";
import Brands from "./pages/Brand/Brands";
import AddBrands from "./pages/Brand/AddBrands";
import Categories from "./pages/Category/Categories";
import AddCategory from "./pages/Category/AddCategory";
import AddProductBatch from "./pages/ProductMangement/AddProductBatch";
import ViewProductBatch from "./pages/ProductMangement/ViewProductBatch";
import EditProduct from "./pages/ProductMangement/EditProduct";
import AwaitOrder from "./pages/OrderManagement/AwaitOrder";
import AwaitOrderDetail from "./pages/OrderManagement/AwaitOrderDetail";
import Orders from "./pages/OrderManagement/Order";
import PreOrderPage from "./pages/PreOrder";
import PreOrderPayment from "./components/order/PreOrderPayment";
import OrderDetail from "./pages/OrderManagement/OrderDetail";
import OrderDetailCustomer from "./components/order/OrderDetailCustomer";
import CancelOrder from "./pages/OrderManagement/CancelOrder";
import CompleteOrder from "./pages/OrderManagement/CompleteOrder";
import ShippingOrder from "./pages/OrderManagement/ShippingOrder";
import ShippingOrderDetail from "./pages/OrderManagement/ShippingOrderDetail";
import CancelShippingOrder from "./pages/OrderManagement/CancelShippingOrder";
import PreOrder from "./pages/OrderManagement/PreOrder";
import Users from "./pages/User/Users";
import AddStaff from "./pages/User/AddStaff";
import MainFooter from "../src/components/Footer/index";
import { useStateContext } from "./context/ContextProvider";
import Profile from "./pages/Profile";
import EditProfile from "./components/profile/EditProfile";
import ChangePassword from "./components/profile/ChangePassword";
import HistoryOrder from "./components/profile/HistoryOrder";
import Feedback from "./components/profile/Feedback";
import Accumulate from "./components/profile/Accumulate";
import Authenticate from "./pages/Auth/Google/Authenticate";
import ProductsWarehouse from "./pages/Warehouse/ProductsWarehouse";
import News from "./pages/News";
import NewsDetail from "./pages/News/NewsDetail";
import OrderTracking from "./components/order/OrderTracking";
import AllFeedback from "./pages/Feedback/AllFeedback";
import BadFeedback from "./pages/Feedback/BadFeedback";
import Customers from "./pages/Customer/Customers";
import AddNews from "./pages/News/AddNews";
import EditNews from "./pages/News/EditNews";
import AllNews from "./pages/News/AllNews";
import "./App.css";
import AddShipper from "./pages/User/AddShipper";
import Reports from "./components/profile/Reports";

const App = () => {
  const { currentMode, activeMenu, themeSettings } = useStateContext();

  const accessToken = localStorage.getItem("accessToken") || null;

  // useEffect(() => {
  //   const checkToken = async () => {
  //     if (accessToken !== null) {
  //       await fetchRefreshToken(accessToken).then((res) => {
  //         localStorage.setItem("accessToken", res.data.accessToken);
  //       });
  //     }
  //   };
  //   checkToken();
  // }, [accessToken]);

  const isAuthenticatedAdmin = localStorage.getItem("isAdmin") === "true";
  const isAuthenticatedStaff = localStorage.getItem("isStaff") === "true";
  const isAuthenticatedShipper = localStorage.getItem("isShipper") === "true";

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
                  <Route path="/" element={<AwaitOrder />} />
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
                  <Route path="/product" element={<EditProduct />} />
                  <Route path="/await-order" element={<AwaitOrder />} />
                  <Route path="/shipping-order" element={<ShippingOrder />} />
                  <Route
                    path="/shipping-orderDetail"
                    element={<ShippingOrderDetail />}
                  />
                  <Route
                    path="/cancel-shipping-order"
                    element={<CancelShippingOrder />}
                  />
                  <Route path="/preorder" element={<PreOrder />} />
                  <Route
                    path="/await-order-detail"
                    element={<AwaitOrderDetail />}
                  />
                  <Route path="/cancel-order" element={<CancelOrder />} />
                  <Route path="/complete-order" element={<CompleteOrder />} />
                  <Route path="/order-detail" element={<OrderDetail />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/all-feedback" element={<AllFeedback />} />
                  <Route path="/bad-feedback" element={<BadFeedback />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/all-blog" element={<AllNews />} />
                  <Route path="/add-news" element={<AddNews />} />
                  <Route path="/edit-news" element={<EditNews />} />
                </Routes>
              </div>
            </div>
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
                    path="/"
                    element={
                      <Dashboard isAuthenticatedAdmin={isAuthenticatedAdmin} />
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard isAuthenticatedAdmin={isAuthenticatedAdmin} />
                    }
                  />
                  <Route path="/users" element={<Users />} />
                  <Route path="/add-staff" element={<AddStaff />} />
                  <Route path="/add-shipper" element={<AddShipper />} />
                  <Route path="/products" element={<ProductManagement />} />
                  <Route
                    path="/products-warehouse"
                    element={<ProductsWarehouse />}
                  />
                </Routes>
              </div>
            </div>
          </>
        ) : isAuthenticatedShipper ? (
          <>
            <div className="dark:bg-main-dark-bg relative flex">
              {activeMenu ? (
                <div className="sidebar dark:bg-secondary-dark-bg fixed w-72 bg-white">
                  <Sidebar isAuthenticatedShipper={isAuthenticatedShipper} />
                </div>
              ) : (
                <div className="dark:bg-secondary-dark-bg w-0">
                  <Sidebar isAuthenticatedShipper={isAuthenticatedShipper} />
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
                  <AdminNavbar
                    isAuthenticatedShipper={isAuthenticatedShipper}
                  />
                </div>

                <Routes>
                  <Route path="/" element={<ShippingOrder />} />
                  <Route path="/shipping-order" element={<ShippingOrder />} />
                  <Route path="/complete-order" element={<CompleteOrder />} />
                  <Route
                    path="/cancel-shipping-order"
                    element={<CancelShippingOrder />}
                  />
                  <Route
                    path="/shipping-orderDetail"
                    element={<ShippingOrderDetail />}
                  />
                  <Route path="/order-detail" element={<OrderDetail />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <div className="container mx-auto px-2 py-4">
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
              <Route path="/pre-order" element={<PreOrderPage />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/pre-order-payment" element={<PreOrderPayment />} />
              <Route path="/thanks" element={<Thanks />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="/about_us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/exchange_policy" element={<ExchangePolicy />} />
              <Route path="/privacy_policy" element={<PrivacyPolicy />} />
              <Route
                path="/order-detail-customer"
                element={<OrderDetailCustomer />}
              />
              <Route path="/authenticate" element={<Authenticate />} />
              <Route path="/profile" element={<Profile />}>
                <Route path="" element={<EditProfile />} />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="history-order" element={<HistoryOrder />} />
                <Route path="my-feedback" element={<Feedback />} />
                <Route path="accumulated-points" element={<Accumulate />} />
                <Route path="my-reports" element={<Reports />} />
              </Route>
              <Route path="/news" element={<News />} />
              <Route path="/news-detail" element={<NewsDetail />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
            </Routes>
            <MainFooter />
          </div>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
