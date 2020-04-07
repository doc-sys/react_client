import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { authHeader } from "../redux/_helpers/authHeader";

import {
  Box,
  Text,
  Heading,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "grommet";
import { Close } from "grommet-icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Moment from "react-moment";
import Autosuggest from "react-autosuggest";

import ClickToEdit from "../components/ClickToEdit";
import SingleViewActions from "../components/SingleViewActions";
import Modal from "../components/Modal";

import { documentActions } from "../redux/_actions/document.actions";

export default class SingleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Test",
      showShareModal: false,
    };

    this.deleteFile = this.deleteFile.bind(this);
    this.checkoutFile = this.checkoutFile.bind(this);
    this.shareModal = this.shareModal.bind(this);
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

  checkoutFile() {
    this.props.dispatch(
      documentActions.checkout(this.props.match.params.fileid)
    );
  }

  shareModal() {
    this.setState({ showShareModal: !this.state.showShareModal });
  }

  render() {
    const { loadedDoc } = this.props;
    const { showShareModal } = this.state;
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
                  <Skeleton width={600} count={10} />
                </Text>
              </Box>
            </Box>
          )}
          {loadedDoc.document && (
            <Box>
              {showShareModal && (
                <Modal exit={this.shareModal}>
                  <ShareForm exit={this.shareModal} />
                </Modal>
              )}
              <Heading>
                <ClickToEdit
                  value={this.state.title}
                  endEditing={(e) => {
                    this.setState({ title: e });
                  }}
                />
              </Heading>
              <Grid
                rows={["full"]}
                columns={["2/3", "1/3"]}
                gap="medium"
                areas={[
                  { name: "img_show", start: [0, 0], end: [0, 0] },
                  { name: "info", start: [1, 0], end: [1, 0] },
                ]}
              >
                <Box gridArea="img_show">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Duis
                  autem vel eum iriure dolor in hendrerit in vulputate velit
                  esse molestie consequat, vel illum dolore eu feugiat nulla
                  facilisis at vero eros et accumsan et iusto odio dignissim qui
                  blandit praesent luptatum zzril delenit augue duis dolore te
                  feugait nulla facilisi. Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit, sed diam nonummy nibh euismod
                  tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                  wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                  consequat. Duis autem vel eum iriure dolor in hendrerit in
                  vulputate velit esse molestie consequat, vel illum dolore eu
                  feugiat nulla facilisis at vero eros et accumsan et iusto odio
                  dignissim qui blandit praesent luptatum zzril delenit augue
                  duis dolore te feugait nulla facilisi. Nam liber tempor cum
                  soluta nobis eleifend option congue nihil imperdiet doming id
                  quod mazim placerat facer possim assum. Lorem ipsum dolor sit
                  amet, consectetuer adipiscing elit, sed diam nonummy nibh
                  euismod tincidunt ut laoreet dolore magna aliquam erat
                  volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                  tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
                  commodo consequat. Duis autem vel eum iriure dolor in
                  hendrerit in vulputate velit esse molestie consequat, vel
                  illum dolore eu feugiat nulla facilisis. At vero eos et
                  accusam et justo duo dolores et ea rebum. Stet clita kasd
                  gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                  amet. Lorem ipsum dolor sit amet, consetetur
                </Box>
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
                        {loadedDoc.document.locked && (
                          <TableRow>
                            <TableCell>Locked</TableCell>
                            <TableCell>Yes</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Box>
                  <SingleViewActions
                    doc={loadedDoc.document}
                    onDelete={this.deleteFile}
                    checkout={this.checkoutFile}
                    shareModal={this.shareModal}
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

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      autosuggest: null,
      value: "",
      suggestions: [],
    };

    this.render = this.render.bind(this);
  }

  componentWillMount() {
    const requestOptions = {
      method: "GET",
      headers: authHeader({ "Content-Type": "application/json" }),
    };

    const API_BASE = "localhost:3001";

    fetch(`http://${API_BASE}/user/autocomplete`, requestOptions).then(
      (response) => {
        response.text().then((text) => {
          const data = text && JSON.parse(text);
          if (!response.ok) {
            const error = (data && data.payload.message) || response.statusText;
            Promise.reject(error);
          }

          console.log(data);

          this.setState({ autosuggest: data.payload });
        });
      }
    );
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.autosuggest.filter(
          (user) =>
            user.username.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  getSuggestionValue = (suggestion) => suggestion.username;

  renderSuggestion = (suggestion) => <Box>{suggestion.username}</Box>;

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = (event, { suggestionValue }) => {
    console.log(suggestionValue);
    this.setState({ selected: this.state.selected.push(suggestionValue) });
  };

  render() {
    const { exit } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Who to share with",
      value,
      onChange: this.onChange,
    };

    return (
      <Box
        as="form"
        fill="vertical"
        overflow="auto"
        width="large"
        pad="medium"
        onSubmit={null}
      >
        <Box flex={false} direction="row" justify="between">
          <Heading level={2} margin="none">
            Share
          </Heading>
          <Button icon={<Close />} onClick={() => exit()} />
        </Box>
        <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
          {this.state.selected.map((v) => {
            return <Text>{v.username}</Text>;
          })}
        </Box>
      </Box>
    );
  }
}
