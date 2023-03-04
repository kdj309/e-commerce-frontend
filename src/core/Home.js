import React from "react";
import Base from "./Base";
import Card from "./card";
import { useProductcontext } from "../context/ProductContext";
import styles from "../css/Home.module.css";
import { debounce } from "lodash";

function Home() {
  const {
    products,
    categories,
    sizeoptions,
    setproductstorender,
    productstorender,
  } = useProductcontext();
  const sortArray = debounce((type) => {
    if (type === "default") {
      setproductstorender(products);
      return;
    }
    let sorted;
    if (type === "High") {
      sorted = [...products].sort((a, b) => b.price - a.price);
    } else {
      sorted = [...products].sort((a, b) => a.price - b.price);
    }
    setproductstorender(sorted);
  }, 1000);

  document.body.style = "background: #343a40;";
  return (
    <Base title="Welcome to PlanetShop">
      <div className="d-flex flex-row align-items-end justify-content-end">
        <div className="align-self-end d-flex">
          <select
            onChange={(e) => {
              sortArray(e.target.value);
            }}
            className="form-select mx-2"
            aria-label="Default select example"
          >
            <option defaultValue value="default">
              Sort by
            </option>
            <option value="High">Price: High To Low</option>
            <option value="Low">Price: Low To High</option>
          </select>
          <select
            onChange={(e) => {
              setproductstorender(() => {
                if (e.target.value === "default") {
                  return products;
                }
                if (
                  e.target.value === "XL" ||
                  e.target.value === "XXL" ||
                  e.target.value === "L" ||
                  e.target.value === "M" ||
                  e.target.value === "S"
                ) {
                  return products.filter((item) =>
                    item.size.map((size) => size.name).includes(e.target.value)
                  );
                } else {
                  return products.filter(
                    (item) => item.category.name === e.target.value
                  );
                }
              });
            }}
            className="form-select mx-2"
            aria-label="Default select example"
          >
            <option defaultValue value="default">
              Filter by{" "}
            </option>
            <optgroup label="Category">
              {categories.map((item) => {
                return (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </optgroup>
            <optgroup label="Size">
              {sizeoptions.map((item) => {
                return (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </optgroup>
          </select>
        </div>
      </div>
      <div className={`container ${styles.itemscontainer}`}>
        {productstorender?.map((product) => {
          return <Card key={product._id} product={product} />;
        })}
      </div>
    </Base>
  );
}
export default React.memo(Home);
