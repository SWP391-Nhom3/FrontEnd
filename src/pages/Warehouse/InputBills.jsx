import { Button, Input, Table } from "antd";
import axios from "axios";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { fetchAllBills, fetchProducts } from "../../data/api";
import Column from "antd/es/table/Column";
import Loading from "../../components/Loading";

const InputBills = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const { Search } = Input;

  //ham nay lay bill
  useEffect(() => {
    // fetchAllBills()
    //   .then((data) => {
    //     if (data && data.length > 0) {
    //       setBills(data);
    //       console.log(data);
    //     }
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching bills:", error);
    //     setLoading(false);
    //   });
  }, []);

  //ham nay lay product
  useEffect(() => {
    // const getProducts = async () => {
    //   try {
    //     const productData = await fetchProducts();
    //     setProducts(productData);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching products:", error);
    //     setLoading(false);
    //   }
    // };
    // getProducts();
  }, []);

  const productPriceMap = products.reduce((map, product) => {
    map[product._id] = product.price;
    return map;
  }, {});

  const calculatePrice = (inputBillDetails) => {
    return inputBillDetails.reduce((total, detail) => {
      const price = productPriceMap[detail.product_id] || 0;
      return total + price * detail.amount;
    }, 0);
  };

  const getDiscountPercentage = (amount) => {
    if (amount > 20) return 60;
    if (amount >= 10) return 40;
    if (amount >= 1) return 20;
    return 0;
  };

  const calculateTotalDiscount = (inputBillDetails) => {
    const totalAmount = inputBillDetails.reduce(
      (total, detail) => total + detail.amount,
      0,
    );
    const discountPercentage = getDiscountPercentage(totalAmount); // Assume this function is defined elsewhere
    const originalTotal = calculatePrice(inputBillDetails);
    return originalTotal * (discountPercentage / 100);
  };

  //tinh tong tien
  const calculateTotal = (inputBillDetails) => {
    const originalTotal = calculatePrice(inputBillDetails);
    const totalDiscount = calculateTotalDiscount(inputBillDetails);
    return originalTotal - totalDiscount;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };
  const isAuthenticatedStaff =
    localStorage.getItem("isAuthenticatedStaff") === "true";

  const columns = [
    {
      title: "Mã Đơn Hàng",
      dataIndex: ["inputBill", "_id"],
      key: "_id",
    },
    {
      title: "Ngày Đặt",
      dataIndex: ["inputBill", "input_date"],
      key: "input_date",
      render: (input_date) => formatDate(input_date),
      sorter: (a, b) =>
        new Date(a.inputBill.input_date) - new Date(b.inputBill.input_date),
    },
    {
      title: "Tổng Sản Phẩm",
      key: "total_products",
      render: (text, record) => record.inputBillDetails.length,
      sorter: (a, b) => a.inputBillDetails.length - b.inputBillDetails.length,
    },
    {
      title: "Tổng Số Lượng",
      key: "total_amount",
      render: (text, record) =>
        record.inputBillDetails.reduce((sum, detail) => sum + detail.amount, 0),
      sorter: (a, b) =>
        a.inputBillDetails.reduce((sum, detail) => sum + detail.amount, 0) -
        b.inputBillDetails.reduce((sum, detail) => sum + detail.amount, 0),
    },
    {
      title: "Tổng Tiền",
      key: "total_price",
      render: (text, record) => {
        const totalPrice = calculateTotal(record.inputBillDetails);
        return totalPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
      sorter: (a, b) => {
        const totalPriceA = calculatePrice(a.inputBillDetails);
        const totalPriceB = calculatePrice(b.inputBillDetails);
        return totalPriceA - totalPriceB;
      },
    },
    {
      title: "Chi Tiết Đơn Hàng",
      key: "detail",
      render: (text, record) => (
        <a
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          onClick={() =>
            navigate("/bill-detail", { state: { inputBill: record } })
          }
        >
          Chi Tiết
        </a>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredBills = bills.filter((bill) =>
    bill.inputBill._id.includes(searchText),
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "80vh" }}>
      <Card
        title="Tất cả đơn nhập hàng"
        style={{ width: "90%", marginTop: "50px", height: "75vh" }}
      >
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}
            >
              <Search
                placeholder="Nhập mã đơn nhập hàng"
                allowClear
                enterButton={
                  <Button
                    style={{ backgroundColor: "#55B6C3", color: "white" }}
                  >
                    Tìm kiếm
                  </Button>
                }
                size="large"
                onSearch={onSearch}
                style={{ width: "40%" }}
              />
            </div>
            {isAuthenticatedStaff && (
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#46B5C1",
                  height: "100%",
                  marginLeft: "10px",
                }}
                onClick={() => navigate("/add-inputbill")}
              >
                Tạo đơn nhập hàng
              </Button>
            )}
          </div>
          <Table
            dataSource={filteredBills}
            rowKey={(item) => item.inputBill._id}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredBills.length,
              showSizeChanger: false,
            }}
            onChange={handleTableChange}
            bordered
            columns={columns}
          />
        </div>
      </Card>
    </div>
  );
};

export default InputBills;
