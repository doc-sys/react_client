import React from 'react'

import { Nav, Callout } from '@fluentui/react'

export function Sidebar(props) {
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

	const { router } = props

	const [showCalloutTodo, setCalloutTodo] = React.useState(false)
	const [showCalloutMessages, setCalloutMessages] = React.useState(false)

	return (
		<div>
			<Nav
				styles={{ root: { padding: 20 } }}
				selectedKey={router && router.route.location.pathname}
				groups={items}
				onLinkClick={(e, el) => {
					e.preventDefault()
					props.history.push(el.url)
				}}
			/>

			{showCalloutMessages && (
				<Callout
					role="alertdialog"
					target="compositeLink-69"
					onDismiss={() => setCalloutMessages(false)}
				>
					<p>HEYO</p>
				</Callout>
			)}
		</div>
	)
}
