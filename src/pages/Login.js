import React, { Component } from "react";
import { connect } from "react-redux";

import { userActions } from "../redux/_actions/user.actions";

import { Heading, Box, Form, FormField, Button } from "grommet";

class Login extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(userActions.logout());

    this.state = {
      username: "",
      password: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });

    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;

    return (
      <Box pad="medium">
        <Heading>Login</Heading>
        <Form onSubmit={this.handleSubmit}>
          <FormField
            name="username"
            label="Username"
            value={username}
            onChange={this.handleChange}
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <Button type="submit" primary label="Submit" />
        </Form>
      </Box>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

/* const actionCreator = {
  login: userActions.login,
  logout: userActions.logout
}; */

const connectedLoginPage = connect(mapState)(Login);

export { connectedLoginPage as Login };
