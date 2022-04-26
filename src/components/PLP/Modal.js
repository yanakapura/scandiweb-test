import React, { Component } from "react";
import "./Modal.css";
import productContext from "../../store/context";
// import PDPAttributes from "../PDP/PDPAttributes";
import PDPForm from "../PDP/PDPForm";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  closeModal(e) {
    if (
      e.target.classList.contains("modal__overlay") ||
      e.target.classList.contains("modal__close-btn")
    ) {
      console.log("close");
      this.props.onCloseModal();
    }
  }

  addToCart(e) {
    const inputArr = [...document.querySelectorAll("input")]
      .filter((radio) => radio.checked)
      .map((item) => item.id.split("_"));
    inputArr.map((arr) => arr.unshift(this.context.selectedProduct.id));
    if (e.target.classList.contains("pdp__button")) {
      this.props.onAddToCart(inputArr);
    }
  }

  render() {
    const product = {
      ...this.context.selectedCategory.products.filter(
        (product) => product.id === this.props.selectedProduct
      )[0],
    };

    if (product.attributes.length === 0) {
      this.props.onAddToCart([]);
    }

    return (
      <div className="modal__overlay" onClick={this.closeModal}>
        <div className="modal__container">
          <h2 className="modal__title">Set Attributes</h2>
          <div className="modal__attributes" onClick={this.addToCart}>
            <div className="modal__header">
              <h3 className="product__title">
                {product.brand}
                <br />
                {product.name}
              </h3>
              <div className="product__image">
                <img
                  className="product__image-img"
                  src={product.gallery[0]}
                ></img>
              </div>
            </div>
            <PDPForm />
          </div>
          <div className="modal__close-btn" onClick={this.closeModal}></div>
        </div>
      </div>
    );
  }
}

Modal.contextType = productContext;

export default Modal;
