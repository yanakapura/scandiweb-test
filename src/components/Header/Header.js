import React from "react";
import "./Header.css";
import cart from "../../UI/EmptyCart.svg";
import Navigation from "./Navigation";
import Currencies from "./Currencies";
import CartOverlay from "./CartOverlay";
import productContext from "../../store/context";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryName: "",
    };
    this.changeNavigation = this.changeNavigation.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.cartOverlayHandler = this.cartOverlayHandler.bind(this);
    this.cartToDelete = this.cartToDelete.bind(this);
  }

  changeNavigation(selectedCategoryName) {
    this.setState({ selectedCategoryName: selectedCategoryName });
    this.props.onNavigation(selectedCategoryName);
  }

  changeCurrency(currencySelected) {
    console.log(currencySelected);
    currencySelected && this.props.onCurrency(currencySelected);
  }
  // && !e.target.classList.contains("cart-overlay")
  clickHandler(e) {
    if (e.target.classList.contains("cart-overlay__wrapper")) {
      this.props.onCloseCartOverlay();
    }
  }

  cartOverlayHandler(e) {
    if (
      e.target.classList.contains("cart__img")
    ) {
      this.props.onCart(e.target.dataset.id);
    }
  }

  cartToDelete(el) {
    console.log(el);
    this.props.cartToDelete(el)
  }

  render() {
    return (
      <header className="header" onClick={this.clickHandler}>
        <Navigation onNavigationChange={this.changeNavigation} />
        <div className="actions">
          <Currencies onCurrencySet={this.changeCurrency} />
          <img className="cart__img" src={cart} onClick={this.cartOverlayHandler} />
        </div>
        {this.context.cartOverlay && <CartOverlay cartToDelete={this.cartToDelete}/>}
      </header>
    );
  }
}

Header.contextType = productContext;

export default Header;
