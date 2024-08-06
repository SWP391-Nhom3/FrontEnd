import React, { useEffect, useState } from "react";
import { Button, Select, TextInput, Textarea } from "flowbite-react";
import { imageDb } from "../../data/firebase.config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// import {
//   fetchBrandStaff,
//   fetchCategories,
//   fetchUpdateProduct,
//   fetchUploadProduct,
// } from "../../data/api";
import { Col, notification, Row, Upload } from "antd";
import { Card } from "primereact/card";
import { PlusOutlined } from "@ant-design/icons";
import { HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [product_name, setProduct_name] = useState("");
  const [age, setAge] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);
  const [fileList, setFileList] = useState([]);

  const token = JSON.parse(localStorage.getItem("result"));

  const navigate = useNavigate();

  useEffect(() => {
    // // Gọi API để lấy dữ liệu category
    // fetchCategories()
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data && data.result) {
    //       setCategories(data.result);
    //     }
    //   })
    //   .catch((error) => console.error("Error fetching categories:", error));
    // // Gọi API để lấy dữ liệu brand
    // fetchBrandStaff()
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data && data.result) {
    //       setBrands(data.result);
    //     }
    //   })
    //   .catch((error) => console.error("Error fetching brands:", error));
    // listAll(ref(imageDb, "files")).then((imgs) => {
    //   imgs.items.forEach((val) => {
    //     getDownloadURL(val).then((url) => {
    //       setImgUrl(url);
    //     });
    //   });
    // });
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
      (category) => category.category_name === selectedCategoryName,
    );
    if (selectedCategory) {
      setSelectedCategoryId(selectedCategory._id);
    }
  };

  const handleChangeSelectedBrand = (event) => {
    const selectedBrandName = event.target.value;
    const selectedBrand = brands.find(
      (brand) => brand.brand_name === selectedBrandName,
    );
    if (selectedBrand) {
      setSelectedBrandId(selectedBrand._id);
    }
  };

  const handleChangeProductName = (event) => {
    setProduct_name(event.target.value);
  };
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleChangeDiscount = (event) => {
    setDiscount(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  async function uploadImage(product, id) {
    if (img !== null) {
      const imgRef = ref(imageDb, `product_img/${v4()}`);
      const snapshot = await uploadBytes(imgRef, img);
      const url = await getDownloadURL(snapshot.ref);

      product.imgUrl = url;
      await sendURL(product, id);
    }
  }
  const sendURL = async (product, id) => {
    // return await fetchUpdateProduct(product, token, id);
  };
  const handleSubmit = async (event) => {
    // event.preventDefault();
    // const form = event.target;
    // const product = {
    //   brand_id: selectedBrandId,
    //   category_id: selectedCategoryId,
    //   product_name,
    //   price: Number(price),
    //   description,
    //   age,
    //   discount,
    // };
    // // send data to db:
    // await fetchUploadProduct(product, token)
    //   .then(async (res) => {
    //     const id = res.data.result.insertedId
    //     await uploadImage(product, id);
    //   })
    //   .then((data) => {
    //     notification.success({
    //       message: "Thêm sản phẩm thành công!",
    //       placement: "top",
    //     })
    //     form.reset();
    //     setFileList([]);
    //     setSelectedCategoryId("");
    //     setSelectedBrandId("");
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
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
                htmlFor="age"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Độ Tuổi Sử Dụng
              </label>
            </Col>
            <Col span={18}>
              <TextInput
                id="age"
                type="text"
                name="age"
                placeholder="Độ Tuổi Sử Dụng"
                onChange={handleChangeAge}
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
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
                  <option key={option._id} value={option.category_name}>
                    {option.category_name}
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
                  <option key={option._id} value={option.brand_name}>
                    {option.brand_name}
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
                htmlFor="discount"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Giảm giá(%)
              </label>
            </Col>
            <Col span={18}>
              <TextInput
                id="discount"
                type="number"
                min={0}
                max={100}
                name="discount"
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  backgroundColor: "#F9F9F6",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
                placeholder="Mức giảm giá..."
                defaultValue={0}
                onChange={handleChangeDiscount}
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
                  borderColor: "#55B6C3",
                  color: "#55B6C3",
                  fontSize: "10px",
                  backgroundColor: "white",
                }}
              >
                Quay về trang danh sách
              </Button>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#55B6C3",
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
