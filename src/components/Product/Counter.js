import React, {Component} from "react"
import productContext from "../../store/context";
import "./Counter.css"

class Counter extends Component {

    constructor() {
        super();
        this.state = {
          counter: 1,
        };
        this.counter = this.counter.bind(this);
      }

    counter(e) {
        if (e.target.id === "counter-plus") {
          document.querySelectorAll("input[type='number']").forEach((input) => {
            input.id === e.target.nextSibling.id && ++input.value;
          });
        } else if (e.target.id === "counter-minus") {
          document.querySelectorAll("input[type='number']").forEach((input) => {
            if (input.id === e.target.previousSibling.id && input.value <= 1) {
                const str = e.target.previousSibling.id;
              const elementToDelete = this.context.cartProducts.find((product) =>
                str.includes(product.id)
              );
              console.log("el to delete = ", elementToDelete);
              this.props.cartToDelete(elementToDelete);
            } else {
              input.id === e.target.previousSibling.id && --input.value;
            }
          });
        }
    
        setTimeout(() => this.props.calcTotal(), 100);
      }

    render () {
        return (
            <div className="counter" onClick={this.counter}>
            <span id="counter-plus"></span>
            {/* {this.state.counter} */}
            <input
              className="counter-input"
              id={this.props.product.id + "_counter"}
              type="number"
              defaultValue="1"
              min="1"
            />
            <span id="counter-minus"></span>
          </div>
        )
    }
}

Counter.contextType = productContext

export default Counter