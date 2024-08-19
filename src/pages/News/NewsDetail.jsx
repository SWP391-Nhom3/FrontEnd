import { useLocation, Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Breadcrumbs from "../../components/elements/Breadcrumb";

const NewsDetail = () => {
  const location = useLocation();
  const news = location.state?.news;
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const findProductById = (product_id) => {
    return products.find((product) => product._id === product_id);
  };
  const product = findProductById(news.product_id);
  if (!news) {
    return <div>No news item selected.</div>;
  }

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

  return (
    <>
      <Breadcrumbs headline="Chi tiết bài viết" />
      <div className="mx-auto max-w-7xl p-4">
        <img
          src={news.img_url}
          alt={news.news_name}
          className="w-450 h-300 mx-auto mb-4 object-cover"
          style={{ width: "450px", height: "300px" }}
        />
        <h1 className="mb-2 text-center text-3xl font-bold">
          {news.news_name}
        </h1>
        <p className="mb-4 text-center text-sm text-gray-600">
          {formatDate(news.created_at)}
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: news.description }}
          className="leading-7 text-gray-800"
        />
        <div className="mt-4 text-center">
          <Link
            to="/product"
            state={{ product: product }}
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center justify-center text-lg font-medium text-blue-700 hover:underline"
          >
            Tìm hiểu thêm về sản phẩm <IoIosArrowForward className="ml-2" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
