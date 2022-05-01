import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCTS } from "./gql/Query";
import Header from "./components/Header/Header";
import "./App.css";
import productContext from "./store/context";
import PLP from "./components/PLP/PLP";
import PDP from "./components/PDP/PDP";
import Cart from "./components/Cart/Cart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PLP: true,
      PDP: false,
      Cart: false,
      selectedCategory: this.props.data,
      selectedCurrency: "$",
      categories: this.props.data.categories,
      currencies: [],
      selectedProduct: "",
      cartOverlay: false,
      cartProducts: [],
      inputs: [],
    };
    this.updateState = this.updateState.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.loadPDP = this.loadPDP.bind(this);
    this.cartOverlayHandler = this.cartOverlayHandler.bind(this);
    this.closeCartOverlay = this.closeCartOverlay.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.cartToDelete = this.cartToDelete.bind(this);
    this.loadCart = this.loadCart.bind(this);
  }

  updateState(selectedCategoryName) {
    selectedCategoryName &&
      this.setState({
        selectedCategory: this.state.categories.filter((category) => {
          return category.name === selectedCategoryName;
        })[0],
        PLP: true,
        PDP: false,
        Cart: false,
      });
  }

  changeCurrency(currency) {
    this.setState((state) => ({
      selectedCurrency: currency,
    }));
    console.log(this.state.PLP);
  }

  componentDidMount() {
    this.timerID = setTimeout(() => this.tick(), 500);
    this.setState({
      cartProducts: JSON.parse(sessionStorage.getItem("cart")) || [],
      inputs: JSON.parse(sessionStorage.getItem("inputs")) || [],
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState((state) => ({
      selectedCategory: this.props.data.categories[0],
      categories: this.props.data.categories,
      selectedCurrency: this.props.data.currencies[0].symbol,
    }));
  }

  loadPDP(productId, toLoadPDP = true) {
    const product = {
      ...this.state.selectedCategory.products.filter(
        (product) => product.id === productId
      )[0],
    };
    this.setState((state) => ({
      selectedProduct: product,
    }));
    toLoadPDP && this.setState({ PLP: false, PDP: true, Cart: false });
  }

  loadCart() {
    this.setState({ PLP: false, PDP: false, Cart: true, cartOverlay: false });
  }

  cartOverlayHandler() {
    this.setState((state) => ({
      cartOverlay: !state.cartOverlay,
    }));
    document.querySelector("main").classList.toggle("brightness");
  }

  closeCartOverlay() {
    this.setState((state) => ({
      cartOverlay: false,
    }));
    document.querySelector("main").classList.remove("brightness");
  }

  addToCart(arr) {
    const repeatingProduct = this.state.cartProducts
      .map((product) => product.id)
      .filter((id) => id === this.state.selectedProduct.id);
    //   console.log(repeatingProduct.length);
    if (repeatingProduct.length === 0) {
      this.setState((state) => ({
        cartProducts: [
          ...new Set([...state.cartProducts, this.state.selectedProduct]),
        ],
      }));

      const strSelectedProduct = JSON.stringify([
        ...this.state.cartProducts,
        this.state.selectedProduct,
      ]);
      sessionStorage.setItem("cart", strSelectedProduct);
    }
    this.setState((state) => ({
      inputs: [...new Set([...state.inputs, ...arr])],
    }));
    const strInputs = JSON.stringify([...this.state.inputs, ...arr]);
    sessionStorage.setItem("inputs", strInputs);
  }

  cartToDelete(elementToDelete) {
    console.log(elementToDelete);
    this.setState((state) => ({
      cartProducts: state.cartProducts.filter(
        (product) => product.id !== elementToDelete.id
      ),
    }));

    const newInputs = JSON.parse(sessionStorage.getItem("inputs")).filter(
      (input) => input[0] !== elementToDelete.id
    );
    console.log("nuw inputs = ", newInputs);
    const newCart = JSON.parse(sessionStorage.getItem("cart")).filter(
      (product) => product.id !== elementToDelete.id
    );
    const strNewCart = JSON.stringify(newCart);
    const strInputs = JSON.stringify(newInputs);
    sessionStorage.setItem("cart", strNewCart);
    sessionStorage.setItem("inputs", strInputs);
  }

  render() {
    // console.log();
    // const str = JSON.stringify(this.state.selectedProduct)
    // console.log(str);
    // sessionStorage.setItem("object", str)
    // console.log(JSON.parse(str));
    return (
      <React.Fragment>
        <productContext.Provider
          value={{
            categories: this.state.categories,
            currencies: this.props.data.currencies,
            selectedCategory: this.state.selectedCategory,
            selectedCurrency: this.state.selectedCurrency,
            selectedProduct: this.state.selectedProduct,
            cartOverlay: this.state.cartOverlay,
            cartProducts: this.state.cartProducts,
            inputs: this.state.inputs,
            tax: 0.15
          }}
        >
          <Header
            onNavigation={this.updateState}
            onCurrency={this.changeCurrency}
            onCloseCartOverlay={this.closeCartOverlay}
            onCart={this.cartOverlayHandler}
            cartToDelete={this.cartToDelete}
            onViewBag={this.loadCart}
          />
          {this.state.PLP && (
            <PLP onProduct={this.loadPDP} onAddToCart={this.addToCart} />
          )}
          {this.state.PDP && <PDP onAddToCart={this.addToCart} />}
          {this.state.Cart && <Cart cartToDelete={this.cartToDelete}/>}
        </productContext.Provider>
      </React.Fragment>
    );
  }
}

export default graphql(GET_PRODUCTS)(App);
// export default App;
