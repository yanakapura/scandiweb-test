import React from "react";
import "./CurrenciesContainer.css";
import productContext from "../../store/context";

class CurrenciesContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    setCurrency (symbol) {
        this.props.select(symbol)
    }

  render() {
    return (
      <ul className="currencies__container">
        {this.context.currencies?.map((currency) => (
          <li key={currency.label} className="currencies__item" onClick={()=>{
              this.setCurrency(currency.symbol)
          }}>
            <span className="currencies__symbol">{currency.symbol}</span>
            {currency.label}
          </li>
        ))}
      </ul>
    );
  }
}

CurrenciesContainer.contextType = productContext;

export default CurrenciesContainer;
