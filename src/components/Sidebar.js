import React from 'react'

import { Nav } from '@fluentui/react'

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
					name: 'Files',
					url: '/files',
					key: '/files',
					isExpanded: true,
					links: [
						{
							name: 'Upload',
							url: '/upload',
							key: '/upload',
							icon: 'Upload',
						},
					],
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
		</div>
	)
}
