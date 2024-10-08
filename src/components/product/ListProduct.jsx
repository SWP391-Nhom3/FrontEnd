import { FaShoppingCart } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { usePreOrderContext } from "../../context/PreOrderContext";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import banner from "../../assets/images/body/babyDrinkMilk.png";
import Breadcrumbs from "../../components/elements/Breadcrumb";

const ListProduct = () => {
  const { addCartItem } = useCartContext();
  const { addPreOrderItem } = usePreOrderContext();
  const location = useLocation();
  const products = location.state?.products;
  const [productsList, setProductsList] = useState(products);
  const headline = location.state?.headline;
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    const productActive = async () => {
      setProductsList(products.filter((product) => product.active));
    };
    productActive();
  }, [products]);

  const displayedProducts = productsList.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const totalPages = Math.ceil(productsList.length / productsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Breadcrumbs headline={headline} />
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})`, height: "350px" }}
      >
        <div className="absolute inset-0 flex items-center justify-start bg-opacity-50">
          <div className="ml-10 p-6 md:w-1/2 lg:w-2/3">
            <h1 className="mb-6 text-4xl font-bold text-black md:text-6xl lg:text-7xl">
              {headline} của
              <br className="hidden md:block" />
              <span className="text-primary-500">MilkJoy</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <Toaster />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center rounded-lg border p-4"
            >
              <Link
                to="/product"
                state={{ product: product }}
                onClick={() => window.scrollTo(0, 0)}
                className="w-full"
              >
                <div className="relative mb-2 flex justify-center">
                  <img
                    src={product.coverImageUrl}
                    alt={product.product_name}
                    className="h-44 w-44 object-cover"
                  />
                  {product.stockQuantity === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                      <span className="text-xl font-bold text-white">
                        Hết hàng
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-2 h-20 w-full text-center">
                  <h3
                    className="overflow-hidden overflow-ellipsis text-base font-bold"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.name}
                  </h3>
                </div>
              </Link>
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col justify-between">
                  {product.discount > 0 ? (
                    <>
                      <div className="text-xl font-bold text-gray-900">
                        {formatCurrency(
                          product.price -
                            (product.price * product.discount) / 100,
                        )}
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(product.price)}
                        </span>
                        <span className="text-md ml-2 font-semibold text-green-500">
                          Giảm {product.discount}%
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="mt-auto text-xl font-bold text-gray-900">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </div>
                {product.stockQuantity === 0 ? (
                  <button
                    onClick={() => addPreOrderItem(product)}
                    className="flex items-center justify-center rounded-lg bg-secondary-600 p-3 text-center text-base font-medium text-white hover:bg-secondary-800 focus:outline-none focus:ring-4 focus:ring-secondary-300 dark:bg-secondary-600 dark:hover:bg-secondary-500 dark:focus:ring-secondary-600"
                  >
                    <span className="mr-1">Đặt trước</span>
                    <FaShoppingCart />
                  </button>
                ) : (
                  <button
                    onClick={() => addCartItem(product)}
                    className="flex items-center justify-center rounded-lg bg-primary-500 p-3 text-center text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-500 dark:focus:ring-primary-600"
                  >
                    <span className="mr-1">Thêm</span>
                    <FaShoppingCart />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              className={`mx-1 rounded border px-4 py-2 ${
                index + 1 === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListProduct;
