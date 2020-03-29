import React, { Component } from "react";
import { connect } from "react-redux";

import { settingsActions } from "../redux/_actions/settings.actions";

import { Box, Heading, Form, FormField, Button } from "grommet";

import { Avatar } from "../components/Avatar";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });

    const { avatar } = this.state;
    const { dispatch } = this.props;

    if (avatar) {
      dispatch(settingsActions.upload(avatar));
    }
  }

  handleChange(e) {
    console.log(e.target);
    const { name, files } = e.target;
    this.setState({ [name]: files[0] });
  }

  render() {
    const { avatar, submitted } = this.state;
    return (
      <Box pad="medium">
        <Heading>Settings</Heading>
        <Form onSubmit={this.handleSubmit}>
          <FormField
            name="username"
            label="Avatar"
            value={avatar}
            onChange={this.handleChange}
          >
            <input type="file" name="avatar" />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      </Box>
    );
  }
}

function mapState(state) {
  const { user } = state.authentication;
  return { user };
}

const connectedSettings = connect(mapState)(Settings);

export { connectedSettings as Settings };
