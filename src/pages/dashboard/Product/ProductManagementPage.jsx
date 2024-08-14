import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";

export default function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setProducts(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Tất cả sản phẩm</h1>
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Nhập tên sản phẩm"
          className="w-full max-w-xs rounded border p-2"
        />
        <button className="ml-2 rounded bg-teal-500 px-4 py-2 text-white">
          Tìm kiếm
        </button>
      </div>

      <table className="min-w-full rounded-lg border bg-white shadow-lg">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Hình Ảnh</th>
            <th className="border-b px-4 py-2 text-left">Sản Phẩm</th>
            <th className="border-b px-4 py-2 text-left">Loại Sản Phẩm</th>
            <th className="border-b px-4 py-2 text-left">Thương Hiệu</th>
            <th className="border-b px-4 py-2 text-left">Số Lượng</th>
            <th className="border-b px-4 py-2 text-left">Đánh Giá</th>
            <th className="border-b px-4 py-2 text-left">Trạng Thái</th>
            <th className="border-b px-4 py-2 text-left">Chi Tiết</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border-b px-4 py-2">
                <img
                  src={product.coverImageUrl}
                  alt={product.name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="border-b px-4 py-2">{product.name}</td>
              <td className="border-b px-4 py-2">{product.category?.name}</td>
              <td className="border-b px-4 py-2">{product.brand?.name}</td>
              <td className="border-b px-4 py-2 text-center">
                {product.stockQuantity}
              </td>
              <td className="border-b px-4 py-2 text-center">
                {product.rating} ★
              </td>
              <td className="border-b px-4 py-2 text-center">
                <label className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={product.status}
                    className="toggle-checkbox"
                  />
                  <span className="ml-2">{product.status ? "Bật" : "Tắt"}</span>
                </label>
              </td>
              <td className="border-b px-4 py-2 text-center">
                <button className="text-blue-500 hover:underline">
                  Chi Tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
