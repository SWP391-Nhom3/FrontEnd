import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const PreOrderContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePreOrderContext = () => {
  return useContext(PreOrderContext);
};

export const PreOrderContextProvider = ({ children }) => {
  const [preOrderItems, setPreOrderItems] = useState(() => {
    const storedPreOrderItems = localStorage.getItem("preOrderItems");
    return storedPreOrderItems ? JSON.parse(storedPreOrderItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("preOrderItems", JSON.stringify(preOrderItems));
  }, [preOrderItems]);

  const preOrderAmount = preOrderItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0,
  );

  const totalPrice = preOrderItems.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    return total + itemTotal;
  }, 0);

  const removePreOrderItem = (id) => {
    const currentItemIndex = preOrderItems.findIndex((item) => item.id === id);
    const newPreOrderItems = [...preOrderItems];
    newPreOrderItems.splice(currentItemIndex, 1);
    setPreOrderItems(newPreOrderItems);
    toast.success("Sản phẩm đã được xóa khỏi giỏ đặt trước", {
      position: "top-right",
      duration: 1000,
    });
  };

  const addPreOrderItem = (product) => {
    setPreOrderItems((prevPreOrderItems) => {
      const currentPreOrder = prevPreOrderItems.find(
        (preOrderItem) => preOrderItem.id === product.id,
      );
      if (currentPreOrder) {
        const updatedPreOrder = prevPreOrderItems.map((preOrderItem) =>
          preOrderItem.id === product.id
            ? { ...currentPreOrder, quantity: currentPreOrder.quantity + 1 }
            : preOrderItem,
        );
        toast.success("Sản phẩm đã được thêm vào giỏ hàng đặt trước", {
          position: "top-right",
          duration: 1000,
        });
        return updatedPreOrder;
      } else {
        const newPreOrder = [...prevPreOrderItems, { ...product, quantity: 1 }];
        toast.success("Sản phẩm đã được thêm vào giỏ hàng đặt trước", {
          position: "top-right",
          duration: 1000,
        });
        return newPreOrder;
      }
    });
  };

  const addPreOrderItems = (products) => {
    setPreOrderItems((prevPreOrderItems) => {
      let updatedPreOrderItems = [...prevPreOrderItems];
      let exceededQuantityProducts = [];

      products.forEach((product) => {
        const currentPreOrder = updatedPreOrderItems.find(
          (preOrderItem) => preOrderItem.id === product.id,
        );

        if (currentPreOrder) {
          if (currentPreOrder.quantity >= product.stockQuantity) {
            exceededQuantityProducts.push(product.name);
          } else {
            updatedPreOrderItems = updatedPreOrderItems.map((preOrderItem) =>
              preOrderItem.id === product.id
                ? { ...currentPreOrder, quantity: currentPreOrder.quantity + 1 }
                : preOrderItem,
            );
          }
        } else {
          updatedPreOrderItems.push({ ...product, quantity: 1 });
        }
      });

      if (exceededQuantityProducts.length > 0) {
        toast.error(
          `Số lượng mua vượt quá số lượng trong kho cho các sản phẩm: ${exceededQuantityProducts.join(", ")}`,
          {
            position: "top-right",
            duration: 1000,
          },
        );
      } else {
        toast.success(`Đã thêm ${products.length} sản phẩm vào đặt trước`, {
          position: "top-right",
          duration: 1000,
        });
      }

      return updatedPreOrderItems;
    });
  };

  const clearPreOrder = () => {
    setPreOrderItems([]);
  };

  const increaseAmount = (id) => {
    setPreOrderItems((prevItems) => {
      const currentPreOrder = prevItems.find((item) => item.id === id);

      if (currentPreOrder) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return prevItems;
    });
  };

  const decreaseAmount = (id) => {
    setPreOrderItems((prevItems) => {
      const currentPreOrder = prevItems.find((item) => item.id === id);
      if (currentPreOrder) {
        if (currentPreOrder.quantity > 1) {
          return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
          );
        } else {
          return prevItems.filter((item) => item.id !== id);
        }
      }
      return prevItems;
    });
  };

  return (
    <PreOrderContext.Provider
      value={{
        preOrderItems,
        preOrderAmount,
        totalPrice,
        increaseAmount,
        decreaseAmount,
        addPreOrderItem,
        addPreOrderItems,
        removePreOrderItem,
        clearPreOrder,
      }}
    >
      <Toaster />
      {children}
    </PreOrderContext.Provider>
  );
};

export default PreOrderContext;
