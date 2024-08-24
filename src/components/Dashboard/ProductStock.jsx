import { useEffect, useState } from "react";
import { fetchProductBatches } from "../../data/api";
import { List, Spin } from "antd";

const ProductStock = ({ selectedOption }) => {
  const [products, setProducts] = useState([]);
  const [smallestAmounts, setSmallestAmounts] = useState([]);
  const [largestAmounts, setLargestAmounts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProductBatches();
        setProducts(data.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  function convertIsoToDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (products.length > 0) {
      const sortedByAmountAsc = [...products].sort(
        (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
      );
      setSmallestAmounts(sortedByAmountAsc.slice(0, 6));
  
      const sortedByAmountDesc = [...products].sort(
        (a, b) => new Date(b.expiryDate) - new Date(a.expiryDate)
      );
      setLargestAmounts(sortedByAmountDesc.slice(0, 6));
    }
  }, [products]);

  const renderProductList = (data) => (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  src={item.product.coverImageUrl}
                  alt={item.product.name}
                  style={{ width: "50px", marginRight: "10px" }}
                />
              }
              title={item.product.name}
              description={`Giá: ${Number(item.product.price).toLocaleString(
                "vi-VN",
                {
                  style: "currency",
                  currency: "VND",
                },
              )}`}
            />
            <div>Ngày hết hạn: {convertIsoToDate(item.expiryDate)}</div>
          </List.Item>
        )}
      />
    </>
  );

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <>
          {selectedOption === "Sắp hết" && renderProductList(smallestAmounts)}
          {selectedOption === "Nhiều nhất" && renderProductList(largestAmounts)}
        </>
      )}
    </div>
  );
};

export default ProductStock;
