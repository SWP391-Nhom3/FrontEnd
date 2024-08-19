import { Button, Card, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
// import { fetchProductInWarehouse } from "../../data/api";
import Loading from "../../components/Loading";

const ProductsWarehouse = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleExpand = (expanded, record) => {
    const keys = expanded ? [record._id] : [];
    setExpandedRowKeys(keys);
  };

  const { Search } = Input;

  //!! FETCH PRODUCT IN WAREHOUSE !!
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const productData = await fetchProductInWarehouse();
  //       setProducts(productData.data.result);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);

  if (loading) {
    return <Loading />;
  }

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const columns = [
    {
      title: "Hình Ảnh Sản Phẩm",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (text, record) => (
        <img
          src={record.imgUrl}
          alt="product"
          style={{ width: 100, height: 100 }}
        />
      ),
      width: "20%",
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "product_name",
      key: "product_name",
      render: (text, record) => (
        <span style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
          {record.product_name}
        </span>
      ),
      width: "40%",
    },
    {
      title: "Số Lượng Trong Kho",
      dataIndex: "amount",
      key: "amount",
      width: "20%",
    },
    {
      title: "Số Lượng Lô Hàng",
      dataIndex: "amount_shipment",
      key: "amount_shipment",
      width: "20%",
    },
  ];

  const renderShipments = (shipments) => {
    const columns = [
      {
        title: "Mã Nhập Hàng",
        dataIndex: "input_bill_id",
        key: "input_bill_id",
      },
      {
        title: "Số Lượng",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Lượng Bán",
        dataIndex: "amount_selled",
        key: "amount_selled",
      },
      {
        title: "Ngày Sản Xuất",
        dataIndex: "created_at",
        key: "created_at",
        render: (text) => formatDate(text),
      },
      {
        title: "Hạn Sử Dụng",
        dataIndex: "expired_at",
        key: "expired_at",
        render: (text) => formatDate(text),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={shipments}
        pagination={false}
        rowKey="_id"
        rowClassName={(record) =>
          isExpired(record.expired_at) ? "bg-red-100" : ""
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
    return <div>{renderShipments(record.shipments)}</div>;
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
              <Button style={{ backgroundColor: "#55B6C3", color: "white" }}>
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
            rowExpandable: (record) =>
              record.shipments && record.shipments.length > 0,
            expandedRowKeys,
            onExpand: handleExpand,
          }}
          rowKey="_id"
        />
      </Card>
    </div>
  );
};

export default ProductsWarehouse;
