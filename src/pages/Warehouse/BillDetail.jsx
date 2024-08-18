import { Col, Divider, Row, Typography } from "antd";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { fetchProducts } from "../../data/api";
import { Button } from "flowbite-react";
import Loading from "../../components/Loading";

const BillDetail = () => {
  const location = useLocation();
  const inputBill = location.state?.inputBill;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [inputBillDetails, setInputBillDetails] = useState([]);

  //!! FETCH PRODUCT!!
  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const productData = await fetchProducts();
  //       setProducts(productData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setLoading(false);
  //     }
  //   };
  //   getProducts();
  // }, []);

  useEffect(() => {
    const findProductById = (product_id) => {
      return products.find((product) => product._id === product_id);
    };

    if (products.length > 0 && inputBill) {
      const updateInputBillDetails = async () => {
        const details = await Promise.all(
          inputBill.inputBillDetails.map(async (item) => {
            const product = findProductById(item.product_id);
            return { ...item, product };
          })
        );
        setInputBillDetails(details);
      };

      updateInputBillDetails();
    }
  }, [products, inputBill]);

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

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
      0
    );
    const discountPercentage = getDiscountPercentage(totalAmount); // Assume this function is defined elsewhere
    const originalTotal = calculatePrice(inputBillDetails);
    return originalTotal * (discountPercentage / 100);
  };

  const calculateTotal = (inputBillDetails) => {
    const originalTotal = calculatePrice(inputBillDetails);
    const totalDiscount = calculateTotalDiscount(inputBillDetails);
    return originalTotal - totalDiscount;
  };

  const { Text } = Typography;
  return (
    <div>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
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
                    Chi tiết đơn nhập hàng: #{inputBill.inputBill._id}
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
                  {inputBillDetails.map((item) => (
                    <Card
                      type="inner"
                      key={item._id}
                      className="mb-4 rounded-lg border border-[rgba(0,0,0,0.2)] bg-white shadow-sm"
                      style={{ marginBottom: "10px", padding: "10px" }}
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img
                          className="h-20 w-20 dark:hidden"
                          src={item.product?.imgUrl}
                          alt={item.product?.product_name}
                        />
                        <img
                          className="hidden h-20 w-20 dark:block"
                          src={item.product?.imgUrl}
                          alt={item.product?.product_name}
                        />
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              {Number(item.product?.price).toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <p className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                            {item.product?.product_name}
                          </p>
                          <div className="flex items-start gap-4">
                            x{item.amount} sản phẩm
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">NSX: {formatDate2(item.created_at)}</p>
                            <p className="text-sm font-medium">HSD: {formatDate2(item.expired_at)}</p>
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
                height: "40vh",
              }}
            >
              <Card
                title={
                  <h1 className="text-2xl font-bold">Thông tin đơn hàng:</h1>
                }
                style={{ width: "90%", marginTop: "50px" }}
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
                      {formatDate(inputBill.inputBill.input_date)}
                    </Text>
                  </div>
                </div>
                <Divider />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Tổng giá theo giá sản phẩm: </p>
                  <strong>
                    {Number(calculatePrice(inputBillDetails)).toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                  </strong>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    Giá chiết khấu (
                    {getDiscountPercentage(
                      inputBillDetails.reduce(
                        (total, product) => total + product.amount,
                        0
                      )
                    )}
                    %):{" "}
                  </p>
                  <strong>
                    {Number(
                      calculateTotalDiscount(inputBillDetails)
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Tổng cộng: </p>
                  <strong>
                    {Number(calculateTotal(inputBillDetails)).toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                  </strong>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BillDetail;
