import { Select } from "antd";
import { useState } from "react";

const { Option } = Select;

const DropdownRevenue = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");

  return (
    <div>
      <Select
        defaultValue="today"
        onChange={(value) => setSelectedTimeRange(value)}
      >
        <Option value="today">Hôm nay</Option>
        <Option value="thisWeek">Tuần này</Option>
        <Option value="thisMonth">Tháng này</Option>
      </Select>
    </div>
  );
};

export default DropdownRevenue;
