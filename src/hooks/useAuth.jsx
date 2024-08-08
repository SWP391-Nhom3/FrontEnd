import React from "react";

const useAuth = () => {
  // Giả sử bạn lưu trạng thái đăng nhập trong localStorage hoặc context
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return { isAuthenticated };
};

export default useAuth;
