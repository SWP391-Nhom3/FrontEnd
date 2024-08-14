import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .positive("Price must be greater than zero")
    .required("Price is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  targetAudience: Yup.string().required("Target Audience is required"),
  files: Yup.mixed().required("At least one file must be uploaded"),
});

const CreateProductForm = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("/brands");
        setBrands(response.data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("targetAudience", data.targetAudience);
    Array.from(data.files).forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    try {
      const response = await axios.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product created successfully!");
      reset();
    } catch (error) {
      toast.error("Error creating product!");
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-md bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Create Product for Mom & Baby</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              {...register("name")}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              {...register("price")}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.price ? "border-red-500" : ""}`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register("description")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.description ? "border-red-500" : ""}`}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Brand */}
          <div>
            <label className="block text-gray-700">Brand</label>
            <select
              {...register("brand")}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.brand ? "border-red-500" : ""}`}
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && (
              <p className="mt-1 text-sm text-red-500">
                {errors.brand.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              {...register("category")}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.category ? "border-red-500" : ""}`}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-gray-700">Target Audience</label>
          <select
            {...register("targetAudience")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.targetAudience ? "border-red-500" : ""}`}
          >
            <option value="">Select Audience</option>
            <option value="Mom">Sữa dành cho mẹ bầu</option>
            <option value="Baby">Sữa dành cho trẻ sơ sinh</option>
          </select>
          {errors.targetAudience && (
            <p className="mt-1 text-sm text-red-500">
              {errors.targetAudience.message}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700">Upload Files</label>
          <input
            type="file"
            {...register("files")}
            multiple
            className={`mt-1 block w-full rounded-md border border-gray-300 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.files ? "border-red-500" : ""}`}
          />
          {errors.files && (
            <p className="mt-1 text-sm text-red-500">{errors.files.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
