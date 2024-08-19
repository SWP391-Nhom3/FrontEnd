import { Button, Card, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { fetchProductBatches, fetchProducts } from "../../data/api";
import Loading from "../../components/Loading";

const ViewProductBatch = () => {
  const [products, setProducts] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleExpand = (expanded, record) => {
    const keys = expanded ? [record.id] : [];
    setExpandedRowKeys(keys);
  };

  const { Search } = Input;

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productResponse = await fetchProducts();
        const batchResponse = await fetchProductBatches();

        const products = productResponse.data.data;
        const batches = batchResponse.data.data;

        // Kết hợp dữ liệu từ products và batches
        const combinedData = products.map((product) => {
          // Tìm tất cả các batches liên quan đến sản phẩm này
          const relatedBatches = batches.filter(
            (batch) => batch.product.id === product.id,
          );
          return {
            ...product,
            batch: relatedBatches,
          };
        });
        setProducts(combinedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const columns = [
    {
      title: "Hình Ảnh Sản Phẩm",
      dataIndex: "coverImageUrl",
      key: "coverImageUrl",
      render: (text, record) => (
        <img
          src={record.coverImageUrl}
          alt="product"
          style={{ width: 100, height: 100 }}
        />
      ),
      width: "20%",
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
          {record.name}
        </span>
      ),
      width: "40%",
    },
    {
      title: "Số Lượng Trong Kho",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      width: "20%",
    },
    {
      title: "Số Lượng Lô Hàng",
      key: "amount_shipment",
      render: (text, record) => (
        <span>{record.batch ? record.batch.length : 0}</span>
      ),
      width: "20%",
    },
  ];

  const renderBatch = (Batches) => {
    const columns = [
      {
        title: "Mã lô sản phẩm",
        dataIndex: "batchNumber",
        key: "batchNumber",
      },
      {
        title: "Số Lượng",
        dataIndex: "quantity",
        key: "amount",
      },
      {
        title: "Lượng Bán",
        dataIndex: "sold",
        key: "sold",
      },
      {
        title: "Ngày Sản Xuất",
        dataIndex: "manufactureDate",
        key: "manufactureDate",
        render: (text) => formatDate(text),
      },
      {
        title: "Hạn Sử Dụng",
        dataIndex: "expiryDate",
        key: "expiryDate",
        render: (text) => formatDate(text),
      },
      {
        title: "Ngày nhập hàng",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => formatDate(text),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={Batches}
        pagination={false}
        rowKey="id"
        rowClassName={(record) =>
          isExpired(record.expiryDate) ? "bg-red-100" : ""
        }
      />
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const isExpired = (dateString) => {
    const today = new Date();
    const expiredDate = new Date(dateString);
    return expiredDate < today;
  };

  const expandedRowRender = (record) => {
    return <div>{renderBatch(record.batch)}</div>;
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <Card
        title={
          <div className="flex items-center justify-between">
            <h2 className="my-4 text-2xl font-bold">
              Tất cả sản phẩm trong kho
            </h2>
            <div className="flex-col gap-2">
              <p>Số lượng sản phẩm: {products.length}</p>
            </div>
          </div>
        }
        style={{
          width: "90%",
          margin: "30px auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
          <Search
            placeholder="Nhập tên sản phẩm"
            allowClear
            enterButton={
              <Button style={{ backgroundColor: "#f43f5e", color: "white" }}>
                Tìm kiếm
              </Button>
            }
            size="large"
            onSearch={onSearch}
            style={{ width: "40%" }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          expandable={{
            expandedRowRender,
            rowExpandable: (record) => record.batch && record.batch.length > 0,
            expandedRowKeys,
            onExpand: handleExpand,
          }}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default ViewProductBatch;
