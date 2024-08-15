import React from "react";
import { useLocation } from "react-router-dom";

const CancelPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderCode = params.get("orderCode");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-2xl font-bold">Thanh toán bị hủy!</h1>
      <p className="mt-4 text-center">Mã đơn hàng của bạn: {orderCode}</p>
      <p className="mt-4 text-center">
        Bạn có thể thử lại thanh toán hoặc chọn phương thức khác.
      </p>
      <div className="mt-6 text-center">
        <button
          onClick={() => (window.location.href = "/checkout")}
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Thử lại thanh toán
        </button>
      </div>
    </div>
  );
};

export default CancelPage;
