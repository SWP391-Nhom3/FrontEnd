import { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import Breadcrumbs from "../elements/Breadcrumb";
// import { fetchGetOrderById } from '../../data/api';
import { useNavigate } from "react-router-dom";
const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };
  //!! FETCH ORDER BY ID !!
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetchGetOrderById(orderId);
  //     toast.success("Tìm thành công đơn hàng");
  //     navigate(`/order-detail`, { state: { order: res.data.result } });
  //     console.log(res.data.result);
  //   } catch {
  //     toast.error("Không tìm thấy đơn hàng");
  //   }
  // };

  return (
    <>
      <Breadcrumbs headline="Theo dõi đơn hàng" />
      <div className="my-10 flex w-full flex-col items-center p-4">
        <h1 className="mb-4 text-2xl font-bold">
          Theo dõi đơn hàng bằng mã đơn hàng
        </h1>
        {/* !!Handle submit at * !! */}
        <form
          className="mb-4 flex w-full max-w-2xl items-center"
          onSubmit={"*"}
        >
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="h-12 w-full rounded-l border p-3"
            required
            value={orderId}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="flex h-12 items-center justify-center rounded-r bg-blue-500 p-3 text-white"
          >
            <FaSearch className="h-6 w-6" />
          </button>
        </form>
        <h2 className="mb-4 text-xl font-normal text-gray-500">
          Kiểm tra mã đơn hàng thông qua email mua hàng
        </h2>
      </div>
    </>
  );
};

export default OrderTracking;
