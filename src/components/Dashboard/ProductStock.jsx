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
        console.log("Product data:", data.data.data);
        setProducts(data.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const sortedByAmountAsc = [...products].sort(
        (a, b) => a.amount - b.amount,
      );
      setSmallestAmounts(sortedByAmountAsc.slice(0, 6));

      const sortedByAmountDesc = [...products].sort(
        (a, b) => b.amount - a.amount,
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
            <div>Số lượng: {item.quantity}</div>
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
