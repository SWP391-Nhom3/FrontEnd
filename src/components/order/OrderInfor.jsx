import { useEffect, useState } from "react";
import { getProvinces, getDistricts, getWards } from "../../data/api.jsx";
import { Link, useNavigate } from "react-router-dom";

const OrderInfor = ({ discount, ship, voucherCode }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({
    id: "",
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });
  const [useSavedInfo, setUseSavedInfo] = useState(false);
  const [isUserInfoAvailable, setIsUserInfoAvailable] = useState(false);

  useEffect(() => {
    const getProvince = async () => {
      try {
        const provinceList = await getProvinces();
        setProvinces(provinceList);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    getProvince();
  }, []);

  useEffect(() => {
    if (selectedProvince.id) {
      const getDistrict = async () => {
        try {
          const districtList = await getDistricts(selectedProvince.id);
          setDistricts(districtList);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };

      getDistrict();
    }
  }, [selectedProvince.id]);

  useEffect(() => {
    if (selectedDistrict.id) {
      const getWard = async () => {
        try {
          const wardList = await getWards(selectedDistrict.id);
          setWards(wardList);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      };

      getWard();
    }
  }, [selectedDistrict.id]);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (
        user.full_name &&
        user.email &&
        user.phone &&
        user.province &&
        user.district &&
        user.ward &&
        user.address
      ) {
        setIsUserInfoAvailable(true);
      }
    }
  }, []);

  const handleProvinceSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    setSelectedProvince({ id, name });

    const districtList = await getDistricts(Number(id));
    setDistricts(districtList);
    setSelectedDistrict({ id: "", name: "" });
    setWards([]);
    setSelectedWard({ id: "", name: "" });
  };

  const handleDistrictSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;

    setSelectedDistrict({ id, name });
    const wardList = await getWards(Number(id));
    setWards(wardList);
    setSelectedWard({ id: "", name: "" });
  };

  const handleWardSelect = (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    setSelectedWard({ id, name });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const customer_infor = {
      full_name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      address: useSavedInfo
        ? formValues.address
        : formValues.address +
          ", " +
          selectedWard.name +
          ", " +
          selectedDistrict.name +
          ", " +
          selectedProvince.name,
    };

    navigate("/payment", {
      state: { customer_infor, discount, ship, voucherCode },
    });
  };

  const handleCheckboxChange = (event) => {
    setUseSavedInfo(event.target.checked);
    if (event.target.checked) {
      const userInfo = localStorage.getItem("user");
      if (userInfo) {
        const user = JSON.parse(userInfo);
        setFormValues({
          name: user.full_name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        });
        setSelectedProvince({
          id: user.province_id,
          name: user.province,
        });
        setSelectedDistrict({
          id: user.district_id,
          name: user.district,
        });
        setSelectedWard({
          id: user.ward_id,
          name: user.ward,
        });

        getDistricts(user.province_id).then(setDistricts);
        getWards(user.district_id).then(setWards);
      }
    } else {
      setFormValues({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      setSelectedProvince({ id: "", name: "" });
      setSelectedDistrict({ id: "", name: "" });
      setSelectedWard({ id: "", name: "" });
    }
  };

  return (
    <>
      <ol className="flex w-full items-center justify-center px-24 text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="flex w-full items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Giỏ Hàng
          </span>
        </li>
        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="flex w-full items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Thông Tin
          </span>
        </li>
        <li className="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="flex w-full items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Thanh Toán
          </span>
        </li>
        <li className="flex shrink-0 items-center">
          <svg
            className="me-2 h-4 w-4 sm:h-5 sm:w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Hoàn Thành
        </li>
      </ol>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-screen-xl 2xl:px-0"
        >
          <div className="mx-52 my-5 rounded-xl border-4 border-[rgba(0,0,0,0.1)] px-10 pb-10 shadow-primary-800 dark:border-gray-700">
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
              <div className="min-w-0 flex-1 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Thông Tin Khách Hàng
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="full_name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Họ và Tên{" "}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Nhập họ và tên..."
                        value={formValues.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Địa Chỉ Email{" "}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Nhập địa chỉ email...."
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex flex-wrap gap-4">
                        {useSavedInfo ? (
                          <>
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <label
                                  htmlFor="province"
                                  className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Thành phố
                                </label>
                              </div>
                              <input
                                type="text"
                                id="province"
                                name="province"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                value={selectedProvince.name}
                                disabled
                              />
                            </div>
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <label
                                  htmlFor="district"
                                  className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Quận/Huyện*
                                </label>
                              </div>
                              <input
                                type="text"
                                id="district"
                                name="district"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                value={selectedDistrict.name}
                                disabled
                              />
                            </div>
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <label
                                  htmlFor="ward"
                                  className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Phường/Xã
                                </label>
                              </div>
                              <input
                                type="text"
                                id="ward"
                                name="ward"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                value={selectedWard.name}
                                disabled
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <label
                                  htmlFor="select-city-input-3"
                                  className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Thành phố
                                </label>
                              </div>
                              <select
                                id="select-city-input-3"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                onChange={handleProvinceSelect}
                                value={selectedProvince.id}
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
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <label
                                  htmlFor="select-city-input-3"
                                  className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Quận/Huyện*
                                </label>
                              </div>
                              <select
                                id="select-city-input-3"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                onChange={handleDistrictSelect}
                                value={selectedDistrict.id}
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
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <label
                                  htmlFor="select-city-input-3"
                                  className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Phường/Xã
                                </label>
                              </div>
                              <select
                                id="select-city-input-3"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                onChange={handleWardSelect}
                                value={selectedWard.id}
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
                          </>
                        )}
                      </div>
                    </div>
                    <div>
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
                        value={formValues.address}
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Địa chỉ nhà..."
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Số điện thoại{" "}
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Nhập số điện thoại..."
                        pattern="^0[0-9]{2}[0-9]{3}[0-9]{4}"
                        maxLength={10}
                        required
                      />
                    </div>
                    {isUserInfoAvailable && (
                      <div className="sm:col-span-2">
                        <label className="mb-3 flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={useSavedInfo}
                            onChange={handleCheckboxChange}
                            className="form-tick h-6 w-6 appearance-none rounded-md border border-gray-300 checked:border-transparent checked:bg-blue-600 focus:outline-none"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            Sử dụng thông tin đã lưu từ tài khoản
                          </span>
                        </label>
                      </div>
                    )}
                    <div className="space-y-3 sm:col-span-2">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Thanh Toán
                      </button>
                      <p className="text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                        Đăng nhập hoặc đăng ký để nhập được những ưu đãi.{" "}
                        <Link
                          to={"/login"}
                          title=""
                          className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                        >
                          Đăng nhập hoặc tạo tài khoản ngay bây giờ!
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default OrderInfor;
