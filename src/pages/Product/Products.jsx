import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Image,
  Modal,
  Rate,
  Switch,
  Table,
  notification,
  Form,
  Input,
  InputNumber,
  Upload,
} from "antd";
import axios from "axios";
import Loading from "../../components/Loading";
import Search from "antd/es/input/Search";
import { UploadOutlined } from "@ant-design/icons";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editForm] = Form.useForm();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const isAuthenticatedStaff =
    localStorage.getItem("isAuthenticatedStaff") === "true";
  console.log(editForm);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const showEditModal = (product) => {
    setCurrentProduct(product);
    setIsEditModalVisible(true);
    editForm.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      brandId: product.brand.id,
      categoryId: product.category.id,
      files: [],
    });
  };
  const handleUpdateProduct = async (values) => {
    const token = JSON.parse(localStorage.getItem("result"))?.accessToken;
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("brand", values.brandId);
    formData.append("category", values.categoryId);
    if (values.files && values.files.length > 0) {
      formData.append("files", values.files[0].originFileObj);
    }

    try {
      await axios.put(
        `http://localhost:8080/api/products/${currentProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      notification.success({
        message: "Thành công",
        description: "Sản phẩm đã được cập nhật thành công!",
        placement: "top",
      });
      setIsEditModalVisible(false);
      editForm.resetFields();
      fetchData();
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message,
      );
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi cập nhật sản phẩm!",
        placement: "top",
      });
    }
  };

  const handleAddProduct = async (values) => {
    const token = JSON.parse(localStorage.getItem("result"))?.accessToken; // Lấy accessToken từ localStorage
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("brand", values.brandId);
    formData.append("category", values.categoryId);
    formData.append("files", values.files[0].originFileObj); // Upload file
    console.log(token);

    try {
      await axios.post("http://localhost:8080/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Thêm accessToken vào header
        },
      });
      notification.success({
        message: "Thành công",
        description: "Sản phẩm đã được thêm thành công!",
        placement: "top",
      });
      setIsModalVisible(false);
      form.resetFields();
      // Refresh product list
      const response = await axios.get("http://localhost:8080/api/products", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm accessToken vào header để lấy danh sách sản phẩm mới
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response ? error.response.data : error.message,
      );
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi thêm sản phẩm!",
        placement: "top",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateProduct = async (product) => {
    const token = JSON.parse(localStorage.getItem("result"));
    const id = product._id;
    // await fetchUpdateProduct(product, token, id);
  };

  const handleDeleteProduct = async (id) => {
    Modal.confirm({
      title: "Xác nhận xóa sản phẩm",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      onOk: async () => {
        try {
          // Xóa sản phẩm
          await axios.delete(`http://localhost:8080/api/products/${id}`);

          // Làm mới danh sách sản phẩm
          const response = await axios.get(
            "http://localhost:8080/api/products",
          );
          setProducts(response.data.data);

          notification.success({
            message: "Thành công",
            description: "Sản phẩm đã được xóa thành công!",
            placement: "top",
          });
        } catch (error) {
          console.error(
            "Error deleting product:",
            error.response ? error.response.data : error.message,
          );
          notification.error({
            message: "Lỗi",
            description: "Có lỗi xảy ra khi xóa sản phẩm!",
            placement: "top",
          });
        }
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: {
        style: {
          backgroundColor: "#FF4D4F",
          borderColor: "#FF4D4F",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#46B5C1",
          borderColor: "#46B5C1",
          color: "#FFFFFF",
        },
      },
      cancelText: "Đóng",
      okText: "Đồng ý",
    });
  };

  const handleSwitchChange = (checked, product) => {
    Modal.confirm({
      title: "Xác nhận thay đổi trạng thái sản phẩm",
      content: `Bạn có muốn thay đổi trạng thái sản phẩm? Hiện đang ${checked ? "tắt" : "bật"}`,
      onOk: async () => {
        product.isActive = checked;
        await updateProduct(product);
        setProducts([...products]);
        notification.success({
          message: "Thành công",
          description: `Thay đổi thành công! Sản phẩm hiện đang ${checked ? "bật" : "tắt"}`,
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
      dataIndex: "coverImageUrl",
      key: "coverImageUrl",
      width: "10%",
      render: (text) => <Image src={text} alt="Product Image" width={50} />,
    },
    {
      title: "Sản Phẩm",
      dataIndex: "name",
      key: "name",
      width: "15%",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Loại Sản Phẩm",
      dataIndex: "category",
      key: "category",
      width: "10%",
      render: (category) => <span>{category.name}</span>,
    },
    {
      title: "Thương Hiệu",
      dataIndex: "brand",
      key: "brand",
      width: "10%",
      render: (brand) => <span>{brand.name}</span>,
      sorter: (a, b) => a.brand.name.localeCompare(b.brand.name),
    },
    {
      title: "Số Lượng",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      width: "5%",
      sorter: (a, b) => a.stockQuantity - b.stockQuantity,
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
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteProduct(record._id)}
          >
            Xóa
          </Button>
          <Button type="default" onClick={() => showEditModal(record)}>
            Sửa
          </Button>
        </>
      ),
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

  const filteredProducts = products.filter(
    (product) =>
      product.name &&
      product.name.toLowerCase().includes(searchText.toLowerCase()),
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
            <div>
              <Button
                type="primary"
                size="large"
                style={{ backgroundColor: "#46B5C1", height: "100%" }}
                onClick={() => setIsModalVisible(true)}
              >
                Thêm sản phẩm mới
              </Button>
            </div>
            {isAuthenticatedStaff && (
              <>
                <Button
                  type="primary"
                  size="large"
                  style={{ backgroundColor: "#46B5C1", height: "100%" }}
                  onClick={() => setIsModalVisible(true)}
                >
                  Thêm sản phẩm mới
                </Button>
                <Modal
                  title="Thêm Sản Phẩm Mới"
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  footer={null}
                  width={800}
                >
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddProduct}
                  >
                    <Form.Item
                      label="Tên Sản Phẩm"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên sản phẩm!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Mô Tả"
                      name="description"
                      rules={[
                        { required: true, message: "Vui lòng nhập mô tả!" },
                      ]}
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                      label="Giá"
                      name="price"
                      rules={[
                        { required: true, message: "Vui lòng nhập giá!" },
                      ]}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      label="Thương Hiệu"
                      name="brandId"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn thương hiệu!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Danh Mục"
                      name="categoryId"
                      rules={[
                        { required: true, message: "Vui lòng chọn danh mục!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Hình Ảnh"
                      name="files"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => e.fileList}
                      rules={[
                        { required: true, message: "Vui lòng chọn hình ảnh!" },
                      ]}
                    >
                      <Upload
                        name="files"
                        beforeUpload={() => false}
                        maxCount={1}
                        showUploadList={false}
                        listType="picture"
                      >
                        <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: "#46B5C1" }}
                      >
                        Thêm
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            )}
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
                      (sum, product) =>
                        sum + product.price * product.stockQuantity,
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
      <Modal
        title="Thêm Sản Phẩm Mới"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleAddProduct}>
          <Form.Item
            label="Tên Sản Phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Thương Hiệu"
            name="brandId"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh Mục"
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình Ảnh"
            name="files"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
          >
            <Upload
              name="files"
              beforeUpload={() => false}
              maxCount={1}
              showUploadList={false}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#46B5C1" }}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Sửa Sản Phẩm "
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateProduct}>
          <Form.Item
            label="Tên Sản Phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Thương Hiệu"
            name="brandId"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh Mục"
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình Ảnh"
            name="files"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
          >
            <Upload
              name="files"
              beforeUpload={() => false}
              maxCount={1}
              showUploadList={false}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#46B5C1" }}
            >
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
