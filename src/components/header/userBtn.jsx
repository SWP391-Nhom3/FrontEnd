import { Dropdown } from "flowbite-react";
import { HiCog, HiViewGrid, HiLogout } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { FaHistory } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext";

import { usePreOrderContext } from "../../context/PreOrderContext";

const UserBtn = () => {
  const navigate = useNavigate();
  const { clearCart } = useCartContext();

  const { clearPreOrder } = usePreOrderContext();
  const handleLogout = async () => {
    clearCart();
    clearPreOrder();
    localStorage.removeItem("user");
    localStorage.removeItem("result");
    localStorage.removeItem("role");
    localStorage.removeItem("isMember");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("customer_infor");
    navigate("/login");
  };
  const result = JSON.parse(localStorage.getItem("result")) || null;
  // const verify = user?.verify;
  // const navigate = useNavigate();
  // const handleLogout = async () => {
  //   const result = JSON.parse(localStorage.getItem("result"));
  //   await fetchLogout(result);
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("result");
  //   navigate("/");
  //   window.location.reload();
  // };

  return (
    <Dropdown
      label={<FaUser className="h-10 w-10 p-1.5 text-black" />}
      arrowIcon={false}
      inline
      placement="bottom"
    >
      {result === null ? (
        <>
          <Dropdown.Item icon={HiViewGrid} className="w-48" href="/login">
            Đăng Nhập
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={HiLogout} className="w-48" href="/register">
            Đăng Ký
          </Dropdown.Item>
        </>
      ) : (
        <>
          <Dropdown.Header>
            <span className="block text-sm">
              {result.user.lastName} {result.user.firstName}
            </span>
            <span className="block truncate text-sm font-medium">
              {result.user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item icon={HiViewGrid} className="w-48" href="/profile">
            Chỉnh Sửa
          </Dropdown.Item>
          <Dropdown.Item
            icon={FaHistory}
            className="w-48"
            href="/profile/history-order"
          >
            Lịch Sử Đơn Hàng
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            icon={HiLogout}
            onClick={handleLogout}
            className="w-48"
          >
            Đăng Xuất
          </Dropdown.Item>
        </>
      )}
    </Dropdown>
  );
};

export default UserBtn;
