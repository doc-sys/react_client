import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./style.css";
import theme from "./theme.json";

import jwt from "jsonwebtoken";

import { Provider, connect } from "react-redux";
import { store } from "./redux/_helpers/store";
import { history } from "./redux/_helpers/history";
import { alertActions } from "./redux/_actions/alert.actions";

import { Home } from "./pages/Home";
import Upload from "./pages/Upload";
import { Login } from "./pages/Login";
import SignUp from "./pages/Signup";
import { Settings } from "./pages/Settings";
import { SingleView } from "./pages/SingleView";
import ErrorPage from "./pages/Error";
import Users from "./pages/Users";

import { Alert } from "./components/Alert";
import { Sidebar } from "./components/Sidebar";
import { PrivateRoute } from "./components/PrivateRoute";

import { Box, Grid, Grommet, Nav } from "grommet";
import {
  Grommet as GIcon,
  Group,
  SettingsOption,
  DocumentUpload,
  Catalog
} from "grommet-icons";

const items = [
  {
    label: "Documents",
    Icon: Catalog,
    path: "/"
  },
  {
    label: "Upload",
    Icon: DocumentUpload,
    path: "/upload"
  },
  {
    label: "Users",
    Icon: Group,
    path: "/users"
  },
  {
    label: "Settings",
    Icon: SettingsOption,
    path: "/settings"
  }
];

class Index extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      this.props.clearAlerts();
    });
  }

  componentWillUpdate() {
    let token = localStorage.getItem("token");
    let decodedToken = jwt.decode(token, { complete: true });
    let time = new Date();

    if (decodedToken && decodedToken.payload.exp * 1000 < time.getTime()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.setState({});
    }
  }

  closeDialog() {
    this.props.clearAlerts();
  }

  render() {
    const { alert } = this.props;
    const {
      authentication: { user }
    } = this.props;
    let userSession = {
      user: user,
      items: [
        { label: "Logout", path: "/logout" },
        { label: "My Plan", path: "/plans" }
      ]
    };

    return (
      <Router>
        <Grommet theme={theme} full>
          <Box direction="row" fill>
            <Sidebar
              appIcon={<GIcon color="brand" />}
              appName="docsys"
              items={items}
              userSession={user ? userSession : null}
            />
            <Box flex>
              {alert.message && (
                <Alert
                  message={alert.message}
                  onClose={() => this.closeDialog()}
                />
              )}
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/upload" component={Upload} />
                <PrivateRoute exact path="/settings" component={Settings} />
                <PrivateRoute exact path="/users" component={Users} />
                <PrivateRoute path="/view/:fileid" component={SingleView} />
                <Route component={ErrorPage} />
              </Switch>
            </Box>
          </Box>
        </Grommet>
      </Router>
    );
  }
}

function mapState(state) {
  const { alert, authentication } = state;
  return { alert, authentication };
}

const actionCreator = {
  clearAlerts: alertActions.clear
};

const ConnectedIndex = connect(mapState, actionCreator)(Index);

render(
  <Provider store={store}>
    <ConnectedIndex />
  </Provider>,
  document.getElementById("root")
);
