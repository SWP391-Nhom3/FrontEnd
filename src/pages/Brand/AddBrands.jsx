import { Label } from "flowbite-react";
import { Card } from "antd";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Button, Col, Divider, Row, notification } from "antd";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import { fetchAddBrand } from "../../data/api";
import { useNavigate } from "react-router-dom";

const AddBrands = () => {
  const [brandName, setBrandName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const category = {
      name: brandName,
    };

    const res = await fetchAddBrand(category, token);
    notification.success({
      message: "Tạo nhãn hàng mới thành công",
      placement: "top",
      onClose: () => {
        navigate("/brands");
      },
    });

    setBrandName("");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "80vh" }}>
      <Card
        title="Thêm nhãn hàng mới"
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
                htmlFor="brand_name"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Tên nhãn hàng
              </label>
            </Col>
            <Col span={18}>
              <InputText
                id="brand_name"
                type="text"
                className="w-full"
                placeholder="Nhập tên nhãn hàng"
                value={brandName}
                onChange={handleChange(setBrandName)}
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
          <Row justify="end" align="middle">
            <Col>
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
                Tạo nhãn hàng
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default AddBrands;
