import React, { Component } from 'react'
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux'

import { userActions } from '../../redux/_actions/user.actions'

import {
	Stack,
	StackItem,
	Persona,
	PersonaSize,
	MarqueeSelection,
	DetailsList,
	DetailsListLayoutMode,
	Selection,
} from '@fluentui/react'

export default function Users(props) {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users)

	const [itemsSelected, setItemsSelected] = React.useState(false)
	const [selection, setSelection] = React.useState(null)

	React.useEffect(() => {
		dispatch(userActions.getAll())
	}, [])

	const columns = [
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

	const itemSelection = new Selection({
		onSelectionChanged: () => {
			setItemsSelected(itemSelection.getSelectedCount() > 0 ? true : false)
			setSelection(itemSelection.getSelection())
		},
	})

	return (
		<Stack>
			<StackItem>
				<span className="ms-fontSize-42 ms-fontWeight-semibold">Users</span>
			</StackItem>
			<StackItem>
				<MarqueeSelection selection={itemSelection}>
					<DetailsList
						items={users || []}
						columns={columns}
						isHeaderVisible={true}
						layoutMode={DetailsListLayoutMode.justified}
						selection={itemSelection}
						styles={{ root: { paddingTop: 0 } }}
					/>
				</MarqueeSelection>
			</StackItem>
		</Stack>
	)
}
