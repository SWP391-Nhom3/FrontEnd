import React from "react";

import Breadcrumbs from "../../components/Elements/Breadcrumb";
import ProductDetail from "../../components/product/ProductDetail";
import Header from "../Header";

const Product = () => {
  return (
    <>
      <Header />
      <Breadcrumbs headline="Thông Tin Chi Tiết" />

      {/* product */}
      <ProductDetail />
    </>
  );
};

export default Product;
