import { Button, Modal, Switch, Table, notification } from "antd";
import axios from "axios";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBrands } from "../../data/api";
import Loading from "../../components/Loading";

const Brands = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await fetchBrands();
        setBrands(res.data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch brands",
        });
      } finally {
        setLoading(false);
      }
    };

    getBrands();
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <Card
        title="Tất cả nhãn hàng"
        style={{
          width: "90%",
          maxWidth: "1200px",
          padding: "20px",
          marginTop: "20px",
          overflow: "hidden",
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#46B5C1",
            marginBottom: "20px",
            marginLeft: "auto",
            display: "block",
          }}
          onClick={() => navigate("/add-brand")}
        >
          Thêm nhãn hàng mới
        </Button>
        <Table
          dataSource={brands}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: brands.length,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
          }}
          rowKey="_id"
          style={{ overflowX: "auto" }}
        />
      </Card>
    </div>
  );
};

export default Brands;
