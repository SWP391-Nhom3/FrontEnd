import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/User/Users";
import AddStaff from "../pages/User/AddStaff";
import InputBills from "../pages/Warehouse/InputBills";
// import Products from "../pages/Product/Products";
import BillDetail from "../pages/Warehouse/BillDetail";
import AwaitOrderDetail from "../pages/Order/AwaitOrderDetail";
import OrderDetail from "../pages/Order/OrderDetail";
import ApprovedOrder from "../pages/Order/Orders";
import ProductsWarehouse from "../pages/Warehouse/ProductsWarehouse";
import { Navbar, Sidebar, ThemeSettings } from "../components";
import { useStateContext } from "../context/ContextProvider";

const AdminRouter = () => {
  const { currentMode, activeMenu, themeSettings } = useStateContext();

  const isAuthenticatedAdmin =
    localStorage.getItem("isAuthenticatedAdmin") === "true";

  return (
    <div>
      {activeMenu ? (
        <div className="sidebar dark:bg-secondary-dark-bg fixed w-72 bg-white">
          <Sidebar isAuthenticatedAdmin={true} />
        </div>
      ) : (
        <div className="dark:bg-secondary-dark-bg w-0">
          <Sidebar isAuthenticatedAdmin={true} />
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
          <Navbar isAuthenticatedAdmin={true} />
        </div>
        <div>{themeSettings && <ThemeSettings />}</div>
      </div>
    </div>
  );
};

export default AdminRouter;
