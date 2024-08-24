import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import cartEmptyImg from "../../assets/images/background/cart_empty.png";
import { useCartContext } from "../../context/CartContext";
import { fetchGetVoucher, fetchUserById } from "../../data/api";
import { Button } from "flowbite-react";
import { ImGift } from "react-icons/im";
import { notification } from "antd";
const ShoppingCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const verify = user === null ? 0 : user.verify;
  const {
    cartItems,
    totalPrice,
    removeCartItem,
    increaseAmount,
    decreaseAmount,
    cartAmount,
  } = useCartContext();
  const [voucherCode, setVoucherCode] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState({});
  const [discount, setDiscount] = useState(0);
  const [ship, setShip] = useState(0);
  const [errorList, setErrorList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [voucherList, setVoucherList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(totalPrice);
  const [usePoints, setUsePoints] = useState(false);
  const [points, setPoints] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [originalTotalAmount, setOriginalTotalAmount] = useState(totalAmount);


  const isAuthenticatedMember = localStorage.getItem("isMember") === "true";
  console.log(isAuthenticatedMember)
  useEffect(() => {
    if (isAuthenticatedMember) {
      fetchUserById(user.id).then((res) => {
        setUserPoints(res.data.data.point);
      });
    }
  }, []);

  const handleUsePointsChange = (e) => {
    const checked = e.target.checked;
    setUsePoints(checked);
    
    if (checked) {
      setOriginalTotalAmount(totalAmount);
      setTotalAmount(totalAmount - userPoints);
    } else {
      setTotalAmount(originalTotalAmount);
    }
  };

  const handleChangeVoucherCode = (event) => {
    const selectedVoucherCode = event.target.value;
    const selectedVoucher = voucherList.find(
      (voucher) => voucher.code === selectedVoucherCode,
    );
    setVoucherCode(selectedVoucherCode);
    if (selectedVoucher) {
      applyDiscount(selectedVoucher);
    } else {
      setDiscount(0);

    }
  };

  const calculateTotal = (items, shippingFee) => {
    let total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    total += shippingFee;
    return total;
  };

  const applyDiscount = (total, voucher) => {
    let newTotalAmount = total;

    if (voucher && voucher.voucherType === "FIXED_AMOUNT") {
      newTotalAmount -= voucher.value;
    } else if (voucher && voucher.voucherType === "PERCENTAGE") {
      newTotalAmount -= (newTotalAmount * voucher.value) / 100;
    }

    return newTotalAmount;
  };
  useEffect(() => {
    const total = calculateTotal(cartItems, ship);
    const discountedTotal = applyDiscount(total, selectedVoucher);
    setTotalAmount(discountedTotal);
  }, [cartItems, selectedVoucher, ship]);

  useEffect(() => {
    const getVouchers = async () => {
      try {
        const data = await fetchGetVoucher();
        setVoucherList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getVouchers();
  }, []);

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    document.getElementById("voucherCode").value = selectedValue;
    setVoucherCode(selectedValue);
  };

  const handClickVoucher = async (event) => {
    event.preventDefault();
  
    try {
      const res = await fetchGetVoucher(); // Fetching vouchers
      const allVouchers = res;
      let selectedVoucher = allVouchers.find(
        (voucher) => voucher.code === voucherCode
      );
  
      if (!selectedVoucher) {
        notification.error({
          message: "Mã voucher không tồn tại!",
          placement: "top",
        });
        setVoucherCode("");
        setSelectedVoucher({});
        return;
      }
  
      const currentDate = new Date();
      if (selectedVoucher.expiryDate && new Date(selectedVoucher.expiryDate) < currentDate) {
        notification.error({
          message: "Mã voucher đã hết hạn!",
          placement: "top",
        });
        setVoucherCode("");
        setSelectedVoucher({});
        return;
      }
  
      if (selectedVoucher.maxUses <= 0) {
        notification.error({
          message: "Mã voucher đã được sử dụng hết!",
          placement: "top",
        });
        setVoucherCode("");
        setSelectedVoucher({});
        return;
      }
        selectedVoucher = {
        ...selectedVoucher,
        maxUses: selectedVoucher.maxUses - 1,
      };
  
      setDiscount(Number(selectedVoucher.value));
      setSelectedVoucher(selectedVoucher);
  
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu voucher:", error);
      notification.error({
        message: "Có lỗi xảy ra khi áp dụng mã voucher!",
        placement: "top",
      });
    }
  };
  const calculateShip = (cartAmount) => {
    if (cartAmount > 20) {
      return 0;
    } else if (cartAmount > 10) {
      return 30000;
    } else {
      return 50000;
    }
  };
  function formatVoucherValue(selectedVoucher) {
    if (selectedVoucher.voucherType === "FIXED_AMOUNT") {
      return Number(selectedVoucher.value).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    } else {
      return `${Number(selectedVoucher.value)}%`;
    }
  }
  function formatCurrency(amount) {
    if (isNaN(amount) || amount == null) {
      return "0 VND";
    }

    return Number(Math.max(amount, 0)).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  const sendDataToOrderDetail = () => {
    const detail = { selectedVoucher, totalAmount };
    document.dispatchEvent(
      new CustomEvent("sendDataToOrderDetail", { detail }),
    );
  };
  sendDataToOrderDetail();
  useEffect(() => {
    setShip(calculateShip(cartAmount));
  }, [cartAmount]);
  return (
    <>
      <ol className="flex w-full items-center justify-center px-24 text-center text-sm font-medium text-gray-500 sm:text-base">
        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="flex w-full items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
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
        <li className="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="flex w-full items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
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
        <li className="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="flex w-full items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
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

      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Giỏ hàng
            {cartAmount > 0 ? (
              <span className="text-base">({cartAmount} sản phẩm)</span>
            ) : (
              ""
            )}
          </h2>
          {cartAmount > 0 ? (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cartItems.map((product) => (
                    // cart Item
                    <div
                      key={product.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img
                          className="h-20 w-20"
                          src={product.coverImageUrl}
                        />
                        <img
                          className="hidden h-20 w-20"
                          src={product.coverImageUrl}
                        />
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => decreaseAmount(product.id)}
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                              value={product.quantity}
                              readOnly
                            />
                            <button
                              type="button"
                              onClick={() => increaseAmount(product)}
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900">
                              {Number(product.price).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <Link
                            to={"/product"}
                            state={{ product: product }}
                            className="text-base font-medium text-gray-900 hover:underline"
                          >
                            {product.name}
                          </Link>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => removeCartItem(product.id)}
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                            >
                              <MdDeleteForever className="me-1.5 h-5 w-5" />
                              Xóa Khỏi Giỏ Hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Order summary */}
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                  <p className="text-xl font-semibold text-gray-900">
                    Tóm Tắt Đơn Hàng
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Giá gốc
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          {Number(totalPrice).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Phí ship:
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          {Number(ship).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Mã giảm giá
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                            {Object.keys(selectedVoucher).length > 0 ? formatVoucherValue(selectedVoucher) : "0 đ"}
                        </dd>
                      </dl>
                    </div>

                    {isAuthenticatedMember ? (
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          id="usePoints"
                          checked={usePoints}
                          onChange={handleUsePointsChange}
                        />
                        <label
                          htmlFor="usePoints"
                          className="text-base font-normal text-gray-500"
                        >
                          Sử dụng {userPoints} điểm tích lũy
                        </label>
                      </div>
                    ) : (
                      <div>Đăng nhập để dùng điểm tích lũy</div>
                    )}

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                      <dt className="text-base font-bold text-gray-900">
                        Tổng Cộng
                      </dt>
                      <dd className="text-base font-bold text-gray-900">
                        {formatCurrency(totalAmount)}
                      </dd>
                    </dl>
                  </div>
                  <Link
                    to={"/order"}
                    state={{
                      discount: discount,
                      ship: ship,
                      voucherCode: voucherCode,
                      selectedVoucher: selectedVoucher,
                      totalAmount: totalAmount,
                      paymentType: "regular",
                      points: usePoints ? userPoints : 0,
                    }}
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-4 focus:ring-[#93c5fd]"
                  >
                    Thanh Toán Ngay
                  </Link>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      Hoặc{" "}
                    </span>
                    <a
                      href="/filter"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                    >
                      Tiếp Tục Mua Hàng
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                  <form className="space-y-4" onSubmit={handClickVoucher}>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Bạn có voucher hoặc thẻ quà tặng không?
                    </label>
                    <div className="flex w-full items-center justify-between gap-2">
                      <input
                        id="voucherCode"
                        name="voucherCode"
                        type="text"
                        value={voucherCode}
                        onChange={handleChangeVoucherCode}
                        placeholder="Nhập mã voucher của bạn"
                      />
                      <div className="w-1/4">
                        <Button color="blue" size="xs" type="submit">
                          Áp Dụng
                        </Button>
                      </div>
                    </div>
                    <div className="w-full">
                      {verify === 1 && (
                        <div>
                          <button
                            id="dropdownRadioHelperButton"
                            data-dropdown-toggle="dropdownRadioHelper"
                            className="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                          >
                            Kho Voucher
                          </button>
                          {/* Dropdown menu */}
                          {dropdownOpen &&
                            (voucherList.length > 0 ? (
                              <div
                                id="dropdownRadioHelper"
                                className="z-10 w-full divide-y divide-gray-100 rounded-lg bg-white shadow"
                              >
                                <ul
                                  className="space-y-1 p-3 text-sm text-gray-700"
                                  aria-labelledby="dropdownRadioHelperButton"
                                >
                                  {voucherList.map((voucher) => (
                                    <li key={voucher.id}>
                                      <div className="flex rounded p-2 hover:bg-gray-100">
                                        <div className="flex h-5 items-center">
                                          <input
                                            id="helper-radio-4"
                                            name="helper-radio"
                                            type="radio"
                                            value={voucher.id}
                                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
                                            onChange={handleRadioChange}
                                          />
                                        </div>
                                        <div className="ms-2 text-sm">
                                          <label
                                            htmlFor="helper-radio-4"
                                            className="font-medium text-gray-900"
                                          >
                                            <div>
                                              Voucher giảm{" "}
                                              {Number(
                                                voucher.discount,
                                              ).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                              })}
                                            </div>
                                            <p
                                              id="helper-radio-text-4"
                                              className="text-xs font-normal text-gray-500"
                                            >
                                              Voucher chỉ còn {voucher.amount}{" "}
                                              lượt
                                            </p>
                                          </label>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <p className="text-md text-center font-normal text-red-600">
                                Điểm tích lũy không đủ!
                              </p>
                            ))}
                          <div className="my-2 flex items-center justify-center gap-2">
                            <a
                              href="/profile/accumulated-points"
                              className="inline-flex items-center gap-2 text-sm font-medium text-black underline hover:no-underline"
                            >
                              <ImGift className="h-5 w-5" /> Tìm hiểu thêm về
                              quà tặng?
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    {errorList.length > 0 && (
                      <div className="error-list mb-3 mt-3">
                        {errorList.map((error, index) => (
                          <p key={index} className="text-red-600">
                            {error}
                          </p>
                        ))}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-8 my-8 flex min-h-60 w-full flex-col items-center justify-center rounded-xl border-2 border-[rgba(0,0,0,0.1)] p-4 outline-none">
              <h1 className="text-2xl font-semibold">Giỏ hàng trống</h1>
              <img src={cartEmptyImg} className="min-h-[400px]" />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
