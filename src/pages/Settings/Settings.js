import React, { Component } from 'react'
import { connect } from 'react-redux'

import { settingsActions } from '../../redux/_actions/settings.actions'

import {
	Stack,
	StackItem,
	Persona,
	PersonaSize,
	Dialog,
	DialogType,
	DialogFooter,
	PrimaryButton,
	DefaultButton,
	TextField,
} from '@fluentui/react'

class Settings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			avatarModalHidden: true,
			file: null,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e) {
		e.preventDefault()

		// this.setState({ submitted: true })

		const { dispatch } = this.props
		const {
			authentication: { user },
		} = this.props

		if (this.state.file) {
			dispatch(settingsActions.upload(this.state.file, user.username))
		}
	}

	handleChange(e) {
		this.setState({ file: e.target.files[0] })
	}

	render() {
		const {
			authentication: { user },
		} = this.props

		const { avatarModalHidden } = this.state

		return (
			<div>
				<Dialog
					hidden={avatarModalHidden}
					onDismiss={() => this.setState({ avatarModalHidden: true })}
					dialogContentProps={{
						type: DialogType.largeHeader,
						title: 'Change Avatar',
						subText: 'Please select a new avatar',
					}}
					modalProps={{
						isBlocking: true,
						styles: { main: { maxWidth: 450 } },
						dragOptions: false,
					}}
				>
					<TextField type="file" name="avatar" onChange={this.handleChange} />
					<DialogFooter>
						<PrimaryButton onClick={this.handleSubmit} text="Save" />
						<DefaultButton
							onClick={() => this.setState({ avatarModalHidden: true })}
							text="Cancel"
						/>
					</DialogFooter>
				</Dialog>
				<Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: 300 } }}>
					<StackItem>
						<span className="ms-fontSize-42 ms-fontWeight-semibold">Settings</span>
					</StackItem>
					<StackItem>
						<Persona
							imageUrl={`data:image/png;base64,${user.avatar}`}
							text={user.settings.displayName}
							secondaryText={user.username}
							tertiaryText={user.mail}
							size={PersonaSize.size72}
							onClick={() => this.setState({ avatarModalHidden: false })}
						/>
					</StackItem>
				</Stack>
			</div>
		)
	}
}

function mapState(state) {
	const { authentication } = state
	return { authentication }
}

const connectedSettings = connect(mapState)(Settings)

export { connectedSettings as Settings }
