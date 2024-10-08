import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Button, Switch, Table, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../data/api";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchCategories();
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching cates:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch cates",
        });
      }
    };

    getCategories();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "auto" }}>
      <Card
        title="Tất cả phân loại"
        style={{ width: "90%", marginTop: "50px", height: "auto" }}
      >
        <div>
          <div className="mb-4 flex items-center justify-between">
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: "#f43f5e", height: "100%" }}
              onClick={() => navigate("/add-category")}
            >
              Thêm phân loại mới
            </Button>
          </div>
          <Table
            dataSource={categories}
            columns={columns}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: categories.length,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              },
            }}
            rowKey="_id"
          />
        </div>
      </Card>
    </div>
  );
};

export default Categories;
