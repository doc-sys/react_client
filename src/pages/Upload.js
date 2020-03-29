import React, { Component } from "react";

import { Box, Heading, Button, Form } from "grommet";



export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  render() {
    return (
      <Box pad="medium">
        <Heading>Upload</Heading>
      </Box>
    );
  }
}
