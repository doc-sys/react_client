import React from "react";

import { Heading } from "grommet";

import "./CtE_styles.css";

class ClickToEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      onEditMode: false
    };
    this.input = React.createRef();
  }
  getIntoEditMode = () => {
    this.setState({
      onEditMode: true
    });
  };
  getOffEditMode = () => {
    this.setState({
      onEditMode: false
    });
    if (this.props.endEditing) {
      this.props.endEditing(this.input.current.value);
    }
  };
  handleEnterKey = e => {
    if (e.keyCode === 13 || e.charCode == 13) {
      this.setState({
        onEditMode: false
      });
      if (this.props.endEditing) {
        this.props.endEditing(this.input.current.value);
      }
    }
  };
  render() {
    return (
      <section onClick={this.getIntoEditMode}>
        {this.state.onEditMode ? (
          <input
            type="text"
            autoFocus
            defaultValue={this.props.value}
            className="CTE--input"
            onKeyPress={this.handleEnterKey}
            onBlur={this.getOffEditMode}
            ref={this.input}
          />
        ) : (
          <span>{this.props.value}</span>
        )}
      </section>
    );
  }
}

export default ClickToEdit;
