import React, { useState, useEffect, useContext } from "react";
import { getAllproducts } from "../admin/helper/adminapicall";
import {
  getAllCategories,
  getAllsizeoptions,
} from "../core/helper/coreapicalls";

const Productctx = React.createContext({
  products: [],
  paymentId: "",
  paymentInfo: {},
  selectedProducts: [],
});
const useProductcontext = () => {
  return useContext(Productctx);
};
export default function ProductContext({ children }) {
  const [allproducts, setallproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [sizeoptions, setsizeoptions] = useState([]);
  const [productstorender, setproductstorender] = useState([]);

  useEffect(() => {
    getAllproducts().then((data) => {
      if (data.errors || data.errormsg) {
        console.log(data.errormsg);
      } else {
        setallproducts(data);
        setproductstorender(data);
      }
    });
    getAllCategories()
      .then((data) => {
        setcategories(data);
      })
      .catch((err) => console.log(err));

    getAllsizeoptions()
      .then((data) => {
        setsizeoptions(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Productctx.Provider
      value={{
        products: allproducts,
        categories,
        sizeoptions,
        setproductstorender,
        productstorender,
      }}
    >
      {children}
    </Productctx.Provider>
  );
}
export { useProductcontext };
