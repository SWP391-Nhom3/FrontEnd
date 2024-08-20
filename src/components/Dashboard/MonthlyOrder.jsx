import { useEffect, useState } from "react";
import { fetchOrders } from "../../data/api";
import { Line } from "react-chartjs-2";

const MonthlyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await fetchOrders();
        setOrders(orderData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const processData = (data) => {
    const result = {};
    data.forEach((item) => {
      const date = new Date(item.requiredDate);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const monthYear = `${month < 10 ? "0" : ""}${month}-${year}`;
      if (!result[monthYear]) {
        result[monthYear] = { completed: 0, cancelled: 0 };
      }
      if (item.orderStatus.name === "Hoàn thành") {
        result[monthYear].completed += 1;
      } else if (item.orderStatus.name === "Đã hủy") {
        result[monthYear].cancelled += 1;
      }
    });

    return Object.keys(result)
      .map((monthYear) => ({
        monthYear,
        completed: result[monthYear].completed,
        cancelled: result[monthYear].cancelled,
      }))
      .sort(
        (a, b) => new Date(`01-${a.monthYear}`) - new Date(`01-${b.monthYear}`),
      );
  };

  const processedData = processData(orders);
  const labels = processedData.map((item) => item.monthYear);
  const completedData = processedData.map((item) => item.completed);
  const cancelledData = processedData.map((item) => item.cancelled);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Đơn hàng hoàn thành",
        data: completedData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Đơn hàng đã hủy",
        data: cancelledData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyOrder;
