import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import { Stack, StackItem, Shimmer } from '@fluentui/react'
import { SVToolbar } from './Toolbar'

import { documentActions } from '../../redux/_actions/document.actions'
import { Activity } from './Activity'

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
			<Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: '100%' } }}>
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
				<Stack horizontal styles={{ root: { width: '100%' } }}>
					<StackItem styles={{ root: { width: '30%' } }}>
						<Stack
							tokens={{ childrenGap: 15 }}
							className="ms-depth-4"
							styles={{ root: { padding: 10 } }}
						>
							<StackItem>
								<span className="ms-fontSize-20 ms-fontWeight-semibold">Activity</span>
							</StackItem>
							<StackItem>
								<Activity />
							</StackItem>
						</Stack>
					</StackItem>
				</Stack>
			</Stack>
		)
	}
}

function mapState(state) {
	const { loadedDoc } = state
	return { loadedDoc }
}

const connectedSingleView = connect(mapState)(SingleView)
const routedSingle = withRouter(connectedSingleView)
export { routedSingle as SingleView }
