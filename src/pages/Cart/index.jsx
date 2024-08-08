import React from "react";
import Breadcrumbs from "../../components/Elements/Breadcrumb";
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
