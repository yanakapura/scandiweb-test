import React from "react";

const productContext = React.createContext({
  categories: [],
  currencies: [],
  selectedCategory: [],
  selectedCurrency: "$",
  selectedProduct: "",
  cartOverlay: false,
  cartProducts: [],
  inputs: []
});

export default productContext;
