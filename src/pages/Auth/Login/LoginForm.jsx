import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkToGoogle from "../Google/LinkToGoogle";
// import { fetchLogin } from "../../../data/api.jsx";
import { toast, Toaster } from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: sessionStorage.getItem("email") || "",
    password: sessionStorage.getItem("password") || "",
  });
  useEffect(() => {
    document.title = "Login";
  }, []);
  const mockUsers = [
    {
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      redirectPath: "/dashboard",
    },
    {
      email: "user@example.com",
      password: "user123",
      role: "user",
      redirectPath: "/",
    },
  ];
  const [errorList, setErrorList] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);

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
    const user = mockUsers.find(
      (user) => user.email === email && user.password === password,
    );

    if (user) {
      // Kiểm tra nếu người dùng là admin thì chuyển hướng đến dashboard
      if (user.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/"); // Hoặc trang dành cho người dùng thông thường
      }
      toast.success("Đăng nhập thành công!");
    } else {
      toast.error("Email hoặc mật khẩu không chính xác!");
    }
    // await fetchLogin({
    //   email,
    //   password,
    // })
    //   .then((res) => {
    //     const user = res.data.user;
    //     localStorage.setItem("user", JSON.stringify(user));
    //     localStorage.setItem("result", JSON.stringify(res.data.result));

    //     if (user.verify === 0) {
    //       toast.error("Vui lòng xác nhận email!", {
    //         duration: 5000,
    //       });
    //       navigate("/otp", {
    //         state: {
    //           navigateTo: "/profile",
    //           email: user.email,
    //           user_id: user._id,
    //         },
    //       });
    //       return;
    //     }
    //     if (rememberMe) {
    //       sessionStorage.setItem("email", email);
    //       sessionStorage.setItem("password", password);
    //     } else {
    //       sessionStorage.removeItem("email");
    //       sessionStorage.removeItem("password");
    //     }

    //     toast.success("Đăng nhập thành công!", {
    //       duration: 2000,
    //     });
    //     navigate("/");
    //     window.scrollTo(0, 0);
    //   })
    //   .catch((error) => {
    //     let errorList = [];
    //     for (let [, value] of Object.entries(error.response.data.errors)) {
    //       errorList.push(value);
    //       setErrorList(errorList);
    //     }
    //     toast.error("Có lỗi xảy ra, vui lòng thử lại!", {
    //       position: "top-right",
    //       duration: 3000,
    //     });
    //   });
  };

  return (
    <div className="w-full rounded-3xl border-2 border-solid border-[rgba(0,0,0,0.1)] px-10 py-12 shadow-2xl">
      <Toaster />
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="mt-4 text-lg font-medium text-gray-500">
        Vui lòng điền thông tin của bạn!
      </p>
      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Địa Chỉ Email</label>
            <input
              className="mt-1 w-full rounded-xl border-2 border-[rgba(0,0,0,0.2)] bg-transparent p-4"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              type={"email"}
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
              type={"password"}
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
              <label className="ml-2 text-base font-medium" htmlFor="remember">
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

            <div>
              <LinkToGoogle headline="Đăng Nhập Bằng Google" />
            </div>
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
      </div>
    </div>
  );
};

export default LoginForm;
