import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCategories,
  getAllsizeoptions,
} from "../core/helper/coreapicalls";
import {
  brandFilter,
  categoryFilter,
  genderFilter,
  getbrandoptions,
  getpriceoptions,
  pricefilter,
  sizefilter,
} from "./helpers";

const initialState = {
  categoryFilterOptions: [],
  brandFilterOptions: [],
  priceFilterOptions: [],
  sizeFilterOptions: [],
  genderFilterOptions: ["Men", "Women"],
  categoryFilterOptionsLoading: false,
  sizeFilterOptionsLoading: false,
  categoryFilterOptionsError: false,
  sizeFilterOptionsError: false,
  selectedPriceFilterOptions: [],
  selectedBrandFilterOptions: [],
  selectedCategoryFilterOptions: [],
  selectedSizeFilterOptions: [],
  selectedGenderFilter: "",
  filteredProducts: [],
  productstofilter: [],
  categoryfilterproducts: [],
  brandfilteredproducts: [],
  sizefilteredproducts: [],
  genderFilteredproducts: [],
  pricefilteredproducts: [],
  orderoffilteredProducts: []
};
const getCategories = createAsyncThunk("getCategories", async () => {
  const data = await getAllCategories();
  return data;
});
const getSizeOptions = createAsyncThunk("getSizeOptions", async () => {
  const data = await getAllsizeoptions();
  return data;
});
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrandFilterOptions: (state, action) => {
      const { products, category } = action.payload;
      state.brandFilterOptions = getbrandoptions(products, category);
    },
    setPriceFilterOptions: (state, action) => {
      const { products } = action.payload;
      state.priceFilterOptions = getpriceoptions(products);
    },
    setGenderFilter: (state, action) => {
      state.genderFilter = action.payload;
    },
    addSelectedPriceFilter: (state, action) => {
      state.selectedPriceFilterOptions.push(action.payload);
    },
    removeSelctedPriceFilter: (state, action) => {
      state.selectedPriceFilterOptions =
        state.selectedPriceFilterOptions.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
        );
    },
    addSelectedBrandFilter: (state, action) => {
      state.selectedBrandFilterOptions.push(action.payload);
    },
    removeSelectedBrandFilter: (state, action) => {
      state.selectedBrandFilterOptions =
        state.selectedBrandFilterOptions.filter(
          (branditem) => branditem !== action.payload
        );
    },
    addSelectedCategoryFilter: (state, action) => {
      state.selectedCategoryFilterOptions.push(action.payload);
    },
    removeSelectedCategoryFilter: (state, action) => {
      state.selectedCategoryFilterOptions =
        state.selectedCategoryFilterOptions.filter(
          (item) => item !== action.payload
        );
    },
    addSelectedSizeFilter: (state, action) => {
      state.selectedSizeFilterOptions.push(action.payload);
    },
    addorderfilteredProducts: (state, action) => {
      state.orderoffilteredProducts.push(action.payload);
    },
    removeorderfilteredProducts: (state, action) => {
      state.orderoffilteredProducts.pop()
    },
    removeSelectedSizeFilter: (state, action) => {
      state.selectedSizeFilterOptions = state.selectedSizeFilterOptions.filter(
        (item) => item !== action.payload
      );
    },
    resetFiltersOptions: (state, action) => {
      state.selectedPriceFilterOptions = [];
      state.selectedBrandFilterOptions = [];
      state.selectedCategoryFilterOptions = [];
      state.selectedSizeFilterOptions = [];
      state.selectedGenderFilter = "";
      state.brandFilterOptions = [];
      state.priceFilterOptions = [];
      state.pricefilteredproducts = [];
      state.brandfilteredproducts = [];
      state.categoryfilterproducts = [];
      state.genderFilteredproducts = [];
      state.sizefilteredproducts = [];
      state.productstofilter = [];
      state.filteredProducts = [];
    },
    setSelectedBrand: (state, action) => {
      state.selectedGenderFilter = action.payload;
    },
    setfilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    filterProductsBasedOnBrands: (state, action) => {
      let filteredProducts;
      let productstofilter = [];
      if (state.selectedGenderFilter !== "") {
        productstofilter=state.genderFilteredproducts;
      }
      if (state.selectedCategoryFilterOptions.length) {
        productstofilter = state.categoryfilterproducts;
      }
      if (state.selectedPriceFilterOptions.length) {
        productstofilter=state.pricefilteredproducts;
      }
      if (state.selectedSizeFilterOptions.length) {
        productstofilter=state.sizefilteredproducts;
      }
      if (!productstofilter.length) {
        productstofilter = state.productstofilter;
      }

      filteredProducts = brandFilter(
        productstofilter,
        state.selectedBrandFilterOptions
      );
      const priceRanges = getpriceoptions(filteredProducts);
      state.priceFilterOptions = priceRanges;
      state.brandfilteredproducts = filteredProducts;
      state.filteredProducts = filteredProducts;
    },
    filterProductsBasedOnCategories: (state, action) => {
      const { category } = action.payload;
      let filteredProducts;
      let productstofilter = [];
      if (state.selectedGenderFilter !== "") {
        productstofilter=state.genderFilteredproducts;
      }
      if (state.selectedPriceFilterOptions.length) {
        productstofilter=state.pricefilteredproducts;
      }
      if (state.selectedSizeFilterOptions.length) {
        productstofilter=state.sizefilteredproducts;
      }
      if (!productstofilter.length) {
        productstofilter = state.productstofilter;
      }
      filteredProducts = categoryFilter(
        productstofilter,
        state.selectedCategoryFilterOptions
      );
      const brands = getbrandoptions(filteredProducts, category);
      const priceRanges = getpriceoptions(filteredProducts);
      state.priceFilterOptions = priceRanges;
      state.brandFilterOptions = brands;
      state.categoryfilterproducts = filteredProducts;
      state.filteredProducts = filteredProducts;
    },
    filterProductBasedOnPriceFilter: (state, action) => {
      const { category } = action.payload;
      let filteredProducts;
      let productstofilter = [];
      if (state.selectedGenderFilter !== "") {
        productstofilter = state.genderFilteredproducts;
      }
      if (state.selectedCategoryFilterOptions.length) {
        productstofilter = state.categoryfilterproducts;
      }
      if (state.selectedBrandFilterOptions.length) {
        productstofilter = state.brandfilteredproducts;
      }

      if (state.selectedSizeFilterOptions.length) {
        productstofilter = state.sizefilteredproducts;
      }

      if (!productstofilter.length) {
        productstofilter = state.productstofilter;
      }
      filteredProducts = pricefilter(
        productstofilter,
        category,
        state.selectedPriceFilterOptions,
        state.priceFilterOptions
      );

      state.pricefilteredproducts = filteredProducts;
      state.filteredProducts = filteredProducts;
    },
    filterProductsBasedOnGender: (state, action) => {
      const { category } = action.payload;
      let filteredProducts;
      let productstofilter = [];

      if (state.selectedGenderFilter.trim() !== "") {
        if (state.selectedCategoryFilterOptions.length) {
          productstofilter = state.categoryfilterproducts;
        }
        if (state.selectedBrandFilterOptions.length) {
          productstofilter = state.brandfilteredproducts;
        }
        if (state.selectedPriceFilterOptions.length) {
          productstofilter = state.pricefilteredproducts;
        }
        if (!productstofilter.length) {
          productstofilter = state.productstofilter;
        }
        filteredProducts = genderFilter(
          productstofilter,
          category,
          state.selectedGenderFilter
        );
      }

      const brands = getbrandoptions(filteredProducts, category);
      const priceRanges = getpriceoptions(filteredProducts);
      state.priceFilterOptions = priceRanges;
      state.brandFilterOptions = brands;
      state.genderFilteredproducts = filteredProducts;
      state.filteredProducts = filteredProducts;
    },
    filterProductsBasedSize: (state, action) => {
      const { category } = action.payload;
      let filteredProducts;
      let productstofilter = [];
      if (state.selectedCategoryFilterOptions.length) {
        productstofilter = state.categoryfilterproducts;
      }
      if (state.selectedBrandFilterOptions.length) {
        productstofilter = state.brandfilteredproducts;
      }
      if (state.selectedPriceFilterOptions.length) {
        productstofilter = state.pricefilteredproducts;
      }
      if (state.selectedGenderFilter !== "") {
        productstofilter = state.genderFilteredproducts;
      }
      if (!productstofilter.length) {
        productstofilter = state.productstofilter;
      }

      filteredProducts = sizefilter(
        productstofilter,
        category,
        state.selectedSizeFilterOptions
      );

      state.sizefilteredproducts = [...new Set(filteredProducts)];
      state.filteredProducts = filteredProducts;
    },
    setproductstofilter: (state, action) => {
      state.productstofilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.categoryFilterOptionsLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categoryFilterOptionsLoading = false;
      state.categoryFilterOptions = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.categoryFilterOptionsLoading = false;
      state.categoryFilterOptionsError = action.error.message;
    });
    builder.addCase(getSizeOptions.pending, (state, action) => {
      state.sizeFilterOptionsLoading = true;
    });
    builder.addCase(getSizeOptions.fulfilled, (state, action) => {
      state.sizeFilterOptionsLoading = false;
      state.sizeFilterOptions = action.payload;
    });
    builder.addCase(getSizeOptions.rejected, (state, action) => {
      state.sizeFilterOptionsLoading = false;
      state.sizeFilterOptionsError = action.error.message;
    });
  },
});

export const {
  setBrandFilterOptions,
  setPriceFilterOptions,
  setGenderFilter,
  addSelectedPriceFilter,
  removeSelctedPriceFilter,
  addSelectedBrandFilter,
  removeSelectedBrandFilter,
  addSelectedCategoryFilter,
  removeSelectedCategoryFilter,
  addSelectedSizeFilter,
  removeSelectedSizeFilter,
  resetFiltersOptions,
  setSelectedBrand,
  setfilteredProducts,
  filterProductsBasedOnCategories,
  filterProductBasedOnPriceFilter,
  filterProductsBasedOnBrands,
  filterProductsBasedOnGender,
  filterProductsBasedSize,
  setproductstofilter,
} = filtersSlice.actions;
export { getCategories, getSizeOptions };
export default filtersSlice.reducer;
