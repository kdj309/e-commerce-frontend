import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import ProductContext from "./context/ProductContext";
import store from "./store";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    {/* <ProductContext> */}
    <App />
    {/* </ProductContext> */}
  </Provider>,
  document.getElementById("root")
);
