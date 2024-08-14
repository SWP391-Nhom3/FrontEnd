import { AiOutlineHome } from "react-icons/ai";
import { FiBox, FiTag } from "react-icons/fi";

const menuConfigAdmin = [
  {
    label: "Quản Lý Đơn Hàng",
    icon: AiOutlineHome,
    link: "/",
    subMenu: null,
  },
  {
    label: "Quản Lý Sản Phẩm",
    icon: FiBox,
    subMenu: [
      {
        label: "Danh Sách Sản Phẩm",
        link: "/product/list",
      },
    ],
  },
  {
    label: "Quản Lý Đánh Giá",
    icon: FiTag,
    link: "/",
    subMenu: null,
  },
];

export default menuConfigAdmin;
