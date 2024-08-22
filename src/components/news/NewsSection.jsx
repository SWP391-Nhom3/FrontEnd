import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllNews } from "../../data/api";

const NewsSection = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const data = await fetchAllNews();
        console.log("Data:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    getAllPosts();
  }, []);

  const truncateStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year} `;
  };
  const news = posts.slice(-3).reverse();
  return (
    <div className="p-4">
      <div className="mb-4 mt-12 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h2 className="text-2xl font-bold">Tin tức</h2>
        <Link
          to="/news"
          className="text-blue-500 hover:underline"
          onClick={() => window.scrollTo(0, 0)}
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div className="relative">
              <img
                src={item.imgUrl}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="absolute left-2 top-2 rounded-lg bg-orange-500 px-2 py-1 text-white">
                <span className="block text-sm">
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-red-600">{item.content}</p>
              <div className="flex items-center justify-between">
                {/* {item.comments && item.author ? (
                  <div className="flex items-center text-orange-500">
                    <span>{item.comments} Bình luận</span>
                    <span className="ml-2">{item.author}</span>
                  </div>
                ) : (
                  <div className="text-orange-500">
                    No comments or author info available
                  </div>
                )} */}
                <Link
                  to={"/news-detail"}
                  state={{ news: item }}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-blue-500 hover:underline"
                >
                  Đọc thêm
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
