import React, { Component } from "react";
import { connect } from "react-redux";

import { settingsActions } from "../redux/_actions/settings.actions";

import { Box, Heading, Form, FormField, Button } from "grommet";

import { Avatar } from "../components/Avatar";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });

    const { dispatch } = this.props;

    if (this.state.file) {
      dispatch(settingsActions.upload(this.state.file));
    }
  }

  handleChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    const {
      authentication: { user }
    } = this.props;
    return (
      <Box pad="medium">
        <Heading>Settings</Heading>
        <Form onSubmit={this.handleSubmit}>
          <Avatar url={user.avatar} />
          <FormField
            name="avatar"
            label="Avatar"
            value={this.avatar}
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
  const { authentication } = state;
  return { authentication };
}

const connectedSettings = connect(mapState)(Settings);

export { connectedSettings as Settings };
