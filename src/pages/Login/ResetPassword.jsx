import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

import coverImg from "../../assets/cover_img.png";
import cover_imgedit from "../../assets/cover_imgedit.png";
import { Card } from "primereact/card";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Checkbox } from "@mui/material";
// import { fetchResetPassword } from "../../data/api";

const ResetPassword = () => {
  const location = useLocation();
  const user_id = location.state?.user_id;
  const digit = location.state?.digit;
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    password: "",
    confirm_password: "",
  });
  const [errorList, setErrorList] = useState([]);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  console.log("reset: " + user_id, digit);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // const { password, confirm_password } = formValues;
    // await fetchResetPassword({ user_id, digit, password, confirm_password })
    //   .then((res) => {
    //     navigate("/login");
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
            title="Đặt lại mật khẩu"
            subTitle="Staff & Admin Only"
            className="absolute left-[7%] top-[25%] flex w-[35rem] flex-col rounded-lg bg-white p-8 shadow-lg"
          >
            <div className="flex w-full max-w-[500px] flex-col">
              <div>
                <form className="flex w-full flex-col" onSubmit={handleSubmit}>
                  <label
                    htmlFor="password"
                    className="mb-2 mt-4 block font-bold"
                  >
                    Mật khẩu mới
                  </label>
                  <InputGroup>
                    <Input
                      className="h-10 w-full rounded-md border border-gray-300 p-2"
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="2.5rem"
                        size="sm"
                        onClick={handleClick}
                        fontSize={"1.5rem"}
                      >
                        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <label
                    htmlFor="confirm_password"
                    className="mb-2 mt-4 block font-bold"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <InputGroup>
                    <Input
                      className="h-10 w-full rounded-md border border-gray-300 p-2"
                      type={"password"}
                      id="confirm_password"
                      name="confirm_password"
                      value={formValues.confirm_password}
                      onChange={handleChange}
                    />
                  </InputGroup>

                  {errorList.length > 0 && (
                    <div className="error-list mb-3 mt-3">
                      {errorList.map((error, index) => (
                        <p key={index} className="text-red-600">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="flex w-full flex-col">
                    <button
                      type="submit"
                      className="my-4 flex w-full items-center justify-center rounded-md bg-[#060606] p-4 text-center text-white"
                    >
                      Xác Nhận
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

export default ResetPassword;
