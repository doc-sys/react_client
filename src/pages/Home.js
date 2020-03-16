import React, { Component } from "react";

import { documentActions } from "../redux/_actions/document.actions";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  render() {
    return <p>Home</p>;
  }
}
