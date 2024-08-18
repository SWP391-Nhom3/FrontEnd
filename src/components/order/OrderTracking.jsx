import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Breadcrumbs from '../elements/Breadcrumb';
// import { fetchGetOrderById } from '../../data/api';
import { useNavigate } from 'react-router-dom';
const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
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
      <div className="flex flex-col items-center p-4 w-full my-10">
        <h1 className="text-2xl font-bold mb-4">Theo dõi đơn hàng bằng mã đơn hàng</h1>
        {/* !!Handle submit at * !! */}
        <form className="flex items-center mb-4 w-full max-w-2xl" onSubmit={"*"}>
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="border p-3 h-12 rounded-l w-full"
            required
            value={orderId}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white h-12 p-3 rounded-r flex items-center justify-center"
          >
            <FaSearch className="w-6 h-6" />
          </button>
        </form>
        <h2 className="text-xl font-normal text-gray-500 mb-4">Kiểm tra mã đơn hàng thông qua email mua hàng</h2>
      </div>
    </>
  );
};

export default OrderTracking;

