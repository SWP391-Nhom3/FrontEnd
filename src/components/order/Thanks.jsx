import { useLocation } from "react-router-dom";
import successImg from "../../assets/images/background/order-success-poster.png";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Breadcrumbs from "../elements/Breadcrumb";

const Thanks = () => {
  const location = useLocation();
  const isCheck = location.state?.isCheck || false;
  const order_id = location.state?.order_id || null;
  return (
    <div>
      <Breadcrumbs
        headline={isCheck ? "Đặt hàng thành công" : "Đặt hàng thất bại"}
      />
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
        {isCheck ? (
          <li className="flex shrink-0 items-center text-primary-700">
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
        ) : (
          <li className="flex shrink-0 items-center text-red-600">
            <IoMdCloseCircleOutline className="me-2 h-5 w-5 sm:h-5 sm:w-5" />
            Thất Bại
          </li>
        )}
      </ol>
      {isCheck ? (
        <div>
          <div className="min-h-[60vh] w-full bg-gray-200">
            <div className="h-50 flex items-center justify-center">
              <img src={successImg} alt="" />
            </div>
            <div className="text-center">
              <h1 className="mb-4 text-3xl font-bold">Cảm Ơn Đã Đặt Hàng</h1>
              <p className="text-lg text-gray-600">
                Đơn hàng của bạn sẽ sớm được xác nhận
                <br />
                Hóa đơn sẽ được gửi đến mail của bạn
                <br />
                Mã Hóa đơn: {order_id}
                <br />
                Liên hệ: 083 456 4869 - pass10diemswp391@gmail.com
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="min-h-[60vh] w-full bg-gray-200">
            <div className="flex h-72 items-center justify-center">
              <img src={successImg} alt="" />
            </div>
            <div className="text-center">
              <h1 className="mb-4 text-3xl font-bold">Thanh Toán Thất Bại</h1>
              <p className="text-lg text-gray-600">
                Liên hệ: 083 456 4869 - pass10diemswp391@gmail.com để được hỗ
                trợ
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Thanks;
