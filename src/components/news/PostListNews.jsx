import { useState } from "react";
import { Link } from "react-router-dom";

const PostListNews = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

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

  const truncateStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const selectedPosts = posts.slice(startIndex, startIndex + postsPerPage);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="w-full p-4 md:w-3/4">
      {selectedPosts.map((item) => (
        <div
          key={item.id}
          className="mb-8 flex flex-col items-start rounded-lg border p-4 md:flex-row"
        >
          <img
            src={item.imgUrl}
            alt={item.title}
            className="mb-2 w-full rounded-lg object-contain md:mb-0 md:mr-4 md:w-1/3"
            style={{ width: "300px", height: "200px" }}
          />
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-sm text-gray-600">
              {formatDate(item.createdAt)}
            </p>
            <Link
              to={"/news-detail"}
              state={{ news: item }}
              onClick={() => window.scrollTo(0, 0)}
              className="mb-2 block truncate text-xl font-bold"
            >
              {item.title}
            </Link>
            <div
              className="text-gray-500"
              style={truncateStyle}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
            <Link
              to={"/news-detail"}
              state={{ news: item }}
              onClick={() => window.scrollTo(0, 0)}
              className="mt-2 inline-block font-semibold text-blue-500"
            >
              Đọc thêm
            </Link>
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            className={`mx-1 rounded border px-4 py-2 ${index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostListNews;
