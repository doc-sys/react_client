import React, { Component } from "react";

import { Box, Heading } from "grommet";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  render() {
    return (
      <Box pad="medium">
        <Heading>Users</Heading>
      </Box>
    );
  }
}
