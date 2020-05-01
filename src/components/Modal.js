import React, { Component } from "react";
import { Layer } from "grommet";
/* 
const DropContent = ({ onClose }) => (
  <Box pad="small">
    <Box align="center">
      <Heading level={3} margin="small">
        Send us your feedback
      </Heading>
      <TextInput />
    </Box>
  </Box>
); */

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClose = () => {
    this.setState({ open: false });
    setTimeout(() => this.setState({ open: undefined }), 1);
  };

  render() {
    const { exit, children } = this.props;
    return (
      <Layer
        position="right"
        full="vertical"
        modal
        onEsc={() => exit()}
        onClickOutside={() => exit()}
      >
        {children}
      </Layer>
    );
  }
}
