import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { Box, Button, Text, Menu, Heading } from "grommet";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Moment from "react-moment";

import { documentActions } from "../redux/_actions/document.actions";

export default class SingleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(
      documentActions.getSingle(this.props.match.params.fileid)
    );
  }

  componentWillUnmount() {
    this.props.dispatch(documentActions.clearSingle());
  }

  render() {
    const { loadedDoc } = this.props;
    return (
      <SkeletonTheme color="#C2E3FF" highlightColor="#D6E3FF">
        <Box basis="full" pad="medium">
          {loadedDoc.loadingDocument && (
            <Box>
              <Heading>
                <Skeleton width={500} />
              </Heading>
              <Box>
                <Text>
                  <Skeleton width={600} />
                </Text>
              </Box>
            </Box>
          )}
          {loadedDoc.document && (
            <Box>
              <Heading>{loadedDoc.document.title}</Heading>
              <Box>
                <Text>
                  created at{" "}
                  <Moment format="DD/MM/YYYY">
                    {loadedDoc.document.createdAt}
                  </Moment>
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </SkeletonTheme>
    );
  }
}

function mapState(state) {
  const { loadedDoc } = state;
  return { loadedDoc };
}

const connectedSingleView = connect(mapState)(SingleView);
export { connectedSingleView as SingleView };
