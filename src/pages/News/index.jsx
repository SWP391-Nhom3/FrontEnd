import { useEffect, useState } from "react";
import PostListNews from "../../components/news/PostListNews";
import SidebarNews from "../../components/news/SidebarNews";
import { fetchAllNews } from "../../data/api";
import Loader from "../../assets/loading2.gif";
import Breadcrumbs from "../../components/elements/Breadcrumb";
const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const data = await fetchAllNews();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };
    getAllPosts();
  }, []);
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <img src={Loader} alt="loading" />
      </div>
    );
  }
  return (
    <>
      <Breadcrumbs headline="Tin tức" />
      <div className="container mx-auto flex flex-wrap p-4 md:flex-nowrap">
        <SidebarNews posts={posts} />
        <PostListNews posts={posts} />
      </div>
    </>
  );
};

export default News;
