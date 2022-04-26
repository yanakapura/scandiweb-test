import React from "react";
import productContext from "../../store/context";
import "./Navigation.css";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActive: true, id: "all" };
    this.updateState = this.updateState.bind(this);
  }
  updateState(e) {
    this.setState((state) => {
      return {
        isActive: true,
        id: e.target.textContent,
      };
    });
    this.props.onNavigationChange(e.target.textContent)
  }

  render() {
    return (
      <ul className="navigation">
        {this.context.categories?.map((category) => (
          <li
            className={`navigation__link ${
              this.state.isActive &&
              category.name === this.state.id &&
              "navigation__link-active"
            }`}
            key={category.name}
            onClick={this.updateState}
          >
            {category.name}
          </li>
        ))}
      </ul>
    );
  }
}
Navigation.contextType = productContext;

export default Navigation;
