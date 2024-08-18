import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="w-full md:w-3/4 p-4">
      {selectedPosts.map((item) => (
        <div
          key={item._id}
          className="mb-8 flex flex-col md:flex-row items-start border rounded-lg p-4"
        >
          <img
            src={item.img_url}
            alt={item.news_name}
            className="mb-2 md:mb-0 md:mr-4 w-full md:w-1/3 rounded-lg object-contain"
            style={{ width: "300px", height: "200px" }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 mb-2">
              {formatDate(item.created_at)}
            </p>
            <Link 
            to={"/news-detail"}
            state={{news: item}}
            onClick={() => window.scrollTo(0, 0)}
            className="block text-xl font-bold mb-2 truncate">
              {item.news_name}
            </Link>
            <div
              className="text-gray-500"
              style={truncateStyle}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
            <Link 
            to={"/news-detail"}
            state={{news: item}}
            onClick={() => window.scrollTo(0, 0)}
            className="text-blue-500 mt-2 inline-block font-semibold">
              Đọc thêm
            </Link>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            className={`px-4 py-2 mx-1 border rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostListNews;
