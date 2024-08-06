import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cover_imgedit from "../../assets/cover_imgedit.png";
import { Card } from "primereact/card";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Checkbox } from "@mui/material";
// import { fetchLogin } from "../../data/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: sessionStorage.getItem("email") || "",
    password: sessionStorage.getItem("password") || "",
  });
  const [errorList, setErrorList] = useState([]);
  const [show, setShow] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleClick = () => setShow(!show);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formValues;

    // await fetchLogin(email, password)
    // .then((res) => {
    //   localStorage.setItem("user", JSON.stringify(res.data.user));
    //   localStorage.setItem("result", JSON.stringify(res.data.result));
    //   const isAdmin = res.data.isAdmin;
    //   isAdmin
    //     ? localStorage.setItem("isAuthenticatedAdmin", "true")
    //     : localStorage.setItem("isAuthenticatedStaff", "true");

    //   if (rememberMe) {
    //     sessionStorage.setItem("email", email);
    //     sessionStorage.setItem("password", password);
    //   } else {
    //     sessionStorage.removeItem("email");
    //     sessionStorage.removeItem("password");
    //   }

    //   navigate("/");
    //   window.location.reload();
    // })
    // .catch((error) => {
    //   let errorList = [];
    //   for (let [key, value] of Object.entries(error.response.data.errors)) {
    //     errorList.push(value);
    //     setErrorList(errorList);
    //   }
    // });
  };

  return (
    <>
      <div className="relative flex min-h-screen w-full items-center justify-center">
        <img
          src={cover_imgedit}
          alt=""
          className="absolute left-0 top-0 h-full w-full object-cover"
        />

        <div className="relative flex h-full w-full items-center justify-center px-4 sm:justify-start sm:px-0">
          <Card
            title="Đăng nhập"
            subTitle="Staff & Admin Only"
            className="flex w-full max-w-[35rem] flex-col rounded-lg bg-white p-8 shadow-lg sm:ml-28"
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
                    className="h-12 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)]"
                    placeholder="Nhập địa chỉ email"
                    type="email"
                  />
                  <label
                    htmlFor="password"
                    className="mb-2 mt-4 block font-bold"
                  >
                    Mật khẩu
                  </label>
                  <InputGroup className="relative flex w-full items-center">
                    <Input
                      className="h-12 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)] pr-16"
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                    />
                    <InputRightElement className="absolute mr-3 flex h-full items-center justify-center pr-2">
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

                  {errorList.length > 0 && (
                    <div className="error-list mb-3 mt-3">
                      {errorList.map((error, index) => (
                        <p key={index} className="text-red-600">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex w-full flex-col items-center justify-between sm:flex-row">
                    <div className="flex w-full items-center space-x-2">
                      <Checkbox
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                      />
                      <p className="m-0 text-sm">Ghi nhớ mật khẩu!</p>
                    </div>
                    <Link
                      to={"/forgot-password"}
                      className="mt-2 cursor-pointer whitespace-nowrap text-sm font-medium underline underline-offset-2 sm:mt-0"
                    >
                      Quên Mật Khẩu?
                    </Link>
                  </div>
                  <div className="mt-4 flex w-full flex-col">
                    <button
                      type="submit"
                      className="my-4 flex w-full items-center justify-center rounded-md bg-[#060606] p-4 text-center text-white"
                    >
                      Đăng Nhập
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

export default LoginPage;
