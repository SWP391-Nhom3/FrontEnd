import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProducts } from "../../data/api";
import { Button } from "flowbite-react";
import { Card, Col, Divider, Row, Steps, Typography } from "antd";
import Loading from "../../components/Loading";

const OrderDetail = () => {
  const location = useLocation();
  const order = location.state?.order;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  // const user = JSON.parse(localStorage.getItem("user")) || null;
  // const token = JSON.parse(localStorage.getItem("result"));

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const findProductById = (product_id) => {
      return products.find((product) => product._id === product_id);
    };

    if (products.length > 0 && order) {
      const updateOrderDetails = async () => {
        const details = await Promise.all(
          order.order_detail.map(async (item) => {
            const product = findProductById(item.product_id);
            return { ...item, product };
          }),
        );
        setOrderDetails(details);
      };

      updateOrderDetails();
    }
  }, [products, order]);

  if (loading) {
    return <Loading />;
  }

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

  const addOneDay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    date.setHours(date.getHours() + 2);
    date.setMinutes(date.getMinutes() + 30);
    return date.toISOString();
  };

  const { Text } = Typography;

  return (
    <div style={{ height: "120vh" }}>
      {/* <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Row justify="center" style={{ width: "100%", marginTop: "50px" }}>
                    {/*start tracking order*/}
      {/* <Col span={22} style={{ display: "flex", justifyContent: "center" }}>
                        <Card
                            style={{ width: "100%" }}
                            title={<h2 className="text-2xl font-bold">Theo dõi đơn hàng</h2>}
                        >
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Steps
                                    items={[
                                        {
                                            title: "Chờ xác nhận",
                                            status: "process",
                                            description: formatDate(order.requiredDate),
                                            icon: <FieldTimeOutlined />,
                                        },
                                        {
                                            title: "Đã xác nhận",
                                            status: "wait",
                                            icon: <CheckCircleOutlined />,
                                        },
                                        {
                                            title: "Đã giao cho ĐVVC",
                                            status: "wait",
                                            icon: <TruckOutlined />,
                                        },
                                        {
                                            title: "Đã hoàn thành",
                                            status: "wait",
                                            icon: <SmileOutlined />,
                                        },
                                    ]}
                                />
                            </div>
                        </Card>
                    </Col> */}
      {/*end tracking order*/}

      {/* </Row>
            </div>  */}
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
<<<<<<< HEAD
                  {order.orderDetails.length === 0
                    ? order.preOrderDetail.map((item) => (
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
                      ))
                    : order.orderDetails.map((item) => (
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
=======
                  {order.orderDetails.length === 0 ? (
                    order.preOrderDetail.map((item) => (
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
                                {Number(item.product.price).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
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
                    ))
                  ) : (
                    order.orderDetails.map((item) => (
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
                                {Number(item.product.price).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
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
                    ))
                  )}
>>>>>>> a95890d (Feat/(customer-preorder): api for customer pre-order (#40))
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
                style={{ width: "90%", marginTop: "50px", height: "auto" }}
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
                        order.totalPrice - order.shipFee,
                        // + order.order.voucher_fee
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
                      Giảm giá:
                    </Text>
                    {/* <Text strong style={{ fontSize: '17px', display: 'inline-block' }}>{order.order.voucher_code}</Text> */}
                    <Text
                      strong
                      style={{ fontSize: "17px", display: "inline-block" }}
                    >
                      {" "}
                      {/* {Number(order.voucher_fee).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })} */}
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text
                    style={{
                      fontSize: "17px",
                      display: "inline-block",
                      marginRight: "10px",
                    }}
                  >
                    Nhân viên giao hàng:
                  </Text>
                  <Text
                    strong
                    style={{ fontSize: "17px", display: "inline-block" }}
                  >
                    {order.shipper
                      ? order.shipper.firstName
                        ? order.shipper.firstName
                        : order.shipper.email
                      : ""}
                  </Text>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderDetail;
