import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'

import jwt from 'jsonwebtoken'

import { Provider, connect } from 'react-redux'
import { store } from './redux/_helpers/store'
import { history } from './redux/_helpers/history'
import { alertActions } from './redux/_actions/alert.actions'

import { Home } from './pages/Home/Home'
import { Upload } from './pages/Upload/Upload'
import { Login } from './pages/Login/Login'
import SignUp from './pages/Signup'
import { Settings } from './pages/Settings/Settings'
import { SingleView } from './pages/SingleView/SingleView'
import ErrorPage from './pages/Error'
import Users from './pages/Users/Users'

import { Sidebar } from './components/Sidebar'
import { PrivateRoute } from './components/PrivateRoute'

import { MessageBar, MessageBarType, Stack, StackItem } from '@fluentui/react'
import { initializeIcons } from '@uifabric/icons'

initializeIcons()

const ErrorMessage = p => (
	<MessageBar
		messageBarType={
			p.type === 'alert-danger' ? MessageBarType.error : MessageBarType.success
		}
		isMultiline={false}
		onDismiss={p.onClose}
		dismissButtonAriaLabel="Close"
		on
	>
		{p.message}
	</MessageBar>
)

const items = [
	{
		links: [
			{
				name: 'Dashboard',
				url: '/',
				key: '/',
				icon: 'Home',
			},
			{
				name: 'Upload',
				url: '/upload',
				key: '/upload',
				icon: 'BulkUpload',
			},
			{
				name: 'ToDo',
				url: '/todo',
				key: '/todo',
				icon: 'EventToDoLogo',
				disabled: true,
			},
			{
				name: 'Messages',
				url: '/messages',
				key: '/messages',
				icon: 'Message',
				disabled: true,
			},
			{
				name: 'Users',
				url: '/users',
				key: '/users',
				icon: 'UserOptional',
			},
			{
				name: 'Settings',
				url: '/settings',
				key: '/settings',
				icon: 'Settings',
			},
		],
	},
]

class Index extends Component {
	constructor(props) {
		super(props)

		history.listen((location, action) => {
			this.props.clearAlerts()
		})

		this.alertTimer = null
	}

	componentDidUpdate() {
		let token = localStorage.getItem('token')
		let decodedToken = jwt.decode(token, { complete: true })
		let time = new Date()

		if (decodedToken && decodedToken.payload.exp * 1000 < time.getTime()) {
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			this.setState({})
		}
	}

	closeDialog() {
		this.props.clearAlerts()
		if (this.alertTimer != null) {
			clearTimeout(this.alertTimer)
		}
	}

	render() {
		const { alert } = this.props
		const {
			authentication: { user },
		} = this.props
		let userSession = {
			user: user,
			items: [
				{ label: 'Logout', path: '/logout' },
				{ label: 'My Plan', path: '/plans' },
			],
		}

		return (
			<Router history={history}>
				<Stack horizontal styles={{ root: { height: '100vh' } }}>
					<StackItem align="stretch" styles={{ root: { width: 200 } }}>
						<Sidebar
							appName="docsys"
							history={history}
							items={items}
							userSession={user ? userSession : null}
						/>
					</StackItem>

					<StackItem
						align="stretch"
						styles={{ root: { display: 'flex', width: '100%' } }}
					>
						<Stack styles={{ root: { width: '100%' } }}>
							<StackItem>
								{alert.message && (
									<ErrorMessage
										message={alert.message}
										type={alert.type}
										onClose={() => this.closeDialog()}
										styles={{ root: { paddingLeft: 20 } }}
									/>
								)}
							</StackItem>
							<StackItem
								styles={{ root: { paddingTop: 20, paddingLeft: 20, paddingRight: 20 } }}
							>
								<Switch>
									<Route exact path="/login" component={Login} />
									<Route exact path="/signup" component={SignUp} />
									<PrivateRoute exact path="/" component={Home} />
									<PrivateRoute exact path="/upload" component={Upload} />
									<PrivateRoute exact path="/settings" component={Settings} />
									<PrivateRoute exact path="/users" component={Users} />
									<PrivateRoute path="/view/:fileid" component={SingleView} />
									<Route component={ErrorPage} />
								</Switch>
							</StackItem>
						</Stack>
					</StackItem>
				</Stack>
			</Router>
		)
	}
}

function mapState(state) {
	const { alert, authentication } = state
	return { alert, authentication }
}

const actionCreator = {
	clearAlerts: alertActions.clear,
}

const ConnectedIndex = connect(mapState, actionCreator)(Index)

render(
	<Provider store={store}>
		<ConnectedIndex />
	</Provider>,
	document.getElementById('root')
)
