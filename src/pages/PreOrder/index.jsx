import React from "react";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import ShoppingPreOrder from "../../components/preOrder/ShoppingPreOrder";

const PreOrderPage = () => {
  return (
    <>
      <Breadcrumbs headline="Đặt trước" />
      <ShoppingPreOrder />
    </>
  );
};

export default PreOrderPage;
