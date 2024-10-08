import { useState, useEffect } from "react";
import Breadcrumbs from "../elements/Breadcrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchCreateOrder,
  fetchProductBatches,
  fetchProducts,
  createPaymentLink,
} from "../../data/api";

const Payment = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticatedMember = localStorage.getItem("isMember") === "true";
  const location = useLocation();

  const navigate = useNavigate();
  const customer_infor = location.state?.customer_infor;
  const { cartItems, totalPrice, clearCart } = useCartContext();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(null);
  const ship = location.state?.ship;
  const selectedVoucher = location.state?.selectedVoucher;
  const totalAmount = location.state?.totalAmount;
  const discount = location.state?.discount;
  const voucher_code = location.state?.voucherCode;
  const points = location.state?.points;

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!paymentMethod) {
      setErrorMessage("Vui lòng chọn một phương thức thanh toán.");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("Vui lòng đồng ý với các điều khoản và điều kiện.");
      return;
    }

    const order_infor = {
      fullName: customer_infor.full_name,
      email: customer_infor.email,
      phone: customer_infor.phone,
      address: customer_infor.address,
      paymentMethod: paymentMethod,
      requiredDate: new Date().toISOString().split("T")[0],
      orderDetails: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      shipFee: ship,
      totalPrice: totalAmount,
      voucherCode: voucher_code,
      userId: user && user.id ? user.id : null,
      point: points,
    };

    try {
      if (paymentMethod === "Online") {
        localStorage.setItem("pendingOrder", JSON.stringify(order_infor));
        // Call API to create payment link
        const productNameString = cartItems
          .map((item) => `${item.name} x${item.quantity}`)
          .join(", ");
        const paymentLinkResponse = await createPaymentLink({
          baseUrl: window.location.origin, // Current site URL
          productName: productNameString,
          price: totalAmount,
        });

        const paymentLink = paymentLinkResponse;
        // Redirect to the payment link
        window.location.href = paymentLink;

        return; // Stop further execution
      }

      // If COD, continue to place the order
      await fetchCreateOrder(order_infor);
      clearCart();
      navigate("/thanks", { state: { isCheck: true } });
    } catch (error) {
      console.error("Error creating order:", error);
      setErrorMessage("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const total =
    totalPrice + ship - discount > 0 ? totalPrice + ship - discount : 0;

  return (
    <>
      <Breadcrumbs headline="Thanh toán" />
      <Toaster />
      <>
        <ol className="flex w-full items-center justify-center px-24 text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex w-full items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <svg
                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Giỏ Hàng
            </span>
          </li>
          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex w-full items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <svg
                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Thông Tin
            </span>
          </li>
          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex w-full items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <svg
                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Thanh Toán
            </span>
          </li>
          <li className="flex shrink-0 items-center">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Hoàn Thành
          </li>
        </ol>
        <section className="bg-white antialiased dark:bg-gray-900">
          <form action="#" className="mx-auto w-full" onSubmit={handleSubmit}>
            <div className="flex w-full gap-8">
              <div className="w-2/3">
                <div className="border-b border-[rgba(0,0,0,0.2)] py-4 sm:mt-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Thông Tin Đơn Hàng
                  </h4>
                  <div>
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      Họ và Tên: {customer_infor.full_name}
                    </p>
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                      <p>Địa chỉ email: {customer_infor.email}</p>
                      <p>Số Điện Thoại: {customer_infor.phone} </p>
                    </div>
                    <div className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                      <p>Địa Chỉ: {customer_infor.address}</p>
                    </div>
                  </div>
                  <Link
                    to={"/order"}
                    state={{
                      ship: ship,
                      discount: discount,
                      voucherCode: voucher_code,
                      selectedVoucher: selectedVoucher,
                      totalAmount: totalAmount,
                    }}
                    data-modal-target="billingInformationModal"
                    data-modal-toggle="billingInformationModal"
                    className="text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
                  >
                    Chỉnh Sửa
                  </Link>
                </div>
                <div className="mt-6 sm:mt-8">
                  <div className="relative overflow-x-auto">
                    <h4 className="mb-4 text-lg font-bold text-gray-900">
                      Sản Phẩm Đơn Hàng
                    </h4>
                    <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                      <tbody className="divide-y divide-gray-200">
                        {cartItems.map((product) => (
                          <div
                            className="mb-4 rounded-lg border border-[rgba(0,0,0,0.2)] bg-white p-4 shadow-sm md:p-6"
                            key={product.id}
                          >
                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                              <img
                                className="h-20 w-20 dark:hidden"
                                src={product.coverImageUrl}
                                alt={product.name}
                              />
                              <img
                                className="hidden h-20 w-20 dark:block"
                                src={product.coverImageUrl}
                                alt={product.name}
                              />
                              <div className="flex items-center justify-between md:order-3 md:justify-end">
                                <div className="text-end md:order-4 md:w-32">
                                  <p className="text-base font-bold text-gray-900 dark:text-white">
                                    {Number(product.price).toLocaleString(
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
                                <Link
                                  to={"/product"}
                                  state={{ product: product }}
                                  onClick={() => window.scrollTo(0, 0)}
                                  className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                                >
                                  {product.name}
                                </Link>
                                <div className="flex items-center gap-4">
                                  x{product.quantity} sản phẩm
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="my-auto w-1/3">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Thành Tiền
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Giá gốc
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {Number(totalPrice).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Phí ship
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        {Number(ship).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Mã giảm giá
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {selectedVoucher &&
                        Object.keys(selectedVoucher).length > 0
                          ? selectedVoucher.voucherType === "FIXED_AMOUNT"
                            ? Number(selectedVoucher.value).toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                },
                              )
                            : `${Number(selectedVoucher.value)}%`
                          : "0đ"}
                      </dd>
                    </dl>

                    {points > 0 ? (
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-gray-500 dark:text-gray-400">
                          Điểm đã dùng
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {points}
                        </dd>
                      </dl>
                    ) : isAuthenticatedMember ? (
                      <div className="text-gray-500 dark:text-gray-400">
                        Bạn chưa có điểm để dùng
                      </div>
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400">
                        Đăng nhập để tích điểm và dùng điểm
                      </div>
                    )}
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-y border-[rgba(0,0,0,0.2)] py-2">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                      Tổng Giá Trị
                    </dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">
                      {Number(totalAmount).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </dd>
                  </dl>
                </div>
                <div className="w-full border-b border-[rgba(0,0,0,0.2)] py-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Phương Thức Thanh Toán
                  </h4>
                  <div>
                    <input
                      id="payment-radio-1"
                      type="radio"
                      name="payment-method"
                      value="COD"
                      onChange={handlePaymentChange}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                    />
                    <label
                      htmlFor="payment-radio-1"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Thanh Toán Khi Nhận Hàng (COD)
                    </label>
                  </div>
                  <div>
                    <input
                      id="payment-radio-2"
                      type="radio"
                      name="payment-method"
                      value="Online"
                      onChange={handlePaymentChange}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                    />
                    <label
                      htmlFor="payment-radio-2"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Thanh Toán Online
                    </label>
                  </div>
                </div>

                <div className="my-4 flex items-start sm:items-center">
                  <input
                    id="terms-checkbox-2"
                    type="checkbox"
                    required
                    name="terms-checkbox"
                    onChange={handleTermsChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                  />
                  <label
                    htmlFor="terms-checkbox-2"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Tôi đồng ý với{" "}
                    <Link
                      to={"/exchange_policy"}
                      className="text-primary-700 underline hover:no-underline dark:text-primary-500"
                    >
                      các điều khoản và điều kiện
                    </Link>{" "}
                    việc mua và đổi trả của MilkJoy{" "}
                  </label>
                </div>
                {errorMessage && (
                  <div className="error mb-4 text-red-500">*{errorMessage}</div>
                )}
                <div className="gap-4 sm:flex sm:items-center">
                  <Link
                    to={"/cart"}
                    onClick={() => window.scrollTo(0, 0)}
                    className="w-full rounded-lg border border-[rgba(0,0,0,0.2)] bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    Tiếp Tục Mua
                  </Link>
                  <button
                    type="submit"
                    disabled={countdown > 0}
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                  >
                    Thanh Toán
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </>
    </>
  );
};

export default Payment;
