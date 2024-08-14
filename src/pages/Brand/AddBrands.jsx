import { Label } from "flowbite-react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Button, Col, Divider, Row, notification } from "antd";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import { fetchAddBrand } from "../../data/api";

const AddBrands = () => {
  const [brandName, setBrandName] = useState("");

  const token = localStorage.getItem("accessToken");

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const brand = {
      brand_name: brandName,
    };

    await fetchAddBrand(brand, token)
      .then((res) => {
        console.log(res.data);
        const newBrand = res.data.data; // Đổi tên biến để tránh nhầm lẫn
        console.log("brand: ", newBrand);
        notification.success({
          message: "Tạo nhãn hàng thành công",
          placement: "top",
        });
        setBrandName("");
      })
      .catch((error) => {
        console.error(error.response);
        notification.error({
          // Thêm thông báo lỗi cho người dùng
          message: "Lỗi khi tạo nhãn hàng",
          description:
            error.response?.data?.message ||
            "Có lỗi xảy ra, vui lòng thử lại sau.",
          placement: "top",
        });
      });
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
