import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "flowbite-react";
import {
  Card,
  Col,
  Divider,
  Row,
  Select,
  Steps,
  Typography,
  notification,
} from "antd";
import Loading from "../../components/Loading";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FieldTimeOutlined,
  SmileOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  fetchAllShipper,
  fetchCancelOrder,
  fetchConfirmOrder,
  fetchProducts,
} from "../../data/api";
import { Option } from "antd/es/mentions";

const AwaitOrderDetail = () => {
  const location = useLocation();
  const order = location.state?.order;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const token = JSON.parse(localStorage.getItem("result"));
  const isAuthenticatedStaff = localStorage.getItem("isStaff") === "true";
  const [shipper, setShipper] = useState([]);
  const [selectedShipperID, setSelectedShipperID] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getProducts = async () => {
      try {
        const productData = await fetchProducts();
        if (isMounted) {
          setProducts(productData);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching products:", error);
          setLoading(false);
        }
      }
    };

    getProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    fetchAllShipper().then((res) => {
      setShipper(res.data.data);
    });
  }, []);
  useEffect(() => {
    const handleData = (event) => {
      console.log("event", event.detail);
    };

    document.addEventListener("sendDataToOrderDetail", handleData);

    return () => {
      document.removeEventListener("sendDataToOrderDetail", handleData);
    };
  }, []);

  const handleShipperChange = (value) => {
    setSelectedShipperID(value);
  };

  if (loading) {
    return <Loading />;
  }

  const handleCancelOrder = async () => {
    const order_id = order.id;
    try {
      await fetchCancelOrder(order_id, token);
      notification.success({
        message: "Thành công",
        description: "Đơn hàng đã được huỷ!",
        placement: "top",
      });
      navigate("/cancel-order");
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Đơn hàng không thể huỷ!",
        placement: "top",
      });
      console.log(error);
    }
  };

  const mergedOrderDetails = order.orderDetails.reduce((acc, item) => {
    const existingProductIndex = acc.findIndex(
      (detail) => detail.product.id === item.product.id,
    );

    if (existingProductIndex !== -1) {
      acc[existingProductIndex].quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }

    return acc;
  }, []);

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

  const handleConfirmOrder = async () => {
    const order_id = order.id;
    const shipper_id = selectedShipperID;
    await fetchConfirmOrder(order_id, shipper_id)
      .then((res) => {
        sessionStorage.setItem("orderConfirmed", "true");
        window.location.reload();
      })
      .catch(() => {
        notification.error({
          message: "Lỗi",
          description: "Đơn hàng không thể xác nhận!",
          placement: "top",
        });
      });
  };

  // Kiểm tra trạng thái sau khi trang tải lại
  if (sessionStorage.getItem("orderConfirmed") === "true") {
    // Hiển thị thông báo
    notification.success({
      message: "Thành công",
      description: "Đơn hàng đã được xác nhận!",
      placement: "top",
    });

    // Xóa trạng thái khỏi sessionStorage
    sessionStorage.removeItem("orderConfirmed");
    // Điều hướng đến trang khác nếu cần thiết
    navigate("/await-order");
  }

  const originalPrice = order.orderDetails.reduce((total, detail) => {
    return total + detail.product.price * detail.quantity;
  }, 0);

  const { Text } = Typography;

  return (
    <div style={{ height: "120vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Row justify="center" style={{ width: "100%", marginTop: "50px" }}>
          {/*start tracking order*/}
          <Col span={22} style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{ width: "100%" }}
              title={<h2 className="text-2xl font-bold">Theo dõi đơn hàng</h2>}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                {order.preOrderDetail.length > 0 ? (
                  <Steps
                    items={[
                      {
                        title: "Đặt Trước",
                        status: "finish",
                        description: formatDate(order.createdAt),
                        icon: <CalendarOutlined />,
                      },
                      {
                        title: "Chờ xác nhận",
                        status: "process",
                        icon: <FieldTimeOutlined />,
                      },
                      {
                        title: "Đã xác nhận",
                        status: "wait",
                        icon: <CheckCircleOutlined />,
                      },
                      {
                        title: "Đã hoàn thành",
                        status: "wait",
                        icon: <SmileOutlined />,
                      },
                    ]}
                  />
                ) : (
                  <Steps
                    items={[
                      {
                        title: "Chờ xác nhận",
                        status: "finish",
                        description: formatDate(order.requiredDate),
                        icon: <FieldTimeOutlined />,
                      },
                      {
                        title: "Đã xác nhận",
                        status: "wait",
                        icon: <CheckCircleOutlined />,
                      },
                      {
                        title: "Đã hoàn thành",
                        status: "wait",
                        icon: <SmileOutlined />,
                      },
                    ]}
                  />
                )}
              </div>
            </Card>
          </Col>
          {/*end tracking order*/}
        </Row>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Row justify="space-between" style={{ flexGrow: 1 }}>
          <Col span={15}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "90vh",
              }}
            >
              <Card
                title={
                  <h1 className="text-2xl font-bold">
                    Chi tiết đơn hàng: #{order.id}
                  </h1>
                }
                style={{
                  width: "90%",
                  marginTop: "50px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <Button
                    outline
                    onClick={() => navigate(-1)}
                    style={{ fontSize: "15px", marginBottom: "20px" }}
                  >
                    Về trang danh sách
                  </Button>
                </div>
                <div
                  style={{
                    overflowY: "auto",
                    maxHeight: "60vh",
                    flexGrow: 1,
                    justifyContent: "space-between",
                  }}
                >
                  {mergedOrderDetails.map((item) => (
                    <Card
                      type="inner"
                      key={item.product.id}
                      className={`mb-4 rounded-lg border border-[rgba(0,0,0,0.2)] bg-white shadow-sm`}
                      style={{ marginBottom: "10px", padding: "10px" }}
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img
                          className="h-20 w-20 dark:hidden"
                          src={item.product.coverImageUrl}
                          alt={item.product.name}
                        />
                        <img
                          className="hidden h-20 w-20 dark:block"
                          src={item.product.coverImageUrl}
                          alt={item.product.name}
                        />
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              {Number(item.product.price).toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <p className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                            {item.product.name}
                          </p>
                          <div className="flex items-start gap-4 text-lg">
                            x{item.quantity} sản phẩm
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </Col>
          <Col span={9}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "75vh",
              }}
            >
              <Card
                title={
                  <h1 className="text-2xl font-bold">Thông tin đơn hàng:</h1>
                }
                style={{
                  width: "90%",
                  marginTop: "50px",
                  height: "auto",
                  minHeight: "700px",
                }}
              >
                <div>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "15px",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                    >
                      Ngày Đặt:
                    </Text>
                    <Text
                      strong
                      style={{ fontSize: "17px", display: "inline-block" }}
                    >
                      {formatDate(order.requiredDate)}
                    </Text>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "15px",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                    >
                      Tên khách hàng:
                    </Text>
                    <Text
                      strong
                      style={{ fontSize: "17px", display: "inline-block" }}
                    >
                      {order.fullName}
                    </Text>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "15px",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                    >
                      Email:
                    </Text>
                    <Text
                      strong
                      style={{ fontSize: "17px", display: "inline-block" }}
                    >
                      {order.email}
                    </Text>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "15px",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                    >
                      Số Điện Thoại:
                    </Text>
                    <Text
                      strong
                      style={{ fontSize: "17px", display: "inline-block" }}
                    >
                      {order.phone}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "15px",
                        marginRight: "10px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Địa chỉ:
                    </Text>
                    <Text
                      strong
                      style={{ fontSize: "17px", textAlign: "right" }}
                    >
                      {order.address}
                    </Text>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "15px",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                    >
                      Phương thức thanh toán:
                    </Text>
                    <Text
                      strong
                      style={{ fontSize: "17px", display: "inline-block" }}
                    >
                      {order.paymentMethod}
                    </Text>
                  </div>
                </div>
                <Divider />
                <div>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "15px",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                    >
                      Giá gốc:
                    </Text>
                    <Text
                      strong
                      style={{ fontSize: "17px", display: "inline-block" }}
                    >
                      {" "}
                      {Number(
                        originalPrice
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "15px",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                    >
                      Voucher:
                    </Text>
                    {/* <Text strong style={{ fontSize: '17px', display: 'inline-block' }}>{order.order.voucher_code}</Text> */}
                    <Text
                      strong
                      style={{ fontSize: "17px", display: "inline-block" }}
                    >
                      {order.voucher
                        ? order.voucher.voucherType === "FIXED_AMOUNT"
                          ? Number(order.voucher.value).toLocaleString(
                              "vi-VN",
                              {
                                style: "currency",
                                currency: "VND",
                              },
                            )
                          : `${Number(order.voucher.value)}%`
                        : ""}
                    </Text>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "15px",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                    >
                      Điểm tích lũy:
                    </Text>
                    {/* <Text strong style={{ fontSize: '17px', display: 'inline-block' }}>{order.order.voucher_code}</Text> */}
                    <Text
                      strong
                      style={{ fontSize: "17px", display: "inline-block" }}
                    >
                      {order.point
                        ? Number(order.point).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : ""}
                    </Text>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "15px",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                    >
                      Phí vận chuyển:
                    </Text>
                    <Text
                      strong
                      style={{ fontSize: "17px", display: "inline-block" }}
                    >
                      {Number(order.shipFee).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                  </div>
                </div>
                <Divider />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text
                    strong
                    style={{
                      fontSize: "17px",
                      display: "inline-block",
                      marginRight: "10px",
                    }}
                  >
                    Tổng giá trị:
                  </Text>
                  <Text
                    strong
                    style={{ fontSize: "17px", display: "inline-block" }}
                  >
                    {Number(order.totalPrice).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                </div>

                {isAuthenticatedStaff && (
                  <div>
                    <Select
                      style={{ width: 200, marginTop: "2vh" }}
                      placeholder="Chọn shipper"
                      onChange={handleShipperChange}
                    >
                      {shipper.map((shipper) => (
                        <Option key={shipper.id} value={shipper.id}>
                          {shipper.firstName
                            ? shipper.firstName
                            : shipper.email}
                        </Option>
                      ))}
                    </Select>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: "1vh",
                      }}
                    >
                      <Button
                        type="default"
                        onClick={handleCancelOrder}
                        style={{
                          backgroundColor: "#ff4d4f",
                          fontSize: "15px",
                        }}
                      >
                        Hủy đơn hàng
                      </Button>
                      <Button
                        type="default"
                        onClick={handleConfirmOrder}
                        disabled={selectedShipperID === null}
                        style={{
                          backgroundColor: "#55B6C3",
                          fontSize: "15px",
                        }}
                      >
                        Xác nhận đơn hàng
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AwaitOrderDetail;
