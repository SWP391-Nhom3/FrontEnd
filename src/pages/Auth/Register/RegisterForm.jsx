import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkToGoogle from "../Google/LinkToGoogle";
// import { fetchRegister } from "../../../data/api.jsx";
import { toast } from "react-hot-toast";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
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
    event.preventDefault();

    const { username, email, password, confirm_password } = formValues;
    // await fetchRegister({
    //   username,
    //   email,
    //   password,
    //   confirm_password,
    // })
    //   .then((res) => {
    //     toast.success(`${res.data.message}`);
    //     localStorage.setItem("user", JSON.stringify(res.data.user));
    //     localStorage.setItem("result", JSON.stringify(res.data.result));
    //     navigate("/otp", {
    //       state: { navigateTo: "/profile", email, user_id: res.data.user._id },
    //     });
    //   })
    //   .catch((error) => {
    //     toast.error("Có lỗi xảy ra khi đăng ký.");
    //     let errorList = [];
    //     for (let value of Object.values(error.response.data.errors)) {
    //       errorList.push(value);
    //       setErrorList(errorList);
    //     }
    //   });
  };

  return (
    <div className="w-full rounded-3xl border-2 border-solid border-[rgba(0,0,0,0.1)] px-10 py-12 shadow-2xl">
      <h1 className="text-5xl font-semibold">Welcome</h1>
      <p className="mt-4 text-lg font-medium text-gray-500">
        Vui lòng điền thông tin của bạn!
      </p>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="flex w-full gap-3">
          <div className="flex w-1/3 flex-col">
            <label className="text-lg font-medium">Tên Tài Khoản</label>
            <input
              className="mt-1 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)] bg-transparent p-4"
              placeholder="Nhập tên tài khoản..."
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex w-2/3 flex-col">
            <label className="text-lg font-medium">Địa Chỉ Email</label>
            <input
              className="mt-1 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)] bg-transparent p-4"
              placeholder="Nhập email..."
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <label className="text-lg font-medium">Mật Khẩu</label>
          <input
            className="mt-1 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)] bg-transparent p-4"
            placeholder="Nhập mật khẩu..."
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            type="password"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <label className="text-lg font-medium">Nhập Lại Mật Khẩu</label>
          <input
            className="mt-1 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)] bg-transparent p-4"
            placeholder="Nhập lại mật khẩu..."
            id="confirm_password"
            name="confirm_password"
            value={formValues.confirm_password}
            onChange={handleChange}
            type="password"
          />
        </div>
        {/* hien loi */}
        {errorList.length > 0 && (
          <div className="error-list mt-3">
            {errorList.map((error, index) => (
              <p key={index} className="text-danger">
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
            Đăng Ký
          </button>
          <div>
            <LinkToGoogle headline="Đăng Ký Bằng Google" />
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <p className="text-base font-medium">Bạn đã có tài khoản?</p>
          <a
            href="/login"
            className="ml-2 text-base font-medium text-violet-500"
          >
            Đăng Nhập
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
