import React, { useEffect, useState } from "react";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { useStateContext } from "../context/ContextProvider";

import {
  fetchAllUsers,
  fetchProducts,
  fetchProductBatches,
  fetchOrders,
} from "../data/api";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import { Col, Row, Select } from "antd";
import "chart.js/auto";
import RevenueMixCost from "../components/Dashboard/RevenueMixCost";
import MonthlyProfit from "../components/Dashboard/MonthlyProfit";
import BestCategory from "../components/Dashboard/BestCategory";
import ProductStock from "../components/Dashboard/ProductStock";
import MonthlyOrder from "../components/Dashboard/MonthlyOrder";

const DropDown = ({ currentMode, onSelect }) => (
  <div className="border-1 border-color w-28 rounded-md px-2 py-1"></div>
);

const Dashboard = ({ isAuthenticatedAdmin, isAuthenticatedStaff }) => {
  const { currentColor, currentMode } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [revenues, setRevenues] = useState([]);
  // const [profit, setProfit] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalStaff, setTotalStaff] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  // const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Sắp hết");
  const [revenueTimeRange, setRevenueTimeRange] = useState("thisWeek");
  const [profitTimeRange, setProfitTimeRange] = useState("thisWeek");
  const [salesTimeRange, setSalesTimeRange] = useState("thisWeek");
  const [order, setOrder] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    document.title = "Administrator Dashboard";
  }, []);
  //fetch customer
  useEffect(() => {
    const getCustomer = async () => {
      try {
        const result = localStorage.getItem("accessToken");
        const response = await fetchAllUsers(result);
        const data = response.data.data;
        setCustomers(data);
        calculateCustomer(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false);
      }
    };
    getCustomer();
  }, []);
  //fetch staff
  useEffect(() => {
    const getCustomer = async () => {
      try {
        const result = localStorage.getItem("accessToken");
        const response = await fetchAllUsers(result);
        const data = response.data.data;
        setCustomers(data);
        calculateStaff(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false);
      }
    };
    getCustomer();
  }, []);
  //fetch product
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.data.data);
        calculateProduct(data.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  //fetch order
  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await fetchProductBatches();
        setOrder(orderData.data.data);
        const orderDatas = orderData.data.data;
        calculateSold(orderDatas);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    getOrders();
  }, []);
  //fetch revenue
  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await fetchOrders();
        const orderDatas = orderData.data;
        setOrder(orderDatas);
        calculateRevenue(orderDatas);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    getOrders();
  }, []);
  //time in Vietnam
  const timezoneOffset = 7 * 60; // GMT+7 in minutes
  const convertToVietnamTime = (date) => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const vietnamDate = new Date(utcDate.getTime() + timezoneOffset * 60000);
    return vietnamDate;
  };
  const calculateCustomer = (data) => {
    let total = 0;
    data.forEach((item) => {
      if (item.roles[0].name === "MEMBER") {
        total++;
      }
    });
    setTotalCustomer(total);
  };
  const calculateStaff = (data) => {
    let total = 0;
    data.forEach((item) => {
      if (item.roles[0].name === "STAFF") {
        total++;
      }
    });
    setTotalStaff(total);
  };
  const calculateProduct = (data) => {
    let total = 0;
    data.forEach((item) => {
      total++;
    });
    setTotalProduct(total);
  };
  const calculateSold = (data) => {
    const totalSold = data.length;
    setTotalSales(totalSold);
  };
  const calculateRevenue = (data) => {
    const totalPrice = data.reduce((total, order) => {
      return total + order.totalPrice;
    }, 0);
    setTotalRevenue(totalPrice);
  };
  const earningData = [
    {
      icon: <BsCurrencyDollar />,
      amount: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(totalRevenue),
      title: "Tổng doanh thu",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "green-600",
      dropdown: (
        <Select
          defaultValue="thisWeek"
          style={{ width: "110px" }}
          onChange={(value) => setRevenueTimeRange(value)}
        >
          <Option value="today">Hôm nay</Option>
          <Option value="thisWeek">Tuần này</Option>
          <Option value="thisMonth">Tháng này</Option>
          <Option value="thisYear">Năm nay</Option>
          <Option value="all">Tất cả</Option>
        </Select>
      ),
    },
    {
      icon: <BsCurrencyDollar />,
      amount: totalStaff,
      title: "Tổng nhân viên",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: totalCustomer,
      title: "Tổng khách hàng",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <BsBoxSeam />,
      amount: totalProduct,
      title: "Tổng sản phẩm",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <FiBarChart />,
      amount: totalSales,
      title: "Tổng lượt bán",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },
  ];

  if (loading) {
    return <div className="mx-6 h-full w-full py-6">Loading...</div>;
  }
  return (
    <div className="mt-24">
      {isAuthenticatedAdmin && (
        <div>
          {/*Row 1*/}
          <div className="flex flex-wrap justify-center lg:flex-nowrap">
            <Row justify="space-between" gutter={[16, 16]}>
              {earningData.map((item) => (
                <Col key={item.title} span={4}>
                  <div
                    style={{ position: "relative" }}
                    className="dark:bg-secondary-dark-bg h-44 rounded-2xl bg-white p-4 pt-9 dark:text-gray-200 md:w-56"
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                      }}
                    >
                      {item.dropdown}
                    </div>
                    <button
                      type="button"
                      style={{
                        color: item.iconColor,
                        backgroundColor: item.iconBg,
                      }}
                      className="opacity-0.9 rounded-full p-4 text-2xl hover:drop-shadow-xl"
                    >
                      {item.icon}
                    </button>
                    <p className="mt-3">
                      <span className="text-lg font-semibold">
                        {item.amount}
                      </span>
                      <span className={`text-sm text-${item.pcColor} ml-2`}>
                        {item.percentage}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-gray-400">{item.title}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/*Row 2*/}
          <div className="flex flex-wrap justify-center gap-10">
            {/* <div className="dark:bg-secondary-dark-bg md:w-780 m-3 rounded-2xl bg-white p-4 dark:text-gray-200">
              <div className="flex justify-between">
                <p className="text-xl font-semibold">
                  Bảng tương quan giữa doanh thu và vốn
                </p>
              </div>
              <div>
                <RevenueMixCost />
              </div>
            </div> */}
            <div>
              {/* <div
                className="md:w-400 m-3 rounded-2xl p-4"
                style={{ backgroundColor: currentColor }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-white">
                    Thống kê lợi nhuận
                  </p>
                </div>

                <div className="mt-0">
                  <MonthlyProfit />
                </div>
              </div> */}

              <div className="dark:bg-secondary-dark-bg md:w-400 m-3 flex items-center justify-center gap-10 rounded-2xl bg-white p-8 dark:text-gray-200">
                <div>
                  <p className="text-xl font-semibold">
                    Thống kê phân loại sữa theo lượt mua
                  </p>
                </div>

                <div className="w-40">
                  <BestCategory />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="m-4 flex flex-wrap justify-center gap-10">
            <div className="dark:bg-secondary-dark-bg rounded-2xl bg-white p-6 dark:text-gray-200">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xl font-semibold">Số lượng hàng tồn kho</p>
                <DropDown
                  currentMode={currentMode}
                  onSelect={setSelectedOption}
                />
              </div>
              <div className="md:w-400 mt-2 w-72">
                <ProductStock selectedOption={selectedOption} />
              </div>
            </div>
            <div className="dark:bg-secondary-dark-bg md:w-760 w-96 rounded-2xl bg-white p-6 dark:text-gray-200">
              <div className="mb-10 flex items-center justify-between gap-2">
                <p className="text-xl font-semibold">
                  Thống kê trạng thái đơn hàng theo tháng
                </p>
              </div>
              <div className="overflow-auto md:w-full">
                <MonthlyOrder />
              </div>
            </div>
          </div>
        </div>
      )}

      {isAuthenticatedStaff && (
        <div className="w-full">Dashboard cho staff</div>
      )}
    </div>
  );
};

export default Dashboard;
