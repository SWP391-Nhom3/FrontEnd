import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import { useCartContext } from "../../context/CartContext";

const ProductDetail = () => {
  const location = useLocation();
  const { productId } = location.state || {};
  const [product, setProduct] = useState(null);
  const { addCartItem } = useCartContext();

  useEffect(() => {
    if (productId) {
      axios
        .get(`/products/${productId}`)
        .then((response) => {
          setProduct(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // Hàm xử lý khi thêm vào giỏ hàng
  const handleAddToCart = () => {
    addCartItem(product); // Gọi hàm addCartItem từ context
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image Section */}
        <div>
          <img
            src={product.coverImageUrl}
            alt={product.name}
            className="h-auto w-full rounded-lg"
          />
          <div className="mt-4 flex space-x-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-20 w-20 rounded-lg object-cover"
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">SKU: {product.sku}</p>
          <div className="mt-4">
            <span className="text-4xl font-bold">
              {formatCurrency(product.price)}
            </span>
            {product.discountPrice && (
              <span className="ml-2 text-gray-500 line-through">
                {formatCurrency(product.discountPrice)}
              </span>
            )}
          </div>
          <div className="mt-4 flex items-center">
            <div className="flex items-center text-yellow-500">
              <span className="mr-2">⭐ {product.rating}</span>
              <span>({product.reviewsCount} reviews)</span>
            </div>
          </div>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleAddToCart} // Gắn sự kiện onClick cho nút "Add to Cart"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
