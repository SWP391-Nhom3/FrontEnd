import { Card, Col, notification, Row, Upload } from "antd";
import { Button, Select, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  fetchBrands,
  fetchCategories,
  fetchUploadProduct,
} from "../../data/api";
import { PlusOutlined } from "@ant-design/icons";

const AddProduct = () => {
  const [product_name, setProduct_name] = useState("");
  // const [age, setAge] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [price, setPrice] = useState(0);
  // const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        const result = data.data.success;
        if (result) {
          setCategories(data.data.data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));

    fetchBrands()
      .then((data) => {
        const result = data.data.success;
        if (result) {
          setBrands(data.data.data);
        }
      })
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
    if (newFileList.length > 0) {
      setImg(newFileList[0].originFileObj);
    } else {
      setImg(null);
    }
  };

  const handleChangeSelectedCategory = (event) => {
    const selectedCategoryName = event.target.value;
    const selectedCategory = categories.find(
      (category) => category.name === selectedCategoryName,
    );
    if (selectedCategory) {
      setSelectedCategoryId(selectedCategory.id);
    }
  };

  const handleChangeSelectedBrand = (event) => {
    const selectedBrandName = event.target.value;
    const selectedBrand = brands.find(
      (brand) => brand.name === selectedBrandName,
    );
    if (selectedBrand) {
      setSelectedBrandId(selectedBrand.id);
    }
  };

  const handleChangeProductName = (event) => {
    setProduct_name(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    console.log("token:", token);

    const product = {
      name: product_name,
      description: description,
      price: price,
      brand: selectedBrandId,
      category: selectedCategoryId,
      files: img,
    };
    try {
      await fetchUploadProduct(product, token);
      notification.success({
        message: "Thêm sản phẩm thành công!",
        placement: "top",
      });
      form.reset();
      setFileList([]);
      setSelectedCategoryId("");
      setSelectedBrandId("");
    } catch (error) {
      console.error(
        "Error during product submission:",
        error.response || error.message,
      );
      notification.error({
        message:
          "Đã xảy ra lỗi trong quá trình thêm sản phẩm. Vui lòng thử lại sau!",
        placement: "top",
      });
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <Card
        title={<h2 className="text-2xl font-bold">Thêm sản phẩm</h2>}
        style={{
          width: "90%",
          maxWidth: "70wh",
          margin: "30px auto",
          minHeight: "70vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="img"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Hình ảnh
              </label>
            </Col>
            <Col span={18}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={() => false}
              >
                {fileList.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải hình ảnh</div>
                  </div>
                )}
              </Upload>
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="product_name"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Tên sản phảm
              </label>
            </Col>
            <Col span={18}>
              <TextInput
                id="product_name"
                type="text"
                name="product_name"
                placeholder="Nhập tên sản phẩm"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
                onChange={handleChangeProductName}
                required
              />
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="category"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Loại sản phẩm
              </label>
            </Col>
            <Col span={18}>
              <Select
                id="category"
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  backgroundColor: "#F9F9F6",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
                onChange={handleChangeSelectedCategory}
                required
              >
                <option value="" disabled selected>
                  Chọn Loại Sản Phẩm
                </option>
                {categories.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="brand"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Thương Hiệu Sản Phẩm
              </label>
            </Col>
            <Col span={18}>
              <Select
                id="brand"
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  backgroundColor: "#F9F9F6",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
                onChange={handleChangeSelectedBrand}
                required
              >
                <option value="" disabled selected>
                  Chọn Loại Thương Hiệu
                </option>
                {brands.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="price"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Giá Sản Phẩm
              </label>
            </Col>
            <Col span={18}>
              <TextInput
                id="price"
                type="number"
                name="price"
                placeholder="Giá Sản Phẩm..."
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  backgroundColor: "#F9F9F6",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
                min={0}
                onChange={handleChangePrice}
                required
              />
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="description"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Mô Tả Sản Phẩm
              </label>
            </Col>
            <Col span={18}>
              <Textarea
                id="description"
                name="description"
                placeholder="Mô Tả Sản Phẩm"
                required
                style={{
                  height: "200px",
                  fontSize: "15px",
                  backgroundColor: "#F9F9F6",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
                className="w-full"
                onChange={handleChangeDescription}
                rows={6}
              />
            </Col>
          </Row>
          <br />
          <br />
          <Row justify="center" align="middle">
            <HStack spacing={10}>
              <Button
                type="default"
                onClick={() => navigate("/products")}
                style={{
                  borderColor: "#f43f5e",
                  color: "#f43f5e",
                  fontSize: "10px",
                  backgroundColor: "white",
                }}
              >
                Quay về trang danh sách
              </Button>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#f43f5e",
                  fontSize: "10px",
                }}
              >
                Thêm Sản Phẩm
              </Button>
            </HStack>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
