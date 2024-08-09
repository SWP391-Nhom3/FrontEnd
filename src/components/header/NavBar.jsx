import { Link } from "react-router-dom";

import LogoImg from "../../assets/images/logo/Logo.png";
import SearchBar from "./SearchBar";
import UserBtn from "./userBtn";
import { useCartContext } from "../../context/CartContext";
import { useEffect } from "react";

const NavBar = () => {
  const { cartAmount } = useCartContext();
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
