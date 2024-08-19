import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkToGoogle from "../Google/LinkToGoogle";
import { Toaster } from "react-hot-toast";
import { Tabs } from "antd";

import { fetchLogin } from "../../../data/api";
import { useCartContext } from "../../../context/CartContext";

import { usePreOrderContext } from "../../../context/PreOrderContext";


const { TabPane } = Tabs;

const LoginForm = () => {
  const navigate = useNavigate();
  const { clearCart } = useCartContext();

  const { clearPreOrder } = usePreOrderContext();


  const [formValues, setFormValues] = useState({
    email: sessionStorage.getItem("email") || "",
    password: sessionStorage.getItem("password") || "",
  });
  const [errorList, setErrorList] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState("customer");

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

    try {
      const res = await fetchLogin(email, password);
      const userRoles = res.data.data.user.roles.map((role) => role.name);
      const isActive = res.data.data.user.active;
      if (!isActive) {
        setErrorList(["Tài khoản của bạn đã bị chặn."]);
        return;
      }
      if (activeTab === "customer") {
        if (userRoles.includes("ADMIN") || userRoles.includes("STAFF")) {
          setErrorList([
            "Tài khoản không có quyền truy cập cho vai trò Customer.",
          ]);
          return;
        }
      } else if (activeTab === "admin-staff") {
        if (userRoles.includes("MEMBER")) {
          setErrorList([
            "Tài khoản không có quyền truy cập cho vai trò Admin & Staff.",
          ]);
          return;
        }
      }

      localStorage.setItem("result", JSON.stringify(res.data.data));
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      localStorage.setItem("role", JSON.stringify(res.data.data.user.roles));

      if (userRoles.includes("MEMBER")) {
        localStorage.setItem("isMember", "true");
      } else if (userRoles.includes("ADMIN")) {
        localStorage.setItem("isAdmin", "true");
      } else {
        localStorage.setItem("isStaff", "true");
      }

      if (rememberMe) {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
      } else {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
      }

      if (localStorage.getItem("isMember") === "true") {
        navigate("/");
      } else {
        clearCart();
        clearPreOrder();
        navigate("/dashboard");
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
      setErrorList(["Đăng nhập thất bại. Vui lòng thử lại."]);
    }
  };

  return (
    <div className="w-full rounded-3xl border-2 border-solid border-[rgba(0,0,0,0.1)] px-10 py-12 shadow-2xl">
      <Toaster />
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="mt-4 text-lg font-medium text-gray-500">
        Vui lòng điền thông tin của bạn!
      </p>
      <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)}>
        <TabPane tab="Customer" key="customer">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-lg font-medium">Địa Chỉ Email</label>
              <input
                className="mt-1 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)] bg-transparent p-4"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                type="email"
                placeholder="Nhập email..."
              />
            </div>
            <div className="mt-4 flex flex-col">
              <label className="text-lg font-medium">Mật Khẩu</label>
              <input
                className="mt-1 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)] bg-transparent p-4"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu..."
                type="password"
              />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label
                  className="ml-2 text-base font-medium"
                  htmlFor="remember"
                >
                  Lưu mật khẩu
                </label>
              </div>
              <a
                className="text-base font-medium text-violet-500"
                href="/forgot-password"
              >
                Quên mật khẩu?
              </a>
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
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                type="submit"
                className="transform rounded-xl bg-violet-500 py-4 text-lg font-bold text-white transition-all ease-in-out hover:scale-[1.01] active:scale-[.98] active:duration-75"
              >
                Đăng Nhập
              </button>
              <LinkToGoogle headline="Đăng Nhập Bằng Google" />
            </div>
          </form>
          <div className="mt-8 flex items-center justify-center">
            <p className="text-base font-medium">Không có tài khoản?</p>
            <a
              href="/register"
              className="ml-2 text-base font-medium text-violet-500"
            >
              Đăng Ký
            </a>
          </div>
        </TabPane>
        <TabPane tab="Admin & Staff" key="admin-staff">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-lg font-medium">Địa Chỉ Email</label>
              <input
                className="mt-1 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)] bg-transparent p-4"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                type="email"
                placeholder="Nhập email..."
              />
            </div>
            <div className="mt-4 flex flex-col">
              <label className="text-lg font-medium">Mật Khẩu</label>
              <input
                className="mt-1 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)] bg-transparent p-4"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu..."
                type="password"
              />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label
                  className="ml-2 text-base font-medium"
                  htmlFor="remember"
                >
                  Lưu mật khẩu
                </label>
              </div>
              <a
                className="text-base font-medium text-violet-500"
                href="/forgot-password"
              >
                Quên mật khẩu?
              </a>
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
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                type="submit"
                className="transform rounded-xl bg-violet-500 py-4 text-lg font-bold text-white transition-all ease-in-out hover:scale-[1.01] active:scale-[.98] active:duration-75"
              >
                Đăng Nhập
              </button>
            </div>
          </form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LoginForm;
