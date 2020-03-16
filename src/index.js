import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider, connect } from "react-redux";
import { store } from "./redux/_helpers/store";
import { history } from "./redux/_helpers/history";
import { alertActions } from "./redux/_actions/alert.actions";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import { Login } from "./pages/Login";
import Settings from "./pages/Settings";
import SingleView from "./pages/SingleView";
import ErrorPage from "./pages/Error";

import Navigation from "./components/Navigation";
import { PrivateRoute } from "./components/PrivateRoute";

import { Box, Grid, Grommet } from "grommet";
import { Notification } from "grommet-icons";

class Index extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      this.props.dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <Router history={history}>
        <Grommet plain>
          <Grid
            rows={["xsmall", "auto"]}
            columns={["small", "auto"]}
            gap="small"
            areas={[
              { name: "header", start: [0, 0], end: [1, 0] },
              { name: "nav", start: [0, 1], end: [0, 1] },
              { name: "main", start: [1, 1], end: [1, 1] }
            ]}
            fill={true}
          >
            {alert && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Box gridArea="header" background="brand"></Box>
            <Box gridArea="nav" background="light-5">
              <Navigation />
            </Box>
            <Box gridArea="main" background="light-2" height="large">
              {alert.message && (
                <Box>
                  <p>{alert.message}</p>
                </Box>
              )}

              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/upload" component={Upload} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/settings" component={Settings} />
                <PrivateRoute path="/view/:fileid" component={SingleView} />
                <Route path="*" component={ErrorPage} />
              </Switch>
            </Box>
          </Grid>
        </Grommet>
      </Router>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
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
