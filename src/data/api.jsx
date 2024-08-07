import axios from "axios";

const SCHEMA_HOSTNAME = import.meta.env.VITE_SCHEMA_HOSTNAME;

//fetchChangePassword
export const fetchChangePassword = async (token, data) => {
  return await axios.patch(
    `${SCHEMA_HOSTNAME}/users/change-password`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  );
};

//fetchRefreshToken
export const fetchRefreshToken = async (token) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/users/refresh-token`, {
    refresh_token: token.refresh_token,
  });
};

//fetchUpdateMe
export const fetchUpdateMe = async (token, data) => {
  return await axios.patch(
    `${SCHEMA_HOSTNAME}/users/me`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  );
};

//fetchGetMe
export const fetchGetMe = async (token) => {
  return await axios.get(`${SCHEMA_HOSTNAME}/users/me`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
};

//fetchGetAllVoucher
export const fetchGetAllVoucher = async () => {
  return await axios.get(`${SCHEMA_HOSTNAME}/vouchers/all-vouchers`);
};

//fetchGetVoucher
export const fetchGetVoucher = async (voucherCode) => {
  return await axios.get(`${SCHEMA_HOSTNAME}/vouchers/voucher/${voucherCode}`);
};

//reset-pssword:
export const fetchResetPassword = async (
  user_id,
  digit,
  password,
  confirm_password,
) => {
  return await axios.post(
    `${SCHEMA_HOSTNAME}/users/reset-password`,
    {
      password,
      confirm_password,
    },
    {
      params: {
        user_id: user_id,
        digit: digit,
      },
    },
  );
};

//registter
export const fetchRegister = async ({
  username,
  email,
  password,
  confirm_password,
}) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/users/register`, {
    username,
    email,
    password,
    confirm_password,
  });
};

//login

export const fetchLogin = async ({ email, password }) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/users/login`, {
    email,
    password,
  });
};

//OTP:
export const fetchOtp = async ({
  user_id,
  digit,
  email,
  key,
  navigateTo,
  result,
}) => {
  const apiList = [
    {
      navigateTo: "/profile",
      methodHander: "get",
      handlerOtp: `${SCHEMA_HOSTNAME}/users/verify-email`,
      methodResend: "post",
      handlerResendOtp: `${SCHEMA_HOSTNAME}/users/resend-verify-email`,
      data: {
        headers: {
          Authorization: `Bearer ${result === null ? "" : result.access_token}`,
        },
      },
    },
    {
      navigateTo: "/reset-password",
      methodHander: "get",
      handlerOtp: `${SCHEMA_HOSTNAME}/users/verify-forgot-password`,
      methodResend: "post",
      handlerResendOtp: `${SCHEMA_HOSTNAME}/users/forgot-password`,
      data: {
        headers: {
          Authorization: `Bearer ${result === null ? "" : result.access_token}`,
        },
      },
    },
  ];

  const apiFormValue = {
    methodHander: "",
    handlerOtp: "",
    methodResend: "",
    handlerResendOtp: "",
    data: {},
  };

  apiList.find((item) => {
    if (item.navigateTo === navigateTo) {
      apiFormValue.methodHander = item.methodHander;
      apiFormValue.handlerOtp = item.handlerOtp;
      apiFormValue.methodResend = item.methodResend;
      apiFormValue.handlerResendOtp = item.handlerResendOtp;
      apiFormValue.data = item.data;
    }
  });

  if (key === "resend") {
    return await axios({
      method: apiFormValue.methodResend,
      url: apiFormValue.handlerResendOtp,
      body: { email },
      ...apiFormValue.data,
    });
  } else {
    return await axios({
      method: apiFormValue.methodHander,
      url: apiFormValue.handlerOtp,
      params: { user_id, digit: digit },
    });
  }
};

//fortgot password

export const fetchForgotPassword = async ({ email }) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/users/forgot-password`, {
    email,
  });
};

//logout
export const fetchLogout = async (result) => {
  await axios.post(
    `${SCHEMA_HOSTNAME}/users/logout`,
    {
      refresh_token: result.refresh_token,
    },
    {
      headers: {
        Authorization: `Bearer ${result.access_token}`,
      },
    },
  );
};

//order
export const fetchCreateOrder = async (order_infor) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/orders/upload`, order_infor);
};

export const fetchOrder = async (user_id) => {
  try {
    const res = await axios.post(`${SCHEMA_HOSTNAME}/orders/get-orderforuser`, {
      user_id,
    });
    return res.data.result;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${SCHEMA_HOSTNAME}/products/all-products`);
    return res.data.result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
//getOrderbyId
export const fetchGetOrderById = async (id) => {
  return await axios.get(`${SCHEMA_HOSTNAME}/orders/get-order/${id}`);
};

//categori

export const fetchCategories = async () => {
  return await axios.get(`${SCHEMA_HOSTNAME}/categories/all-categories`);
};

export const displayProducts = async (page, limit) => {
  try {
    const res = await axios.get(
      `${SCHEMA_HOSTNAME}/products/all-products-page`,
      {
        params: {
          page: page,
          limit: limit,
        },
      },
    );
    return res.data.result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

//feedback:
//upload:
export const fetchUploadFeedback = async (feedback, token) => {
  return await axios.post(
    `${SCHEMA_HOSTNAME}/feedbacks/feedback/upload`,
    { ...feedback },
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  );
};
//getFeedback by id:
export const fetchGetFeedbackById = async (id) => {
  return await axios.get(`${SCHEMA_HOSTNAME}/feedbacks/product/${id}`);
};
//getfeedback by user:
export const fetchGetFeedbackByUser = async (id) => {
  return await axios.get(`${SCHEMA_HOSTNAME}/feedbacks/user/${id}`);
};
//update:
export const fetchUpdateFeedback = async (id, feedback, token) => {
  return await axios.post(
    `${SCHEMA_HOSTNAME}/feedbacks/feedback/${id}`,
    {
      ...feedback,
    },
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  );
};
//delete:
export const fetchDeleteFeedback = async (id, token) => {
  return await axios.delete(
    `${SCHEMA_HOSTNAME}/feedbacks/feedback/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  );
};
//news:
//getallnews:
export const fetchGetAllNews = async () => {
  return await axios.get(`${SCHEMA_HOSTNAME}/news/all-news`);
};

//todo API province

const baseUrl = "https://open.oapi.vn/location";

class Http {
  // get:
  async get(url) {
    console.log(url);
    const response = await fetch(url);
    if (response.ok) {
      console.log(url);
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  }
}
// class Storage()
class Store {
  constructor() {
    this.http = new Http();
  }
  //getProvince() : lấy  nhiều tp theo code
  async getProvince() {
    try {
      const provinces = await this.http.get(`${baseUrl}/provinces?&size=64`);

      return provinces.data;
    } catch (error) {
      console.log(error);
    }
  }

  //lấy danh sách các quận dựa vào provinceCode
  async getDistrictByProvinceCode(provinceCode = 1) {
    try {
      const districts = await this.http.get(
        `${baseUrl}/districts?provinceId=${provinceCode}&size=705 `,
      );
      return districts.data;
    } catch (error) {
      console.log(error);
    }
  }
  //lấy danh sách các huyện phường dựa vào districtCode
  async getWardByDistrictCode(districtCode = 271) {
    try {
      const wards = await this.http.get(
        `${baseUrl}/wards?districtId=${districtCode}&size=10603`,
      );

      return wards.data;
    } catch (error) {
      console.log(error);
    }
  }
}
const store = new Store();
export const getProvinces = async () => {
  const provinces = await store.getProvince();
  return provinces;
};

export const getDistricts = async (id) => {
  const districts = await store.getDistrictByProvinceCode(id);
  return districts;
};
export const getWards = async (id) => {
  const wards = await store.getWardByDistrictCode(id);
  return wards;
};

export const checkQRPaymet = async (content, price) => {
  try {
    const response = await axios.get(
      "https://script.google.com/macros/s/AKfycbz-C6H0trt5-1XR9RkmneIztfnP4raYUD_0Os-Qjwjyblx1xVCrzwCkuSJqj_LkUtVf/exec",
    );

    const data = response.data.data;
    const lastPaid = data[data.length - 1];
    const lastContent = lastPaid["Mô tả"];
    const lastPrice = lastPaid["Giá trị"];
    if (lastPrice === price && lastContent.includes(content)) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await axios.post(`${SCHEMA_HOSTNAME}/orders/delete`, {
      order_id: id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
