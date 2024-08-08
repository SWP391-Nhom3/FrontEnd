import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
// import { fetchOtp } from "../../data/api";

const Otp = () => {
  const location = useLocation();
  const email = location.state?.email;
  const user_id = location.state?.user_id;
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Khởi tạo state lưu trữ giá trị OTP với 6 ô

  const resendMail = async (event) => {
    //   event.preventDefault();
    //   await fetchOtp({ user_id,digit:"" ,email, key: 'resend' })
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    // };
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   const otpValue = otp.join('');
    //    await fetchOtp({ user_id, digit: otpValue, email,key: "send" }).then((res) => {
    //       console.log(res.data);
    //       navigate("/reset-password", { state: { digit: otpValue, user_id } });
    //     })
    //     .catch((error) => {
    //       let errorList = [];
    //       for (let [key, value] of Object.entries(error.response.data.errors)) {
    //         errorList.push(value);
    //         setErrorList(errorList);
    //       }
    //     });
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Tự động focus vào ô tiếp theo nếu đã nhập đủ 1 ký tự
    if (value && index < 5) {
      const nextInput = document.querySelectorAll("input")[index + 1];
      nextInput.focus();
    }
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="relative flex min-h-screen min-w-[500px] flex-col justify-center overflow-hidden py-12">
          <div className="relative mx-auto w-full max-w-lg rounded-2xl bg-white px-6 pb-9 pt-10 shadow-xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold">
                  <p>Xác Thực OTP</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p> Chúng tôi đã gửi OTP tới email: {email}</p>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-16">
                    <div className="mx-auto flex w-full flex-row items-center justify-between">
                      {otp.map((value, index) => (
                        <div key={index} className="h-16 w-16">
                          <input
                            className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none ring-blue-700 focus:bg-gray-50 focus:ring-1"
                            type="text"
                            value={value}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            maxLength={1}
                          />
                        </div>
                      ))}
                    </div>
                    {errorList.length > 0 && (
                      <div className="error-list mb-3 mt-3">
                        {errorList.map((error, index) => (
                          <p key={index} className="text-red-600">
                            {error}
                          </p>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col space-y-5">
                      <div>
                        <button
                          type="submit"
                          className="flex w-full flex-row items-center justify-center rounded-xl border border-none bg-blue-700 py-5 text-center text-sm text-white shadow-sm outline-none"
                        >
                          Xác Nhận
                        </button>
                      </div>
                      <div className="flex flex-row items-center justify-center space-x-1 text-center text-sm font-medium text-gray-500">
                        <p>Không tìm thấy mã?</p>{" "}
                        <Button onClick={resendMail}>Gửi lại mã</Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
