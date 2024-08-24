import { Chart } from 'chart.js';
import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';


const RevenueStatistic = ({ orders }) => {
  const processData = (data, timeRange = "month", selectedYear = new Date().getFullYear()) => {
    const result = {};
    data.filter((item) => item.orderStatus.name === "Hoàn thành")
    .forEach((item) => {
      const date = new Date(item.shippedDate);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const key =
        timeRange === "year"
          ? year
          : `${month < 10 ? "0" : ""}${month}-${year}`;

      if (!result[key]) {
        result[key] = { revenue: 0 };
      }
      result[key].revenue += item.totalPrice;
    });
    return Object.entries(result).map(([key, value]) => ({
      key,
      revenue: value.revenue,
    }));
  };

  const processedData = processData(orders, "month");

  const chartData = {
    labels: processedData.map((item) => item.key),
    datasets: [
      {
        label: "Doanh thu",
        data: processedData.map((item) => item.revenue),
        backgroundColor: "rgba(255, 255, 255, 255)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default RevenueStatistic;