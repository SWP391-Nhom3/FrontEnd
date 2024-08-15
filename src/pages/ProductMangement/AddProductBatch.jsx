import { useEffect, useState } from "react";
import { fetchAddProductBatch, fetchProducts } from "../../data/api";
import { Button } from "flowbite-react";
import {
  Col,
  InputNumber,
  Row,
  Table,
  DatePicker,
  Card,
  notification,
  message,
} from "antd";
import moment from "moment";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { toast, Toaster } from "react-hot-toast";
import locale from "antd/es/date-picker/locale/vi_VN";

const AddProductBatch = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [batch, setBatch] = useState([]);
  const [batchBill, setBatchBill] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const token = localStorage.getItem("accessToken");
  const [, setFormState] = useState({});
  const [sorter, setSorter] = useState({});
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    setSorter(sorter);
  };

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const result = data.data.success;
        if (result) {
          setProducts(data.data.data);
        }
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, []);

  console.log("pro ne:", products);

  const productTable = [
    {
      title: "Hình Ảnh",
      dataIndex: "coverImageUrl",
      key: "coverImageUrl",
      render: (imgUrl) => (
        <img src={imgUrl} alt="product" className="h-8 w-auto" />
      ),
    },
    {
      title: "Sản Phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số Lượng",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      sorter: (a, b) => a.amount - b.amount,
      sortOrder: sorter.columnKey === "amount" && sorter.order,
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

  const batchTable = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: ["product", "name"],
      key: "product_id",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record, index) => (
        <InputNumber
          min={1}
          value={text}
          onChange={(value) => handleQuantityChange(value, index)}
        />
      ),
    },
    {
      title: "Hành Động",
      key: "delete",
      render: (text, record) => (
        <Button type="link" onClick={(e) => handleDeleteFromBill(e, record)}>
          Xóa
        </Button>
      ),
    },
  ];

  const handleQuantityChange = (value, index) => {
    const newBatchBill = batchBill.map((batch, i) => {
      if (i === index) {
        return { ...batch, quantity: value };
      }
      return batch;
    });
    setBatchBill(newBatchBill);
  };

  const handleDateChange = (date, record, dateType) => {
    const newBatchBill = batchBill.map((batch) => {
      if (batch.product.id === record.product.id) {
        return { ...batch, [dateType]: date ? date.toISOString() : null };
      }
      return batch;
    });
    setBatchBill(newBatchBill);
  };

  const handleAddBatch = () => {
    const newBatchBill = [...batchBill];
    const newExpandedRowKeys = [...expandedRowKeys];
    selectedProducts.forEach((product) => {
      if (!newBatchBill.some((item) => item.product.id === product.id)) {
        const newBatch = {
          manufactureDate: null,
          expiryDate: null,
          quantity: 1,
          product: {
            id: product.id,
            name: product.name,
            coverImageUrl: product.coverImageUrl,
          },
        };
        newBatchBill.push(newBatch);
      }
    });
    setBatchBill(newBatchBill);
    // setExpandedRowKeys(newExpandedRowKeys);
    setSelectedRowKeys([]);
    setSelectedProducts([]);
  };

  const handleDeleteFromBill = (e, record) => {
    const newBatchBill = batchBill.filter(
      (batch) => batch.product.id !== record.product.id,
    );
    setBatchBill(newBatchBill);
    // setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.product.id));
    notification.success({
      message: "Đã xóa 1 lô sản phẩm",
      placement: "top",
    });
  };

  const validateBillProducts = () => {
    for (const product of batchBill) {
      if (!product.manufactureDate || !product.expiryDate) {
        notification.error({
          message: "Ngày sản xuất và hạn sử dụng không được để trống",
          placement: "top",
        });
        return false;
      }

      const productionDate = moment(product.manufactureDate);
      const expirationDate = moment(product.expiryDate);
      const currentDate = moment();

      if (expirationDate.isBefore(productionDate.add(1, "months"))) {
        notification.error({
          message: "Hạn sử dụng phải lớn hơn ngày sản xuất ít nhất 1 tháng",
          placement: "top",
        });
        return false;
      }

      if (expirationDate.isBefore(currentDate.add(1, "months"))) {
        notification.error({
          message: "Hạn sử dụng phải lớn hơn ngày hiện tại ít nhất 1 tháng",
          placement: "top",
        });
        return false;
      }
    }
    return true;
  };

  console.log("batch ne", batch);
  console.log("batchBill ne", batchBill);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateBillProducts()) {
      return;
    }

    try {
      for (const batch of batchBill) {
        const batchData = {
          manufactureDate: batch.manufactureDate,
          expiryDate: batch.expiryDate,
          quantity: batch.quantity,
          product: {
            id: batch.product.id,
          },
        };

        console.log("batchData ne", batchData);

        await fetchAddProductBatch(batchData, token);
      }

      notification.success({
        message: "Nhập các lô sản phẩm thành công",
        placement: "top",
      });

      setBatchBill([]); // Reset batchBill sau khi thành công
      setFormState({});
    } catch (error) {
      notification.error({
        message: "Lỗi nhập sản phẩm",
        placement: "top",
      });
    }
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
              <div style={{ marginBottom: 16, textAlign: "right" }}>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#46B5C1" }}
                  disabled={selectedRowKeys.length === 0}
                  onClick={handleAddBatch}
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
                  rowKey="id"
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
              title="Lô nhập hàng sản phẩm"
              style={{ width: "90%", marginTop: "50px" }}
            >
              <div style={{ marginBottom: 16, textAlign: "right" }}>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#46B5C1" }}
                  disabled={batchBill.length === 0}
                  onClick={handleSubmit}
                >
                  Tạo
                </Button>
              </div>
              <div style={{ flexGrow: 1, overflowY: "auto" }}>
                <Table
                  columns={batchTable}
                  dataSource={batchBill}
                  pagination={false}
                  rowKey={(record) => record.key || record.product.id}
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
                              record.manufactureDate
                                ? moment(record.manufactureDate)
                                : null
                            }
                            onChange={(date) =>
                              handleDateChange(date, record, "manufactureDate")
                            }
                            format="DD/MM/YYYY"
                            size="large"
                            placeholder="Nhập NSX"
                            onClick={(e) => e.stopPropagation()} // Ngăn chặn mở rộng khi nhấp vào DatePicker
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
                              record.expiryDate
                                ? moment(record.expiryDate)
                                : null
                            }
                            onChange={(date) =>
                              handleDateChange(date, record, "expiryDate")
                            }
                            format="DD/MM/YYYY"
                            size="large"
                            placeholder="Nhập HSD"
                            onClick={(e) => e.stopPropagation()} // Ngăn chặn mở rộng khi nhấp vào DatePicker
                          />
                        </div>
                      </div>
                    ),
                    expandIconColumnIndex: 0, // Đặt chỉ số cột nơi dấu "+" sẽ xuất hiện
                    expandRowByClick: false, // Chỉ mở rộng khi nhấp vào dấu "+"
                  }}
                />
              </div>
              <div style={{ marginTop: 16, textAlign: "right" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Tổng sản phẩm: </p>
                  <strong>{batchBill.length}</strong>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Tổng số lượng</p>
                  <strong>
                    {batchBill.reduce(
                      (total, batch) => total + batch.quantity,
                      0,
                    )}
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

export default AddProductBatch;
