import React, { Component } from "react";
import { Layer, Box, Text, Button } from "grommet";
import { FormClose } from "grommet-icons";

class Toast extends Component {
  componentDidMount() {
    this.startAutoHideTimeout();
  }

  componentWillUnmount() {
    const { timeoutAutoHide } = this;
    if (timeoutAutoHide) {
      clearTimeout(this.timeoutAutoHide);
    }
  }

  startAutoHideTimeout() {
    const { duration, onClose } = this.props;
    if (duration) {
      this.timeoutAutoHide = setTimeout(() => {
        onClose();
      }, duration * 1000);
    }
  }

  render() {
    const { children, modal, position, full, ...rest } = this.props;
    return (
      <Layer
        position={position || "top"}
        full={full}
        modal={modal}
        margin="none"
        responsive
        plain={modal ? false : true}
        {...rest}
      >
        {children}
      </Layer>
    );
  }
}

export class Alert extends Component {
  onClose() {}

  render() {
    const { message, onClose } = this.props;
    return (
      <Toast
        margin="small"
        position="top"
        responsive={true}
        onClose={onClose}
        onEsc={onClose}
        duration={5}
        modal={false}
      >
        <Box
          direction="row"
          justify="between"
          align="center"
          elevation="small"
          pad={{ vertical: `xsmall`, left: `medium` }}
          background="light-3"
          width="medium"
          gap="small"
        >
          <Text size="medium">{message}</Text>
          <Button plain icon={<FormClose />} onClick={onClose} />
        </Box>
      </Toast>
    );
  }
}
