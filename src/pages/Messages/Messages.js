import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { messageActions } from '../../redux/_actions/message.actions'

import { Stack, StackItem } from '@fluentui/react'
import { MessageView } from './MessageView'
import { MessageList } from './MessageList'

export function Messages(props) {
	const [messageSelected, setMessageSelected] = React.useState(null)

	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(messageActions.getConvos())
	}, [])

	return (
		<Stack tokens={{ childrenGap: 15 }}>
			<StackItem>
				<span className="ms-fontSize-42 ms-fontWeight-semibold">Messages</span>
			</StackItem>
			<StackItem>
				<Stack horizontal styles={{ root: { width: '100%' } }}>
					<StackItem styles={{ root: { minWidth: 200, width: '30%' } }}>
						<MessageList
							onSelection={id => {
								setMessageSelected(id)
							}}
						/>
					</StackItem>
					<StackItem
						styles={{
							root: {
								display: 'flex',
								width: '100%',
								height: '100%',
								paddingLeft: 20,
							},
						}}
					>
						{messageSelected ? (
							<MessageView setMessage={messageSelected} />
						) : (
							<p>Please select convo</p>
						)}
					</StackItem>
				</Stack>
			</StackItem>
		</Stack>
	)
}
