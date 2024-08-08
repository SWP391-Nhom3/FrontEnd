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
    <div className="w-full px-10 py-12 rounded-3xl border-solid border-2 border-[rgba(0,0,0,0.1)] shadow-2xl">
      <Toaster />
      <p className="font-medium text-2xl text-gray-500 mt-4">
        Vui lòng kiểm tra mail sau khi xác nhận!
      </p>
      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Địa Chỉ Email</label>
            <input
              className="w-full border-2 rounded-xl p-4 mt-1 bg-transparent border-[rgba(0,0,0,0.2)]"
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
              className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
            >
              Xác Nhận
            </button>
          </div>
          {errorList.length > 0 && (
            <div className="error-list mt-3 mb-3">
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
