import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../data/api";
import { useProductContext } from "../../context/ProductContext.jsx";

const SearchBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả Sản Phẩm");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const { products } = useProductContext();
  const searchBarRef = useRef(null);

  let sampleProducts = [];
  if (selectedCategory === "Tất Cả Sản Phẩm") {
    products.forEach((item) => {
      if (item.active) sampleProducts.push(item.name);
    });
  } else {
    products.forEach((item) => {
      if (item.name === selectedCategory) {
        if (item.active) sampleProducts.push(item.name);
      }
    });
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setDropdownVisible(false);
  };

  const getCategory = async () => {
    try {
      const res = await fetchCategories();
      const categories = [{ name: "Tất Cả Sản Phẩm" }, ...res.data.data];
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getSuggestions = (query) => {
    if (query.length < 0) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = sampleProducts.filter((product) =>
      product.toLowerCase().includes(query.toLowerCase()),
    );
    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    getSuggestions(value);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    const _product = products.find((product) => product.name === suggestion);
    navigate("/product", { state: { product: _product } });
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchSubmit = (event) => {
    event.preventDefault();
    navigate("/filter", {
      state: { product_name: searchTerm },
    });
  };

  return (
    <form className="mx-auto w-full" ref={searchBarRef} onSubmit={searchSubmit}>
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Email
        </label>
        <div className="relative">
          <button
            id="dropdown-button"
            onClick={toggleDropdown}
            type="button"
            className="z-10 inline-flex h-12 w-[200px] flex-shrink-0 items-center justify-between rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <div>{selectedCategory}</div>
            <div>
              <svg
                className="h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </div>
          </button>
          {dropdownVisible && (
            <div className="absolute left-0 z-10 mt-2 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
              <ul
                className="border-solid py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(category.name)}
                      className="inline-flex w-full border-solid px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            value={searchTerm}
            onChange={handleInputChange}
            className="z-20 block h-12 w-full rounded-e-lg border border-s-2 border-gray-300 border-s-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500"
            placeholder="Tìm sản phẩm..."
            required
          />
          <button
            type="submit"
            className="absolute end-0 top-0 h-12 rounded-e-lg border border-pink-700 bg-pink-700 p-2.5 text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-md bg-white shadow-lg dark:bg-gray-700">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => {
                        handleSuggestionSelect(suggestion);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
