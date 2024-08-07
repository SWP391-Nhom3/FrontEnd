import React, { useEffect, useState } from "react";
import RenderRating from "../../components/Element/RenderRating";
import { useNavigate } from "react-router-dom";
// import { fetchProducts, fetchUpdateProduct } from "../../data/api";
import { Card } from "primereact/card";
import { Button, Image, Modal, Rate, Switch, Table, notification } from "antd";
import Loading from "../../components/Loading";
import Search from "antd/es/input/Search";
const Product = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const navigate = useNavigate();
  const isAuthenticatedStaff =
    localStorage.getItem("isAuthenticatedStaff") === "true";
  const [searchText, setSearchText] = useState("");

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const productData = await fetchProducts();
  //       setProducts(productData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setLoading(false);
  //     }
  //   };

  //   getProducts();
  // }, []);

  // const updateProduct = async (product) => {
  //   const token = JSON.parse(localStorage.getItem("result"));
  //   const id = product._id;
  //   await fetchUpdateProduct(product, token, id);
  // };

  const handleSwitchChange = (checked, product) => {
    Modal.confirm({
      title: "Xác nhận thay đổi trạng thái sản phẩm",
      content: `Bạn có muốn thay đổi trạng thái sản phẩm? Hiện đang ${
        checked ? "tắt" : "bật"
      }`,
      onOk: async () => {
        product.isActive = checked;
        // await updateProduct(product);
        setProducts([...products]);
        notification.success({
          message: "Thành công",
          description: `Thay đổi thành công! Sản phẩm hiện đang ${
            checked ? "bật" : "tắt"
          }`,
          placement: "top",
        });
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: {
        style: {
          backgroundColor: "#46B5C1",
          borderColor: "#46B5C1",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#FF4D4F",
          borderColor: "#FF4D4F",
          color: "#FFFFFF",
        },
      },
      cancelText: "Đóng",
      okText: "Đồng ý",
    });
  };

  const columns = [
    {
      title: "Hình Ảnh",
      dataIndex: "imgUrl",
      key: "imgUrl",
      width: "10%",
      render: (text) => <Image src={text} alt="Product Image" width={50} />,
    },
    {
      title: "Sản Phẩm",
      dataIndex: "product_name",
      key: "product_name",
      width: "15%",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Loại Sản Phẩm",
      dataIndex: "category_name",
      key: "category_name",
      width: "10%",
      sorter: (a, b) => a.category_name.localeCompare(b.category_name),
    },
    {
      title: "Thương Hiệu",
      dataIndex: "brand_name",
      key: "brand_name",
      width: "10%",
      sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    },
    {
      title: "Số Lượng",
      dataIndex: "amount",
      key: "amount",
      width: "5%",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Đánh Giá",
      dataIndex: "rating",
      key: "rating",
      width: "15%",
      sorter: (a, b) => a.rating - b.rating,
      render: (text) => {
        const roundedRating = parseFloat(text).toFixed(1);
        return (
          <div className="flex items-center">
            <Rate
              allowHalf
              disabled
              value={parseFloat(roundedRating)}
              style={{ fontSize: "12px" }}
            />
            <span className="ml-1 text-gray-500">{roundedRating}</span>
          </div>
        );
      },
    },
    {
      title: "Lượng Bán",
      dataIndex: "sales",
      key: "sales",
      width: 100,
      render: (text) => (
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2 h-5 w-5 text-gray-400"
          >
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>
          {text}
        </div>
      ),
      sorter: (a, b) => a.sales - b.sales,
    },
    {
      title: "Doanh Thu",
      dataIndex: "revenue",
      key: "revenue",
      width: 100,
      render: (text, record) => {
        const revenue = record.sales * record.price;
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(revenue);
      },
    },
    ...(isAuthenticatedStaff
      ? [
          {
            title: "Trạng Thái",
            dataIndex: "isActive",
            key: "isActive",
            width: 100,
            sorter: (a, b) => a.isActive - b.isActive,
            render: (text, record) => (
              <Switch
                checked={record.isActive}
                onChange={(checked) => handleSwitchChange(checked, record)}
                style={{
                  backgroundColor: record.isActive ? "#4A99FF" : "#898989",
                }}
              />
            ),
          },
          {
            title: "Chi Tiết",
            dataIndex: "_id",
            key: "_id",
            width: 100,
            render: (text) => <a href={`/edit-product?id=${text}`}>Chi Tiết</a>,
          },
        ]
      : []),
  ];

  const onSearch = (value) => {
    setSearchText(value);
  };
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "auto" }}>
      <Card
        title="Tất cả sản phẩm"
        style={{ width: "90%", marginTop: "50px", height: "auto" }}
      >
        <div>
          <div className="mb-4 flex items-center justify-between">
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
            {/* {isAuthenticatedStaff &&
              <Button
                type="primary"
                size="large"
                style={{ backgroundColor: "#46B5C1", height: "100%" }}
                onClick={() => navigate("/add-product")}
              >
                Thêm sản phẩm mới
              </Button>} */}
            <div>
              <h5 className="flex justify-between text-sm sm:text-base">
                <div className="text-gray-500">Tổng sản phẩm: </div>
                <div className="dark:text-white">{products.length}</div>
              </h5>
              <h5 className="flex justify-between text-sm sm:text-base">
                <div className="mr-1 text-gray-500">Tổng doanh thu: </div>
                <div className="ml-1 dark:text-white">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    products.reduce(
                      (sum, product) => sum + product.sales * product.price,
                      0,
                    ),
                  )}
                </div>
              </h5>
            </div>
          </div>
          <Table
            dataSource={filteredProducts}
            columns={columns}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredProducts.length,
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
export default Product;
