import { Label } from "flowbite-react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Button, Col, Divider, Row, notification } from "antd";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
// import { fetchAddBrand } from '../../data/api';

const AddBrands = () => {
  const [brandName, setBrandName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const token = JSON.parse(localStorage.getItem("result"));

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const brand = {
      brand_name: brandName,
      address: address,
      country: country,
      phone: phone,
    };

    // await fetchAddBrand(brand, token)
    //   .then(async (res) => {
    //     console.log(res.data);
    //     const brand = res.data.product;
    //     console.log("brand: ", brand);
    //   })
    //   .then((data) => {
    //     notification.success({
    //       message: 'Tạo nhãn hàng thành công',
    //       placement: 'top',
    //     });
    //     setBrandName('');
    //     setAddress('');
    //     setCountry('');
    //     setPhone('');
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
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

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px" }}
          >
            <Col span={4}>
              <label
                htmlFor="country"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Đất nước
              </label>
            </Col>
            <Col span={18}>
              <InputText
                id="country"
                type="text"
                className="w-full"
                placeholder="Nhập đất nước"
                value={country}
                onChange={handleChange(setCountry)}
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
                htmlFor="phone"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Số điện thoại
              </label>
            </Col>
            <Col span={18}>
              <InputText
                id="phone"
                type="text"
                className="w-full"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={handleChange(setPhone)}
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
                htmlFor="address"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Địa chỉ
              </label>
            </Col>
            <Col span={18}>
              <InputTextarea
                id="address"
                placeholder="Nhập địa chỉ"
                value={address}
                onChange={handleChange(setAddress)}
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
                Lưu nhãn hàng
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default AddBrands;
