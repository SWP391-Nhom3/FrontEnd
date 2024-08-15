import React from "react";
import { useCartContext } from "../../context/CartContext";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    increaseAmount,
    decreaseAmount,
    removeCartItem,
    totalPrice,
  } = useCartContext();

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center">
          <p className="mb-4 text-lg text-gray-500">
            Giỏ hàng của bạn đang trống.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            {cartItems.map((product) => (
              <Card
                key={product.id}
                product={product}
                onIncrease={increaseAmount}
                onDecrease={decreaseAmount}
                onRemove={removeCartItem}
              />
            ))}
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border p-4 shadow-md">
              <h2 className="text-lg font-semibold">Tóm tắt đơn hàng</h2>
              <div className="mt-2 flex justify-between">
                <span>Số lượng sản phẩm:</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Tổng cộng:</span>
                <span>{totalPrice} VND</span>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-4 w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Tiến hành thanh toán
              </button>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
