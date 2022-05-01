import React, { Component } from "react";
import productContext from "../../store/context";

class Price extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return (
        <div className="price">
        {
          this.props.product.prices.find(
            (price) =>
              price.currency.symbol === this.context.selectedCurrency
          ).amount
        }
        &nbsp;
        {
          this.props.product.prices.find(
            (price) =>
              price.currency.symbol === this.context.selectedCurrency
          ).currency.symbol
        }
      </div>
    );
  }
}

Price.contextType = productContext;

export default Price;
