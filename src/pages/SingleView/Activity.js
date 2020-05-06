import * as React from 'react'
import { ActivityItem, Stack, StackItem, TextField } from '@fluentui/react'

import Moment from 'react-moment'

import { useSelector, useDispatch } from 'react-redux'

import { documentActions } from '../../redux/_actions/document.actions'

export function Activity(props) {
	const [comment, setComment] = React.useState('')
	const activityList = useSelector(state => state.loadedDoc.document)
	const dispatch = useDispatch()

	const dispatchNewComment = e => {
		e.key === 'Enter' &&
			dispatch(documentActions.addComment(activityList.fileId, comment)) &&
			setComment('')
	}

	return (
		<Stack tokens={{ childrenGap: 10 }}>
			{activityList &&
				activityList.log.length > 0 &&
				activityList.log.map((item, index) => (
					<StackItem key={index}>
						<ActivityItem
							activityDescription={createActivityText(item)}
							activityPersonas={[
								{ imageUrl: `data:image/png;base64,${item.user.avatar}` },
							]}
							timeStamp={<Moment fromNow>{item.timestamp}</Moment>}
							key={index}
						/>
					</StackItem>
				))}
			{activityList && activityList.log.length === 0 && (
				<StackItem>
					<span style={{ color: '#bebbb8' }}>No activity yet :(</span>
				</StackItem>
			)}
			<StackItem styles={{ root: { paddingTop: 10 } }}>
				<TextField
					multiline
					rows={2}
					placeholder="Add Comment"
					onKeyDown={e => dispatchNewComment(e)}
					onChange={e => setComment(e.target.value)}
					value={comment}
				/>
			</StackItem>
		</Stack>
	)
}

const createActivityText = el =>
	el.logType ? (
		<>
			<span>{`${el.user.settings.displayName} ${el.logType}:`}</span>
			<span style={{ fontWeight: 'bold' }}> {`${el.message}`}</span>
		</>
	) : (
		<span>{`${el.user.settings.displayName} ${el.message}`}</span>
	)
