import React, { Component } from "react";
import "./PDPGallery.css";
import productContext from "../../store/context";

class PDPGallery extends Component {
  render() {
    return (
      <ul>
        {this.context.selectedProduct.gallery &&
          this.context.selectedProduct.gallery.map((img) => (
            <li key={Math.random()} className="gallery__item">
              <img src={img} className="gallery__img" />
            </li>
          ))}
      </ul>
    );
  }
}

PDPGallery.contextType = productContext;

export default PDPGallery;
