import React, { useEffect, useState } from "react";
import { getproduct } from "../admin/helper/adminapicall";
import Base from "../core/Base";
import ProductDetail from "./ProductDetail";
import Alert from "../core/Alert";

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
    <Base
      title="Style is the perfection of a point of view"
      showcarosuel={false}
    >
      {datastatus.loading ? (
        <p className="display-3">Loading...</p>
      ) : datastatus.error ? (
        <Alert msg="failed to load the product" cls="danger"></Alert>
      ) : (
        <ProductDetail productinfo={productinfo}></ProductDetail>
      )}
    </Base>
  );
}

export default React.memo(ProductInfo);
