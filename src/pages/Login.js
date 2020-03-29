import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { userActions } from "../redux/_actions/user.actions";

import { Heading, Box, Form, FormField, Button } from "grommet";

class Login extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(userActions.logout());

    this.state = {
      username: "",
      password: ""
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

    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  componentWillReceiveProps() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      this.props.history.push("/");
    }
  }

  render() {
    const { username, password } = this.state;

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
          <Button as={Link} to="/signup" type="text" label="Sign Up" />
        </Form>
      </Box>
    );
  }
}

function mapState(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

/* const actionCreator = {
  login: userActions.login,
  logout: userActions.logout
}; */

const connectedLoginPage = connect(mapState)(Login);
const routedLogin = withRouter(connectedLoginPage);

export { routedLogin as Login };
