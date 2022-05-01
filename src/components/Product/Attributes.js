import React, { Component } from "react";
import productContext from "../../store/context";
import "./Attributes.css"

class Attributes extends Component {

    constructor(props) {
        super(props)
        this.isSelected = this.isSelected.bind(this)
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

  render() {
    return (
      <ul>
        {this.props.product.attributes.map((attribute) => (
          <li className="attributes__list">
            {this.props.showAttributeName === true && <span className="attribute__name">{attribute.name}</span>}
            {attribute.items.map((item) => (
              <>
                {" "}
                {this.props.showAttributeName === false && item.value === "Yes" && <span className="attribute__name">{attribute.name}</span>}
                <div
                  className={`attribute__value ${
                    !this.isSelected(this.props.product.id, attribute.name, item.value) &&
                    "attribute__value-disable"
                  } ${attribute.name === "Color" && "attribute__value-color"}`}
                  style={{
                    backgroundColor:
                      attribute.name === "Color" ? item.value : "",
                  }}
                >
                  <span>
                  {attribute.name === "Color" ? "" : item.value}
                  </span>
                </div>
              </>
            ))}
          </li>
        ))}
      </ul>
    );
  }
}

Attributes.contextType = productContext;

export default Attributes;
