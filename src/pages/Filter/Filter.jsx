import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { FaShoppingCart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdOutlineRestore } from "react-icons/md";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Loader from "../../assets/loading.gif";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import { Link, useLocation } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { fetchCategories } from "../../data/api";
import not_found from "../../assets/images/background/notFind.png";

const Filter = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const { products, loading } = useProductContext();
  const { addCartItem } = useCartContext();
  const search_name = location.state?.product_name || "";

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        const result = data.data.success;
        if (result) {
          setCategories(data.data.data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let updatedProducts = products.filter((product) => product.active);
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(search_name.toLowerCase()),
      );
      if (selectedCategory) {
        updatedProducts = updatedProducts.filter(
          (product) => product.category.name === selectedCategory,
        );
      }

      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1],
      );

      if (selectedDiscounts.length > 0) {
        updatedProducts = updatedProducts.filter((product) => {
          return selectedDiscounts.some((discountRange) => {
            const [min, max] = discountRange.split("-").map(Number);
            return max
              ? product.discount >= min && product.discount <= max
              : product.discount >= min;
          });
        });
      }

      if (sortOption === "price-asc") {
        updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "price-desc") {
        updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
      } else if (sortOption === "popular") {
        updatedProducts = updatedProducts.sort((a, b) => b.sales - a.sales);
      }

      setFilteredProducts(updatedProducts);
    };

    filterProducts();
  }, [
    products,
    search_name,
    selectedCategory,
    priceRange,
    selectedDiscounts,
    sortOption,
  ]);

  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const handleDiscountSelect = (event) => {
    const { value } = event.target;
    setSelectedDiscounts((prevSelectedDiscounts) =>
      prevSelectedDiscounts.includes(value)
        ? prevSelectedDiscounts.filter((discount) => discount !== value)
        : [...prevSelectedDiscounts, value],
    );
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 1000000]);
    setSelectedDiscounts([]);
    setSortOption("");
    setCurrentPage(1);
    setFilteredProducts(products);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setSortOpen(false);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 rounded-lg px-4 py-2 ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  if (loading)
    return (
      <div
        className="fixed z-[10000] flex h-full w-full items-center justify-center bg-white"
        style={{ left: 0, top: 0 }}
      >
        <img src={Loader} alt="Loading..." />
      </div>
    );
  // console.log(filteredProducts)
  return (
    <>
      <Breadcrumbs headline="Tất cả sản phẩm" />
      <div className="container mx-auto flex min-h-screen p-4">
        {/* Sidebar */}
        <div className="w-full flex-shrink-0 p-4 md:w-1/5">
          <div className="mb-4">
            <h2 className="mb-2 text-lg font-bold">Bộ lọc sản phẩm</h2>
            <ul className="text-gray-500">
              {categories.map((category) => {
                // console.log(category)
                return (
                  <li key={category.id}>
                    <input
                      type="radio"
                      name="category"
                      value={category.name}
                      checked={selectedCategory === category.name}
                      onChange={handleCategorySelect}
                    />
                    {category.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mb-4 mt-4"></div>
          <div className="mt-4">
            <h2 className="mb-2 text-lg font-bold">Lọc giá</h2>
            <Slider
              range
              min={0}
              max={2000000}
              step={1000}
              defaultValue={[0, 2000000]}
              onChange={handleSliderChange}
              value={priceRange}
            />
            <div className="mt-2 flex justify-between">
              <span>{priceRange[0].toLocaleString()}₫</span>
              <span>{priceRange[1].toLocaleString()}₫</span>
            </div>
          </div>
        </div>
        <div className="w-full flex-grow p-4 md:w-4/5">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/filter" onClick={() => window.scrollTo(0, 0)}>
              <button
                onClick={handleResetFilters}
                className="mt-4 flex rounded-lg bg-primary-500 px-4 py-2 text-white"
              >
                <MdOutlineRestore className="my-auto mr-2 h-5 w-5" />
                Khôi phục bộ lọc
              </button>
            </Link>
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="rounded-lg bg-gray-200 px-10 py-2"
              >
                Sắp xếp theo
              </button>
              {sortOpen && (
                <div className="absolute right-0 z-10 mt-2 rounded-lg border bg-white shadow-lg">
                  <div
                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortChange("popular")}
                  >
                    Phổ biến
                  </div>
                  <div
                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortChange("price-asc")}
                  >
                    Giá thấp - cao
                  </div>
                  <div
                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortChange("price-desc")}
                  >
                    Giá cao - thấp
                  </div>
                </div>
              )}
            </div>
          </div>
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col items-center rounded-lg border p-4"
                  >
                    <Link
                      to="/product"
                      state={{ product: product }}
                      onClick={() => window.scrollTo(0, 0)}
                      className="w-full"
                    >
                      <div className="relative mb-2 flex justify-center">
                        <img
                          src={product.coverImageUrl}
                          alt={product.name}
                          className="h-44 w-44 object-cover"
                        />
                        {product.stockQuantity === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                            <span className="text-xl font-bold text-white">
                              Hết hàng
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mb-2 h-20 w-full text-center">
                        <h3
                          className="overflow-hidden overflow-ellipsis text-base font-bold"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {product.name}
                        </h3>
                      </div>
                    </Link>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-col justify-between">
                        {product.price > 0 ? (
                          <>
                            <div className="text-xl font-bold text-gray-900">
                              {formatCurrency(product.price)}
                            </div>
                          </>
                        ) : (
                          <span className="mt-auto text-xl font-bold text-gray-900">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addCartItem(product)}
                        disabled={product.price === 0}
                        className={
                          product.price === 0
                            ? "flex cursor-not-allowed items-center justify-center rounded-lg bg-gray-500 px-4 py-2 text-white"
                            : "flex items-center justify-center rounded-lg bg-pink-500 px-4 py-2 text-white"
                        }
                      >
                        Thêm <FaShoppingCart className="ml-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="mx-2 flex items-center rounded-lg bg-gray-300 px-4 py-2"
                >
                  <FaArrowLeft />
                </button>
                {renderPageNumbers()}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="mx-2 flex items-center rounded-lg bg-gray-300 px-4 py-2"
                >
                  <FaArrowRight />
                </button>
              </div>
            </>
          ) : (
            <div className="mt-6 flex flex-col items-center">
              <img
                src={not_found}
                alt="No products found"
                className="w-128 mb-4 h-64"
              />
              <p className="text-lg font-semibold">
                Không có sản phẩm phù hợp với tìm kiếm!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Filter;
