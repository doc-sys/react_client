import * as React from 'react'
import {
	ActivityItem,
	Stack,
	StackItem,
	TextField,
	DefaultButton,
	Panel,
	PanelType,
} from '@fluentui/react'

import Moment from 'react-moment'

import { useSelector, useDispatch } from 'react-redux'

import { documentActions } from '../../redux/_actions/document.actions'

export function Activity(props) {
	const [comment, setComment] = React.useState('')
	const [showPanel, setShowPanel] = React.useState('')

	const activityList = useSelector(state => state.currentFile.document)
	const dispatch = useDispatch()

	const dispatchNewComment = e => {
		if (e.key === 'Enter') {
			e.preventDefault()
			dispatch(documentActions.addComment(activityList.fileId, comment))
			setComment('')
		}
	}

	return (
		<>
			{/* Panel to show overflow log */}
			<Panel
				headerText="Activity"
				isOpen={showPanel}
				onDismiss={() => setShowPanel(false)}
				closeButtonAriaLabel="Close"
				type={PanelType.medium}
				isLightDismiss
			>
				<Stack tokens={{ childrenGap: 10 }} styles={{ root: { paddingTop: 20 } }}>
					{activityList.log &&
						activityList.log.length > 0 &&
						activityList.log.map((item, index) => {
							return (
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
							)
						})}
				</Stack>
			</Panel>

			{/* Actual Stack to display on main page */}
			<Stack tokens={{ childrenGap: 10 }}>
				{activityList.log &&
					activityList.log.length > 0 &&
					activityList.log.map((item, index) => {
						if (index > 5) {
							return null
						} else {
							return (
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
							)
						}
					})}

				{/* Display See More button and show Panel on click */}
				{activityList.log && activityList.log.length > 5 && (
					<StackItem styles={{ root: { alignSelf: 'center' } }}>
						<DefaultButton text="See more" onClick={() => setShowPanel(true)} />
					</StackItem>
				)}

				{/* Show decent info if no log is present */}
				{activityList.log && activityList.log.length === 0 && (
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
		</>
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
