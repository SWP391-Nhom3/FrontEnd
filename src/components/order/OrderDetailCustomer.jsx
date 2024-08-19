import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../elements/Breadcrumb";
import { Button, Modal, Progress } from "flowbite-react";
import { FaCartPlus } from "react-icons/fa6";
import { FcFeedback } from "react-icons/fc";
import { useState, useEffect } from "react";
import RenderRating from "../elements/RenderRating";
// import { fetchGetFeedbackByUser, fetchUploadFeedback } from "../../data/api";
import toast from "react-hot-toast";
import { useCartContext } from "../../context/CartContext";
import Loader from "../../assets/loading2.gif";
import { AiOutlineFieldTime } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { FaTruckFast } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegSmileBeam } from "react-icons/fa";

const OrderDetailCustomer = () => {
  const location = useLocation();
  const order = location.state?.order || {};
  const [orderDetails, setOrderDetails] = useState([]);
  console.log(order);
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [report, setReport] = useState({
    rating: 0,
    description: "",
    product_id: null,
  });
  const token = JSON.parse(localStorage.getItem("result"));
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.id;
  const member_id = order.member.id;
  const checkMember = user_id === member_id;
  const { addCartItems } = useCartContext();

  useEffect(() => {
    const findProductById = (product_id) => {
      return products.find((product) => product.id === product_id);
    };
    if (products.length > 0 && order) {
      const updateOrderDetails = async () => {
        const details = await Promise.all(
          order.orderDetails.map(async (item) => {
            const product = findProductById(item.product.id);
            return { ...item, product };
          }),
        );
        setOrderDetails(details);
      };
      updateOrderDetails();
    }
    // if (checkMember) {
    //   const getReviews = async () => {
    //     await fetchGetFeedbackByUser(user_id)
    //       .then((res) => {
    //         setReviews(res.data.result.map((review) => review.product_id));
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       })
    //       .finally(() => {
    //         setLoadingReviews(false);
    //       });
    //   };
    //   getReviews();
    // } else {
    //   setLoadingReviews(false);
    // }
  }, []);

  const checReported = (product_id) => {
    return reviews.includes(product_id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
  };

  const addDays = (date, days) => {
    return new Date(date.getTime() + days * 86400000);
  };

  const openReportModal = (product_id) => {
    setReport({ ...report, product_id });
    setShowModal(true);
  };

  const closeReportModal = () => {
    setShowModal(false);
    setReport({ rating: 0, description: "", product_id: null });
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setReport({ ...report, rating });
  };

  const handleBuyBack = async () => {
    let productsToAdd = [];
    let outOfStockProducts = [];

    for (const item of orderDetails) {
      if (item.product.amount > 0) {
        productsToAdd.push(item.product);
      } else {
        outOfStockProducts.push(item.product.product_name);
      }
    }

    if (productsToAdd.length > 0) {
      addCartItems(productsToAdd);
    }

    if (outOfStockProducts.length > 0) {
      toast.error(
        `Các sản phẩm sau đã hết hàng: ${outOfStockProducts.join(", ")}`,
        {
          position: "top-right",
          duration: 1000,
        },
      );
    }
  };

  const submitReport = async () => {
    // if (feedback.rating === 0 || feedback.description.trim() === "") {
    //   toast.error("Vui lòng nhập đủ thông tin đánh giá và mô tả sản phẩm.");
    //   return;
    // }
    // await fetchUploadFeedback(feedback, token)
    //   .then(() => {
    //     toast.success("Đánh giá cho sản phẩm thành công!");
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error("Đánh giá cho sản phẩm thất bại!");
    //   });
    // closeReportModal();
  };

  const calculateProgress = () => {
    const status = order.orderStatus.name;
    const requiredDate = new Date(order.requiredDate);
    const currentDate = new Date();

    if (status === 3) {
      return 50;
    }

    let progress = 0;
    if (status === 0) {
      progress = 25;
    } else if (status === 1) {
      if (currentDate > addDays(requiredDate, 1)) {
        progress = 75;
      } else {
        progress = 50;
      }
    } else if (status === 2) {
      progress = 100;
    }

    return progress;
  };

  const statusColor = () => {
    return order.orderStatus === 3 ? "red" : "primary";
  };

  const getTrackingStageColor = (stage) => {
    const progress = calculateProgress();
    switch (stage) {
      case 25:
        return progress >= 25 ? "text-primary-600" : "text-gray-500";
      case 50:
        return progress >= 50 ? "text-primary-600" : "text-gray-500";
      case 75:
        return progress >= 75 ? "text-primary-600" : "text-gray-500";
      case 100:
        return progress === 100 ? "text-primary-600" : "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <>
      <div className="container mx-auto my-10">
        <Breadcrumbs headline={"Chi tiết đơn hàng"} />
        <div className="flex w-full flex-col items-center rounded-xl border p-10">
          <div className="mb-4 flex w-full items-center justify-between border-b pb-4">
            <div>
              <h1 className="text-2xl font-semibold">
                Chi tiết đơn hàng:{" "}
                <span className="text-primary-600">#{order.id}</span>
              </h1>
              <p className="text-lg">
                Hiển thị thông tin các sản phẩm bạn đã mua tại MilkJoy Shop
              </p>
            </div>
            <div>
              <Button
                color="light"
                size={"xl"}
                className="text-primary-600"
                onClick={handleBuyBack}
              >
                <FaCartPlus className="mx-2 mt-0.5 text-xl" /> Mua lại sản phẩm
              </Button>
            </div>
          </div>
          {/* order tracking */}
          <div className="mb-4 w-full border-b p-4">
            <div className="rounded-lg p-6 text-primary-600">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-center">
                  {/* <AiOutlineFieldTime className="text-center w-full"/> */}
                  <div className="mb-1">{formatDate(order.requiredDate)}</div>
                  <div
                    className={`font-semibold ${getTrackingStageColor(25)} flex items-center gap-2`}
                  >
                    <AiOutlineFieldTime className="h-6 w-6" /> Chờ xác nhận
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1">
                    {order.acceptedDate ? formatDate(order.acceptedDate) : "-"}
                  </div>
                  <div
                    className={`font-semibold ${
                      order.orderStatus === "Đã hủy"
                        ? "text-red-500"
                        : getTrackingStageColor(50)
                    }`}
                  >
                    {order.orderStatus === "Đã hủy" ? (
                      <div className="flex items-center gap-2">
                        <IoIosCloseCircle className="h-6 w-6" /> Hủy đơn
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="h-5 w-5" /> Đã xác nhận
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1">
                    {(order.orderStatus === 1 &&
                      new Date() > addDays(new Date(order.acceptedDate), 1)) ||
                    order.shippedDate
                      ? formatDate(addDays(new Date(order.shippedDate), 1.2))
                      : "-"}
                  </div>
                  <div
                    className={`font-semibold ${getTrackingStageColor(75)} flex items-center gap-2`}
                  >
                    <FaTruckFast className="h-5 w-5" /> Đang giao hàng
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1">
                    {order.orderStatus === "Hoàn thành" ? "-" : "-"}
                  </div>
                  <div
                    className={`font-semibold ${getTrackingStageColor(100)} flex items-center gap-2`}
                  >
                    <FaRegSmileBeam className="h-5 w-5" />
                    Hoàn thành
                  </div>
                </div>
              </div>
              <Progress
                progress={calculateProgress()}
                color={statusColor()}
                size="lg"
              />
            </div>
          </div>
          {/* end order-tracking */}
          <div className="mb-4 flex w-full items-start gap-10 border-b p-4">
            <div>
              <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>
              <p className="text-md">
                Họ và tên: {order.member.firstName} {order.member.lastName}
              </p>
              <p className="text-md">Số điện thoại: {order.phone}</p>
              <p className="text-md">Địa chỉ email: {order.member.email}</p>
              <p className="text-md">Địa chỉ giao hàng: {order.address}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Thông tin đơn hàng</h2>
              <p className="text-md">
                Ngày đặt: {formatDate(order.requiredDate)}
              </p>
              {/* {order.orderStatus === 2 && (
                <p className="text-md">
                  Ngày ship: {formatDate(order.order.shipped_date)}
                </p>
              )} */}
              <p className="text-md">
                Trạng thái đơn hàng:{" "}
                <span className="font-semibold">{order.orderStatus.name}</span>
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Giá trị đơn hàng</h2>
              <p className="text-md">
                Tổng giá trị sản phẩm:{" "}
                {Number(order.totalPrice).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              {/* {checkMember && order.orderStatus === 2 && (
                <p className="text-md">
                  Số điểm tích lũy:{" "}
                  {Number(order.order.total_price * 0.01).toLocaleString(
                    "vi-VN",
                    { style: "currency", currency: "VND" }
                  )}
                </p>
              )} */}
              <p className="text-md">
                Phương thức thanh toán:{" "}
                <span className="font-semibold">
                  {order.paymentMethod === "COD"
                    ? "Thanh toán khi nhận hàng"
                    : "Thanh toán online (chuyển khoản)"}
                </span>
              </p>
            </div>
          </div>
          <div className="w-full">
            {loadingReviews ? ( // Display loading state while fetching reviews
              <div className="my-10 flex items-center justify-center">
                <img src={Loader} alt="loading" />
              </div>
            ) : (
              orderDetails.map((item) => (
                <div
                  key={item.product.id}
                  className="mb-4 flex w-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:p-6"
                >
                  <img
                    className="mr-4 h-20 w-20"
                    src={item.product.coverImageUrl}
                    alt={item.product.name}
                  />
                  <div className="flex flex-1 flex-col items-start justify-between md:flex-row md:items-center">
                    <div className="flex flex-col">
                      <div className="flex-col items-center">
                        <Link
                          to={"/product"}
                          state={{ product: item.product }}
                          onClick={() => window.scrollTo(0, 0)}
                          className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                        >
                          {item.product.product_name}
                        </Link>
                        <input
                          type="text"
                          className="block shrink-0 border-0 bg-transparent text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                          value={`x${item.quantity} sản phẩm`}
                          readOnly
                        />
                      </div>
                      <p className="mt-2 text-base font-bold text-gray-900 dark:text-white">
                        {Number(item.product.price).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                    {checkMember ? (
                      <Button
                        color="light"
                        size={"xl"}
                        className="ml-auto mt-4 text-primary-600 md:mt-0"
                        onClick={() => openReportModal(item.product_id)}
                      >
                        <FcFeedback className="mx-2 mt-0.5 text-xl" /> Đánh giá
                        sản phẩm
                      </Button>
                    ) : (
                      <Button
                        color="light"
                        size={"xl"}
                        className="text-screen-500 ml-auto mt-4 md:mt-0"
                        disabled
                      >
                        <FcFeedback className="mx-2 mt-0.5 text-xl" /> Đã đánh
                        giá sản phẩm
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={closeReportModal}>
        <Modal.Header className="text-xl font-semibold">
          Đánh giá sản phẩm:
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex items-center">
              <label className="mr-4 block text-xl font-medium text-gray-700 dark:text-gray-200">
                Đánh giá:
              </label>
              <RenderRating
                rating={report.rating}
                onRatingChange={handleRatingChange}
              />
            </div>
            <div>
              <label className="block text-xl font-medium text-gray-700 dark:text-gray-200">
                Mô tả sản phẩm:
              </label>
              <textarea
                name="description"
                className="mt-1 w-full rounded border p-2"
                rows="5"
                value={report.description}
                onChange={handleReportChange}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={submitReport}>
            Gửi đánh giá
          </Button>
          <Button color="gray" onClick={closeReportModal}>
            Hủy bỏ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderDetailCustomer;
