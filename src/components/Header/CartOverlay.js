import React, { Component } from "react";
import "./CartOverlay.css";
import productContext from "../../store/context";

class CartOverlay extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
      total: 0,
      // repeatingProduct: 0,
      //   cart: JSON.parse(sessionStorage.getItem("cart")),
      //   inputs: JSON.parse(sessionStorage.getItem("inputs")),
    };
    this.isSelected = this.isSelected.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
    this.counter = this.counter.bind(this);
  }

  isSelected(productId, attributeName, itemValue) {
    for (let input of this.context.inputs) {
      if (
        input[0] === productId &&
        input[1] === itemValue &&
        input[2] === attributeName
      ) {
        return true;
      }
    }
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
        ).amount *
          productNumber;
    }
    this.setState({
      total: sum.toFixed(2),
    });

    return sum.toFixed(2);
  }

  counter(e) {
    if (e.target.id === "counter-plus") {
      document.querySelectorAll("input[type='number']").forEach((input) => {
        input.id === e.target.nextSibling.id && ++input.value;
      });
    } else if (e.target.id === "counter-minus") {
      document.querySelectorAll("input[type='number']").forEach((input) => {
        if (input.id === e.target.previousSibling.id && input.value <= 1) {
          const str =
            e.target.parentNode.previousSibling.childNodes[0].textContent;
          const elementToDelete = this.context.cartProducts.find((product) =>
            str.includes(product.name)
          );
          this.props.cartToDelete(elementToDelete);
        } else {
          input.id === e.target.previousSibling.id && --input.value;
        }
      });
    }

    setTimeout(() => this.calcTotal(), 100);
  }

  componentDidMount() {
    this.timerID = setTimeout(() => this.calcTotal(), 300);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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
                      {
                        product.prices.find(
                          (price) =>
                            price.currency.symbol ===
                            this.context.selectedCurrency
                        ).amount
                      }
                      &nbsp;
                      {
                        product.prices.find(
                          (price) =>
                            price.currency.symbol ===
                            this.context.selectedCurrency
                        ).currency.symbol
                      }
                    </p>
                  </div>
                  <ul>
                    {product.attributes.map((attribute) => (
                      <li className="cart-overlay__list">
                        {attribute.items.map((item) => (
                          <>
                            {" "}
                            {item.value === "Yes" && attribute.name}
                            <div
                              className={`cart-overlay__value ${
                                !this.isSelected(
                                  product.id,
                                  attribute.name,
                                  item.value
                                ) && "cart-overlay__value-disable"
                              }`}
                              style={{
                                backgroundColor:
                                  attribute.name === "Color" ? item.value : "",
                              }}
                            >
                              {attribute.name === "Color" ? "" : item.value}
                            </div>
                          </>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="cart-overlay__counter" onClick={this.counter}>
                  <span id="counter-plus"></span>
                  {/* {this.state.counter} */}
                  <input
                    className="counter-input"
                    id={product.id + "_counter"}
                    type="number"
                    defaultValue="1"
                    min="1"
                  />
                  <span id="counter-minus"></span>
                </div>
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
            <button className="btn cart-overlay__btn">View bag</button>
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
