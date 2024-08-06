import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { CartContextProvider } from "./context/CartContext.jsx";
import { WishlistContextProvider } from "./context/WishlistContext.jsx";
import { ContextProvider } from "./context/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <App />
        </WishlistContextProvider>
      </CartContextProvider>
    </ContextProvider>
  </React.StrictMode>,
);
