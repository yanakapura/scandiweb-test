import React, { Component } from "react";
import "./PDPPrice.css";
import productContext from "../../store/context";

class PDPPrice extends Component {
  render() {
    return (
      <div className="pdp__price">
        <h3 className="attributes__title">Price:</h3>
        <span>
          {this.context.selectedProduct &&
            this.context.selectedProduct.prices.find(
              (price) => price.currency.symbol === this.context.selectedCurrency
            ).amount}
          &nbsp;
          {this.context.selectedCurrency}
        </span>
      </div>
    );
  }
}

PDPPrice.contextType = productContext;

export default PDPPrice;
