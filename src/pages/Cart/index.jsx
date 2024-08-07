import React from "react";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import ShoppingCart from "../../components/cart/ShoppingCart";

const Cart = () => {
  return (
    <>
      <Breadcrumbs headline="Giỏ hàng" />

      <ShoppingCart />
    </>
  );
};

export default Cart;
