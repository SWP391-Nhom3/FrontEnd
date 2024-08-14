import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartAmount = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    return total + itemTotal;
  }, 0);

  const removeCartItem = (id) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
    toast.success("Sản phẩm đã được xóa khỏi giỏ hàng", {
      position: "top-right",
      duration: 1000,
    });
  };

  const addCartItem = (product) => {
    setCartItems((prevCartItems) => {
      const currentCart = prevCartItems.find(
        (cartItem) => cartItem.id === product.id,
      );
      if (currentCart) {
        if (currentCart.quantity >= product.stockQuantity) {
          toast.error("Số lượng mua vượt quá số lượng trong kho", {
            position: "top-right",
            duration: 1000,
          });
          return prevCartItems;
        } else {
          const updatedCart = prevCartItems.map((cartItem) =>
            cartItem.id === product.id
              ? { ...currentCart, quantity: currentCart.quantity + 1 }
              : cartItem,
          );
          toast.success("Sản phẩm đã được thêm vào giỏ hàng", {
            position: "top-right",
            duration: 1000,
          });
          return updatedCart;
        }
      } else {
        const newCart = [...prevCartItems, { ...product, quantity: 1 }];
        toast.success("Sản phẩm đã được thêm vào giỏ hàng", {
          position: "top-right",
          duration: 1000,
        });
        return newCart;
      }
    });
  };

  const addCartItems = (products) => {
    setCartItems((prevCartItems) => {
      let updatedCartItems = [...prevCartItems];
      let exceededQuantityProducts = [];

      products.forEach((product) => {
        const currentCart = updatedCartItems.find(
          (cartItem) => cartItem.id === product.id,
        );

        if (currentCart) {
          if (currentCart.quantity >= product.stockQuantity) {
            exceededQuantityProducts.push(product.name);
          } else {
            updatedCartItems = updatedCartItems.map((cartItem) =>
              cartItem.id === product.id
                ? { ...currentCart, quantity: currentCart.quantity + 1 }
                : cartItem,
            );
          }
        } else {
          updatedCartItems.push({ ...product, quantity: 1 });
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
        toast.success(`Đã thêm ${products.length} sản phẩm vào giỏ hàng`, {
          position: "top-right",
          duration: 1000,
        });
      }

      return updatedCartItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseAmount = (product) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id && item.quantity < product.stockQuantity
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );

    const currentCart = cartItems.find((item) => item.id === product.id);
    if (currentCart && currentCart.quantity >= product.stockQuantity) {
      toast.error(`Số lượng mua vượt quá số lượng trong kho`, {
        position: "top-right",
        duration: 1000,
      });
    }
  };

  const decreaseAmount = (id) => {
    setCartItems((prevItems) => {
      const currentCart = prevItems.find((item) => item.id === id);
      if (currentCart) {
        if (currentCart.quantity > 1) {
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
    <CartContext.Provider
      value={{
        cartItems,
        cartAmount,
        totalPrice,
        increaseAmount,
        decreaseAmount,
        addCartItem,
        addCartItems,
        removeCartItem,
        clearCart,
      }}
    >
      <Toaster />
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
