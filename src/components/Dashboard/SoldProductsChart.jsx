import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

function SoldProductsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://milkjoy-shop.azurewebsites.net/api/admin/statistics/total-sold-by-products")
      .then((response) => {
        const chartData = response.data.map((item) => ({
          name: item.productName,
          quantitySold: item.quantitySold,
        }));
        setData(chartData);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Biểu đồ số lượng sản phẩm đã bán</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantitySold" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SoldProductsChart;
