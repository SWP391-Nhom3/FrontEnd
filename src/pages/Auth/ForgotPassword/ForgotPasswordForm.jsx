import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const ForgotPasswordForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [errorList, setErrorList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //!! Fetch forgot password ở đây !!
  const handleSubmit = async (event) => {
    /* event.preventDefault();
    const { email } = formValues;
    await fetchForgotPassword({ email })
      .then((res) => {
        console.log(res.data);
        toast.success(`${res.data.message}`, {
          position: "top-right",
        });
        navigate("/otp", { state: { navigateTo: "/reset-password", email, user_id: res.data.user_id } });
      })
      .catch((error) => {
        let errorList = [];
        for (let [key, value] of Object.entries(error.response.data.errors)) {
          errorList.push(value);
          setErrorList(errorList);
        }
        toast.error("Có lỗi xảy ra, vui lòng thử lại!", {
          position: "top-right",
        });
      });*/
  };

  return (
    <div className="w-full rounded-3xl border-2 border-solid border-[rgba(0,0,0,0.1)] px-10 py-12 shadow-2xl">
      <Toaster />
      <p className="mt-4 text-2xl font-medium text-gray-500">
        Vui lòng kiểm tra mail sau khi xác nhận!
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
              placeholder="Nhập email..."
            />
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              className="transform rounded-xl bg-violet-500 py-4 text-lg font-bold text-white transition-all ease-in-out hover:scale-[1.01] active:scale-[.98] active:duration-75"
            >
              Xác Nhận
            </button>
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
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
