import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Textarea } from "flowbite-react";
import { InputMask } from "primereact/inputmask";
import { Card } from "antd";
import { Col, DatePicker, Row, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
// import { fetchUploadStaff, getDistricts, getProvinces, getWards } from '../../data/api';
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import moment from "moment";
import { fetchCreateStaff } from "../../data/api";

const AddStaff = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(null);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const validateInput = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không đúng định dạng.");
      return false;
    }
    if (password.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự.");
      return false;
    }
    return true;
  };
  const token = localStorage.getItem("accessToken");
  // const [province, setProvince] = useState('');
  // const [district, setDistrict] = useState('');
  // const [ward, setWard] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const active = true;
    if (validateInput(email, password)) {
      try {
        const response = await fetchCreateStaff(token, {
          email,
          password,
          active,
        });
        console.log(response);
        if (response.status === 200) {
          alert("Tạo Staff thành công!");
          navigate("/users");
        } else if (response.success === false) {
          alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
        } else {
          alert("Có lỗi xảy ra khi tạo Staff.");
          console.log(response);
        }
      } catch (error) {
        console.error("Error during API call", error);
        if (
          error.isAxiosError &&
          error.response &&
          error.response.data.code === 1002
        ) {
          alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
        } else {
          alert("Có lỗi xảy ra khi tạo Staff.");
        }
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        title="Thêm tài khoản staff"
        style={{ width: "90%", maxWidth: "1200px", margin: "30px auto" }}
        className="h-full"
      >
        <form onSubmit={handleSubmit}>
          {/* Row with 3 cols */}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
            gutter={[40, 8]}
          ></Row>

          {/* Row with 2 cols */}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
            gutter={[40, 8]}
          >
            <Col span={12}>
              <Row align="middle">
                <Col span={4}>
                  <label
                    htmlFor="email"
                    style={{
                      fontSize: "15px",
                      color: "#1F5070",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </label>
                </Col>
                <Col span={20}>
                  <InputText
                    id="email"
                    type="text"
                    className="w-full border"
                    style={{
                      height: "50px",
                      fontSize: "15px",
                      border: "1px solid #6b7280",
                      borderRadius: "0.375rem",
                      width: "100%",
                    }}
                    name="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Row with 2 cols */}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
            gutter={[40, 8]}
          >
            <Col span={12}>
              <Row align={"middle"}>
                <Col span={4}>
                  <label
                    htmlFor="email"
                    style={{
                      fontSize: "15px",
                      color: "#1F5070",
                      fontWeight: "bold",
                    }}
                  >
                    Mật khẩu
                  </label>
                </Col>
                <Col span={20} style={{ display: "flex" }}>
                  <InputGroup className="relative flex w-full items-center">
                    <Input
                      className="h-12 w-full border-2 border-[rgba(0,0,0,0.2)]"
                      style={{
                        height: "50px",
                        fontSize: "15px",
                        border: "1px solid #6b7280",
                        borderRadius: "0.375rem",
                        width: "100%",
                      }}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                    />
                    <InputRightElement className="absolute mr-3 flex h-full items-center justify-center">
                      <Button
                        h="2.5rem"
                        size="sm"
                        onClick={handleShowPasswordClick}
                        fontSize={"1.5rem"}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Row with 3 cols */}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
            gutter={[40, 8]}
          />
          <Row justify="end" align="middle">
            <HStack spacing={10}>
              <Button
                onClick={() => navigate(-1)}
                sx={{
                  borderWidth: "2px",
                  color: "#46B5C1",
                  borderColor: "#46B5C1",
                  height: "40px",
                  fontSize: "15px",
                  padding: "0 20px", // Increased padding
                  borderRadius: "10px", // Rounded corners
                  marginRight: "10px",
                }}
              >
                Quay về trang danh sách
              </Button>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#46B5C1",
                  borderColor: "#46B5C1",
                  height: "40px",
                  fontSize: "15px",
                  color: "white",
                  padding: "0 20px", // Increased padding
                  borderRadius: "10px", // Rounded corners
                }}
              >
                Tạo Staff
              </Button>
            </HStack>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default AddStaff;
