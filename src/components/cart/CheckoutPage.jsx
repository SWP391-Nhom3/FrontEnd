import React, { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required("Họ và tên là bắt buộc"),
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ"),
  address: yup.string().required("Địa chỉ giao hàng là bắt buộc"),
  paymentMethod: yup
    .string()
    .oneOf(["cod", "bank"], "Chọn phương thức thanh toán"),
});

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCartContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Initialize React Hook Form with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      if (data.paymentMethod === "cod") {
        // Save order information without redirecting to payment gateway
        await axios.post("/orders/save", {
          customerInfo: data,
          cartItems,
          paymentMethod: "COD",
          totalPrice,
        });
        clearCart();
        alert("Đơn hàng của bạn đã được ghi nhận. Thanh toán khi nhận hàng.");
        navigate("/success"); // Redirect to success page
      } else if (data.paymentMethod === "bank") {
        // Redirect to payment gateway
        const response = await axios.post("/checkout/create-payment-link", {
          baseUrl: window.location.origin,
          productName: cartItems.map((item) => item.name).join(", "),
          price: totalPrice,
        });

        if (response.status === 200) {
          // Save order information temporarily and navigate to payment page
          sessionStorage.setItem(
            "pendingOrder",
            JSON.stringify({ customerInfo: data, cartItems, totalPrice }),
          );
          window.location.href = response.data; // Redirect to payment gateway
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại sau.");
      navigate("/checkout"); // Redirect to failure page
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">Thanh toán</h1>
      <div className="flex flex-col lg:flex-row">
        {/* Phần bên trái: Đơn hàng */}
        <div className="w-full rounded-lg bg-white p-4 shadow-md lg:w-2/3">
          <h2 className="mb-4 text-lg font-semibold">Đơn hàng của bạn</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="mb-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm font-semibold">
                    Giá: {item.price.toLocaleString()} VND
                  </p>
                </div>
              </div>
              <div>
                <p className="text-md font-semibold">x {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-between text-lg font-semibold">
            <span>Tổng cộng</span>
            <span>{totalPrice.toLocaleString()} VND</span>
          </div>
          <button
            onClick={() => navigate("/cart")}
            className="mt-4 w-full rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Quay lại giỏ hàng
          </button>
        </div>

        {/* Phần bên phải: Thông tin thanh toán */}
        <div className="mt-6 w-full rounded-lg bg-white p-4 shadow-md lg:ml-6 lg:mt-0 lg:w-1/3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-4 text-lg font-semibold">Thông tin khách hàng</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                {...register("name")}
                className={`mt-1 w-full rounded-md border px-3 py-2 shadow-sm ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                {...register("phone")}
                className={`mt-1 w-full rounded-md border px-3 py-2 shadow-sm ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ giao hàng
              </label>
              <input
                type="text"
                {...register("address")}
                className={`mt-1 w-full rounded-md border px-3 py-2 shadow-sm ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phương thức thanh toán
              </label>
              <select
                {...register("paymentMethod")}
                className={`mt-1 w-full rounded-md border px-3 py-2 shadow-sm ${
                  errors.paymentMethod ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-blue-500`}
              >
                <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                <option value="bank">Chuyển khoản ngân hàng</option>
              </select>
              {errors.paymentMethod && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
