import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { messageActions } from '../../redux/_actions/message.actions'

import { Stack, StackItem } from '@fluentui/react'

export function MessageView(props) {
	const dispatch = useDispatch()

	const message = useSelector(state =>
		state.message.find(el => el.convoId === props.setMessage)
	)

	console.log(message)

	React.useEffect(() => {
		dispatch(messageActions.getHistory(props.setMessage))
	}, [props.setMessage])

	return (
		<Stack>
			{message.messages &&
				message.messages.map((el, i) => (
					<p>
						{el.from.username}: {el.content}
					</p>
				))}
		</Stack>
	)
}
