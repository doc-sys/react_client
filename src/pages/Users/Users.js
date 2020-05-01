import React, { Component } from 'react'

import { Stack, StackItem, Persona, PersonaSize } from '@fluentui/react'

export default class Users extends Component {
	constructor(props) {
		super(props)

		this.columns = [
			{
				key: 'user',
				name: 'User',
				fieldName: 'user',
				minWidth: 70,
				maxWidth: 90,
				isRowHeader: true,
				isResizable: true,
				onColumnClick: null,
				onRender: item => {
					return (
						<Persona
							imageUrl={`data:image/png;base64,${item.avatar}`}
							text={item.settings.displayName}
							size={PersonaSize.size24}
						/>
					)
				},
				isPadded: true,
			},
			{
				key: 'locked',
				name: 'Locked',
				fieldName: 'locked',
				minWidth: 16,
				maxWidth: 16,
				onColumnClick: null,
				data: 'string',
				isPadded: true,
				onRender: item => {
					return
				},
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
					return /* <Moment format="DD/MM/YYYY">{item.dated}</Moment> */ <p>hi</p>
				},
				isPadded: true,
			},
		]
	}

	render() {
		return (
			<Stack>
				<StackItem>
					<span className="ms-fontSize-42 ms-fontWeight-semibold">Users</span>
				</StackItem>
			</Stack>
		)
	}
}
