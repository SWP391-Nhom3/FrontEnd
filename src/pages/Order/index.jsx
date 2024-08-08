import React from "react";
import { useLocation } from "react-router-dom";

import Breadcrumbs from "../../components/Elements/Breadcrumb";
import OrderInfor from "../../components/order/OrderInfor";
const Order = () => {
  const location = useLocation();

  const discount = location.state?.discount;
  const ship = location.state?.ship;
  const voucherCode = location.state?.voucherCode;

  return (
    <>
      <Breadcrumbs headline="Thông tin đơn hàng" />

      <OrderInfor discount={discount} ship={ship} voucherCode={voucherCode} />
    </>
  );
};

export default Order;
