import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { Box, Button, DataTable, Text, Heading, Tabs, Tab } from "grommet";
import Moment from "react-moment";
import { DocumentLocked } from "grommet-icons";

import { documentActions } from "../redux/_actions/document.actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(documentActions.getOwn());
    this.props.dispatch(documentActions.getShared());
  }

  render() {
    const { docs } = this.props;

    return (
      <Box basis="full" pad="medium">
        <Heading>Documents</Heading>
        <Tabs alignSelf="start" justify="start">
          <Tab title="Own Documents" as={Button}>
            <Box>
              <DataTable
                basis="full"
                fill={true}
                size="medium"
                columns={[
                  {
                    property: "title",
                    header: <Text>Title</Text>,
                  },
                  {
                    property: "fileId",
                    header: <Text>FileID</Text>,
                    primary: true,
                    render: (data) => <Text>{data.fileId}</Text>,
                  },
                  {
                    property: "dated",
                    header: <Text>Uploaded</Text>,
                    render: (data) => (
                      <Moment format="DD.MM.YYYY">{data.dated}</Moment>
                    ),
                  },
                  {
                    property: "isLocked",
                    header: null,
                    render: (data) => (
                      <Box>{data.locked ? <DocumentLocked /> : null}</Box>
                    ),
                  },
                ]}
                data={docs.ownDocuments}
                onClickRow={(e) =>
                  this.props.history.push("/view/" + e.datum.fileId)
                }
              />
            </Box>
          </Tab>
          <Tab title="Shared Documents" as={Button}>
            <DataTable
              size="large"
              columns={[
                {
                  property: "title",
                  header: <Text>Title</Text>,
                },
                {
                  property: "fileId",
                  header: <Text>FileID</Text>,
                  primary: true,
                },
                {
                  property: "dated",
                  header: <Text>Uploaded</Text>,
                  render: (data) => (
                    <Moment format="DD.MM.YYYY">{data.dated}</Moment>
                  ),
                },
                {
                  property: "isLocked",
                  header: null,
                  render: (data) => (
                    <Box>{data.isLocked ? <DocumentLocked /> : null}</Box>
                  ),
                },
              ]}
              data={docs.sharedDocuments}
              onClickRow={(e) =>
                this.props.history.push("/view/" + e.datum.fileId)
              }
            />
          </Tab>
        </Tabs>
      </Box>
    );
  }
}

function mapState(state) {
  const { docs } = state;
  return { docs };
}

const connectedHomePage = connect(mapState)(Home);
const routedHomepage = withRouter(connectedHomePage);

export { routedHomepage as Home };
