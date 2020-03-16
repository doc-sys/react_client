import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button, Box, Nav } from "grommet";

import { Upload, Home, UserSettings } from "grommet-icons";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "dash"
    };

    this.handleNavClick = this.handleNavClick.bind(this);
  }

  componentDidMount() {
    this.setState({ active: window.location.pathname.substr(1) });
  }

  handleNavClick = (e, { name }) => this.setState({ active: name });

  AppBar = props => (
    <Box tag="nav" direction="column" pad="medium" {...props} />
  );

  render() {
    return (
      <this.AppBar>
        <Nav direction="column">
          <Button icon={<Home />} as={Link} to="/" label="Home" />
          <Button icon={<Upload />} as={Link} to="/upload" label="Upload" />
          <Button
            icon={<UserSettings />}
            as={Link}
            to="/settings"
            label="Settings"
          />
        </Nav>
      </this.AppBar>
    );

    /*     return (
      <Menu vertical>
        <Menu.Item
          as={Link}
          to="/"
          name="dash"
          active={this.state.active === "dash"}
          onClick={this.handleNavClick}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/upload"
          name="upload"
          active={this.state.active === "upload"}
          onClick={this.handleNavClick}
        >
          Upload
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/settings"
          name="settings"
          active={this.state.active === "settings"}
          onClick={this.handleNavClick}
        >
          Settings
        </Menu.Item>
      </Menu>
    );
 */
  }
}

export default Navigation;
