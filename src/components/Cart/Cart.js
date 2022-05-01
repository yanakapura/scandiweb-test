import React, { Component } from "react";
import productContext from "../../store/context";
import "./Cart.css";
import CartList from "./CartList";
// import CartItem from "./CartItem";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    }
    this.calcTotal = this.calcTotal.bind(this);
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
        ).amount * productNumber
    }
    this.setState({
      total: (sum * (1 + this.context.tax)).toFixed(2),
      taxTotal: (sum * (1 + this.context.tax) - sum).toFixed(2)
    });

    return sum.toFixed(2);
  }

  componentDidMount() {
    this.timerID = setTimeout(() => this.calcTotal(), 100);
  }

  render() {
    return (
      <main className="cart">
        <div className="cart__header">
          <h1 className="cart__title">Cart</h1>
        </div>
        <div className="cart__products-list">
          <CartList calcTotal={(el)=>this.calcTotal(el)} cartToDelete={(el)=>this.props.cartToDelete(el)}/>
        </div>
        <div className="cart__order order">
          <p className="order__label">
            Tax: <span>{this.state.taxTotal}{this.context.selectedCurrency}</span>
          </p>
          <p className="order__label">
            Qty: <span>{this.context.cartProducts.length}</span>
          </p>
          <h4 className="order__total">
            Total: <span>{this.state.total}&nbsp;{this.context.selectedCurrency}</span>
          </h4>
          <button className="btn btn-green order__btn">Order</button>
        </div>
      </main>
    );
  }
}
Cart.contextType = productContext;

export default Cart;
