import { useEffect, useState } from "react";
// import { fetchCategories, fetchProducts } from "../../data/api";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Spin } from "antd";

const BestCategory = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const getProducts = async () => {
    //   try {
    //     const data = await fetchProducts();
    //     setProducts(data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching product:", error);
    //     setLoading(false);
    //   }
    // };
    // getProducts();
  }, []);

  useEffect(() => {
    // fetchCategories()
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data && data.result) {
    //       setCategories(data.result);
    //     }
    //   })
    //   .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const processData = (products, categories) => {
    const result = {};

    products.forEach((product) => {
      const category = categories.find(
        (cat) => cat._id === product.category_id,
      );
      if (category) {
        if (!result[category.category_name]) {
          result[category.category_name] = 0;
        }
        result[category.category_name] += product.sales;
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

  const chartData = {
    labels: processedData.map((item) => item.categoryName),
    datasets: [
      {
        data: processedData.map((item) => item.sales),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(255, 206, 86, 0.6)", // Yellow
          "rgba(75, 192, 192, 0.6)", // Green
          "rgba(153, 102, 255, 0.6)", // Purple
          "rgba(255, 159, 64, 0.6)", // Orange
          "rgba(199, 199, 199, 0.6)", // Grey
          "rgba(144, 238, 144, 0.6)", // Light Green
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
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default BestCategory;
