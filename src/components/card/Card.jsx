import { Card } from "flowbite-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./Swiper.css";
import RenderRating from "../elements/RenderRating";

import { useCartContext } from "../../context/CartContext";

const ProductCard = ({ products, headline }) => {
  const { addCartItem } = useCartContext();
  const productsToShow = products.slice(0, 12);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: "center",
    centerMode: true,
    centerPadding: "40px",
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        <button className="slick-arrow-button">
          <IoIosArrowForward className="icon" />
        </button>
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <button className="slick-arrow-button">
          <IoIosArrowBack className="icon" />
        </button>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="h-full">
      <div className="mb-2 mt-12 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{headline}</h1>
        <Link
          to={"/list-products"}
          state={{ products: products, headline: headline }}
          className="text-blue-500 hover:underline"
          onClick={() => window.scrollTo(0, 0)}
        >
          Xem tất cả
        </Link>
      </div>
      <Slider {...settings}>
        {productsToShow.map((product) => {
          if (product.active) {
            const discountedPrice =
              product.price - (product.price * product.discount) / 100;
            return (
              <div key={product._id} className="p-1">
                <Card className="product-card relative m-1 flex h-full max-w-xs flex-col justify-between">
                  <Link
                    to="/product"
                    state={{ product: product }}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="product-image-container relative">
                      <img
                        className="product-image mx-auto"
                        src={product.coverImageUrl}
                        alt={product.name}
                      />
                      {product.amount === 0 && (
                        <div className="out-of-stock-overlay">
                          <span className="text-xl font-bold text-white">
                            Hết hàng
                          </span>
                        </div>
                      )}
                    </div>
                    <h5
                      className="h-16 overflow-hidden overflow-ellipsis text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
                      style={{
                        WebkitLineClamp: 3,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.name}
                    </h5>
                  </Link>
                  <div className="mb-2 mt-1 flex items-center">
                    {/* <RenderRating rating={product.rating} /> */}
                    {/* <span className="ml-2 mr-1 rounded bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-800 dark:bg-primary-200 dark:text-primary-800">
                      {product.rating.toFixed(1)}
                    </span> */}
                  </div>
                  <div className="flex h-20 w-full items-end justify-between">
                    <div className="flex flex-col justify-between">
                      {product.discount > 0 ? (
                        <>
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            {formatCurrency(discountedPrice)}
                          </span>
                          <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                            {formatCurrency(product.price)}
                          </span>
                          <span className="text-sm text-green-500">
                            Giảm {product.discount}%
                          </span>
                        </>
                      ) : (
                        <span className="mt-auto text-xl font-bold text-gray-900 dark:text-white">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addCartItem(product)}
                      disabled={product.amount === 0}
                      className="flex items-center justify-center rounded-lg bg-primary-500 p-3 text-center text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-500 dark:focus:ring-primary-600"
                    >
                      <span className="mr-1">Thêm</span>
                      <FaShoppingCart />
                    </button>
                  </div>
                </Card>
              </div>
            );
          }
          return null;
        })}
      </Slider>
      <Toaster position="top-right" />
    </div>
  );
};

export default ProductCard;
