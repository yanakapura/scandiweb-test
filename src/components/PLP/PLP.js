import React from "react";
import productContext from "../../store/context";
import "./PLP.css";
import ProductCard from "./ProductCard";

class PLP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: "",
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    if (e.target.classList.contains("product-cards__image-img")) {
        this.setState({ selectedProduct: e.target.offsetParent.dataset.key });
        this.props.onProduct(e.target.offsetParent.dataset.key);
    } 
  }

  render() {
    return (
      <main onClick={this.clickHandler}>
        <h1 className="title">{this.context.selectedCategory.name}</h1>
        <div className="container" onClick={this.clickHandler}>
          <ProductCard />
        </div>
      </main>
    );
  }
}
PLP.contextType = productContext;

export default PLP;
