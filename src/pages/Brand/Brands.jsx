import { Button, Modal, Switch, Table, notification } from "antd";
import axios from "axios";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { fetchBrands } from '../../data/api';
import Loading from "../../components/Loading";

const Brands = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    // const getBrands = async () => {
    //   try {
    //     const res =  await fetchBrands();
    //     setBrands(res.data.result);
    //   } catch (error) {
    //     console.error("Error fetching brands:", error);
    //     notification.error({
    //       message: 'Error',
    //       description: 'Failed to fetch brands',
    //     });
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // getBrands();
  }, []);

  const columns = [
    {
      title: "Tên Nhãn Hàng",
      dataIndex: "brand_name",
      key: "brand_name",
      width: 200,
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
      width: 300,
    },
    {
      title: "Quốc Gia",
      dataIndex: "country",
      key: "country",
      width: 150,
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "85vh" }}>
      <Card
        title="Tất cả nhãn hàng"
        subTitle=""
        footer=""
        header=""
        className=""
        style={{ width: "90%", marginTop: "50px" }}
      >
        <Button
          type="primary"
          style={{ backgroundColor: "#46B5C1", marginBottom: "20px" }}
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
        />
      </Card>
    </div>
  );
};

export default Brands;
