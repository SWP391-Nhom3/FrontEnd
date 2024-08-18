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
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
};

  return (
    <>
      <Breadcrumbs headline="Chi tiết bài viết" />
      <div className="p-4 max-w-7xl mx-auto">
        <img
          src={news.img_url}
          alt={news.news_name}
          className="w-450 h-300 mb-4 object-cover mx-auto"
          style={{ width: "450px", height: "300px" }}
        />
        <h1 className="text-3xl font-bold mb-2 text-center">{news.news_name}</h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          {formatDate(news.created_at)}
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: news.description }}
          className="text-gray-800 leading-7"
        />
        <div className="mt-4 text-center">
          <Link
            to="/product"
            state={{ product: product }}
            onClick={() => window.scrollTo(0, 0)}
            className="text-blue-700 font-medium text-lg flex items-center justify-center hover:underline"
          >
            Tìm hiểu thêm về sản phẩm <IoIosArrowForward className="ml-2" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
