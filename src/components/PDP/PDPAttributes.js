import React, { Component } from "react";
import "./PDPAttributes.css";
import productContext from "../../store/context";

class PDPAttributes extends Component {
  constructor() {
    super();
    this.btnCheck = this.btnCheck.bind(this);
  }

  btnCheck() {
    if (
      [...document.querySelectorAll("input")].filter((radio) => radio.checked)
        .length === this.context.selectedProduct.attributes.length
    ) {
      this.props.onBtnCheck();
    }
  }

  componentDidMount() {
    if (!this.context.selectedProduct.inStock) {
      document
        .querySelectorAll("input")
        .forEach((input) => (input.disabled = true));
    }
    if(this.context.selectedProduct.attributes.length === 0 && this.context.selectedProduct.inStock) {
        this.props.onBtnCheck();
    }
  }

  render() {
    // console.log(this.context.selectedProduct.attributes.length === 0);
    return (
      <>
        {this.context.selectedProduct.attributes.map((attribute) => (
          <li key={attribute.name} className="attributes__attribute">
            <h3 className="attributes__title">{attribute.name}:</h3>
            <fieldset id={attribute.name.toLowerCase()} className="form-group">
              {attribute.items.map((item) => (
                <li className="form-group__item" key={item.value}>
                  <input
                    type="radio"
                    name={attribute.name}
                    value={item.value}
                    id={`${item.value}_${attribute.name}`}
                    required
                    onClick={this.btnCheck}
                  />
                  <label
                    className={`attributes__value ${attribute.name === "Color" && "attributes__value-color"}`}
                    htmlFor={`${item.value}_${attribute.name}`}
                    style={{
                      backgroundColor:
                        attribute.name === "Color" ? item.value : "",
                    }}
                  >
                    {attribute.name === "Color" ? "" : item.value}
                  </label>
                </li>
              ))}
            </fieldset>
          </li>
        ))}
      </>
    );
  }
}

PDPAttributes.contextType = productContext;

export default PDPAttributes;
