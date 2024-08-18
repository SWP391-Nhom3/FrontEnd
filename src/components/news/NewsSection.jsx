import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { fetchGetAllNews } from "../../data/api";

const NewsSection = () => {
  const [posts, setPosts] = useState([]);
  //!! FETCH ALL NEWS!!
  // useEffect(() => {
  //   const getAllPosts = async () => {
  //     try {
  //       const data = await fetchGetAllNews();
  //       setPosts(data.data.result);
  //     } catch (error) {
  //       console.error("Error fetching news:", error);
  //     }
  //   };
  //   getAllPosts();
  // }, []);

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
  const news = posts.slice(-3).reverse()
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 mt-12">
        <h2 className="text-2xl font-bold">Tin tức</h2>
        <Link
          to="/news"
          className="text-blue-500 hover:underline"
          onClick={() => window.scrollTo(0, 0)}
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.img_url}
                alt={item.news_name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-lg">
                <span className="block text-sm">
                  {formatDate(item.created_at)}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{item.news_name}</h3>
              <div
                className="text-gray-500"
                style={truncateStyle}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              <div className="flex justify-between items-center">
                <div className="text-orange-500 flex items-center">
                  <span>{item.comments} Bình luận</span>
                  <span className="ml-2">{item.author}</span>
                </div>
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
