import { useState } from "react";
import { Link } from "react-router-dom";

const SidebarNews = ({ posts }) => {
  const recent = posts.slice(-5).reverse();
  const getRandomPosts = (posts, count) => {
    const shuffled = posts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const random = getRandomPosts(posts, 3);
  const [searchTerm, setSearchTerm] = useState("");
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
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full p-4 md:w-1/4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm...."
          className="w-full rounded-lg border p-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {searchTerm && (
        <div className="mb-4 rounded-lg border p-4">
          <h2 className="mb-2 text-xl font-bold">Kết quả tìm kiếm</h2>
          {filteredPosts.map((item) => (
            <div key={item.id} className="mb-4 flex items-center">
              <img
                src={item.imgUrl}
                alt={item.title}
                className="mr-4 h-16 w-16 rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <Link
                  to={"/news-detail"}
                  state={{ news: item }}
                  onClick={() => window.scrollTo(0, 0)}
                  className="block w-full overflow-hidden truncate whitespace-nowrap font-bold"
                >
                  {item.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {!searchTerm && (
        <>
          <div className="mb-4 rounded-lg border p-4">
            <h2 className="mb-2 text-xl font-bold">Bài đăng gần đây</h2>
            {recent.map((item) => (
              <div key={item.id} className="mb-4 flex items-center">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="mr-4 h-16 w-16 rounded-lg"
                />
                <div className="min-w-0 flex-1">
                  <Link
                    to={"/news-detail"}
                    state={{ news: item }}
                    onClick={() => window.scrollTo(0, 0)}
                    className="block w-full overflow-hidden truncate whitespace-nowrap font-bold"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-600">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 text-xl font-bold">Bài viết đề xuất</h2>
            {random.map((item) => (
              <div key={item.id} className="mb-4 flex items-center">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="mr-4 h-16 w-16 rounded-lg"
                />
                <div className="min-w-0 flex-1">
                  <Link
                    to={"/news-detail"}
                    state={{ news: item }}
                    onClick={() => window.scrollTo(0, 0)}
                    className="block w-full overflow-hidden truncate whitespace-nowrap font-bold"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-600">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarNews;
