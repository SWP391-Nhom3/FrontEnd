import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  FaAngleDown,
  FaAngleUp,
  FaReply,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";

import { useCartContext } from "../../context/CartContext";
import { usePreOrderContext } from "../../context/PreOrderContext";
// import { fetchGetFeedbackById } from "../../data/api";

import ProductCard from "../card/Card";
import { fetchAllNews, fetchReviewByProductId } from "../../data/api";
import { Rate } from "antd";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product || null;
  const { addCartItem } = useCartContext();
  const { addPreOrderItem } = usePreOrderContext();

  const [reviews, setReviews] = useState([]);
  const [news, setNews] = useState([]);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const products = JSON.parse(localStorage.getItem("products"));
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    if (product) {
      const getNews = async () => {
        const data = await fetchAllNews();
        setNews(data);
      };
      getNews();
    }
  }, [product]);

  useEffect(() => {
    fetchReviewByProductId(product.id)
    .then((res) => {
      console.log(res);
      setReviews(res.data.data);
    })
  }, []);
    

  if (!product) {
    return <div>Product not found</div>;
  }

  const formatDescription = (description) => {
    const parts = description.split("\n").filter((part) => part.trim() !== "");
    return parts.map((part, index) => {
      if (part.startsWith("*")) {
        const items = part.split("*").filter((item) => item.trim() !== "");
        return (
          <ul className="mb-4 list-inside list-disc" key={index}>
            {items.map((item, idx) => (
              <li key={idx}>{item.trim()}</li>
            ))}
          </ul>
        );
      } else {
        return (
          <p className="mb-4" key={index}>
            {part.trim()}
          </p>
        );
      }
    });
  };

  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const discountedPrice = getDiscountedPrice(product.price, product.discount);

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

  console.log(reviews);

  return product.active ? (
    <section className="bg-white py-8 antialiased md:py-16">
      <Toaster />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="relative mx-auto max-w-md shrink-0 lg:max-w-lg">
            <img
              className={`w-56 ${product.stockQuantity === 0 ? "grayscale" : ""}`}
              src={product.coverImageUrl}
              alt={product.name}
            />
            {product.stockQuantity === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-lg font-bold text-white">
                Hết hàng
              </div>
            )}
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {product.name}
            </h1>
            <div className="mt-4 sm:flex sm:items-center sm:gap-4">
              {product.discount > 0 ? (
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    {discountedPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <p className="text-lg text-gray-500 line-through sm:text-xl">
                    {Number(product.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  {/* <p className="text-lg font-medium text-green-500 sm:text-xl">
                    Giảm {product.discount}%
                  </p> */}
                </div>
              ) : (
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  {Number(product.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              )}

              <div className="mt-2 flex items-center gap-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  {/* <RenderRating rating={product.rating} /> */}
                </div>
                <p className="text-sm font-medium leading-none text-gray-500">
                  <Rate disabled value={product.rating}/>
                </p>
                <a className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline">
                  {reviews.length} Đánh Giá
                </a>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
              {product.stockQuantity > 0 ? (
                <button
                  className="mt-4 flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:mt-0"
                  onClick={() => addCartItem(product)}
                >
                  <FaCartPlus className="-ms-2 me-2 h-5 w-5" />
                  Thêm Vào Giỏ Hàng
                </button>
              ) : (
                <button
                  onClick={() => addPreOrderItem(product)}
                  className="mt-4 flex items-center justify-center rounded-lg bg-secondary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300 sm:mt-0"
                >
                  <FaCartPlus className="-ms-2 me-2 h-5 w-5" />
                  Đặt trước
                </button>
              )}
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-8" />
        {/* Mô tả */}
        <h2 className="mb-4 text-3xl font-semibold">Mô tả sản phẩm</h2>
        <div className="text-justify text-lg text-gray-500">
          {showFullDescription
            ? formatDescription(product.description)
            : formatDescription(product.description.slice(0, 100))}
          <button
            className="w-full text-center text-blue-600 visited:text-purple-600 hover:text-blue-800"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            <div className="mt-2 flex items-center justify-center">
              {showFullDescription ? `Thu gọn ` : `Xem thêm mô tả sản phẩm `}
              {showFullDescription ? (
                <FaAngleUp className="mx-2 my-2 h-5 w-5" />
              ) : (
                <FaAngleDown className="mx-2 my-2 h-5 w-5" />
              )}
            </div>
          </button>
        </div>

        {/* feedback */}
        <div className="mt-8">
          <h2 className="mb-4 text-3xl font-semibold">Đánh giá sản phẩm</h2>
          {reviews.length > 0 ? (
            <>
              {showAllReviews
                ? reviews.map((review) => (
                    <div
                      key={review.id}
                      className="mb-4 rounded-lg p-4 text-black"
                    >
                      <div className="mb-2 flex items-center">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-gray-900">
                          {review.user.firstName ? review.user.firstName.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div className="ml-2 flex w-full items-start justify-between">
                          <p className="text-lg font-semibold">
                          {review.user.firstName ? review.user.firstName : review.user.email}
                          </p>
                          <Rate disabled value={review.rating} />
                        </div>
                      </div>
                      <div className="mx-2 flex text-black">
                        <FaReply className="mx-2 mt-1 rotate-180 transform text-sm" />
                        {review.comment}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </p>
                      {review.reply && (
                        <div className="ml-10 mt-4 rounded-lg bg-gray-200 p-4">
                          <div className="mb-2 flex items-center">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-gray-900">
                              M
                            </div>
                            <p className="ml-2 font-medium">MilkJoy Shop:</p>
                          </div>
                          <div className="mx-8 flex text-black">
                            <FaReply className="mx-1 mt-1 rotate-180 transform text-sm" />
                            {review.reply.replyText}
                          </div>

                          <div className="mt-2 text-sm text-gray-500">
                            {formatDate(review.reply.createdAt)}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                : reviews.slice(0, 1).map((review) => (
                    <div
                      key={review.id}
                      className="mb-4 rounded-lg p-4 text-black"
                    >
                      <div className="mb-2 flex items-center">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-gray-900">
                        {review.user.firstName ? review.user.firstName.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div className="ml-2 flex w-full items-start justify-between">
                          <p className="text-lg font-semibold">
                          {review.user.firstName ? review.user.firstName : review.user.email}
                          </p>
                          <Rate disabled value={review.rating} />
                        </div>
                      </div>
                      <div className="mx-2 flex text-black">
                        <FaReply className="mx-2 mt-1 rotate-180 transform text-sm" />
                        {review.comment}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </p>
                      {review.reply && (
                        <div className="ml-10 mt-4 rounded-lg bg-gray-200 p-4">
                          <div className="mb-2 flex items-center">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-gray-900">
                              M
                            </div>
                            <p className="ml-2 font-medium">MilkJoy Shop:</p>
                          </div>
                          <div className="mx-8 flex text-black">
                            <FaReply className="mx-1 mt-1 rotate-180 transform text-sm" />
                            {review.reply.replyText}
                          </div>

                          <div className="mt-2 text-sm text-gray-500">
                            {formatDate(review.reply.createdAt)}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              <button
                className="w-full text-center text-blue-600 visited:text-purple-600 hover:text-blue-800"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                <div className="mt-2 flex items-center justify-center">
                  {showAllReviews ? `Thu gọn ` : `Xem tất cả đánh giá `}
                  {showAllReviews ? (
                    <FaAngleUp className="mx-2 my-2 h-5 w-5" />
                  ) : (
                    <FaAngleDown className="mx-2 my-2 h-5 w-5" />
                  )}
                </div>
              </button>
            </>
          ) : (
            <p className="text-center text-lg text-gray-600">
              Sản phẩm chưa có đánh giá
            </p>
          )}
        </div>

        {/* related products */}
        <div className="w-full">
          <ProductCard
            products={relatedProducts}
            headline={"Sản phẩm liên quan"}
          />
        </div>
      </div>
    </section>
  ) : (
    <section className="bg-white py-8 antialiased md:py-16">
      <Toaster />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="relative mx-auto max-w-md shrink-0 lg:max-w-lg">
            <img
              className={`w-56 ${product.amount === 0 ? "grayscale" : ""}`}
              src={product.imgUrl}
              alt={product.product_name}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-lg font-bold text-white">
              Sản phẩm ngừng bán
            </div>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {product.product_name}
            </h1>
            <div className="mt-4 sm:flex sm:items-center sm:gap-4">
              {product.discount > 0 ? (
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    {discountedPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <p className="text-lg text-gray-500 line-through sm:text-xl">
                    {Number(product.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  {/* <p className="text-lg font-medium text-green-500 sm:text-xl">
                    Giảm {product.discount}%
                  </p> */}
                </div>
              ) : (
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  {Number(product.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              )}

              <div className="mt-2 flex items-center gap-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  {/* <RenderRating rating={product.rating} /> */}
                </div>
                {/* <p className="text-sm font-medium leading-none text-gray-500">
                  ({product.rating.toFixed(1)})
                </p> */}
                {/* <a className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline">
                  {product.reviewer} Đánh Giá
                </a> */}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
              <span className="mt-4 flex items-center justify-center rounded-lg bg-gray-400 px-5 py-2.5 text-sm font-medium text-white sm:mt-0">
                Sản phẩm ngừng bán
              </span>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-8" />
        {/* Mô tả */}
        <h2 className="mb-4 text-3xl font-semibold">Mô tả sản phẩm</h2>
        <div className="text-justify text-lg text-gray-500">
          {showFullDescription
            ? formatDescription(product.description)
            : formatDescription(product.description.slice(0, 100))}
          <button
            className="w-full text-center text-blue-600 visited:text-purple-600 hover:text-blue-800"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            <div className="mt-2 flex items-center justify-center">
              {showFullDescription ? `Thu gọn ` : `Xem thêm mô tả sản phẩm `}
              {showFullDescription ? (
                <FaAngleUp className="mx-2 my-2 h-5 w-5" />
              ) : (
                <FaAngleDown className="mx-2 my-2 h-5 w-5" />
              )}
            </div>
          </button>
        </div>

        {/* feedback */}
        <div className="mt-8">
          <h2 className="mb-4 text-3xl font-semibold">Đánh giá sản phẩm</h2>
          {reviews.length > 0 ? (
            <>
              {showAllReviews
                ? reviews.map((review) => (
                    <div
                      key={review._id}
                      className="mb-4 rounded-lg p-4 text-black"
                    >
                      <div className="mb-2 flex items-center">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-gray-900">
                          {review.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-2 flex w-full items-start justify-between">
                          <p className="text-lg font-semibold">
                            {review.username}
                          </p>
                          {/* <RenderRating rating={review.rating} /> */}
                        </div>
                      </div>
                      <div className="mx-2 flex text-black">
                        <FaReply className="mx-2 mt-1 rotate-180 transform text-sm" />
                        {review.description}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {formatDate(review.created_at)}
                      </p>
                      {review.reply_feedback && (
                        <div className="ml-10 mt-4 rounded-lg bg-gray-200 p-4">
                          <div className="mb-2 flex items-center">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-gray-900">
                              M
                            </div>
                            <p className="ml-2 font-medium">MilkJoy Shop:</p>
                          </div>
                          <div className="mx-8 flex text-black">
                            <FaReply className="mx-1 mt-1 rotate-180 transform text-sm" />
                            {review.reply_feedback.description}
                          </div>

                          <div className="mt-2 text-sm text-gray-500">
                            {formatDate(review.reply_feedback.created_at)}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                : reviews.slice(0, 1).map((review) => (
                    <div
                      key={review._id}
                      className="mb-4 rounded-lg p-4 text-black"
                    >
                      <div className="mb-2 flex items-center">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-gray-900">
                          {review.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-2 flex w-full items-start justify-between">
                          <p className="text-lg font-semibold">
                            {review.username}
                          </p>
                          {/* <RenderRating rating={review.rating} /> */}
                        </div>
                      </div>
                      <div className="mx-2 flex text-black">
                        <FaReply className="mx-2 mt-1 rotate-180 transform text-sm" />
                        {review.description}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {formatDate(review.created_at)}
                      </p>
                      {review.reply_feedback && (
                        <div className="ml-10 mt-4 rounded-lg bg-gray-200 p-4">
                          <div className="mb-2 flex items-center">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-gray-900">
                              M
                            </div>
                            <p className="ml-2 font-medium">MilkJoy Shop:</p>
                          </div>
                          <div className="mx-8 flex text-black">
                            <FaReply className="mx-1 mt-1 rotate-180 transform text-sm" />
                            {review.reply_feedback.description}
                          </div>

                          <div className="mt-2 text-sm text-gray-500">
                            {formatDate(review.reply_feedback.created_at)}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              <button
                className="w-full text-center text-blue-600 visited:text-purple-600 hover:text-blue-800"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                <div className="mt-2 flex items-center justify-center">
                  {showAllReviews ? `Thu gọn ` : `Xem tất cả đánh giá `}
                  {showAllReviews ? (
                    <FaAngleUp className="mx-2 my-2 h-5 w-5" />
                  ) : (
                    <FaAngleDown className="mx-2 my-2 h-5 w-5" />
                  )}
                </div>
              </button>
            </>
          ) : (
            <p className="text-center text-lg text-gray-600">
              Sản phẩm chưa có đánh giá
            </p>
          )}
        </div>

        {/* related products */}
        <div className="w-full">
          <ProductCard
            products={relatedProducts}
            headline={"Sản phẩm liên quan"}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
