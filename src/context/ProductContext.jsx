import { createContext, useState, useEffect, useContext } from "react";
import { fetchProducts } from "../data/api";

const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const localProducts = localStorage.getItem("products");

        if (localProducts) {
          setProducts(JSON.parse(localProducts));
          setLoading(false);

          setTimeout(async () => {
            localStorage.removeItem("products");
            const response = await fetchProducts();
            const productData = response.data;

            if (productData.success) {
              const products = productData.data;
              setProducts(products);
              localStorage.setItem("products", JSON.stringify(products));
            }
            setLoading(false);
          }, 500);
        } else {
          const response = await fetchProducts();
          const productData = response.data;

          if (productData.success) {
            const products = productData.data;
            setProducts(products);
            localStorage.setItem("products", JSON.stringify(products));
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
