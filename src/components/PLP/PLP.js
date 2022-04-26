import React from "react";
import productContext from "../../store/context";
import Modal from "./Modal";
import "./PLP.css";
import ProductCard from "./ProductCard";

class PLP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: "",
      modalIsClosed: true,
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  clickHandler(e) {
    if (e.target.classList.contains("product-cards__image-img")) {
      this.setState({
        selectedProduct: e.target.offsetParent.dataset.key,
      });
      this.props.onProduct(e.target.offsetParent.dataset.key);
    } else if (e.target.classList.contains("product-cards__btn")) {
      this.setState({
        selectedProduct: e.target.offsetParent.dataset.key,
        modalIsClosed: false,
      });
      this.props.onProduct(e.target.offsetParent.dataset.key, false);
    }
  }

  closeModal() {
    this.setState({
      modalIsClosed: true,
    });
  }

  addToCart (arr) {
    this.props.onAddToCart(arr)
    this.closeModal()
  }


  render() {
    return (
      <main onClick={this.clickHandler}>
        <h1 className="title">{this.context.selectedCategory.name}</h1>
        <div className="container" onClick={this.clickHandler}>
          <ProductCard />
        </div>
        {!this.state.modalIsClosed && (
          <Modal
            onCloseModal={this.closeModal}
            selectedProduct={this.state.selectedProduct}
            onAddToCart={this.addToCart}
          />
        )}
      </main>
    );
  }
}
PLP.contextType = productContext;

export default PLP;
