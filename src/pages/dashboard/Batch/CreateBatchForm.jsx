import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation Schema using Yup
const schema = yup.object().shape({
  manufactureDate: yup.date().required("Ngày sản xuất không được để trống"),
  expiryDate: yup
    .date()
    .required("Hạn sử dụng không được để trống")
    .min(yup.ref("manufactureDate"), "Hạn sử dụng phải sau ngày sản xuất"),
  quantity: yup
    .number()
    .required("Số lượng không được để trống")
    .positive("Số lượng phải lớn hơn 0"),
});

export default function CreateBatchesForm() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        toast.error("Có lỗi khi tải sản phẩm!");
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const onProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const onSubmit = (data) => {
    if (!selectedProduct) {
      toast.error("Vui lòng chọn một sản phẩm.");
      return;
    }

    const payload = {
      ...data,
      product: { id: selectedProduct.id },
    };

    axios
      .post("/batches", payload)
      .then((response) => {
        toast.success("Đơn nhập hàng đã được tạo thành công!");
        reset();
        setSelectedProduct(null);
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra khi tạo đơn nhập hàng!");
        console.error(error);
      });
  };

  return (
    <div className="flex space-x-4 p-4">
      <ToastContainer />

      <div className="w-1/2 rounded bg-white p-4 shadow">
        <h2 className="mb-4 text-lg font-semibold">Chọn sản phẩm</h2>
        <div className="space-y-2">
          {products.map((product, index) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded border p-2 ${
                selectedProduct?.id === product.id ? "bg-gray-200" : ""
              }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-16 w-16 rounded"
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-gray-500">{product.price} VND</p>
                </div>
              </div>
              <button
                onClick={() => onProductSelect(product)}
                className="text-blue-500"
              >
                Nhập Hàng
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/2 rounded bg-white p-4 shadow">
        <h2 className="mb-4 text-lg font-semibold">Đơn nhập hàng</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {selectedProduct && (
            <div className="mb-4">
              <h3 className="text-md font-medium">{selectedProduct.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Ngày Sản Xuất</label>
                  <Controller
                    name="manufactureDate"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="date"
                        {...field}
                        className="w-full rounded border p-2"
                      />
                    )}
                  />
                  {errors.manufactureDate && (
                    <p className="text-sm text-red-500">
                      {errors.manufactureDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label>Hạn Sử Dụng</label>
                  <Controller
                    name="expiryDate"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="date"
                        {...field}
                        className="w-full rounded border p-2"
                      />
                    )}
                  />
                  {errors.expiryDate && (
                    <p className="text-sm text-red-500">
                      {errors.expiryDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label>Số Lượng</label>
                  <input
                    type="number"
                    defaultValue={1}
                    {...register("quantity")}
                    className="w-full rounded border p-2"
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="mt-6 text-red-500"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Tạo đơn
          </button>
        </form>
      </div>
    </div>
  );
}
