import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import {
  Box,
  Button,
  Text,
  Menu,
  Heading,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "grommet";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Moment from "react-moment";
import ClickToEdit from "../components/ClickToEdit";

import { Download, Share, Trash, Upload } from "grommet-icons";

import { documentActions } from "../redux/_actions/document.actions";

export default class SingleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Test"
    };

    this.deleteFile = this.deleteFile.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      documentActions.getSingle(this.props.match.params.fileid)
    );
  }

  componentWillUnmount() {
    this.props.dispatch(documentActions.clearSingle());
  }

  deleteFile() {
    this.props.dispatch(documentActions.delete(this.props.match.params.fileid));
    this.props.history.push("/");
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
              <Heading>
                <ClickToEdit
                  value={this.state.title}
                  endEditing={e => {
                    this.setState({ title: e });
                  }}
                />
              </Heading>
              <Grid
                rows={["full"]}
                columns={["2/3", "1/3"]}
                gap="small"
                areas={[
                  { name: "img_show", start: [0, 0], end: [0, 0] },
                  { name: "info", start: [1, 0], end: [1, 0] }
                ]}
              >
                <Box gridArea="img_show">Show OCR in here</Box>
                <Box gridArea="info" background="light-5">
                  <Box pad={{ bottom: "5px" }}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Created</TableCell>
                          <TableCell>
                            <Moment format="DD.MM.YYYY">
                              {loadedDoc.document.dated}
                            </Moment>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Uploaded</TableCell>
                          <TableCell>
                            <Moment format="DD.MM.YYYY">
                              {loadedDoc.document.createdAt}
                            </Moment>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Owner</TableCell>
                          <TableCell>
                            {loadedDoc.document.owner.settings.displayName}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                  <Menu
                    dropProps={{
                      align: { top: "bottom", left: "left" }
                    }}
                    label="Actions"
                    items={[
                      {
                        label: <Box alignSelf="center">Download</Box>,
                        icon: (
                          <Box pad="small">
                            <Download />
                          </Box>
                        ),
                        onClick: () => {}
                      },
                      {
                        label: <Box alignSelf="center">Share</Box>,
                        icon: (
                          <Box pad="small">
                            <Share />
                          </Box>
                        ),
                        onClick: () => {}
                      },
                      {
                        label: <Box alignSelf="center">Check In</Box>,
                        icon: (
                          <Box pad="small">
                            <Upload />
                          </Box>
                        ),
                        onClick: () => {}
                      },
                      {
                        label: <Box alignSelf="center">Delete</Box>,
                        icon: (
                          <Box pad="small">
                            <Trash />
                          </Box>
                        ),
                        onClick: this.deleteFile
                      }
                    ]}
                  />
                </Box>
              </Grid>
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
const routedSingle = withRouter(connectedSingleView);
export { routedSingle as SingleView };
