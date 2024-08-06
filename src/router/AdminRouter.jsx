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

const AdminRouter = () => {
  const isAuthenticatedAdmin =
    localStorage.getItem("isAuthenticatedAdmin") === "true";

  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard isAuthenticatedAdmin={isAuthenticatedAdmin} />}
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
  );
};

export default AdminRouter;
