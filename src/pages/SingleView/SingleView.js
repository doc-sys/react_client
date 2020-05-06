import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import { Stack, StackItem, Shimmer } from '@fluentui/react'
import { SVToolbar } from './Toolbar'

import { documentActions } from '../../redux/_actions/document.actions'

export default class SingleView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Test',
			showShareModal: false,
		}

		this.deleteFile = this.deleteFile.bind(this)
		this.checkoutFile = this.checkoutFile.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(documentActions.getSingle(this.props.match.params.fileid))
	}

	componentWillUnmount() {
		this.props.dispatch(documentActions.clearSingle())
	}

	deleteFile() {
		this.props.dispatch(documentActions.delete(this.props.match.params.fileid))
		this.props.history.push('/')
	}

	checkoutFile() {
		this.props.dispatch(documentActions.checkout(this.props.match.params.fileid))
	}

	render() {
		const { loadedDoc, loadingDocument } = this.props

		return (
			<Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: 300 } }}>
				<StackItem>
					<Shimmer isDataLoaded={!loadingDocument}>
						{loadedDoc.document && (
							<span className="ms-fontSize-42 ms-fontWeight-semibold">
								{loadedDoc.document.title}
							</span>
						)}
					</Shimmer>
				</StackItem>
				<StackItem>
					<SVToolbar />
				</StackItem>
			</Stack>
		)

		// return (
		// 	<SkeletonTheme color="#C2E3FF" highlightColor="#D6E3FF">
		// 		<Box basis="full" pad="medium">
		// 			{loadedDoc.loadingDocument && (
		// 				<Box>
		// 					<Heading>
		// 						<Skeleton width={500} />
		// 					</Heading>
		// 					<Box>
		// 						<Text>
		// 							<Skeleton width={600} count={10} />
		// 						</Text>
		// 					</Box>
		// 				</Box>
		// 			)}
		// 			{loadedDoc.document && (
		// 				<Box>
		// 					{showShareModal && (
		// 						<Modal exit={this.shareModal}>
		// 							<ShareForm exit={this.shareModal} />
		// 						</Modal>
		// 					)}
		// 					<Heading>
		// 						<ClickToEdit
		// 							value={this.state.title}
		// 							endEditing={e => {
		// 								this.setState({ title: e })
		// 							}}
		// 						/>
		// 					</Heading>
		// 					<Grid
		// 						rows={['full']}
		// 						columns={['2/3', '1/3']}
		// 						gap="medium"
		// 						areas={[
		// 							{ name: 'img_show', start: [0, 0], end: [0, 0] },
		// 							{ name: 'info', start: [1, 0], end: [1, 0] },
		// 						]}
		// 					>
		// 						<Box gridArea="img_show">
		// 							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
		// 							nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
		// 							sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
		// 							rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
		// 							ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
		// 							elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
		// 							aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
		// 							dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
		// 							est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
		// 							sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
		// 							dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
		// 							et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
		// 							takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum
		// 							iriure dolor in hendrerit in vulputate velit esse molestie consequat,
		// 							vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
		// 							iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
		// 							duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
		// 							consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
		// 							ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
		// 							veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl
		// 							ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
		// 							hendrerit in vulputate velit esse molestie consequat, vel illum dolore
		// 							eu feugiat nulla facilisis at vero eros et accumsan et iusto odio
		// 							dignissim qui blandit praesent luptatum zzril delenit augue duis dolore
		// 							te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend
		// 							option congue nihil imperdiet doming id quod mazim placerat facer
		// 							possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
		// 							sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
		// 							erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
		// 							ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
		// 							Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
		// 							molestie consequat, vel illum dolore eu feugiat nulla facilisis. At
		// 							vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
		// 							gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
		// 							Lorem ipsum dolor sit amet, consetetur
		// 						</Box>
		// 						<Box gridArea="info" background="light-5">
		// 							<Box pad={{ bottom: '5px' }}>
		// 								<Table>
		// 									<TableBody>
		// 										<TableRow>
		// 											<TableCell>Created</TableCell>
		// 											<TableCell>
		// 												<Moment format="DD.MM.YYYY">{loadedDoc.document.dated}</Moment>
		// 											</TableCell>
		// 										</TableRow>
		// 										<TableRow>
		// 											<TableCell>Uploaded</TableCell>
		// 											<TableCell>
		// 												<Moment format="DD.MM.YYYY">
		// 													{loadedDoc.document.createdAt}
		// 												</Moment>
		// 											</TableCell>
		// 										</TableRow>
		// 										<TableRow>
		// 											<TableCell>Owner</TableCell>
		// 											<TableCell>
		// 												{loadedDoc.document.owner.settings.displayName}
		// 											</TableCell>
		// 										</TableRow>
		// 										{loadedDoc.document.locked && (
		// 											<TableRow>
		// 												<TableCell>Locked</TableCell>
		// 												<TableCell>Yes</TableCell>
		// 											</TableRow>
		// 										)}
		// 									</TableBody>
		// 								</Table>
		// 							</Box>
		// 							<SingleViewActions
		// 								doc={loadedDoc.document}
		// 								onDelete={this.deleteFile}
		// 								checkout={this.checkoutFile}
		// 								shareModal={this.shareModal}
		// 							/>
		// 						</Box>
		// 					</Grid>
		// 				</Box>
		// 			)}
		// 		</Box>
		// 	</SkeletonTheme>
		// )
	}
}

function mapState(state) {
	const { loadedDoc } = state
	return { loadedDoc }
}

const connectedSingleView = connect(mapState)(SingleView)
const routedSingle = withRouter(connectedSingleView)
export { routedSingle as SingleView }
