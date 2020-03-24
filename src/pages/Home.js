import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { Box, Button, DataTable, Text, Heading, Tabs, Tab } from "grommet";
import { DocumentLocked } from "grommet-icons";

import { documentActions } from "../redux/_actions/document.actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(documentActions.getOwn());
    this.props.dispatch(documentActions.getShared());
  }

  render() {
    const { docs } = this.props;
    return (
      <Box>
        <Heading>Documents</Heading>
        <Tabs>
          <Tab title="Own Documents" as={Button}>
            <DataTable
              columns={[
                {
                  property: "title",
                  header: <Text>Title</Text>
                },
                {
                  property: "fileId",
                  header: <Text>FileID</Text>,
                  primary: true,
                  render: data => (
                    <Link to={"/view/" + data.fileId}>{data.fileId}</Link>
                  )
                },
                {
                  property: "isLocked",
                  header: null,
                  render: data => (
                    <Box>{data.isLocked ? <DocumentLocked /> : null}</Box>
                  )
                }
              ]}
              data={docs.ownDocuments}
            />
          </Tab>
          <Tab title="Shared Documents" as={Button}>
            <DataTable
              columns={[
                {
                  property: "title",
                  header: <Text>Title</Text>
                },
                {
                  property: "fileId",
                  header: <Text>FileID</Text>,
                  primary: true
                },
                {
                  property: "isLocked",
                  header: null,
                  render: data => (
                    <Box>{data.isLocked ? <DocumentLocked /> : null}</Box>
                  )
                }
              ]}
              data={docs.sharedDocuments}
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
export { connectedHomePage as Home };
