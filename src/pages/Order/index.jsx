import React from "react";
import { useLocation } from "react-router-dom";

import Breadcrumbs from "../../components/elements/Breadcrumb";
import OrderInfor from "../../components/order/OrderInfor";
const Order = () => {
  const location = useLocation();

  const discount = location.state?.discount;
  const ship = location.state?.ship;
  const voucherCode = location.state?.voucherCode;
  const paymentType = location.state?.paymentType;
  const selectedVoucher = location.state?.selectedVoucher;
  const totalAmount = location.state?.totalAmount;
  const points = location.state?.points;

  return (
    <>
      <Breadcrumbs headline="Thông tin đơn hàng" />

      <OrderInfor
        discount={discount}
        ship={ship}
        voucherCode={voucherCode}
        paymentType={paymentType}
        selectedVoucher={selectedVoucher}
        totalAmount={totalAmount}
        points={points}
      />
    </>
  );
};

export default Order;
