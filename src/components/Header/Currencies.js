import React from "react";
import productContext from "../../store/context";
import arrow from "../../UI/Arrow.svg";
import "./Currencies.css";
import CurrenciesContainer from "./CurrenciesContainer";

class Currencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      currencySymbol: "$",
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(symbol) {
    this.setState((state) => {
      return {
        isActive: !state.isActive,
      };
    });
    if (symbol !== undefined) {
      this.setState({ currencySymbol: symbol });
      this.props.onCurrencySet(symbol)
    }
    console.log("symbol = ",symbol);
  }

  render() {
    return (
      <React.Fragment>
        <div className="currencies" onClick={() => this.updateState()}>
          {this.state.currencySymbol}
          <span className="arrow">
            <img
              className={`arrow__img ${
                this.state.isActive && "arrow__img-active"
              }`}
              src={arrow}
            />
          </span>
        </div>
        {this.state.isActive && (
          <CurrenciesContainer select={this.updateState} />
        )}
      </React.Fragment>
    );
  }
}

Currencies.contextType = productContext;

export default Currencies;
