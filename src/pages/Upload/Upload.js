import React, { Component } from 'react'

import { connect } from 'react-redux'

import {
	Stack,
	StackItem,
	TextField,
	PrimaryButton,
	DatePicker,
	ProgressIndicator,
} from '@fluentui/react'
import { documentActions } from '../../redux/_actions/document.actions'

class Upload extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '',
			dated: null,
			comment: '',
			files: null,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit() {
		const { title, dated, comment } = this.state
		const { dispatch } = this.props

		if (title && dated && comment) {
			let parsedDate = Date.parse(dated)

			let form = new FormData()

			form.append('title', title)
			form.append('dated', parsedDate)
			form.append('comment', comment)

			for (var x = 0; x < this.state.files.length; x++) {
				form.append('documents', this.state.files[x])
			}

			// form.append('documents', this.state.files)

			dispatch(documentActions.uploadDocument(form))
		}
	}

	render() {
		const { uploading } = this.props
		const { title, dated, comment } = this.state

		return (
			<Stack
				tokens={{ childrenGap: 15 }}
				styles={{ root: { width: 300 } }}
				onKeyDown={e => (e.key === 'Enter' ? this.handleSubmit() : null)}
			>
				<StackItem>
					<span className="ms-fontSize-42 ms-fontWeight-semibold">Upload</span>
				</StackItem>
				<StackItem>
					<TextField
						label="Title"
						name="title"
						onChange={this.handleChange}
						value={title}
					/>
				</StackItem>
				<StackItem>
					<DatePicker
						label="Date"
						allowTextInput={true}
						value={dated}
						onSelectDate={date => this.setState({ dated: date })}
					/>
				</StackItem>
				<StackItem>
					<TextField
						label="Comment"
						name="comment"
						onChange={this.handleChange}
						value={comment}
						multiline
						autoAdjustHeight
					/>
				</StackItem>
				<StackItem>
					<TextField
						type="file"
						name="files"
						ref={ref => (this.fileSelect = ref)}
						onChange={e => this.setState({ files: e.target.files })}
					/>
				</StackItem>
				<StackItem>
					{uploading ? (
						<PrimaryButton text="Upload" disabled />
					) : (
						<PrimaryButton text="Upload" onClick={this.handleSubmit} />
					)}
				</StackItem>
				{uploading && (
					<StackItem>
						<ProgressIndicator
							label="Uploading"
							description="Uploading files to server"
						/>
					</StackItem>
				)}
			</Stack>
		)
	}
}

function mapState(state) {
	const { docs } = state
	return { docs }
}

const connectedUpload = connect(mapState)(Upload)

export { connectedUpload as Upload }
