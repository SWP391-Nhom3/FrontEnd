import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { CartContextProvider } from "./context/CartContext.jsx";
import { ContextProvider } from "./context/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ContextProvider>
  </React.StrictMode>,
);
