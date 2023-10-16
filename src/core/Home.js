import React, { useEffect, useCallback, useMemo } from "react";
import Base from "./Base";
import Card from "./card";
import styles from "../css/Home.module.css";
import { debounce } from "lodash";
import FilterComponent from "./FilterComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedBrandFilter,
  addSelectedCategoryFilter,
  addSelectedPriceFilter,
  addSelectedSizeFilter,
  filterProductBasedOnPriceFilter,
  filterProductsBasedOnBrands,
  filterProductsBasedOnCategories,
  filterProductsBasedOnGender,
  filterProductsBasedSize,
  setfilteredProducts,
  removeSelctedPriceFilter,
  removeSelectedBrandFilter,
  removeSelectedCategoryFilter,
  removeSelectedSizeFilter,
  resetFiltersOptions,
  setBrandFilterOptions,
  setPriceFilterOptions,
  setSelectedBrand,
  setproductstofilter,
} from "../store/filterslice";
import { getUniqueObjects } from "../store/helpers";
import ShimmerCardContainer from "./ShimmerContainer";

function Home() {

  const dispatcher = useDispatch();
  const productstate = useSelector((state) => state.products);
  const filteroptions = useSelector((state) => state.filteroptions);
  const { loading, products } = productstate;
  const {
    categoryFilterOptions,
    brandFilterOptions,
    priceFilterOptions,
    sizeFilterOptions,
    genderFilterOptions,
    selectedPriceFilterOptions,
    selectedBrandFilterOptions,
    selectedCategoryFilterOptions,
    selectedSizeFilterOptions,
    selectedGenderFilter,
    filteredProducts,
    categoryfilterproducts,
    brandfilteredproducts,
    sizefilteredproducts,
    genderFilteredproducts,
    pricefilteredproducts,
  } = filteroptions;
  const param = useParams();
  const { category } = param;
  const currentproductstofilter = useMemo(() => {
    return products.filter((product) => {
      if (category === "Men" || category === "Women") {
        return (
          product?.category?.name === "Dress" &&
          product.tags.includes(category.toLowerCase())
        );
      } else {
        return product?.category?.name === category;
      }
    });
  }, [products, category]);

  const slicedproductstofilter = useMemo(() => {
    return products.slice(0, 72);
  }, [products]);

  const reset = useCallback(() => {
    dispatcher(resetFiltersOptions());
  }, [dispatcher]);

  useEffect(() => {
    if (!loading && products.length) {
      if (category !== undefined) {
        dispatcher(setfilteredProducts(currentproductstofilter));
        dispatcher(setproductstofilter(currentproductstofilter));
      } else {
        dispatcher(setfilteredProducts(slicedproductstofilter));
        dispatcher(setproductstofilter(slicedproductstofilter));
      }
      dispatcher(
        setBrandFilterOptions({
          products,
          category,
        })
      );
      dispatcher(
        setPriceFilterOptions({
          products,
        })
      );
    }
    return () => {
      reset();
    };
  }, [category, dispatcher, reset, products, loading]);

  useEffect(() => {
    let appliedfilters = [];
    if (selectedCategoryFilterOptions.length) {
      appliedfilters = categoryfilterproducts;
    }
    if (selectedBrandFilterOptions.length) {
      appliedfilters = brandfilteredproducts;
    }
    if (selectedPriceFilterOptions.length) {
      dispatcher(filterProductBasedOnPriceFilter({ category }));
    } else {
      if (category !== undefined) {
        if (selectedSizeFilterOptions.length) {
          appliedfilters = sizefilteredproducts;
        }
        if (appliedfilters.length) {
          dispatcher(setfilteredProducts(getUniqueObjects(appliedfilters)));
        } else {
          dispatcher(setfilteredProducts(currentproductstofilter));
        }
      } else {
        if (appliedfilters.length) {
          dispatcher(setfilteredProducts(getUniqueObjects(appliedfilters)));
        } else {
          dispatcher(setfilteredProducts(slicedproductstofilter));
        }
      }
    }
  }, [selectedPriceFilterOptions]);

  useEffect(() => {
    let appliedfilters = [];

    if (selectedPriceFilterOptions.length) {
      appliedfilters = pricefilteredproducts;
    }
    if (selectedSizeFilterOptions.length) {
      appliedfilters = sizefilteredproducts;
    }

    if (selectedBrandFilterOptions.length) {
      dispatcher(filterProductsBasedOnBrands({ category }));
    } else {
      if (category !== undefined) {
        if (appliedfilters.length) {
          dispatcher(setfilteredProducts(appliedfilters));
          dispatcher(
            setPriceFilterOptions({
              products: appliedfilters,
            })
          );
        } else {
          const productstodispatch = currentproductstofilter;
          dispatcher(setfilteredProducts(productstodispatch));
          dispatcher(
            setPriceFilterOptions({
              products: productstodispatch,
            })
          );
        }
      } else {
        if (selectedGenderFilter.length) {
          appliedfilters = genderFilteredproducts;
        }
        if (selectedCategoryFilterOptions.length) {
          appliedfilters = categoryfilterproducts;
        }
        if (appliedfilters.length) {
          dispatcher(setfilteredProducts(getUniqueObjects(appliedfilters)));
        } else {
          dispatcher(setfilteredProducts(slicedproductstofilter));
        }
      }
    }
  }, [selectedBrandFilterOptions]);

  useEffect(() => {
    let appliedfilters = [];
    if (selectedGenderFilter.length) {
      appliedfilters = genderFilteredproducts;
    }
    if (selectedBrandFilterOptions.length) {
      appliedfilters = brandfilteredproducts;
    }
    if (selectedPriceFilterOptions.length) {
      appliedfilters = pricefilteredproducts;
    }
    if (selectedCategoryFilterOptions.length) {
      dispatcher(filterProductsBasedOnCategories({ category }));
    } else {
      if (appliedfilters.length) {
        dispatcher(
          setBrandFilterOptions({
            products: appliedfilters,
            category,
          })
        );
        dispatcher(
          setPriceFilterOptions({
            products: appliedfilters,
          })
        );
        dispatcher(setfilteredProducts(appliedfilters));
      } else {
        dispatcher(
          setBrandFilterOptions({
            products: slicedproductstofilter,
            category,
          })
        );
        dispatcher(
          setPriceFilterOptions({
            products: slicedproductstofilter,
          })
        );
        dispatcher(setfilteredProducts(slicedproductstofilter));
      }
    }
  }, [selectedCategoryFilterOptions]);

  useEffect(() => {
    let appliedfilters = [];

    if (selectedSizeFilterOptions.length) {
      dispatcher(filterProductsBasedSize({ category }));
    } else {
      if (category !== undefined) {
        if (selectedGenderFilter.length) {
          appliedfilters = genderFilteredproducts;
        }
        if (selectedCategoryFilterOptions.length) {
          appliedfilters = categoryfilterproducts;
        }
        if (selectedBrandFilterOptions.length) {
          appliedfilters = brandfilteredproducts;
        }
        if (selectedPriceFilterOptions.length) {
          appliedfilters = pricefilteredproducts;
        }
        if (appliedfilters.length) {
          dispatcher(setfilteredProducts(appliedfilters));
          dispatcher(
            setPriceFilterOptions({
              products: appliedfilters,
            })
          );
        } else {
          const productstodispatch = currentproductstofilter;
          dispatcher(setfilteredProducts(productstodispatch));
          dispatcher(
            setPriceFilterOptions({
              products: productstodispatch,
            })
          );
        }
      }
    }
  }, [selectedSizeFilterOptions]);

  useEffect(() => {
    if (selectedGenderFilter.trim() !== "") {
      dispatcher(filterProductsBasedOnGender({ category }));
    } else {
      if (category === undefined) {
        dispatcher(
          setBrandFilterOptions({
            products: slicedproductstofilter,
            category,
          })
        );
        dispatcher(
          setPriceFilterOptions({
            products: slicedproductstofilter,
          })
        );
        dispatcher(setfilteredProducts(slicedproductstofilter));
      }
    }
  }, [selectedGenderFilter]);

  if (loading) {
    return (
      <Base title="Welcome to PlanetShop" className="p-1">
        <ShimmerCardContainer />
      </Base>
    );
  }

  function categoryOnChangeHandler(selectedcategory, ischecked) {
    if (ischecked) {
      dispatcher(addSelectedCategoryFilter(selectedcategory));
    } else {
      dispatcher(removeSelectedCategoryFilter(selectedcategory));
    }
  }
  function brandsOnChangeHandler(brand, ischecked) {
    if (ischecked) {
      dispatcher(addSelectedBrandFilter(brand));
    } else {
      dispatcher(removeSelectedBrandFilter(brand));
    }
  }
  function priceOnChangeHandler(price, ischecked) {
    if (ischecked) {
      dispatcher(addSelectedPriceFilter(price));
    } else {
      dispatcher(removeSelctedPriceFilter(price));
    }
  }
  function sizeOnchangeHandler(size, ischecked) {
    if (ischecked) {
      dispatcher(addSelectedSizeFilter(size));
    } else {
      dispatcher(removeSelectedSizeFilter(size));
    }
}
  function genderFilterOnChangeHandler(gender) {
    dispatcher(setSelectedBrand(gender));
  }

  const sortArray = debounce((type) => {
    if (type === "default") {
      dispatcher(setfilteredProducts(filteredProducts));
      return;
    }
    let sorted;
    if (type === "High") {
      sorted = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else {
      sorted = [...filteredProducts].sort((a, b) => a.price - b.price);
    }
    dispatcher(setfilteredProducts(sorted));
  }, 1000);

  document.body.style = "background: #343a40;";
  return (
    <Base title="Welcome to PlanetShop" className="p-1">
      <div className="p-1 my-2 d-flex align-items-center justify-content-between border-bottom border-light-subtle">
        <p className="fw-bold">FILTERS</p>
        <div className={`${styles.selectcontainer}`}>
          <select
            onChange={(e) => {
              sortArray(e.target.value);
            }}
            className="form-select mx-2"
            aria-label="Default select example"
            placeholder="Sort"
          >
            <option defaultValue value="default" id="sortby">
              Sort By
            </option>
            <option value="High">Price: High To Low</option>
            <option value="Low">Price: Low To High</option>
          </select>
        </div>
      </div>
      <div className="d-flex">
        <FilterComponent
          categories={
            category === undefined ? categoryFilterOptions.slice(2) : []
          }
          brands={brandFilterOptions}
          gender={category === undefined ? genderFilterOptions : []}
          price={priceFilterOptions}
          sizes={
            category === "Men" || category === "Women" ? sizeFilterOptions : []
          }
          categoriesfilterHandler={categoryOnChangeHandler}
          brandsfilterHandler={brandsOnChangeHandler}
          pricefilterHandler={priceOnChangeHandler}
          sizefilterHandler={sizeOnchangeHandler}
          genderfilterHandler={genderFilterOnChangeHandler}
        />
        <div className={`${styles.itemscontainer}`}>
          {filteredProducts?.map((product) => {
            return <Card key={product._id} product={product} />;
          })}
        </div>
      </div>
    </Base>
  );
}
export default React.memo(Home);