import React, { Component } from "react";
import "./CartOverlay.css";
import productContext from "../../store/context";
import Attributes from "../Product/Attributes";
import Price from "../Product/Price";
import Counter from "../Product/Counter";

class CartOverlay extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
      total: 0,
    };
    this.calcTotal = this.calcTotal.bind(this);
    this.cartToDelete = this.cartToDelete.bind(this);
  }

  calcTotal() {
    let sum = 0;
    for (let product of this.context.cartProducts) {
      const productNumber =
        document.getElementById(product.id + "_counter")?.value || 1;
      sum =
        sum +
        product.prices.find(
          (price) => price.currency.symbol === this.context.selectedCurrency
        ).amount * productNumber * (1 + this.context.tax)

    }
    this.setState({
      total: sum.toFixed(2),
    });

    return sum.toFixed(2);
  }

  componentDidMount() {
    this.timerID = setTimeout(() => this.calcTotal(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  cartToDelete(elementToDelete) {
    this.props.cartToDelete(elementToDelete);
  }

  render() {
    return (
      <>
        <div className="cart-overlay__wrapper"></div>
        <div className="cart-overlay">
          <h3 className="cart-overlay__title">
            <span>My bag</span>, {this.context.cartProducts.length} items
          </h3>
          <ul>
            {this.context.cartProducts.map((product) => (
              <li className="cart-overlay__item" id={product.id}>
                <div className="cart-overlay__info">
                  <div>
                    <h4 className="cart-overlay__name">
                      {product.brand}&nbsp;{product.name}
                    </h4>
                    <p className="cart-overlay__price">
                      <Price product={product} />
                    </p>
                  </div>
                  {<Attributes product={product} showAttributeName={false} />}
                </div>
                <Counter
                  cartToDelete={this.cartToDelete}
                  product={product}
                  calcTotal={() => this.calcTotal()}
                />
                <div className="cart-overlay__image">
                  <img src={product.gallery[0]} />
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-overlay__total">
            <h3 className="cart-overlay__title">Total</h3>
            <span id="total">
              {this.state.total}&nbsp;{this.context.selectedCurrency}
            </span>
          </div>
          <div className="cart-overlay__buttons">
            <button className="btn cart-overlay__btn view-bag__btn">
              View bag
            </button>
            <button className="btn cart-overlay__btn btn-green">
              Check out
            </button>
          </div>
        </div>
      </>
    );
  }
}

CartOverlay.contextType = productContext;

export default CartOverlay;
