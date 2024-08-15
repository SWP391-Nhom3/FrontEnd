import React from "react";
import { Card } from "flowbite-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./Swiper.css";
import { useCartContext } from "../../context/CartContext";

const ProductCard = ({ products, headline }) => {
  const { addCartItem } = useCartContext();
  const productsToShow = products.slice(0, 12);
  const navigate = useNavigate();

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

  const handleProductClick = (productId) => {
    navigate("/product", { state: { productId: productId } });
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
          if (product.stockQuantity > 0) {
            return (
              <div key={product.id} className="p-1">
                <Card className="product-card relative m-1 flex h-full max-w-xs flex-col justify-between">
                  <div
                    onClick={() => handleProductClick(product.id)}
                    className="cursor-pointer"
                  >
                    <div className="product-image-container relative">
                      <img
                        className="product-image mx-auto"
                        src={product.coverImageUrl}
                        alt={product.name}
                      />
                      {product.stockQuantity === 0 && (
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
                  </div>
                  <div className="flex h-20 w-full items-end justify-between">
                    <div className="flex flex-col justify-between">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => addCartItem(product)}
                      disabled={product.stockQuantity === 0}
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
