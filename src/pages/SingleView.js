import React, { Component } from "react";

export default class SingleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  render() {
    return <p>we are seeing: {this.props.match.params.fileid}</p>;
  }
}
