import React, { Component } from "react";
import "./CartItem.css";
import productContext from "../../store/context";
import Attributes from "../Product/Attributes";
import Price from "../Product/Price";
import Counter from "../Product/Counter";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.isSelected = this.isSelected.bind(this);
    this.cartToDelete = this.cartToDelete.bind(this);
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

  cartToDelete(elementToDelete) {
    this.props.cartToDelete(elementToDelete);
  }

  render() {
    return (
      <div className="cart-item">
        <div className="cart-item__item">
          <h2 className="cart-item__brand">
            {this.props.product.brand}
            <br />
            <span className="cart-item__name">{this.props.product.name}</span>
          </h2>
          <Price product={this.props.product} />
          {<Attributes product={this.props.product} showAttributeName={true} />}
        </div>
        <div className="cart-item__item">
          <div className="cart-item__counter">
            <Counter
              cartToDelete={this.cartToDelete}
              product={this.props.product}
              calcTotal={()=>this.props.calcTotal()}
            />
          </div>
          <div className="cart-item__image">
            <img src={this.props.product.gallery[0]}></img>
          </div>
        </div>
      </div>
    );
  }
}
CartItem.contextType = productContext;

export default CartItem;
