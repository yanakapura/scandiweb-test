import React, { Component } from "react";
import productContext from "../../store/context";
import "./CartList.css";
import CartItem from "./CartItem";

class CartList extends Component {
    constructor(props) {
        super (props)
        this.cartToDelete = this.cartToDelete.bind(this);
    }
    cartToDelete(el) {
        console.log(el);
        this.props.cartToDelete(el)
      }

  render() {
    return (
      <ul>
        {this.context.cartProducts.map((product) => (
          <li className="cart__li">
            <CartItem product={product} calcTotal={()=>this.props.calcTotal()} cartToDelete={this.cartToDelete}/>
          </li>
        ))}
      </ul>
    );
  }
}

CartList.contextType = productContext;

export default CartList;
