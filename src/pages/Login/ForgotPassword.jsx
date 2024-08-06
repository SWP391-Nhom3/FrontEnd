import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

import cover_imgedit from "../../assets/cover_imgedit.png";
import { Card } from "primereact/card";
// import { fetchForgotPassword } from "../../data/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [errorList, setErrorList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // const { email } = formValues;
    // console.log(email);
    // await fetchForgotPassword(email)
    //   .then((res) => {
    //     const user_id = res.data.user_id;
    //     navigate("/otp", { state: { email, user_id } });
    //   })
    //   .catch((error) => {
    //     let errorList = [];
    //     for (let [key, value] of Object.entries(error.response.data.errors)) {
    //       errorList.push(value);
    //       setErrorList(errorList);
    //     }
    //   });
  };
  return (
    <>
      <div className="flex h-screen w-full">
        <div className="relative flex h-full w-full flex-col">
          <img
            src={cover_imgedit}
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover"
          />

          <Card
            title="Quên mật khẩu"
            subTitle="Staff & Admin Only"
            className="absolute left-[7%] top-[25%] flex w-[35rem] flex-col rounded-lg bg-white p-8 shadow-lg"
          >
            <div className="flex w-full max-w-[500px] flex-col">
              <div>
                <form className="flex w-full flex-col" onSubmit={handleSubmit}>
                  <label htmlFor="email" className="mb-2 block font-bold">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border border-gray-300 p-2"
                  />
                  {errorList.length > 0 && (
                    <div className="error-list mb-3 mt-3">
                      {errorList.map((error, index) => (
                        <p key={index} className="text-red-600">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 flex w-full items-center justify-end">
                    <Link
                      to={"/login"}
                      className="cursor-pointer whitespace-nowrap text-sm font-medium underline underline-offset-2"
                    >
                      Đăng Nhập
                    </Link>
                  </div>
                  <div className="flex w-full flex-col">
                    <button
                      type="submit"
                      className="my-4 flex w-full items-center justify-center rounded-md bg-[#060606] p-4 text-center text-white"
                    >
                      Gửi Mã OTP
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
