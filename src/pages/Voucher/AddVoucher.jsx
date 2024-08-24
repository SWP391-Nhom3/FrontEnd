import React, { useEffect, useState } from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { fetchCreateVoucher, fetchGetVoucher } from "../../data/api";
import { Card, Col, notification, Row } from "antd";
import { HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { addMonths, set } from "date-fns";

const AddVoucher = () => {
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [maxUses, setMaxUses] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedVoucherType, setSelectedVoucherType] = useState("");
  const [isType, SetIsType] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchGetVoucher().then((res) => {
      if (res && res.length > 0) {
        const filteredVouchers = res.filter(
          (voucher) =>
            voucher.voucherType === "FIXED_AMOUNT" ||
            voucher.voucherType === "PERCENTAGE",
        );
        const voucherTypes = [
          ...new Set(filteredVouchers.map((voucher) => voucher.voucherType)),
        ];
        console.log(voucherTypes);
        setVoucherTypes(voucherTypes);
      }
    });
  }, []);

  const validateExpiryDate = (expiryDate) => {
    const currentDate = new Date();
    const oneMonthLater = addMonths(currentDate, 1);
    oneMonthLater.setHours(0, 0, 0, 0); // Set time to midnight for comparison

    const expiryDateObject = new Date(expiryDate);
    expiryDateObject.setHours(0, 0, 0, 0); // Ensure expiryDate has the same format

    // Return true if expiryDate is after one month later
    return expiryDateObject > oneMonthLater;
  };

  const handleChangeSelectedVoucherType = (event) => {
    setSelectedVoucherType(event.target.value);
    SetIsType(event.target.value === "0");
  };

  const handleChangeMaxUses = (event) => {
    setMaxUses(event.target.value);
  };

  const handleChangeExpiryDate = (event) => {
    const expiryDate = event.target.value;
    console.log("Selected expiry date:", expiryDate);

    if (!validateExpiryDate(expiryDate)) {
      // notification.error({
      //   message: "Ngày hết hạn phải sau ngày hiện tại ít nhất 1 tháng.",
      //   placement: "top",
      // });
      setExpiryDate(expiryDate);
      // alert("Ngày hết hạn phải lớn hơn ngày hiện tại ít nhất 1 tháng.");
    } else {
      setExpiryDate(expiryDate);
      console.log("Expiry date:", expiryDate);
    }
  };

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let adjustedAmount = Number(amount);
    if (selectedVoucherType === "PERCENTAGE" && adjustedAmount > 100) {
      notification.error({
        message: "Giá trị tối đa cho loại voucher PERCENTAGE là 100.",
        placement: "top",
      });
      return;
    }
    if (!validateExpiryDate(expiryDate)) {
      notification.error({
        message: "Ngày hết hạn phải sau ngày hiện tại ít nhất 1 tháng.",
        placement: "top",
      });
      setExpiryDate(expiryDate);
      return;
    }
    const expiryDateISO = new Date(expiryDate).toISOString();
    console.log("Expiry date:", expiryDateISO);
    const voucher = {
      type: selectedVoucherType,
      value: adjustedAmount,
      maxUses: Number(maxUses),
      expiryDate: expiryDateISO,
    };

    await fetchCreateVoucher(voucher)
      .then((res) => {
        console.log(res);
        notification.success({
          message: "Thêm voucher thành công",
          placement: "top",
        });
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Thêm voucher thất bại",
          placement: "top",
        });
      });
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <Card
        title={<h2 className="text-2xl font-bold">Thêm voucher</h2>}
        style={{
          width: "70%",
          maxWidth: "40wh",
          margin: "30px auto",
          minHeight: "50vh",
          height: "fit-content",
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
                htmlFor="category"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Chọn loại voucher
              </label>
            </Col>
            <Col span={18}>
              <Select
                id="category"
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
                onChange={handleChangeSelectedVoucherType}
                required
              >
                <option value="" disabled selected>
                  Chọn Loại Voucher
                </option>
                {["FIXED_AMOUNT", "PERCENTAGE"].map((option) => (
                  <option key={option} value={option}>
                    {option}
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
                htmlFor="value"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Khuyến mãi
              </label>
            </Col>
            <Col span={18}>
              <TextInput
                id="value"
                type="number"
                min={0}
                onChange={handleChangeAmount}
                className="w-full"
                required
              />
            </Col>
          </Row>

          {/* Max Uses */}
          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="maxUses"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Số lượng
              </label>
            </Col>
            <Col span={18}>
              <TextInput
                id="maxUses"
                type="number"
                min={0}
                onChange={handleChangeMaxUses}
                className="w-full"
                required
              />
            </Col>
          </Row>

          {/* Expiry Date */}
          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="expiryDate"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Ngày hết hạn
              </label>
            </Col>
            <Col span={18}>
              <input
                id="expiryDate"
                type="date"
                onChange={handleChangeExpiryDate}
                className="w-full"
                required
              />
            </Col>
          </Row>

          <Row justify="center" align="middle">
            <HStack spacing={10}>
              <Button
                type="default"
                onClick={() => navigate("/voucher")}
                style={{
                  borderColor: "#fb7185",
                  color: "#fb7185",
                  fontSize: "10px",
                  backgroundColor: "white",
                }}
              >
                Quay về trang danh sách
              </Button>
              <Button
                type="default"
                htmlType="submit"
                style={{
                  backgroundColor: "#fb7185",
                  fontSize: "10px",
                }}
              >
                Lưu
              </Button>
            </HStack>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default AddVoucher;
