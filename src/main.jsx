import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { ProductProvider } from "./context/ProductContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { PreOrderContextProvider } from "./context/PreOrderContext.jsx";
import { ContextProvider } from "./context/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <ContextProvider>
        <PreOrderContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </PreOrderContextProvider>
      </ContextProvider>
    </ProductProvider>
  </React.StrictMode>,
);
