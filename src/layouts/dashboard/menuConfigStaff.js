import { AiOutlineHome } from "react-icons/ai";
import { FiBox, FiTag, FiUsers, FiSettings } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";

const menuConfigStaff = [
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
        label: "Thêm Sản Phẩm",
        link: "/dashboard/product/add",
      },
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
  {
    label: "Quản Lý Mã Giảm Giá",
    icon: BiCategoryAlt,
    subMenu: [
      {
        label: "Thêm Mã Giảm Giá",
        link: "/discount/add",
      },
      {
        label: "Danh Sách Mã Giảm Giá",
        link: "/discount/list",
      },
    ],
  },
  {
    label: "Quản Lý Kho",
    icon: FiUsers,
    link: "/",
    subMenu: [
      {
        label: "Danh sách đơn nhập hàng",
        link: "/dashboard/batches",
      },
      {
        label: "Tạo đơn nhập hàng",
        link: "/dashboard/batches/add",
      },
    ],
  },
  {
    label: "Quản Lý Phân Loại",
    icon: FiSettings,
    subMenu: [
      {
        label: "Thêm Phân Loại",
        link: "/category/add",
      },
      {
        label: "Danh Sách Phân Loại",
        link: "/category/list",
      },
    ],
  },
];

export default menuConfigStaff;
