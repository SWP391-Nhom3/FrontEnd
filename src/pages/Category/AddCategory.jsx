import { Button, Col, Row, notification } from "antd";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
// import { fetchAddCategory } from '../../data/api'
import { useNavigate } from "react-router-dom";
import { TextInput, Textarea } from "flowbite-react";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("result"));

  const handleChangeCategoryName = (event) => {
    setCategoryName(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const category = {
      category_name: categoryName,
      description: description,
    };

    console.log("category nè: ", category);

    // await fetchAddCategory(category, token)
    //   .then(async (res) => {
    //     console.log(res.data);
    //     const category = res.data.product;
    //     console.log("category up: ", category);
    //   })
    //   .then((data) => {
    //     notification.success({
    //       message: 'Tạo phân loại mới thành công',
    //       placement: 'top',
    //     });
    //     setCategoryName('');
    //     setDescription('');
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "60vh" }}>
      <Card
        title="Thêm phân loại mới"
        style={{ width: "60%", marginTop: "80px" }}
      >
        <form onSubmit={handleSubmit}>
          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="category_name"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Tên phân loại
              </label>
            </Col>
            <Col span={18}>
              <TextInput
                id="category_name"
                type="text"
                className="w-full"
                placeholder="Nhập tên phân loại"
                onChange={handleChangeCategoryName}
                style={{
                  height: "50px",
                  fontSize: "15px",
                  backgroundColor: "#F9F9F6",
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
            style={{ marginBottom: "40px" }}
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
                Mô tả phân loại
              </label>
            </Col>
            <Col span={18}>
              <Textarea
                id="description"
                placeholder="Nhập mô tả"
                onChange={handleChangeDescription}
                style={{
                  width: "100%",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                  height: "100px",
                  fontSize: "15px",
                  backgroundColor: "#F9F9F6",
                }}
                required
              />
            </Col>
          </Row>
          <br />
          <br />

          <Row justify="end" align="middle">
            <Col>
              <Button
                onClick={() => navigate(-1)}
                style={{
                  borderWidth: "2px",
                  color: "#46B5C1",
                  borderColor: "#46B5C1",
                  height: "40px",
                  fontSize: "15px",
                  marginRight: "10px",
                }}
              >
                Quay về trang danh sách
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#46B5C1",
                  borderColor: "#46B5C1",
                  height: "40px",
                  fontSize: "15px",
                }}
              >
                Lưu phân loại
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default AddCategory;
