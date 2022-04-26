import React, { Component } from "react";
import productContext from "../../store/context";
import "./PDP.css";
import PDPAttributes from "./PDPAttributes";
import PDPForm from "./PDPForm";
import PDPGallery from "./PDPGallery";

class PDP extends Component {
  constructor() {
    super();
    this.state = {
      galleryImageIndex: 0,
      cartPropducts: [],
      inputArr: []
    };
    this.galleryHandler = this.galleryHandler.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  galleryHandler(e) {
    if (e.target.classList.contains("gallery__img")) {
      const index =
        this.context.selectedProduct.gallery &&
        this.context.selectedProduct.gallery.findIndex(
          (src) => src === e.target.src
        );
      this.setState({
        galleryImageIndex: index,
      });
    }
  }


  addToCart(e) {
    const inputArr = [...document.querySelectorAll("input")].filter((radio) => radio.checked).map(item=>item.id.split("_"));
    inputArr.map(arr=>arr.unshift(this.context.selectedProduct.id))
    if (e.target.classList.contains("pdp__button")) {
      this.props.onAddToCart(inputArr)
    }
  }

  render() {
    return (
      <main className="pdp__main">
        <div className="pdp__gallery gallery" onClick={this.galleryHandler}>
          <PDPGallery />
        </div>
        <div className="pdp__image">
          <img
          className="pdp__image-img"
            src={
              this.context.selectedProduct.gallery &&
              this.context.selectedProduct.gallery[this.state.galleryImageIndex]
            }
          />
          {!this.context.selectedProduct.inStock && <div className="pdp__screen">Out of stock</div>}
        </div>
        <div className="pdp__info" onClick={this.addToCart}>
          <h2 className="pdp__brand">
            {this.context.selectedProduct && this.context.selectedProduct.brand}
          </h2>
          <h1 className="pdp__name">
            {this.context.selectedProduct && this.context.selectedProduct.name}
          </h1>
          <PDPForm/>
          <div
            className="pdp__description"
            dangerouslySetInnerHTML={{
              __html:
                this.context.selectedProduct &&
                this.context.selectedProduct.description,
            }}
          />
        </div>
      </main>
    );
  }
}
PDP.contextType = productContext;

export default PDP;
