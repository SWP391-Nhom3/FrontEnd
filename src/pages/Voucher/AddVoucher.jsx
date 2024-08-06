import React, { useEffect, useState } from "react";
import { Button, Datepicker, Select, TextInput } from "flowbite-react";
// import { fetchGetVoucherType, fetchUploadVoucher } from "../../data/api";
import { Card, Col, notification, Row } from "antd";
import { HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddVoucher = () => {
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [memberShip, setMemberShip] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [selectedVoucherType, setSelectedVoucherType] = useState("");
  const [isType, SetIsType] = useState(false);
  const token = JSON.parse(localStorage.getItem("result"));

  const date = new Date();
  const [dateInput, setDateInput] = useState(date);

  const navigate = useNavigate();

  useEffect(() => {
    // // Gọi API để lấy dữ liệu category
    // fetchGetVoucherType().then((res) => {
    //   console.log(res);
    //   if (res && res.data.result) {
    //     setVoucherTypes(res.data.result);
    //   }
    // });
  }, []);

  const handleChangeSelectedVoucherType = (event) => {
    setSelectedVoucherType(event.target.value);
    SetIsType(event.target.value === "0");
  };

  const handleChangeMemberShip = (event) => {
    setMemberShip(event.target.value);
  };

  const handleChangeDiscount = (event) => {
    setDiscount(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date_input = new Date(dateInput);
    date_input.setDate(date_input.getDate() + 1);
    const voucher = {
      voucher_type: Number(selectedVoucherType),
      membership: Number(memberShip),
      expire_date: date_input.toISOString(),
      discount: Number(discount),
      amount: Number(amount),
    };

    // await fetchUploadVoucher(voucher, token)
    //   .then((res) => {
    //     console.log(res.data);
    //     notification.success({
    //       message: "Thêm voucher thành công",
    //       placement: "top",
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     notification.error({
    //       message: "Thêm voucher thất bại",
    //       placement: "top",
    //     });
    //   });
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
                Chọn voucher
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
                {voucherTypes.map((option) => (
                  <option key={option.id} value={option.id}>
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
                htmlFor="amount"
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
                id="amount"
                type="number"
                min={0}
                value={amount}
                name="amount"
                placeholder="Số lượng..."
                defaultValue={0}
                onChange={handleChangeAmount}
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
                htmlFor="membership"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Điểm membership
              </label>
            </Col>
            <Col span={18}>
              <TextInput
                id="memberShip"
                type="number"
                name="memberShip"
                placeholder="MemberShip..."
                min={0}
                value={memberShip}
                onChange={handleChangeMemberShip}
                readOnly={isType}
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
                htmlFor="discount"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Mức giảm giá (VND)
              </label>
            </Col>
            <Col span={18}>
              <TextInput
                id="discount"
                type="number"
                min={0}
                name="discount"
                value={discount}
                placeholder="Mức giảm giá..."
                defaultValue={0}
                onChange={handleChangeDiscount}
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
                htmlFor="product"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Sản phẩm
              </label>
            </Col>
            <Col span={18}>
              <Datepicker
                language="vi"
                defaultDate={dateInput}
                onSelectedDateChanged={(date) => setDateInput(date)}
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

          <Row justify="center" align="middle">
            <HStack spacing={10}>
              <Button
                type="default"
                onClick={() => navigate("/all-voucher")}
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
                type="default"
                htmlType="submit"
                style={{
                  backgroundColor: "#55B6C3",
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
    // <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl h-screen w-full">
    //   <h2 className="mb-8 text-3xl font-bold">Thêm mã giảm giá </h2>
    //   <form
    //     className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
    //     onSubmit={handleSubmit}
    //   >
    //     {/* row2 */}
    //     <div className="flex gap-8">
    //       {/* category */}
    //       <div className="lg:w-1/2">
    //         <div className="mb-2 block">
    //           <Label htmlFor="category" value="Loại Voucher: " />
    //         </div>

    //         <Select
    //           id="category"
    //           className="w-full rounded"
    //           onChange={handleChangeSelectedVoucherType}
    //           required
    //         >
    //           <option value="" disabled selected>
    //             Chọn Loại Voucher
    //           </option>
    //           {voucherTypes.map((option) => (
    //             <option key={option.id} value={option.id}>
    //               {option.name}
    //             </option>
    //           ))}
    //         </Select>
    //       </div>

    //       {/* amount */}
    //       <div className="lg:w-1/2">
    //         <div className="mb-2 block">
    //           <Label htmlFor="amount" value="Số lượng: " />
    //         </div>
    //         <TextInput
    //           id="amount"
    //           type="number"
    //           min={0}
    //           value={amount}
    //           name="amount"
    //           placeholder="Số lượng..."
    //           defaultValue={0}
    //           onChange={handleChangeAmount}
    //           required
    //         />
    //       </div>
    //     </div>

    //     {/* row3 */}
    //     <div className="flex gap-8">
    //       {/* membership */}
    //       <div className="lg:w-1/2">
    //         <div className="mb-2 block">
    //           <Label
    //             htmlFor="memberShip"
    //             value="MemberShip (Đổi bằng bao nhiêu điểm): "
    //           />
    //         </div>
    //         <TextInput
    //           id="memberShip"
    //           type="number"
    //           name="memberShip"
    //           placeholder="MemberShip..."
    //           min={0}
    //           value={memberShip}
    //           onChange={handleChangeMemberShip}
    //           readOnly={isType}
    //           required
    //         />
    //       </div>

    //       {/* discount */}
    //       <div className="lg:w-1/2">
    //         <div className="mb-2 block">
    //           <Label htmlFor="discount" value="Mức giảm giá (VND): " />
    //         </div>
    //         <TextInput
    //           id="discount"
    //           type="number"
    //           min={0}
    //           name="discount"
    //           value={discount}
    //           placeholder="Mức giảm giá..."
    //           defaultValue={0}
    //           onChange={handleChangeDiscount}
    //           required
    //         />
    //       </div>
    //     </div>

    //     {/* row4 */}
    //     <div>
    //       <div>
    //         <label className="block mb-3">Ngày hết hạn: </label>
    //         <Datepicker
    //           language="vi"
    //           defaultDate={dateInput}
    //           onSelectedDateChanged={(date) => setDateInput(date)}
    //           required
    //         />
    //       </div>
    //     </div>

    //     <Button type="submit" className="mt-5">
    //       Thêm Sản Phẩm
    //     </Button>
    //   </form>
    //   <Toaster />
    // </div>
  );
};

export default AddVoucher;
