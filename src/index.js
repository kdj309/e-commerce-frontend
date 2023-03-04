import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ProductContext from "./context/ProductContext";
ReactDOM.render(
  <ProductContext>
    <App />
  </ProductContext>,
  document.getElementById("root")
);
