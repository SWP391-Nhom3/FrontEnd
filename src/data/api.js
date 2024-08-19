import axios from "axios";

const HOSTNAME = "http://localhost:8080/api";

//login api
export const fetchLogin = async (email, password) => {
  return await axios.post(`${HOSTNAME}/auth/login`, {
    email,
    password,
  });
};

// export const fetchRefreshToken = async (token) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await axios.post(`${HOSTNAME}/auth/refresh`, {
//       token: token,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

//register api
export const fetchRegister = async ({ email, password }) => {
  return await axios.post(`${HOSTNAME}/auth/register`, {
    email,
    password,
  });
};

//get my profile api
export const fetchMyProfile = async (token) => {
  return await axios.get(`${HOSTNAME}/users/myInfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//update my profile api
export const fetchUpdateProfile = async (data, token) => {
  return await axios.put(`${HOSTNAME}/users`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//get all category api
export const fetchCategories = async () => {
  return await axios.get(`${HOSTNAME}/categories`);
};

//get all brand api
export const fetchBrands = async () => {
  return await axios.get(`${HOSTNAME}/brands`);
};

//create product api
export const fetchUploadProduct = async (product, token) => {
  const formData = new FormData();
  Object.keys(product).forEach((key) => {
    if (key === "files" && Array.isArray(product[key])) {
      product[key].forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append(key, product[key]);
    }
  });
  try {
    return await axios.post(`${HOSTNAME}/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error uploading product:", error);
    throw error;
  }
};

//get all product api
export const fetchProducts = async () => {
  return await axios.get(`${HOSTNAME}/products`);
};

//get product by id api
export const fetchProductsById = async (id) => {
  return await axios.get(`${HOSTNAME}/products/${id}`);
};

//change status product api
export const fetchChangeProductStatus = async (id) => {
  return await axios.patch(`${HOSTNAME}/products/${id}/status`);
};

//update product api
export const fetchUpdateProduct = async (product, token, id) => {
  const formData = new FormData();
  Object.keys(product).forEach((key) => {
    if (key === "files" && Array.isArray(product[key])) {
      product[key].forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append(key, product[key]);
    }
  });
  try {
    return await axios.put(`${HOSTNAME}/products/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error uploading product:", error);
    throw error;
  }
};

//create product batch api
export const fetchAddProductBatch = async (batch, token) => {
  return await axios.post(`${HOSTNAME}/batches`, batch, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchOrdersByOrderId = async (orderId) => {
  return await axios.get(`${HOSTNAME}/orders/${orderId}`);
};
//get all product batch api
export const fetchProductBatches = async () => {
  return await axios.get(`${HOSTNAME}/batches`);
};

//create order api
export const fetchCreateOrder = async (order) => {
  return await axios.post(`${HOSTNAME}/orders`, order, {});
};

//create preorder api
export const fetchCreatePreOrder = async (order) => {
  return await axios.post(`${HOSTNAME}/orders/pre-order`, order, {});
};

//get all order api
export const fetchOrders = async () => {
  return await axios.get(`${HOSTNAME}/orders`);
};

//cancel order api
export const fetchCancelOrder = async (id) => {
  return await axios.put(`${HOSTNAME}/orders/cancel/${id}`);
};

//confirm order api
export const fetchConfirmOrder = async (id) => {
  return await axios.put(`${HOSTNAME}/orders/confirm/${id}`);
};

//shipping status order api
export const fetchShippingOrder = async (id) => {
  return await axios.put(`${HOSTNAME}/orders/shipping/${id}`);
};

//cancel shipping status order api
export const fetchCancelShippingOrder = async (id) => {
  return await axios.put(`${HOSTNAME}/orders/cancel-shipping/${id}`);
};

// // eslint-disable-next-line no-undef
// const SCHEMA_HOSTNAME = process.env.REACT_APP_SCHEMA_HOSTNAME;

// //fetchDeleteNews
// export const fetchDeleteNews = async (id, token) => {
//   return await axios.delete(`${SCHEMA_HOSTNAME}/news/delete/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token.access_token}`,
//     },
//   });
// };

// //fetchUpdateNews
// export const fetchUpdateNews = async (data, token, id) => {
//   return await axios.patch(
//     `${SCHEMA_HOSTNAME}/news/update/${id}`,
//     { ...data },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

// //fetchNewsByID
// export const fetchNewsByID = async (id) => {
//   return await axios.get(`${SCHEMA_HOSTNAME}/news/news/${id}`);
// };

// //fetchUploadNews
// export const fetchUploadNews = async (data, token) => {
//   return await axios.post(
//     `${SCHEMA_HOSTNAME}/news/upload`,
//     { ...data },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

// //fetchUploadFeedback
// export const fetchUploadFeedback = async (feedback, token) => {
//   return await axios.post(
//     `${SCHEMA_HOSTNAME}/feedbacks/reply/upload`,
//     { ...feedback },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

// //fetchRefreshToken
// export const fetchRefreshToken = async (token) => {
//   return await axios.post(`${SCHEMA_HOSTNAME}/users/refresh-token`, {
//     refresh_token: token.refresh_token,
//   });
// };

// //fetchUploadVoucher
// export const fetchUploadVoucher = async (data, token) => {
//   return await axios.post(
//     `${SCHEMA_HOSTNAME}/vouchers/upload`,
//     { ...data },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

// export const fetchAllNews = async () => {
//   try {
//     const res = await axios.get(`${SCHEMA_HOSTNAME}/news/all-news`);
//     return res.data.result;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };

// //fetchGetVoucherType
// export const fetchGetVoucherType = async () => {
//   return await axios.get(`${SCHEMA_HOSTNAME}/vouchers/get-voucher-type`);
// };

// //fetchConfirmOrder
// export const fetchConfirmOrder = async (order_id, token) => {
//   return await axios.post(
//     `http://localhost:4000/orders/status-order`,
//     {
//       order_id: order_id,
//       status: "Processing",
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

// //fetchCancelOrder
// export const fetchCancelOrder = async (order_id, token) => {
//   return await axios.post(
//     `http://localhost:4000/orders/status-order`,
//     {
//       order_id: order_id,
//       status: "Cancel",
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

// //get-prodduct
// export const fetchProductById = async (id) => {
//   return fetch(`${SCHEMA_HOSTNAME}/products/product/${id}`);
// };

// //get-all-brand
// export const fetchBrandStaff = async () => {
//   return fetch(`${SCHEMA_HOSTNAME}/brands/all-brands`);
// };

// //get-categories
// export const fetchCategories = async () => {
//   return fetch(`${SCHEMA_HOSTNAME}/categories/all-categories`);
// };

//get-category-by-id
export const fetchCategoryById = async (id) => {
  return fetch(`${HOSTNAME}/categories/category/${id}`);
};

//add-category
export const fetchAddCategory = async (category, token) => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/categories`,
      { ...category },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // Hoặc xử lý phản hồi theo cách bạn muốn
  } catch (error) {
    // Xử lý lỗi tại đây, ví dụ: thông báo lỗi cho người dùng
    console.error("An error occurred while adding the category:", error);
    throw error; // Hoặc xử lý lỗi theo cách bạn muốn
  }
};

//upload-category
export const fetchUpdateCategory = async (category, token, id) => {
  return await axios.patch(
    `${HOSTNAME}/categories/category/${id}`,
    {
      category_name: category.category_name,
      description: category.description,
    },
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  );
};

// //upload -bill
// export const fetchUploadBill = async (inputBill, token) => {
//   return await axios.post(`${SCHEMA_HOSTNAME}/inputBills/upload`, inputBill, {
//     headers: {
//       Authorization: `Bearer ${token.access_token}`,
//     },
//   });
// };

// //get-all-bill
// export const fetchAllBills = async () => {
//   try {
//     const res = await axios.get(`${SCHEMA_HOSTNAME}/inputBills/all-inputbills`);
//     return res.data.result;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };

// //get-all-warehouse:
// export const fetchProductInWarehouse = async () => {
//   return await axios.get(`${SCHEMA_HOSTNAME}/warehouse/all-warehouse`);
// };

//get-all-user
export const fetchAllUsers = async (result) => {
  return await axios.get(`${HOSTNAME}/users`, {
    headers: {
      Authorization: `Bearer ${result}`,
    },
  });
};
//get role
export const fetchRole = async () => {
  return await axios.get(`${HOSTNAME}/roles`);
};
//get-all-user
export const fetchCreateStaff = async (token, userData) => {
  return await axios.post(`${HOSTNAME}/users/create-staff`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchUserStatusById = async (id, token) => {
  return await axios.put(
    `http://localhost:8080/api/users/status/${id}`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

// //get-user-by-id
// export const fetchUserById = async (id, token) => {
//   return await axios.get(`${SCHEMA_HOSTNAME}/users/user/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token.access_token}`,
//     },
//   });
// };

// //update-user
// export const fetchUpdateUser = async (user, token, id) => {
//   return await axios.post(
//     `${SCHEMA_HOSTNAME}/users/change-status/${id}`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

// //add-staff
// export const fetchUploadStaff = async (user, token) => {
//   return await axios.post(
//     `${SCHEMA_HOSTNAME}/users/add-user`,
//     { ...user },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

// //updateProduct
// export const fetchUpdateProduct = async (product, token, id) => {
//   return await axios.patch(
//     `${SCHEMA_HOSTNAME}/products/product/${id}`,
//     {
//       brand_id: product.brand_id,
//       category_id: product.category_id,
//       product_name: product.product_name,
//       price: product.price,
//       description: product.description,
//       age: product.age,
//       discount: product.discount,
//       imgUrl: product.imgUrl,
//       isActive: product.isActive,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

// //upload
// export const fetchUploadProduct = async (product, token) => {
//   return await axios.post(
//     `${SCHEMA_HOSTNAME}/products/upload`,
//     { ...product },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

// //reset-pssword:
// export const fetchResetPassword = async ({
//   user_id,
//   digit,
//   password,
//   confirm_password,
// }) => {
//   await axios.post(
//     `${SCHEMA_HOSTNAME}/users/reset-password`,
//     {
//       password,
//       confirm_password,
//     },
//     {
//       params: {
//         user_id: user_id,
//         digit: digit,
//       },
//     },
//   );
// };

// //otp
// export const fetchOtp = async ({ user_id, digit, email, key }) => {
//   if (key === "resend") {
//     return await axios.post(`${SCHEMA_HOSTNAME}/users/forgot-password`, {
//       email,
//     });
//   } else {
//     return await axios.get(`${SCHEMA_HOSTNAME}/users/verify-forgot-password`, {
//       params: {
//         user_id,
//         digit: digit,
//       },
//     });
//   }
// };

// //login
// export const fetchLogin = async (email, password) => {
//   return await axios.post(`${SCHEMA_HOSTNAME}/users/login-admin-staff`, {
//     email,
//     password,
//   });
// };

// //forgot-password
// export const fetchForgotPassword = async (email) => {
//   return await axios.post(`${SCHEMA_HOSTNAME}/users/forgot-password`, {
//     email,
//   });
// };

//addbrand
export const fetchAddBrand = async (brand, token) => {
  return await axios.post(
    `${HOSTNAME}/brands`,
    { ...brand },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
// //logout
// export const fetchLogout = async (result) => {
//   return await axios.post(
//     `${SCHEMA_HOSTNAME}/users/logout`,
//     {
//       refresh_token: result.refresh_token,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${result.access_token}`,
//       },
//     },
//   );
// };

// export const fetchProducts = async () => {
//   try {
//     const res = await axios.get(`${SCHEMA_HOSTNAME}/products/all-products`);
//     return res.data.result;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };

// export const fetchOrder = async () => {
//   try {
//     const res = await axios.get(`${SCHEMA_HOSTNAME}/orders/all-orders`);
//     return res.data.result;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };
// //revenue:
// export const fetchRevenue = async () => {
//   try {
//     const res = await axios.get(`${SCHEMA_HOSTNAME}/revenue/all-revenue`);
//     return res.data.result;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };

// //voucher:
// //getall:
export const fetchGetVoucher = async () => {
  try {
    const res = await axios.get(`${HOSTNAME}/vouchers`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    throw error;
  }
};
// //update:
// export const fetchUpdateVoucher = async (voucher, token, id) => {
//   return await axios.post(
//     `${SCHEMA_HOSTNAME}/vouchers/update/${id}`,
//     { ...voucher },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };
// //delete:
// export const fetchDeleteVoucher = async (voucherId, token) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await axios.post(
//       `${SCHEMA_HOSTNAME}/vouchers/delete`,
//       {
//         id: voucherId,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token.access_token}`,
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// //feedback
// export const fetchAllFeedback = async () => {
//   return await axios.get(`${SCHEMA_HOSTNAME}/feedbacks/all-feedback`);
// };

//API province, district, ward
const baseUrl = "https://open.oapi.vn/location";
class Http {
  // get:
  async get(url) {
    const response = await fetch(url);
    if (response.ok) {
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
        `${baseUrl}/districts?page=0&provinceId=${provinceCode}&size=100`,
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
        `${baseUrl}/wards?page=0&districtId=${districtCode}&size=100`,
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
