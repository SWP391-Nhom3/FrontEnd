import axios from "axios";

const HOSTNAME = "http://localhost:8080/api";

export const createPaymentLink = async (paymentData) => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/checkout/create-payment-link`,
      paymentData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw error;
  }
};

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
//get user by id
export const fetchUserById = async (id) => {
  return await axios.get(`${HOSTNAME}/users/${id}`);
};
//get all shipper
export const fetchAllShipper = async () => {
  return await axios.get(`${HOSTNAME}/users/shippers`);
};

//update my profile api
export const fetchUpdateProfile = async (data, token) => {
  return await axios.put(`${HOSTNAME}/users`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

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
  return await axios.post(`${HOSTNAME}/orders`, order);
};

//create preorder api
export const fetchCreatePreOrder = async (order) => {
  return await axios.post(`${HOSTNAME}/orders/pre-order`, order, {});
};

//get all order api
export const fetchOrders = async () => {
  return await axios.get(`${HOSTNAME}/orders`);
};

//getOrderbyId
export const fetchGetOrderById = async (id) => {
  return await axios.get(`${HOSTNAME}/orders/${id}`);
};

//cancel order api
export const fetchCancelOrder = async (id) => {
  return await axios.put(`${HOSTNAME}/orders/cancel/${id}`);
};

//confirm order api
export const fetchConfirmOrder = async (id, shipperid) => {
  return await axios.put(`${HOSTNAME}/orders/confirm/${id}`, {
    shipperId: shipperid,
  });
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

export const fetchDeleteNews = async (id) => {
  return await axios.delete(`${HOSTNAME}/articles/${id}`);
};

// //fetchUpdateNews
// export const fetchUpdateNews = async (data, token, id) => {
//   return await axios.patch(
//     `${HOSTNAME}/news/update/${id}`,
//     { ...data },
//     {
//       headers: {
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     },
//   );
// };

export const fetchNewsByID = async (id) => {
  const res = await axios.get(`${HOSTNAME}/articles/${id}`);
  return res.data.data;
};

export const fetchUploadNews = async (newsData) => {
  const formData = new FormData();
  Object.keys(newsData).forEach((key) => {
    if (key === "file" && Array.isArray(newsData[key])) {
      newsData[key].forEach((file) => {
        formData.append("file", file);
      });
    } else {
      formData.append(key, newsData[key]);
    }
  });

  try {
    return await axios.post(`${HOSTNAME}/articles`, formData, {});
  } catch (error) {
    console.error("Error uploading news:", error);
    throw error;
  }
};

//review by product id
export const fetchReviewByProductId = async (id) => {
  return await axios.get(`${HOSTNAME}/reviews/product/${id}`);
};

// //feedback
export const fetchAllFeedback = async () => {
  return await axios.get(`${HOSTNAME}/reviews`);
};

export const fetchCheckFeedback = async (user_id, product_id) => {
  return await axios.get(`${HOSTNAME}/reviews/${product_id}/${user_id}`);
};

export const fetchReivewByUser = async (user_id) => {
  return await axios.get(`${HOSTNAME}/reviews/user/${user_id}`);
};

//fetchUploadFeedback
export const fetchUploadFeedback = async (user_id, feedback, token) => {
  console.log(`${HOSTNAME}/reviews`);
  return await axios.post(`${HOSTNAME}/reviews`, {
    user: {
      id: user_id,
    },
    product: {
      id: feedback.product_id,
    },
    rating: feedback.rating,
    comment: feedback.description,
  });
};

//delete:
export const fetchDeleteFeedback = async (id, token) => {
  return await axios.delete(`${HOSTNAME}/reviews/${id}`, {});
};

export const fetchAllReplyFeedback = async () => {
  return await axios.get(`${HOSTNAME}/review-reply`);
};

// //fetchUploadReplyFeedback
export const fetchUploadReplyFeedback = async (
  user_id,
  review_id,
  replyText,
  token,
) => {
  return await axios.post(
    `${HOSTNAME}/review-reply`,
    {
      user: {
        id: user_id,
      },
      review: {
        id: review_id,
      },
      replyText: replyText,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const fetchAllNews = async () => {
  try {
    const res = await axios.get(`${HOSTNAME}/articles`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

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
//create staff api
export const fetchCreateStaff = async (token, userData) => {
  return await axios.post(`${HOSTNAME}/users/create-staff`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//create shipper api
export const fetchCreateShipper = async (token, userData) => {
  return await axios.post(`${HOSTNAME}/users/create-shipper`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchUserStatusById = async (id, token) => {
  return await axios.put(
    `${HOSTNAME}/users/status/${id}`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

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
export const fetchCreateVoucher = async (voucher) => {
  try {
    const response = await axios.post(`${HOSTNAME}/vouchers`, voucher);
    return response.data.data;
  } catch (error) {
    console.error("Error creating voucher:", error);
    throw error;
  }
};

export const fetchDeleteVoucher = async (id) => {
  try {
    const response = await axios.delete(`${HOSTNAME}/vouchers/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting voucher:", error);
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

//add report
export const fetchAddReport = async (report) => {
  return await axios.post(`${HOSTNAME}/reports`, report);
};

//get report by order id and customer id
export const fetchCheckReport = async (order_id, customer_id) => {
  return await axios.get(`${HOSTNAME}/reports/${order_id}/${customer_id}`);
};

//get report by customer id
export const fetchGetReportByCustomer = async (customer_id) => {
  return await axios.get(`${HOSTNAME}/reports/user/${customer_id}`);
};

//get report by status
export const fetchGetReportByStatus = async (status) => {
  return await axios.get(`${HOSTNAME}/reports/status/${status}`);
};

//get report by actionType
export const fetchGetReportByActionType = async (actionType) => {
  return await axios.get(`${HOSTNAME}/reports/action/${actionType}`);
};
//get report by id
export const fetchReportById = async (id) => {
  return await axios.get(`${HOSTNAME}/reports/${id}`);
};
//staff reply report api
export const fetchUpdateReport = async (id, report) => {
  return await axios.put(`${HOSTNAME}/reports/${id}`, report);
};
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
