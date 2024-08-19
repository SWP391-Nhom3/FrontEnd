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
import { fetchMyProfile, fetchUpdateProfile, getDistricts, getProvinces, getWards } from "../../data/api";

const EditProfile = () => {
  const location = useLocation();
  const newAccount = location.state?.newAccount || false;
  const token = localStorage.getItem("accessToken");
  const [isEditing, setIsEditing] = useState(newAccount);
  const [errorList, setErrorList] = useState([]);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    point: 2,
    address: "",
    dob: null,
  });
  const date = new Date();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [dateInput, setDateInput] = useState(date);

  const getMeProfile = async () => {
    await fetchMyProfile(token)
      .then((res) => {
        console.log("rewqrqwerqwe",res.data.data);
        setProfile({
          firstName: res.data.data.firstName || "",
          lastName: res.data.data.lastName || "",
          dob: res.data.data.dob || null,
          address: res.data.data.address || "",
          phone: res.data.data.phone || "",
          email: res.data.data.email || "",
          point: res.data.data.point !== undefined && res.data.data.point !== null ? res.data.data.point : 1,
        });
        if (res.data.data.dob !== null) {
          setDateInput(new Date(res.data.data.dob));
        }
      })
      .catch(async (error) => {
        console.log(error);
      });
  };

  console.log("sdfasdfasdfdasfsd",profile);
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

  useEffect(() => {
    getMeProfile();
  }, []);

  const formatDate = (dateObject) => {
    if (dateObject !== null) {
      const date = new Date(dateObject);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    return "Chưa có ngày sinh";
  };

  useEffect(() => {
    const getProvince = async () => {
      try {
        const provinceList = await getProvinces();
        setProvinces(provinceList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProvince();
  }, []);

  useEffect(() => {
    const getDistrict = async (id) => {
      try {
        const districtList = await getDistricts(id);
        setDistricts(districtList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getDistrict();
  }, []);

  useEffect(() => {
    const getWard = async () => {
      try {
        const wardList = await getWards();
        setWards(wardList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getWard();
  }, []);

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

    setDistricts(await getDistricts(Number(id)));
  };

  const handleDistrictSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;

    setSelectedDistrict({ id, name });
    setWards(await getWards(Number(id)));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date_input = new Date(dateInput);
    const today = new Date();
    const age = today.getFullYear() - date_input.getFullYear();
    const monthDifference = today.getMonth() - date_input.getMonth();

    if (
      age < 13 ||
      (age === 13 && monthDifference < 0) ||
      (age === 13 &&
        monthDifference === 0 &&
        today.getDate() < date_input.getDate())
    ) {
      setErrorList(["Tuổi không hợp lệ"]);
      return;
    }

    const data = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      address: `${addressInput}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`,
      dob: date_input.toISOString(),
    };

    await fetchUpdateProfile(data, token)
      .then(() => {
        toast.success("Cập nhật thành công", {
          position: "top-center",
        });
        setIsEditing(false);
        getMeProfile();
        const user = JSON.parse(localStorage.getItem("user")) || {};
        const updatedUser = {
          ...user,
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          address: data.address,
          phone: data.phone
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((error) => {
        console.log(error);
        let errorList = [];
        for (let value of Object.values(error.response.data.errors)) {
          errorList.push(value);
          setErrorList(errorList);
        }
      });
  };

  return (
    <>
      <Toaster />
      {isEditing ? (
        <>
          <h1 className="text-2xl font-semibold">
            Chỉnh sửa thông tin tài khoản
          </h1>
          <div>
            <form className="my-4 space-y-4 px-8" onSubmit={handleSubmit}>
              <div className="mx-auto flex w-full gap-10">
                <div className="w-1/3">
                  <label className="block text-gray-700">Họ: </label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Nhập họ..."
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-gray-700">Tên: </label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Nhập tên..."
                    value={profile.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-gray-700">Số điện thoại: </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="phone"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div className="my-5 flex items-center gap-8">
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
              <div className="mx-auto my-5 flex w-full gap-10">
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
                  <div className="w-1/2">
                    <label className="block text-gray-700">Ngày sinh: </label>
                    <Datepicker
                      language="vi"
                      defaultDate={dateInput}
                      onSelectedDateChanged={(date) => setDateInput(date)}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* {errorList.length > 0 && (
                <div className="error-list mb-3 mt-3">
                  {errorList.map((error, index) => (
                    <p key={index} className="text-red-600">
                      {error}
                    </p>
                  ))}
                </div>
              )} */}
              <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-1/2 rounded-md bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
                >
                  Hủy thay đổi
                </button>
                <button
                  type="submit"
                  className="w-1/2 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
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
          <div className="mx-auto w-full">
            <div className="grid w-full grid-cols-4">
              <div>
                <p className="text-lg">Họ</p>
                <p className="text-lg font-semibold">{profile.firstName}</p>
              </div>
              <div>
                <p className="text-lg">Email</p>
                <p className="text-lg font-semibold">{profile.email}</p>
              </div>
              <div>
                <p className="text-lg">Tên</p>
                <p className="text-lg font-semibold">{profile.lastName}</p>
              </div>
              <div>
                <p className="text-lg">Nhóm khách hàng</p>
                <p className="text-lg font-semibold">Member</p>
              </div>
              <div>
                <p className="text-lg">Đã tích lũy</p>
                <p className="text-lg font-semibold"> {profile.point} điểm
                  {/* {Number(profile.point).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })} */}
                </p>
              </div>
              <div>
                <p className="text-lg">Ngày sinh</p>
                <p className="text-lg font-semibold">
                  {formatDate(profile.dob)}
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
                className="rounded-md bg-blue-500 px-4 py-2 font-bold text-white"
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
