import React, { Component } from "react";
import "./ProductCard.css";
import productContext from "../../store/context";
import cart from "../../UI/EmptyCart-light.svg";

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="product-cards">
        { 
          this.context.selectedCategory.products?.map((product) => (
            <li
              className={`product-cards__card ${
                !product.inStock && "product-cards__card-out-of-stock"
              }`}
              key={product.id}
              data-key={product.id}
            >
              <div className="product-cards__image">
                <img src={product.gallery[0]} className="product-cards__image-img" />
                {!product.inStock && (
                  <span className="product-cards__label">Out of stock</span>
                )}
              </div>
              <div className="product-cards__content">
                <h2 className="product-cards__title">
                  {product.brand} {product.name}
                </h2>
                <p className="product-cards__price">
                  {
                    product.prices.filter((price) => {
                      return (
                        price.currency.symbol === this.context.selectedCurrency
                      );
                    })[0]?.amount
                  }
                  &nbsp;
                  {
                    product.prices.filter((price) => {
                      return (
                        price.currency.symbol === this.context.selectedCurrency
                      );
                    })[0]?.currency.symbol
                  }
                </p>
              </div>
              {product.inStock && (
                <button className="product-cards__btn" data-id={product.id}>
                  <img className="product-cards__icon" src={cart} data-id={product.id}></img>
                </button>
              )}
            </li>
          ))}
      </ul>
    );
  }
}

ProductCard.contextType = productContext;

export default ProductCard;
