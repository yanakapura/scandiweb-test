import React from "react";

const productContext = React.createContext({
  categories: [],
  currencies: [],
  selectedCategory: [],
  selectedCurrency: "$",
  selectedProduct: "",
  cartOverlay: false,
  cartProducts: [],
  inputs: [],
  tax: 0
});

export default productContext;
