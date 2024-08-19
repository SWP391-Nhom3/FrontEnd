import { Link } from "react-router-dom";

import LogoImg from "../../assets/images/logo/Logo.png";
import SearchBar from "./SearchBar";
import UserBtn from "./userBtn";
import { useCartContext } from "../../context/CartContext";
import { usePreOrderContext } from "../../context/PreOrderContext";

import { useEffect } from "react";

const NavBar = () => {
  const { cartAmount } = useCartContext();
  const { preOrderAmount } = usePreOrderContext();
  useEffect(() => {
    document.title = "MilkJoy Shop";
  }, []);
  return (
    <>
      <header className="min-h-16">
        <div className="flex items-center">
          {/* logo */}
          <div className="mr-auto flex-shrink-0 md:w-48">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              }}
            >
              <img className="h-8 rounded-lg md:h-20" src={LogoImg} alt="" />
            </Link>
          </div>
          {/* search */}
          <div className="hidden h-full w-full max-w-xs items-center xl:flex xl:max-w-lg 2xl:max-w-2xl">
            <SearchBar />
          </div>
          {/* phone number */}
          <div className="ml-auto hidden flex-col place-items-end sm:flex md:w-48">
            <span className="font-bold md:text-xl">090 7089078</span>
            <span className="text-sm font-semibold text-gray-400">
              Hotline - Hỗ Trợ 24/7
            </span>
          </div>
          {/* buttons */}
          <nav className="contents">
            <ul className="ml-4 flex items-center justify-end xl:w-48">
              {/* preOrderContext */}
              <li className="relative ml-2 inline-block lg:ml-4">
                <a className="" href="/pre-order">
                  <div className="absolute -top-1 right-0 z-10 rounded-sm bg-yellow-400 px-1 py-0.5 text-xs font-bold">
                    {preOrderAmount}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="-5.0 -10.0 110.0 135.0"
                    className="h-12 p-2 text-gray-500 lg:h-12"
                  >
                    <path d="m87.5 54.438v-38.812c0-5.1758-4.1992-9.375-9.375-9.375h-62.5c-5.1758 0-9.375 4.1992-9.375 9.375v62.5c0 5.1758 4.1992 9.375 9.375 9.375h38.812c5.9922 5.4375 14.371 7.3945 22.152 5.1758 7.7812-2.2227 13.863-8.3047 16.086-16.086 2.2188-7.7812 0.26172-16.16-5.1758-22.152zm-9.375-41.938c0.82812 0 1.625 0.32812 2.2109 0.91406 0.58594 0.58594 0.91406 1.3828 0.91406 2.2109v6.25h-14.062v-9.375zm-17.188 0v21.875h-28.125v-21.875zm-45.312 0h10.938v9.375h-14.062v-6.25c0-1.7266 1.3984-3.125 3.125-3.125zm-3.125 65.625v-50h14.062v6.25c0 1.6562 0.66016 3.2461 1.832 4.418s2.7617 1.832 4.418 1.832h28.125c1.6562 0 3.2461-0.66016 4.418-1.832s1.832-2.7617 1.832-4.418v-6.25h14.062v21.469c-5.9414-3.1289-12.941-3.5547-19.219-1.1758-6.2773 2.375-11.238 7.3359-13.613 13.613-2.3789 6.2773-1.9531 13.277 1.1758 19.219h-33.969c-1.7266 0-3.125-1.3984-3.125-3.125zm57.812 9.375c-4.5586 0-8.9297-1.8125-12.152-5.0352s-5.0352-7.5938-5.0352-12.152 1.8125-8.9297 5.0352-12.152 7.5938-5.0352 12.152-5.0352 8.9297 1.8125 12.152 5.0352 5.0352 7.5938 5.0352 12.152c-0.007812 4.5547-1.8203 8.9219-5.043 12.145-3.2227 3.2227-7.5898 5.0352-12.145 5.043zm8.4688-13.156c0.58984 0.58594 0.92578 1.3867 0.92578 2.2188s-0.33594 1.6328-0.92578 2.2188-1.3867 0.91016-2.2188 0.90625c-0.83203 0.003906-1.6289-0.32031-2.2188-0.90625l-5.3125-5.3438c-1.1719-1.168-1.8359-2.75-1.8438-4.4062v-8.0938c0-1.7266 1.3984-3.125 3.125-3.125s3.125 1.3984 3.125 3.125v8.0938zm-44.406-14.969c0 0.82812-0.32812 1.625-0.91406 2.2109-0.58594 0.58594-1.3828 0.91406-2.2109 0.91406h-9.375c-1.7266 0-3.125-1.3984-3.125-3.125s1.3984-3.125 3.125-3.125h9.375c0.82812 0 1.625 0.32812 2.2109 0.91406 0.58594 0.58594 0.91406 1.3828 0.91406 2.2109zm0 12.5c0 0.82812-0.32812 1.625-0.91406 2.2109-0.58594 0.58594-1.3828 0.91406-2.2109 0.91406h-9.375c-1.7266 0-3.125-1.3984-3.125-3.125s1.3984-3.125 3.125-3.125h9.375c0.82812 0 1.625 0.32812 2.2109 0.91406 0.58594 0.58594 0.91406 1.3828 0.91406 2.2109z" />
                  </svg>
                </a>
              </li>

              {/* cart */}
              <li className="relative ml-2 inline-block lg:ml-4">
                <a className="" href="/cart">
                  <div className="absolute -top-1 right-0 z-10 rounded-sm bg-primary-400 px-1 py-0.5 text-xs font-bold text-white">
                    {cartAmount}
                  </div>
                  <svg
                    className="h-9 p-2 text-gray-500 lg:h-10"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="shopping-cart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
                    />
                  </svg>
                </a>
              </li>
              <li className="relative ml-2 inline-block lg:ml-4">
                <UserBtn />
              </li>
            </ul>
          </nav>
        </div>
        <div className="my-2 sm:block xl:hidden">
          <SearchBar />
        </div>
        <hr className="mt-4" />
      </header>
    </>
  );
};

export default NavBar;
