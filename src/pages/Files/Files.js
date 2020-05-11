import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import Moment from 'react-moment'
import {
	Stack,
	StackItem,
	mergeStyleSets,
	DetailsList,
	DetailsListLayoutMode,
	Persona,
	PersonaSize,
	Selection,
	MarqueeSelection,
} from '@fluentui/react'

import { HomeToolbar } from './Toolbar'

import { documentActions } from '../../redux/_actions/document.actions'

const classNames = mergeStyleSets({
	fileIconHeaderIcon: {
		padding: 0,
		fontSize: '16px',
	},
	fileIconCell: {
		textAlign: 'center',
		selectors: {
			'&:before': {
				content: '.',
				display: 'inline-block',
				verticalAlign: 'middle',
				height: '100%',
				width: '0px',
				visibility: 'hidden',
			},
		},
	},
	fileIconImg: {
		verticalAlign: 'middle',
		maxHeight: '16px',
		maxWidth: '16px',
	},
	controlWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	exampleToggle: {
		display: 'inline-block',
		marginBottom: '10px',
		marginRight: '30px',
	},
	selectionDetails: {
		marginBottom: '20px',
	},
})

class Files extends Component {
	constructor(props) {
		super(props)

		this._itemRouting = this._itemRouting.bind(this)

		this.state = {
			itemsSelected: false,
			selection: null,
			shareModal: false,
		}

		this.columns = [
			{
				key: 'extension',
				name: 'File Type',
				className: classNames.fileIconCell,
				iconClassName: classNames.fileIconHeaderIcon,
				IconName: 'Page',
				isIconOnly: true,
				fieldName: 'extension',
				minWidth: 16,
				maxWidth: 16,
				onColumnClick: null,
				onRender: item => {
					return (
						<img
							src={`https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${item.extension}.svg`}
							className={classNames.fileIconImg}
							alt={item.filetype + ' file icon'}
						/>
					)
				},
			},
			{
				key: 'title',
				name: 'Title',
				fieldName: 'title',
				minWidth: 100,
				maxWidth: 250,
				isRowHeader: true,
				isResizable: true,
				data: 'string',
				isPadded: true,
			},
			{
				key: 'dated',
				name: 'Date Modified',
				fieldName: 'dated',
				minWidth: 70,
				maxWidth: 90,
				isResizable: true,
				onColumnClick: null,
				data: 'number',
				onRender: item => {
					return <Moment format="DD/MM/YYYY">{item.dated}</Moment>
				},
				isPadded: true,
			},
			{
				key: 'fileId',
				name: 'FileID',
				fieldName: 'fileId',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onColumnClick: null,
				data: 'string',
				isPadded: true,
			},
			{
				key: 'owner',
				name: 'Owner',
				fieldName: 'owner',
				minWidth: 70,
				maxWidth: 90,
				isResizable: true,
				onColumnClick: null,
				onRender: item => {
					return (
						<Persona
							imageUrl={`data:image/png;base64,${item.owner.avatar}`}
							text={item.owner.settings.displayName}
							size={PersonaSize.size24}
						/>
					)
				},
				isPadded: true,
			},
		]
	}

	componentDidMount() {
		this.props.dispatch(documentActions.getOwn())
		this.props.dispatch(documentActions.getShared())
	}

	render() {
		const { files } = this.props
		console.log(this.props)

		return (
			<div>
				<Stack>
					<StackItem>
						<span className="ms-fontSize-42 ms-fontWeight-semibold">Files</span>
					</StackItem>
					<StackItem>
						<HomeToolbar
							itemsSelected={this.state.itemsSelected}
							selection={this.state.selection}
						/>
					</StackItem>
					<StackItem>
						<MarqueeSelection selection={this._itemSelection}>
							<DetailsList
								items={files.files || []}
								columns={this.columns}
								isHeaderVisible={true}
								layoutMode={DetailsListLayoutMode.justified}
								onItemInvoked={this._itemRouting}
								selection={this._itemSelection}
								styles={{ root: { paddingTop: 0 } }}
							/>
						</MarqueeSelection>
					</StackItem>
				</Stack>
			</div>
		)
	}

	_itemRouting(item) {
		this.props.history.push(`/view/${item.fileId}`)
	}

	_itemSelection = new Selection({
		onSelectionChanged: () => {
			this.setState({
				itemsSelected: this._itemSelection.getSelectedCount() > 0 ? true : false,
				selection: this._itemSelection.getSelection(),
			})
		},
	})
}

function mapState(state) {
	const { files } = state
	return { files }
}

const connectedHomePage = connect(mapState)(Files)
const routedHomepage = withRouter(connectedHomePage)

export { routedHomepage as Files }
