import { useEffect, useState } from "react";
// import { fetchProducts, fetchUploadBill } from "../../data/api";
import { Button } from "flowbite-react";
import { Card } from "primereact/card";
import { Col, InputNumber, Row, Table, DatePicker } from "antd";
import moment from "moment";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { toast, Toaster } from "react-hot-toast";
import locale from "antd/es/date-picker/locale/vi_VN";

const AddBill = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [billProducts, setBillProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const token = JSON.parse(localStorage.getItem("result"));
  const [, setFormState] = useState({});
  const [sorter, setSorter] = useState({});
  const [expandedRowKeys, setExpandedRowKeys] = useState([]); // Thêm trạng thái này

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    setSorter(sorter);
  };

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

  const productTable = [
    {
      title: "Hình Ảnh",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (imgUrl) => (
        <img src={imgUrl} alt="product" className="h-8 w-auto" />
      ),
    },
    {
      title: "Sản Phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Số Lượng",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortOrder: sorter.columnKey === "amount" && sorter.order,
    },
    {
      title: "Lượt Bán",
      dataIndex: "sales",
      key: "sales",
    },
    {
      title: "Giá Tiền",
      dataIndex: "price",
      key: "price",
      render: (price) =>
        Number(price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      sorter: (a, b) => a.price - b.price,
      sortOrder: sorter.columnKey === "price" && sorter.order,
    },
  ];

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedProducts(selectedRows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const billTable = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Số Lượng",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.amount}
          onChange={(value) => handleQuantityChange(value, record)}
        />
      ),
    },
    {
      title: "Đơn Giá",
      dataIndex: "price",
      key: "price",
      render: (price) =>
        Number(price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => handleDeleteFromBill(record)}>
          Xóa
        </Button>
      ),
    },
  ];

  const handleQuantityChange = (value, record) => {
    const newData = billProducts.map((item) => {
      if (item._id === record._id) {
        return { ...item, amount: value };
      }
      return item;
    });
    setBillProducts(newData);
  };

  const handleDateChange = (date, record, dateType) => {
    const newData = billProducts.map((item) => {
      if (item._id === record._id) {
        return { ...item, [dateType]: date.toISOString() };
      }
      return item;
    });
    setBillProducts(newData);
  };

  const calculatePrice = () => {
    return billProducts.reduce(
      (total, product) => total + product.price * product.amount,
      0,
    );
  };

  const getDiscountPercentage = (amount) => {
    if (amount > 20) return 60;
    if (amount >= 10) return 40;
    if (amount >= 1) return 20;
    return 0;
  };

  const calculateTotalDiscount = () => {
    const totalAmount = billProducts.reduce(
      (total, product) => total + product.amount,
      0,
    );
    const discountPercentage = getDiscountPercentage(totalAmount);
    const originalTotal = calculatePrice();
    return originalTotal * (discountPercentage / 100);
  };

  const calculateTotal = () => {
    return calculatePrice() - calculateTotalDiscount();
  };

  const handleAddToBill = () => {
    const newBillProducts = [...billProducts];
    const newExpandedRowKeys = [...expandedRowKeys]; // Khởi tạo danh sách expandedRowKeys mới
    selectedProducts.forEach((product) => {
      if (!newBillProducts.some((item) => item._id === product._id)) {
        newBillProducts.push({
          ...product,
          amount: 1,
          production_date: null,
          expiration_date: null,
        });
        newExpandedRowKeys.push(product._id); // Thêm id của sản phẩm mới vào expandedRowKeys
      }
    });
    setBillProducts(newBillProducts);
    setExpandedRowKeys(newExpandedRowKeys); // Cập nhật trạng thái expandedRowKeys
    setSelectedRowKeys([]);
    setSelectedProducts([]);
  };

  const handleDeleteFromBill = (record) => {
    const newBillProducts = billProducts.filter(
      (item) => item._id !== record._id,
    );
    setBillProducts(newBillProducts);
    setExpandedRowKeys(expandedRowKeys.filter((key) => key !== record._id)); // Cập nhật trạng thái expandedRowKeys khi xóa sản phẩm
    toast.success("Xóa sản phẩm khỏi đơn nhập hàng thành công", {
      position: "top-right",
    });
  };

  const validateBillProducts = () => {
    for (const product of billProducts) {
      if (!product.production_date || !product.expiration_date) {
        toast.error("Ngày sản xuất và hạn sử dụng không được để trống", {
          position: "top-right",
        });
        return false;
      }

      const productionDate = moment(product.production_date);
      const expirationDate = moment(product.expiration_date);
      const currentDate = moment();

      if (expirationDate.isBefore(productionDate.add(1, "months"))) {
        toast.error("Hạn sử dụng phải lớn hơn ngày sản xuất ít nhất 1 tháng", {
          position: "top-right",
        });
        return false;
      }

      if (expirationDate.isBefore(currentDate.add(1, "months"))) {
        toast.error("Hạn sử dụng phải lớn hơn ngày hiện tại ít nhất 1 tháng", {
          position: "top-right",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateBillProducts()) {
      return;
    }

    const inputBill = {
      input_date: moment().toISOString(),
      inputBillDetailList: billProducts.map((product) => ({
        product_id: product._id,
        amount: product.amount,
        created_at: new Date(product.production_date).setDate(
          new Date(product.production_date).getDate(),
        ),
        expired_at: new Date(product.expiration_date).setDate(
          new Date(product.expiration_date).getDate(),
        ),
      })),
      total: calculateTotal(),
    };

    // try {
    //   await fetchUploadBill(inputBill, token);
    //   toast.success('Tạo đơn nhập hàng thành công', {
    //     position: 'top-right',
    //   });
    //   setBillProducts([]);
    //   setFormState({});
    //   window.location.reload();
    // } catch (error) {
    //   console.error('Lỗi từ server:', error.response.data);
    //   toast.error(`Lỗi khi tạo đơn: ${error.response.data.message}`, {
    //     position: 'top-right',
    //   });
    // }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Toaster />
      <Row justify="space-between" style={{ flexGrow: 1 }}>
        <Col span={13}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              title="Chọn sản phẩm"
              style={{
                width: "90%",
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ marginBottom: 16, textAlign: "right" }}
                onClick={() => Navigate("/add-brand")}
              >
                <Button
                  type="primary"
                  style={{ backgroundColor: "#46B5C1" }}
                  disabled={selectedRowKeys.length === 0}
                  onClick={handleAddToBill}
                >
                  Nhập Hàng
                </Button>
              </div>
              <div style={{ flexGrow: 1 }}>
                <Table
                  columns={productTable}
                  dataSource={products}
                  pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: products.length,
                  }}
                  scroll={{ x: "100%" }}
                  onChange={handleTableChange}
                  rowKey="_id"
                  locale={{ emptyText: "Không tìm thấy sản phẩm" }}
                  rowSelection={rowSelection}
                />
              </div>
            </Card>
          </div>
        </Col>
        <Col span={11}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              title="Đơn nhập hàng"
              style={{ width: "90%", marginTop: "50px" }}
            >
              <div style={{ marginBottom: 16, textAlign: "right" }}>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#46B5C1" }}
                  disabled={billProducts.length === 0}
                  onClick={handleSubmit}
                >
                  Tạo đơn
                </Button>
              </div>
              <p>Ngày làm đơn: {moment().format("DD/MM/YYYY HH:mm:ss")}</p>
              <div style={{ flexGrow: 1, overflowY: "auto" }}>
                <Table
                  columns={billTable}
                  dataSource={billProducts}
                  pagination={false}
                  rowKey={(record) => record.key || record._id}
                  scroll={{ y: "50vh" }}
                  expandable={{
                    expandedRowRender: (record) => (
                      <div style={{ margin: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Ngày Sản Xuất:</span>
                          <DatePicker
                            locale={locale}
                            value={
                              record.production_date
                                ? moment(record.production_date)
                                : null
                            }
                            onChange={(date) =>
                              handleDateChange(date, record, "production_date")
                            }
                            format="DD/MM/YYYY"
                            size="large"
                            placeholder="Nhập NSX"
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 8,
                          }}
                        >
                          <span>Hạn Sử Dụng:</span>
                          <DatePicker
                            locale={locale}
                            value={
                              record.expiration_date
                                ? moment(record.expiration_date)
                                : null
                            }
                            onChange={(date) =>
                              handleDateChange(date, record, "expiration_date")
                            }
                            format="DD/MM/YYYY"
                            size="large"
                            placeholder="Nhập HSD"
                          />
                        </div>
                      </div>
                    ),
                    expandRowByClick: true, // Mở rộng dòng bằng cách nhấp
                  }}
                  expandedRowKeys={expandedRowKeys} // Thiết lập expandedRowKeys
                  onExpand={(expanded, record) => {
                    setExpandedRowKeys(
                      expanded
                        ? [...expandedRowKeys, record._id]
                        : expandedRowKeys.filter((id) => id !== record._id),
                    );
                  }}
                />
              </div>
              <div style={{ marginTop: 16, textAlign: "right" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Tổng giá theo giá sản phẩm: </p>
                  <strong>
                    {Number(calculatePrice()).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    Giá chiết khấu (
                    {getDiscountPercentage(
                      billProducts.reduce(
                        (total, product) => total + product.amount,
                        0,
                      ),
                    )}
                    %):{" "}
                  </p>
                  <strong>
                    {Number(calculateTotalDiscount()).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>Tổng Tiền: </strong>
                  <strong>
                    {Number(calculateTotal()).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddBill;
