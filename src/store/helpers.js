export const pricefilter = (
  products,
  category,
  selectedPriceFilterOptions,
  priceFilterOptions
) => {
  return products?.filter((product) => {
    if (category === undefined) {
      return selectedPriceFilterOptions.some((range) => {
        if (
          range[1] ===
          priceFilterOptions[priceFilterOptions.length - 1].value[1]
        ) {
          return product.price >= range[0];
        }
        return product.price >= range[0] && product.price <= range[1];
      });
    }
    let productcategorycondition;
    if (category === "Men" || category === "Women") {
      productcategorycondition =
        product?.category?.name === "Dress" &&
        product.tags.includes(category.toLowerCase());
    } else {
      productcategorycondition = product?.category?.name === category;
    }
    return (
      productcategorycondition &&
      selectedPriceFilterOptions.some((range) => {
        if (
          range[1] ===
          priceFilterOptions[priceFilterOptions.length - 1].value[1]
        ) {
          return product.price >= range[0];
        }
        return product.price >= range[0] && product.price <= range[1];
      })
    );
  });
};
export const sizefilter = (products, category, selectedSizeFilterOptions) => {
  return products?.filter((product) => {
    // console.log(product)
    const sizes = product.size.map((size) => size.name);
    if (category === undefined) {
      return selectedSizeFilterOptions.some((size) => sizes.includes(size));
    }

    return (
      product?.category?.name === "Dress" &&
      product?.tags?.includes(category.toLowerCase()) &&
      selectedSizeFilterOptions.some((size) => sizes?.includes(size))
    );
  });
};
export const genderFilter = (products, category, selectedGenderFilter) => {
  if (category === undefined) {
    return products.filter((product) => {
      return product.tags.includes(selectedGenderFilter.toLowerCase());
    });
  }
};
export const categoryFilter = (products, selectedCategoryFilterOptions) => {
  // console.log(products)
  return products.filter((product) => {
    return selectedCategoryFilterOptions.includes(product?.category?.name);
  });
};
export const brandFilter = (products, selectedBrandFilterOptions) => {
  return products.filter((product) => {
    return selectedBrandFilterOptions.includes(product.brand.toLowerCase());
  });
};
export const getbrandoptions = (products, category) => {
  return [
    ...new Set(
      products
        .filter((item) => {
          if (category === undefined) {
            return item;
          }
          if (category === "Men" || category === "Women") {
            return (
              item?.category?.name === "Dress" &&
              item.tags.includes(category.toLowerCase())
            );
          }
          return item?.category?.name === category;
        })
        .map((item) => {
          return item?.brand?.toLowerCase();
        })
    ),
  ];
};
export const getpriceoptions = (products) => {
  const { minPrice, maxPrice } = products.reduce(
    (acc, product) => ({
      minPrice: Math.min(acc.minPrice, product.price),
      maxPrice: Math.max(acc.maxPrice, product.price),
    }),
    { minPrice: Infinity, maxPrice: -Infinity }
  );

  const priceRange = Math.floor((maxPrice - minPrice) / 4);
  const priceRanges = [
    {
      label: `Under Rs.${minPrice + priceRange}`,
      value: [0, minPrice + priceRange],
    },
    {
      label: `Rs.${minPrice + priceRange} - Rs.${minPrice + priceRange * 2}`,
      value: [minPrice + priceRange, minPrice + priceRange * 2],
    },
    {
      label: `Rs.${minPrice + priceRange * 2} - Rs.${
        minPrice + priceRange * 3
      }`,
      value: [minPrice + priceRange * 2, minPrice + priceRange * 3],
    },
    {
      label: `Rs.${minPrice + priceRange * 3} and above`,
      value: [minPrice + priceRange * 3, maxPrice],
    },
  ];
  return priceRanges;
};
function getUniqueObjects(arr) {
  return Array.from(new Set(arr.map((product) => product._id))).map((id) =>
    arr.find((product) => product._id === id)
  );
}
export { getUniqueObjects };

