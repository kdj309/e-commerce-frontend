import React, { useEffect, useState } from "react";
import { getproduct } from "../admin/helper/adminapicall";
import ProductDetail from "./ProductDetail";
import Alert from "../core/Alert";
import Nav from "../core/Nav";
import Footer from "../core/Footer";
import ProductDetailShimmerCard from "../core/ProductDetailShimmerCard";

function ProductInfo({ match }) {
  const [datastatus, setdatastatus] = useState({
    loading: false,
    sucess: false,
    error: false,
  });
  const [productinfo, setproductinfo] = useState({});

  useEffect(() => {
    setdatastatus((previous) => {
      return { ...previous, loading: true };
    });
    getproduct(match.params.productid)
      .then((data) => {
        setdatastatus((previous) => {
          return { ...previous, loading: false, succes: true };
        });
        setproductinfo(data);
      })
      .catch((err) => {
        setdatastatus({ error: true, loading: false, succes: false });
      });
  }, []);
  return (
    <>
      <Nav />
      {datastatus.loading ? (
        <ProductDetailShimmerCard />
      ) : datastatus.error ? (
        <Alert msg="failed to load the product" cls="danger"></Alert>
      ) : (
        <ProductDetail productinfo={productinfo}></ProductDetail>
      )}
      <Footer />
    </>
  );
}

export default React.memo(ProductInfo);
