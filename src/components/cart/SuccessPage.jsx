import React from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderCode = params.get("orderCode");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-2xl font-bold">Thanh toán thành công!</h1>
      <p className="mt-4 text-center">Mã đơn hàng của bạn: {orderCode}</p>
      <p className="mt-4 text-center">Cảm ơn bạn đã mua sắm!</p>
      <div className="mt-6 text-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
