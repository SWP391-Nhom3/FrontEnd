import React from "react";
import { AiOutlineShoppingCart, AiOutlineInbox } from "react-icons/ai";
import {
  FiShoppingBag,
  FiBarChart,
  FiCreditCard,
  FiStar,
  FiShoppingCart,
  FiUsers,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiSlash,
} from "react-icons/fi";
import {
  BsBoxSeam,
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
  BsNewspaper,
  BsXCircle,
} from "react-icons/bs";
import { RiPriceTag3Line } from "react-icons/ri";
import { MdOutlineCategory, MdOutlineReport, MdOutlineReportProblem, MdOutlineSupervisorAccount, MdReport, MdReportGmailerrorred } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GrLocation } from "react-icons/gr";
import avatar from "./avatar.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.jpg";
import { VscVerified } from "react-icons/vsc";
import { FaRegStar } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

export const stafflinks = [
  // {
  //   title: 'Trang chủ',
  //   links: [
  //     {
  //       name: 'Dashboard',
  //       path: '/',
  //       icon: <FiShoppingBag />,
  //     },
  //   ],
  // },
  {
    title: "Đơn hàng",
    links: [
      {
        name: "Quản lý đơn hàng",
        icon: <AiOutlineShoppingCart />,
        type: "sub",
        // path: 'orders',
        subLinks: [
          { name: "orders", path: "", label: "Tất cả đơn hàng" },
          { name: "await-order", path: "", label: "Đơn chờ xác nhận" },
          { name: "shipping-order", path: "", label: "Đơn đang vận chuyển" },
          { name: "complete-order", path: "", label: "Đơn đã hoàn thành" },
          { name: "cancel-order", path: "", label: "Đơn đã hủy" },
          {
            name: "cancel-shipping-order",
            path: "",
            label: "Đơn vận chuyển không thành công",
          },
          { name: "preorder", path: "", label: "Đơn đặt trước" },
        ],
      },
    ],
  },
  {
    title: "Sản phẩm",
    links: [
      {
        name: "Quản lý sản phẩm",
        icon: <AiOutlineInbox />,
        type: "sub",
        // path: 'products',
        subLinks: [
          { name: "allProduct", path: "products", label: "Tất cả sản phẩm" },
          { name: "addProduct", path: "add-product", label: "Thêm sản phẩm" },
          {
            name: "addProductBatch",
            path: "add-product-batch",
            label: "Nhập hàng sản phẩm",
          },
          { name: "", path: "product-batch", label: "Sản phẩm trong kho" },
        ],
      },
      {
        name: "Quản lý đánh giá",
        icon: <FaRegStar />,
        type: "sub",
        // path: 'products',
        subLinks: [
          {
            name: "allFeedback",
            path: "all-feedback",
            label: "Tất cả đánh giá",
          },
          {
            name: "badFeedback",
            path: "bad-feedback",
            label: "Đánh giá tiêu cực",
          },
        ],
      },
      {
        name: "Quản lý mã giảm giá",
        icon: <RiPriceTag3Line />,
        type: "sub",
        subLinks: [
          {
            name: "allVoucher",
            path: "voucher-batch",
            label: "Tất cả lô mã giảm giá",
          },
          {
            name: "addVoucher",
            path: "add-voucher",
            label: "Thêm lô mã giảm giá",
          },
        ],
      },
    ],
  },
  {
    title: "Khiếu nại đơn hàng",
    links: [
      {
        name: "Chưa giải quyết",
        icon: <MdOutlineReportProblem />,
        type: "sub",
        // path: 'brands',
        subLinks: [
          { name: "",
            path: "processing-report",
            label: "Tất cả đơn chưa giải quyết", 
          },
        ],
      },
      {
        name: "Đã giải quyết",
        icon: <MdOutlineReport  />,
        type: "sub",
        // path: 'categories',
        subLinks: [
          {
            name: "",
            path: "complete-report",
            label: "Tất cả đơn đã giải quyết",
          },
          {
            name: "",
            path: "voucher-report",
            label: "Tặng voucher",
          },
          {
            name: "",
            path: "order-report",
            label: "Đền bù sản phẩm",
          },
          {
            name: "",
            path: "refund-report",
            label: "Hoàn tiền",
          },
          {
            name: "",
            path: "cancel-report", 
            label: "Không giải quyết",
          },
        ],
      },

    ],
  },
  {
    title: "Phân loại",
    links: [
      {
        name: "Quản lý phân loại",
        icon: <MdOutlineCategory />,
        type: "sub",
        // path: 'categories',
        subLinks: [
          {
            name: "allCategory",
            path: "categories",
            label: "Tất cả phân loại",
          },
          {
            name: "addCategory",
            path: "add-category",
            label: "Thêm phân loại",
          },
        ],
      },
      {
        name: "Quản lý nhãn hàng",
        icon: <VscVerified />,
        type: "sub",
        // path: 'brands',
        subLinks: [
          { name: "allBrand", path: "brands", label: "Tất cả nhãn hàng" },
          { name: "addBrand", path: "add-brand", label: "Thêm nhãn hàng" },
        ],
      },
    ],
  },
  {
    title: "Khách hàng",
    links: [
      {
        name: "Quản lý khách hàng",
        icon: <FiUsers />,
        type: "sub",
        // path: '',
        subLinks: [{ name: "customers", path: "", label: "Tất cả khách hàng" }],
      },
    ],
  },
  {
    title: "Tin tức",
    links: [
      {
        name: "Quản lý bài viết",
        icon: <BsNewspaper />,
        type: "sub",
        // path: '',
        subLinks: [
          { name: "allBlog", path: "all-blog", label: "Tất cả bài viết" },
          { name: "addBlog", path: "add-news", label: "Thêm bài viết" },
        ],
      },
    ],
  },
];

export const adminlinks = [
  {
    title: "Trang chủ",
    links: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FiShoppingBag />,
      },
    ],
  },
  {
    title: "Tài khoản",
    links: [
      {
        name: "Quản lý người dùng",
        icon: <FiUsers />,
        type: "sub",
        // path: 'users',
        subLinks: [
          { name: "allUser", path: "users", label: "Tất cả người dùng" },
          { name: "addStaff", path: "add-staff", label: "Thêm nhân viên" },
          { name: "", path: "add-shipper", label: "Thêm nhân viên giao hàng" },
        ],
      },
    ],
  },
  {
    title: "Đơn hàng",
    links: [
      {
        name: "Quản lý đơn hàng",
        icon: <AiOutlineShoppingCart />,
        type: "sub",
        // path: 'orders',
        subLinks: [{ name: "orders", path: "", label: "Tất cả đơn hàng" }],
      },
    ],
  },
  {
    title: "Sản phẩm",
    links: [
      {
        name: "Quản lý sản phẩm",
        icon: <AiOutlineInbox />,
        type: "sub",
        // path: 'products',
        subLinks: [
          { name: "allProduct", path: "products", label: "Tất cả sản phẩm" },
        ],
      },
    ],
  },
  {
    title: "Kho",
    links: [
      {
        name: "Quản lý kho",
        icon: <BsBoxSeam />,
        type: "sub",
        // path: '',
        subLinks: [
          {
            name: "allBill",
            path: "input-bills",
            label: "Tất cả đơn nhập hàng",
          },
          {
            name: "ProductInWarehouse",
            path: "products-warehouse",
            label: "Sản phẩm trong kho",
          },
        ],
      },
    ],
  },
];

export const shipperLinks = [
  {
    title: "Đơn hàng",
    links: [
      {
        name: "Đơn đang giao",
        icon: <FiTruck />,
        type: "path",
        path: "shipping-order",
      },
      {
        name: "Đơn hoàn thành",
        icon: <FiCheckCircle />,
        type: "path",
        path: "complete-order",
      },
      {
        name: "Đơn giao hàng không thành công",
        icon: <BsXCircle />,
        type: "path",
        path: "cancel-shipping-order",
      },
    ],
  },
];

export const staffProfileData = [
  // {
  //   icon: <FiUser />,
  //   path: 'profile',
  //   title: 'Hồ sơ',
  //   desc: 'Cài đặt tài khoản',
  //   iconColor: '#03C9D7',
  //   iconBg: '#E5FAFB',
  // }
];

export const adminProfileData = [];
