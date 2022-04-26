import React, { Component } from "react";
import "./PDPForm.css";
import productContext from "../../store/context";
import PDPAttributes from "./PDPAttributes";
import PDPPrice from "./PDPPrice";

class PDPForm extends Component {
  constructor() {
    super();
    this.state = {
      btnIsAvailable: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.btnCheck = this.btnCheck.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    if (this.state.btnIsAvailable) {
    //   alert("submited");
    }
  }

  btnCheck() {
    document.querySelector(".pdp__button").style.opacity = 1;
    this.setState({ btnIsAvailable: true });
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} noValidate>
        <ul
          className="pdp__attributes attributes"
          onClick={this.attributeHandler}
        >
          <PDPAttributes onBtnCheck={this.btnCheck} />
        </ul>
        <PDPPrice/>
        <button type="submit" className="btn btn-green pdp__button">
          Add to card
        </button>
      </form>
    );
  }
}

PDPForm.contextType = productContext;

export default PDPForm;
