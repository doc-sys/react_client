import React, { Component } from "react";

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  render() {
    return <p>Error</p>;
  }
}
