import React, { useEffect, useState } from "react";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { useStateContext } from "../context/ContextProvider";

// import {
//   fetchAllUsers,
//   fetchOrder,
//   fetchProducts,
//   fetchRevenue,
// } from "../data/api";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import { Col, Row, Select } from "antd";
import "chart.js/auto";
import RevenueMixCost from "../components/Dashboard/RevenueMixCost";
import MonthlyProfit from "../components/Dashboard/MonthlyProfit";
import BestCategory from "../components/Dashboard/BestCategory";
import ProductStock from "../components/Dashboard/ProductStock";
import MonthlyOrder from "../components/Dashboard/MonthlyOrder";
import SoldProductsChart from "../components/Dashboard/SoldProductsChart";
import { fetchAllUsers, fetchOrders, fetchProductBatches, fetchProducts } from "../data/api";
import RevenueStatistic from "../components/Dashboard/RevenueStatistic";


const Dashboard = ({ isAuthenticatedAdmin, isAuthenticatedStaff }) => {
  const { currentColor, currentMode } = useStateContext();
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [customer, setCustomer] = useState(0);
  const [product, setProduct] = useState([]);
  const [batch, setBatch] = useState([]);
  const [sales, setSales] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Sắp hết");
  const token = localStorage.getItem("accessToken");


  useEffect(() => {
    //get order and revenue
    const fetchAndCalculateRevenue = async () => {
      const response = await fetchOrders();
      const fetchedOrders = response.data;
      setOrders(fetchedOrders);
      calculateRevenue(fetchedOrders);
    };

    //get customer
    const fetchCustomer = async () => {
      const response = await fetchAllUsers(token);
      console.log(response.data.data);
      setUsers(response.data.data);
      calculateCustomer(response.data.data);
      console.log("users", users);
    }

    //get product
    const fetchProduct = async () => {
      const response = await fetchProducts();
      setProduct(response.data.data);
    }

    //get batch
    const fetchBatch = async () => {
      const response = await fetchProductBatches();
      setBatch(response.data.data);
      calculateSales(response.data.data);
    }

    fetchBatch();
    fetchProduct();
    fetchCustomer();
    fetchAndCalculateRevenue();
  }, []);

  const calculateRevenue = (orders) => {
    let revenue = 0;
    orders.filter((order) => order.orderStatus.name === "Hoàn thành").forEach((order) => {
      revenue += order.totalPrice;
    });
    return setRevenue(revenue);
  };

  const calculateCustomer = (users) => {
    let customer = 0;
    users.forEach((user) => {
      const isMember = user.roles.some((role) => role.name === "MEMBER");
      if (isMember) {
        customer += 1;
      }
    });
    return setCustomer(customer);
  };

  const calculateSales = (batch) => {
    let sales = 0;
    batch.forEach((item) => {
      sales += item.sold;
    });
    return setSales(sales);
  }

  console.log("doanh thu ne", revenue);
  console.log("khach hang", customer);
  console.log("luot ban ne", sales);
  console.log("don hang ne", orders);

  //time in Vietnam
  const timezoneOffset = 7 * 60; // GMT+7 in minutes
  const convertToVietnamTime = (date) => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const vietnamDate = new Date(utcDate.getTime() + timezoneOffset * 60000);
    return vietnamDate;
  };

  const earningData = [
    {
      icon: <BsCurrencyDollar />,
      amount: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(revenue),
      // percentage: '-4%',
      title: "Tổng doanh thu",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "green-600",
    },
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: customer,
      // percentage: '-4%',
      title: "Tổng khách hàng",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <BsBoxSeam />,
      amount: product.length,
      // percentage: '+23%',
      title: "Tổng sản phẩm",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <FiBarChart />,
      amount: sales,
      // percentage: '+38%',
      title: "Tổng lượt bán",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },
  ];

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
            <div className="dark:bg-secondary-dark-bg md:w-780 m-3 rounded-2xl bg-white p-4 dark:text-gray-200">
              <div className="flex justify-between">
                <p className="text-xl font-semibold">
                  Biểu đồ số lượng sản phẩm đã bán
                </p>
              </div>
              <div>
                {/* <RevenueMixCost /> */}
                <SoldProductsChart />
              </div>
            </div>
            <div>
              <div
                className="md:w-400 m-3 rounded-2xl p-4"
                style={{ backgroundColor: currentColor }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-white">
                    Thống kê doanh thu theo tháng
                  </p>
                </div>

                <div className="mt-0">
                  <RevenueStatistic orders = {orders}/>
                </div>
              </div>

            </div>
          </div>

          {/* Row 3 */}
          <div className="m-4 flex flex-wrap justify-center w-full gap-10">
            <div className="dark:bg-secondary-dark-bg rounded-2xl w-2/3 bg-white p-6 dark:text-gray-200">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xl font-semibold">Lô hàng sắp hết hạn </p>

              </div>
              <div className="md:w-800 w-100 mt-2">
                <ProductStock selectedOption={selectedOption} />
              </div>
            </div>
             {/* <div className="dark:bg-secondary-dark-bg md:w-760 w-96 rounded-2xl bg-white p-6 dark:text-gray-200">
              <div className="mb-10 flex items-center justify-between gap-2">
                <p className="text-xl font-semibold">
                  Thống kê trạng thái đơn hàng theo tháng
                </p>
              </div>
              <div className="overflow-auto md:w-full">
                <MonthlyOrder />
              </div>
            </div>  */}
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
