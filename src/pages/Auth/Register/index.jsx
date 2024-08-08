import React from "react";
import Breadcrumbs from "../../../components/elements/Breadcrumb";
import logBg from "../../../assets/images/background/log-in-bg.png";
import siginUpImg from "../../../assets/images/auth/sign-up.png";
import RegisterForm from "./RegisterForm";

const SiginUp = () => {
  return (
    <>
      <Breadcrumbs headline="Đăng Ký" />
      <div
        className={
          "my-4 flex w-full flex-col gap-8 bg-cover bg-center lg:flex-row"
        }
        style={{ backgroundImage: `url(${logBg})` }}
      >
        <div className="hidden lg:block lg:w-2/5">
          <div className="flex h-full w-full items-center justify-center">
            <img src={siginUpImg} className="h-auto w-[80%]" />
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:w-3/5">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default SiginUp;
