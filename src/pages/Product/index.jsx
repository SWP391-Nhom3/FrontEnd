import React from "react";

import Breadcrumbs from "../../components/elements/Breadcrumb";
import ProductDetail from "../../components/product/ProductDetail";
import Header from "../Header";

const Product = () => {
  return (
    <>
      <Breadcrumbs headline="Thông Tin Chi Tiết" />
      <ProductDetail />
    </>
  );
};

export default Product;
