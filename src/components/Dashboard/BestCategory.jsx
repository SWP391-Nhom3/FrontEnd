import { useEffect, useState } from "react";
import { fetchCategories, fetchProducts } from "../../data/api";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Spin } from "antd";

const BestCategory = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  const processData = (products, categories) => {
    const result = {};

    products.forEach((product) => {
      const category = categories.find((cat) => cat.id === product.category.id);
      if (category) {
        if (!result[category.name]) {
          result[category.name] = 0;
        }
        result[category.name] += 10;
      }
    });
    return Object.keys(result).map((categoryName) => ({
      categoryName,
      sales: result[categoryName],
    }));
  };

  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      setLoading(false);
    }
  }, [products, categories]);

  const processedData = processData(products, categories);

  const data = {
    labels: processedData.map((item) => item.categoryName),
    datasets: [
      {
        data: processedData.map((sale) => sale.sales),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#C9CBFF",
          "#FDB45C",
          "#949FB1",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#C9CBFF",
          "#FDB45C",
          "#949FB1",
        ],
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  if (loading) {
    return <Spin />;
  }
  return (
    <div>
      <Pie data={data} options={chartOptions} />
    </div>
  );
};

export default BestCategory;
