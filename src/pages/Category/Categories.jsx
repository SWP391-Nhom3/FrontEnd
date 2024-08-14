import React, { useEffect, useState } from 'react'
import { Card } from "primereact/card";
import { Button, Switch, Table } from 'antd';
import { useNavigate } from "react-router-dom";
// import { fetchCategories } from '../../data/api';


const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);


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

  const columns = [
    {
      title: "Tên phân loại",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",

    },
    {
      title: "Chi Tiết",
      dataIndex: "_id",
      key: "_id",
      width: 100,
      render: (text) => <a href={`/edit-category?id=${text}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Chi Tiết</a>,
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "auto" }}>
      <Card
        title="Tất cả phân loại"
        style={{ width: "90%", marginTop: "50px", height: "auto" }}
      >
        <div>
          <div className="flex justify-between items-center mb-4">
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: "#46B5C1", height: "100%" }}
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
  )
}

export default Categories