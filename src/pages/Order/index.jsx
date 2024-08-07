import React from "react";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import OrderInfor from "../../components/order/OrderInfor";
import { useLocation } from "react-router-dom";
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
