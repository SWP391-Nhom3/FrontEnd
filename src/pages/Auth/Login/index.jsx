import React from "react";
import Breadcrumbs from "../../../components/elements/Breadcrumb";
import logBg from "../../../assets/images/background/log-in-bg.png";
import loginImg from "../../../assets/images/auth/login.png";
import LoginForm from "./LoginForm";

const SignIn = () => {
  return (
    <>
      <Breadcrumbs headline="Đăng Nhập" />
      <div
        className={
          "my-4 flex w-full flex-col gap-8 bg-cover bg-center lg:flex-row"
        }
        style={{ backgroundImage: `url(${logBg})` }}
      >
        <div className="hidden lg:block lg:w-3/5">
          <div className="flex h-full w-full items-center justify-center">
            <img src={loginImg} className="h-auto w-[80%]" />
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:w-2/5">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default SignIn;
