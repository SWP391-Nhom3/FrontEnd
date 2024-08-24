import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { fetchCreateOrder } from "../../data/api";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCartContext();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const isApiCalled = useRef(false); // Sử dụng useRef để lưu trạng thái của API call

  useEffect(() => {
    const processOrder = async () => {
      const pendingOrder = localStorage.getItem("pendingOrder");
      const orderCreated = localStorage.getItem("orderCreated");

      console.log("Pending Order:", pendingOrder);
      console.log("Order Created:", orderCreated);

      if (pendingOrder && !orderCreated && !isApiCalled.current) {
        isApiCalled.current = true; // Đặt cờ để ngăn chặn gọi API liên tiếp
        const order_infor = JSON.parse(pendingOrder);
        try {
          console.log("Attempting to create order...");
          await fetchCreateOrder(order_infor);
          console.log("Order created successfully.");

          localStorage.setItem("orderCreated", "true"); // Đánh dấu đơn hàng đã được tạo
          localStorage.removeItem("pendingOrder"); // Xóa thông tin đơn hàng trong localStorage
          clearCart(); // Xóa giỏ hàng
          setLoading(false);
        } catch (error) {
          console.error("Error creating order:", error);
          setErrorMessage(
            "Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.",
          );
          setLoading(false);
        }
      }
    };

    processOrder();
  }, [clearCart]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">
            Đang xử lý đơn hàng, vui lòng đợi...
          </p>
        </div>
      ) : errorMessage ? (
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <strong className="font-bold">Lỗi: </strong>
          <span className="block sm:inline">{errorMessage}</span>
          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none"
          >
            Về trang chủ
          </button>
        </div>
      ) : (
        <div className="rounded-lg bg-white p-6 text-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2l4 -4"
            />
          </svg>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Thanh toán thành công!
          </h1>
          <p className="mt-2 text-gray-600">Cảm ơn bạn đã mua hàng.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none"
          >
            Về trang chủ
          </button>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
