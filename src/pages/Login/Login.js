import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userActions } from '../../redux/_actions/user.actions'

import { PrimaryButton, StackItem, TextField, Stack } from '@fluentui/react'
import { alertActions } from '../../redux/_actions/alert.actions'

class Login extends Component {
	constructor(props) {
		super(props)

		//this.props.dispatch(userActions.logout());

		this.state = {
			username: '',
			password: '',
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit() {
		const { username, password } = this.state
		const { dispatch } = this.props
		console.log(this.props)
		if (username && password) {
			dispatch(
				userActions.login(
					username,
					password,
					this.props.location.state ? this.props.location.state.from.pathname : '/'
				)
			)
		} else {
			dispatch(alertActions.error('Plese provide username and password'))
		}
	}

	render() {
		const { username, password } = this.state

		return (
			<Stack
				tokens={{ childrenGap: 15 }}
				styles={{ root: { width: 300 } }}
				onKeyDown={e => (e.key === 'Enter' ? this.handleSubmit() : null)}
			>
				<StackItem>
					<span className="ms-fontSize-42 ms-fontWeight-semibold">Login</span>
				</StackItem>
				<StackItem>
					<TextField
						label="Username"
						name="username"
						onChange={this.handleChange}
						value={username}
					/>
				</StackItem>
				<StackItem>
					<TextField
						label="Password"
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
					/>
				</StackItem>
				<StackItem>
					<PrimaryButton text="Login" onClick={this.handleSubmit} />
				</StackItem>
			</Stack>
		)
	}
}

function mapState(state) {
	const { loggedIn } = state.authentication
	return { loggedIn }
}

const connectedLoginPage = connect(mapState)(Login)
const routedLogin = withRouter(connectedLoginPage)

export { routedLogin as Login }
