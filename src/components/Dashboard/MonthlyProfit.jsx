import { useEffect, useState } from "react";
// import { fetchRevenue } from "../../data/api";
import { Bar } from "react-chartjs-2";
import { Select } from "antd";

const MonthlyProfit = () => {
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month"); // default to month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // default to current year
  const { Option } = Select;

  useEffect(() => {
    // const getRevenue = async () => {
    //   try {
    //     const data = await fetchRevenue();
    //     setRevenues(data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.log("Error fetching revenue:", error);
    //     setLoading(false);
    //   }
    // };
    // getRevenue();
  }, []);

  const processData = (data, timeRange, selectedYear) => {
    const result = {};

    data.forEach((item) => {
      const date = new Date(item.completed_date);
      const month = date.getMonth() + 1; // getMonth() returns 0-11
      const year = date.getFullYear();
      const key =
        timeRange === "year"
          ? year
          : `${month < 10 ? "0" : ""}${month}-${year}`;

      if (!result[key]) {
        result[key] = { revenue: 0, cost: 0, profit: 0 };
      }

      if (item.type === 1) {
        // Revenue
        result[key].revenue += item.total;
      } else {
        // Cost
        result[key].cost += item.total;
      }

      result[key].profit = result[key].revenue - result[key].cost;
    });

    if (timeRange === "month") {
      return Object.keys(result)
        .filter((key) => key.includes(`-${selectedYear}`))
        .map((key) => ({
          key,
          profit: result[key].profit,
        }))
        .sort((a, b) => new Date(`01-${a.key}`) - new Date(`01-${b.key}`));
    } else {
      return Object.keys(result)
        .map((key) => ({
          key,
          profit: result[key].profit,
        }))
        .sort((a, b) => a.key - b.key);
    }
  };

  const processedData = processData(revenues, timeRange, selectedYear);

  const chartData = {
    labels: processedData.map((item) => item.key),
    datasets: [
      {
        label: "Lợi nhuận",
        data: processedData.map((item) => item.profit),
        backgroundColor: "white",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Ẩn chú thích (legend)
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const availableYears = [
    ...new Set(
      revenues.map((item) => new Date(item.completed_date).getFullYear()),
    ),
  ];

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Select defaultValue="month" onChange={handleTimeRangeChange}>
          <Option value="month">Theo tháng</Option>
          <Option value="year">Theo năm</Option>
        </Select>
        {timeRange === "month" && (
          <Select defaultValue={selectedYear} onChange={handleYearChange}>
            {availableYears.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        )}
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default MonthlyProfit;
