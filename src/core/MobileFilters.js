import React, { useState } from "react";
import styles from "../css/MobileFilters.module.css";
import FilterOption from "./FilterOption";
export default function MobileFilters({
  gender = [],
  categories = [],
  brands = [],
  price = [],
  sizes = [],
  closeFilters,
  categoriesfilterHandler,
  brandsfilterHandler,
  pricefilterHandler,
  sizefilterHandler,
  genderfilterHandler,
  showfilters,
}) {
  const [activeFilter, setactiveFilter] = useState("brands");
  const priceChangeHandler = (e, p) => {
    pricefilterHandler(p.value, e.target.checked);
  };
  const sizeChangeHandler = (e, s) => {
    sizefilterHandler(s.name, e.target.checked);
  };
  const genderChangeHandler = (e) => {
    genderfilterHandler(e.target.value);
  };
  const categoriesChangeHandler = (e, c) => {
    categoriesfilterHandler(c.name, e.target.checked);
  };
  const brandsChangeHandler = (e, b) => {
    brandsfilterHandler(b, e.target.checked);
  };
  return (
    <div
      className={`${styles["SearchFiltersWrapper"]}${
        !showfilters ? " d-none" : " d-block"
      }`}
    >
      <div className="lead mx-2">FILTERS</div>
      <div className={`${styles["SearchFilterscontainer"]}`}>
        <ul
          className={`${styles["filtertypes"]} border-top border-light-subtle`}
        >
          {gender.length ? (
            <li
              className={`border border-light-subtle py-1 text-center ${
                activeFilter === "gender" ? "text-dark" : ""
              }`}
              onClick={() => setactiveFilter("gender")}
            >
              Gender
            </li>
          ) : (
            ""
          )}
          {categories.length ? (
            <li
              className={`border border-light-subtle py-1 text-center ${
                activeFilter === "categories" ? "text-dark" : ""
              }`}
              onClick={() => setactiveFilter("categories")}
            >
              Categories
            </li>
          ) : (
            ""
          )}
          {brands.length ? (
            <li
              className={`border border-light-subtle py-1 text-center ${
                activeFilter === "brands" ? "text-dark" : ""
              }`}
              onClick={() => setactiveFilter("brands")}
            >
              Brands
            </li>
          ) : (
            ""
          )}
          {price.length ? (
            <li
              className={`border border-light-subtle py-1 text-center ${
                activeFilter === "price" ? "text-dark" : ""
              }`}
              onClick={() => setactiveFilter("price")}
            >
              Price
            </li>
          ) : (
            ""
          )}
          {sizes.length ? (
            <li
              className={`border border-light-subtle py-1 text-center ${
                activeFilter === "size" ? "text-dark" : ""
              }`}
              onClick={() => setactiveFilter("size")}
            >
              Size
            </li>
          ) : (
            ""
          )}
        </ul>
        <ul
          className={`${styles["filteroptions"]} border-top border-light-subtle`}
        >
          <FilterOption
            selectedoptions={categories}
            selectedtype="categories"
            onChangeHandler={categoriesChangeHandler}
            className={activeFilter === "categories" ? "d-block" : "d-none"}
          />
          <FilterOption
            selectedoptions={brands}
            selectedtype="brands"
            onChangeHandler={brandsChangeHandler}
            className={activeFilter === "brands" ? "d-block" : "d-none"}
          />
          <FilterOption
            selectedoptions={price}
            selectedtype="price"
            onChangeHandler={priceChangeHandler}
            className={activeFilter === "price" ? "d-block" : "d-none"}
          />
          <FilterOption
            selectedoptions={sizes}
            selectedtype="size"
            onChangeHandler={sizeChangeHandler}
            className={activeFilter === "size" ? "d-block" : "d-none"}
          />
          <FilterOption
            selectedoptions={gender}
            selectedtype="gender"
            onChangeHandler={genderChangeHandler}
            className={activeFilter === "gender" ? "d-block" : "d-none"}
          />
        </ul>
      </div>
      <div>
        <button className="btn" onClick={() => closeFilters(false)}>
          CLOSE
        </button>
      </div>
    </div>
  );
}
