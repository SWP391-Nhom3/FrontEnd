import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { CartContextProvider } from "./context/CartContext.jsx";
import { WishlistContextProvider } from "./context/WishlistContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider>
      <WishlistContextProvider>
        <App />
      </WishlistContextProvider>
    </CartContextProvider>
  </React.StrictMode>,
);
