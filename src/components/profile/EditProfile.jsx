import { Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
// import {
//   fetchGetMe,
//   fetchRefreshToken,
//   fetchUpdateMe,
//   getDistricts,
//   getProvinces,
//   getWards,
// } from "../../data/api";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = () => {
  const location = useLocation();
  const newAccount = location.state?.newAccount || false;
  const token = JSON.parse(localStorage.getItem("result"));
  const [isEditing, setIsEditing] = useState(newAccount);
  const [errorList, setErrorList] = useState([]);
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  });
  const date = new Date();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [dateInput, setDateInput] = useState(date);
  // const getMeProfile = async () => {
  //   await fetchGetMe(token)
  //     .then((res) => {
  //       console.log(res.data.result);
  //       setProfile({
  //         username: res.data.result.username || "",
  //         name: res.data.result.full_name || "",
  //         email: res.data.result.email || "",
  //         phone: res.data.result.phone || "",
  //         address: res.data.result.address || "",
  //         point: res.data.result.member_ship || 0,
  //         date_of_birth: res.data.result.date_of_birth || null,
  //       });
  //       if (res.data.result.date_of_birth !== null) {
  //         setDateInput(new Date(res.data.result.date_of_birth));
  //       }
  //     })
  //     .catch(async (error) => {
  //       if (error.response.status === 401) {
  //         await fetchRefreshToken(token)
  //           .then(async (res) => {
  //             localStorage.setItem("result", JSON.stringify(res.data.result));
  //             await getMeProfile();
  //           })
  //           .catch((error) => {
  //             if (error.response.status === 401) {
  //               localStorage.removeItem("user");
  //               localStorage.removeItem("result");
  //             }
  //           });
  //       }
  //     });
  // };

  // useEffect(() => {
  //   getMeProfile();
  // }, []);



  // useEffect(() => {
  //   const getProvince = async () => {
  //     try {
  //       const provinceList = await getProvinces();
  //       setProvinces(provinceList);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   getProvince();
  // }, []);

  // useEffect(() => {
  //   const getDistrict = async (id) => {
  //     try {
  //       const districtList = await getDistricts(id);
  //       setDistricts(districtList);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   getDistrict();
  // }, []);

  // useEffect(() => {
  //   const getWard = async () => {
  //     try {
  //       const wardList = await getWards();
  //       setWards(wardList);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   getWard();
  // }, []);

  const handlerChangeAddressInput = (event) => {
    setAddressInput(event.target.value);
  };
  const [selectedProvince, setSelectedProvince] = useState({
    id: "",
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });

  const handleProvinceSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    setSelectedProvince({ id, name });

    // setDistricts(await getDistricts(Number(id)));
  };

  const handleDistrictSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;

    setSelectedDistrict({ id, name });
    // setWards(await getWards(Number(id)));
  };

  const handleWardSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    setSelectedWard({ id, name });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const date_input = new Date(dateInput);
  //   const today = new Date();
  //   const age = today.getFullYear() - date_input.getFullYear();
  //   const monthDifference = today.getMonth() - date_input.getMonth();

  //   if (
  //     age < 13 ||
  //     (age === 13 && monthDifference < 0) ||
  //     (age === 13 &&
  //       monthDifference === 0 &&
  //       today.getDate() < date_input.getDate())
  //   ) {
  //     setErrorList(["Tuổi không hợp lệ"]);
  //     return;
  //   }

  //   const data = {
  //     username: profile.username,
  //     full_name: profile.name,
  //     phone: profile.phone,
  //     country: "Việt Nam",
  //     province: selectedProvince.name,
  //     district: selectedDistrict.name,
  //     ward: selectedWard.name,
  //     address: `${addressInput}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`,
  //     date_of_birth: date_input.toISOString(),
  //   };

  //   await fetchUpdateMe(token, data)
  //     .then(() => {
  //       toast.success("Cập nhật thành công", {
  //         position: "top-center",
  //       });
  //       setIsEditing(false);
  //       getMeProfile();
  //       const user = JSON.parse(localStorage.getItem("user")) || {};
  //       const updatedUser = {
  //         ...user,
  //         username: data.username,
  //         full_name: data.full_name,
  //         phone: data.phone,
  //         country: "Việt Nam",
  //         province: data.province,
  //         district: data.district,
  //         ward: data.ward,
  //         address: data.address,
  //         date_of_birth: data.date_of_birth,
  //       };
  //       localStorage.setItem("user", JSON.stringify(updatedUser));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       let errorList = [];
  //       for (let value of Object.values(error.response.data.errors)) {
  //         errorList.push(value);
  //         setErrorList(errorList);
  //       }
  //     });
  //  };

  return (
    <>
      <Toaster />
      {isEditing ? (
        <>
          <h1 className="text-2xl font-semibold">
            Chỉnh sửa thông tin tài khoản
          </h1>
          <div>
            <form className="space-y-4 my-4 px-8" onSubmit={handleSubmit}>
              <div className="w-full mx-auto flex gap-10">
                <div className="w-1/3">
                  <label className="block text-gray-700">Tên đăng nhập: </label>
                  <input
                    type="text"
                    name="username"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Nhập tên đăng nhập..."
                    value={profile.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-gray-700">Họ và Tên: </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Nhập họ và tên..."
                    value={profile.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-gray-700">Số điện thoại: </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="phone"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="Nhập số điện thoại..."
                      value={profile.phone}
                      pattern="^0[0-9]{2}[0-9]{3}[0-9]{4}"
                      maxLength={10}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-8 my-5">
                  <div className="w-1/3">
                    <label
                      htmlFor="select-city-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Thành phố
                    </label>
                    <select
                      id="select-city-input-3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      onChange={handleProvinceSelect}
                      required
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/3">
                    <label
                      htmlFor="select-city-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quận/Huyện*
                    </label>
                    <select
                      id="select-city-input-3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      onChange={handleDistrictSelect}
                      required
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/3">
                    <label
                      htmlFor="select-city-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phường/Xã
                    </label>
                    <select
                      id="select-city-input-3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      onChange={handleWardSelect}
                      required
                    >
                      <option value="">Chọn Phường/Xã</option>
                      {wards.map((ward) => (
                        <option key={ward.id} value={ward.id}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto gap-10 flex my-5">
                <div className="w-1/2">
                  <label
                    htmlFor="company_name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Số nhà, đường{" "}
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Địa chỉ nhà..."
                    value={addressInput}
                    onChange={handlerChangeAddressInput}
                    required
                  />
                </div>
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
              <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-1/2 py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                >
                  Hủy thay đổi
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">Tổng quan</h1>
          <hr className="my-3" />
          <div className="w-full mx-auto">
            <div className="w-full grid grid-cols-4">
              <div>
                <p className="text-lg">Tên đăng nhập</p>
                <p className="text-lg font-semibold">{profile.username}</p>
              </div>
              <div>
                <p className="text-lg">Email</p>
                <p className="text-lg font-semibold">{profile.email}</p>
              </div>
              <div>
                <p className="text-lg">Họ và tên</p>
                <p className="text-lg font-semibold">{profile.name}</p>
              </div>
              <div>
                <p className="text-lg">Nhóm khách hàng</p>
                <p className="text-lg font-semibold">Member</p>
              </div>
              <div>
                <p className="text-lg">Đã tích lũy</p>
                <p className="text-lg font-semibold">
                  {Number(profile.point).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-lg">Địa chỉ: </p>
                <p className="text-lg font-semibold">{profile.address}</p>
              </div>
            </div>
            <hr className="my-4" />
            <form>
              <button
                onClick={() => setIsEditing(true)}
                className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md"
              >
                Chỉnh sửa
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
