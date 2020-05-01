import React, { Component } from "react";

import { Box, Menu } from "grommet";
import { Download, Share, Trash, Upload } from "grommet-icons";

export default class SingleViewActions extends Component {
  render() {
    const { doc, onDelete, checkout, shareModal } = this.props;
    return (
      <Menu
        plain
        dropProps={{
          align: { top: "bottom", left: "left" },
        }}
        label="Actions"
        items={[
          {
            label: <Box alignSelf="center">Check Out</Box>,
            icon: (
              <Box pad="small">
                <Download />
              </Box>
            ),
            onClick: checkout,
            disabled: doc.locked,
          },
          {
            label: <Box alignSelf="center">Check In</Box>,
            icon: (
              <Box pad="small">
                <Upload />
              </Box>
            ),
            onClick: () => {},
            disabled: !doc.locked,
          },
          {
            label: <Box alignSelf="center">Share</Box>,
            icon: (
              <Box pad="small">
                <Share />
              </Box>
            ),
            onClick: shareModal,
          },
          {
            label: <Box alignSelf="center">Delete</Box>,
            icon: (
              <Box pad="small">
                <Trash />
              </Box>
            ),
            onClick: onDelete,
          },
        ]}
      />
    );
  }
}
