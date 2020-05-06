import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { messageActions } from '../../redux/_actions/message.actions'
import { authHeader } from '../../redux/_helpers/authHeader'

import {
	Stack,
	StackItem,
	TextField,
	PrimaryButton,
	Persona,
	PersonaSize,
	Dialog,
	DialogType,
	NormalPeoplePicker,
	DialogFooter,
	DefaultButton,
} from '@fluentui/react'
import Moment from 'react-moment'

export function MessageList(props) {
	const user = useSelector(state => state.authentication.user)
	const messages = useSelector(state => state.message)

	const [showDialog, setShowDialog] = React.useState(false)
	const [newId, setNewId] = React.useState(null)
	const [newMessage, setNewMessage] = React.useState('')
	const dispatch = useDispatch()

	return (
		<>
			<Dialog
				hidden={!showDialog}
				onDismiss={() => props.setShowDialog(false)}
				dialogContentProps={{
					type: DialogType.largeHeader,
					title: 'New Conversation',
					subText: 'Who do you want to contact?',
				}}
				modalProps={{
					isBlocking: true,
					styles: { main: { maxWidth: 450 } },
					dragOptions: false,
				}}
			>
				<PeopleAutosuggest onChangeHandler={el => setNewId(el[0]._id)} />
				<TextField
					label="Message"
					multiline
					autoAdjustHeight
					onChange={e => setNewMessage(e.target.value)}
				/>
				<DialogFooter>
					<PrimaryButton
						onClick={() => {
							dispatch(messageActions.initiateConvo(newId, newMessage))
							setShowDialog(false)
						}}
					>
						Message
					</PrimaryButton>
					<DefaultButton onClick={() => setShowDialog(false)}>Cancel</DefaultButton>
				</DialogFooter>
			</Dialog>

			<Stack tokens={{ childrenGap: 30 }}>
				<StackItem>
					<Stack
						horizontal
						horizontalAlign="space-between"
						tokens={{ childrenGap: 30 }}
					>
						<StackItem align="end">
							<PrimaryButton
								iconProps={{ iconName: 'Add' }}
								onClick={() => setShowDialog(true)}
							/>
						</StackItem>
						<StackItem>
							<TextField
								ariaLabel="Search"
								iconProps={{ iconName: 'Search' }}
								styles={{ root: { minWidth: 200 } }}
							/>
						</StackItem>
					</Stack>
				</StackItem>
				<StackItem>
					<Stack tokens={{ childrenGap: 15 }}>
						{messages.length > 0 &&
							messages.map((el, i) => {
								const currentUser = el.participants.find(
									el => el.username !== user.username
								)

								console.log(currentUser)

								return (
									<StackItem key={i}>
										<Persona
											size={PersonaSize.size72}
											text={currentUser.settings.displayName}
											secondaryText={
												<div>
													last contact{' '}
													<Moment format="DD.MM.YYYY HH:mm">{el.lastMessage}</Moment>
												</div>
											}
											imageUrl={`data:image/png;base64,${currentUser.avatar}`}
											onClick={() => props.onSelection(el.convoId)}
										/>
									</StackItem>
								)
							})}
					</Stack>
				</StackItem>
			</Stack>
		</>
	)
}

function PeopleAutosuggest(props) {
	const [peopleList, setPeopleList] = React.useState([])
	// const [selectedList, setSelectedList] = React.useState([])

	const suggestionProps = {
		suggestionHeaderText: 'Suggested People',
		noResultsFoundText: 'No results found',
		loadingText: 'Loading',
		showRemoveButton: true,
	}

	const ResolveSuggestions = (filterText, currentPersonas, limitResults) => {
		if (filterText) {
			let filteredPersons = filterPersons(filterText)
			filteredPersons = filteredPersons.filter(
				persona => !listContainsPersona(filteredPersons, currentPersonas)
			)
			filteredPersons = limitResults
				? filteredPersons.slice(0, limitResults)
				: filteredPersons

			return filteredPersons
		} else {
			return []
		}
	}
	const listContainsPersona = (person, persons) => {
		if (!persons || !persons.length || persons.length === 0) {
			return false
		}
		return persons.filter(item => item.text === person.text).length > 0
	}

	const removeDuplicates = (personas, possibleDupes) => {
		return personas.filter(
			persona => !listContainsPersona(persona, possibleDupes)
		)
	}

	const filterPersons = filterText =>
		peopleList.filter(
			i =>
				i.settings.displayName.toLowerCase().indexOf(filterText.toLowerCase()) === 0
		)

	React.useEffect(() => {
		const requestOptions = {
			method: 'GET',
			headers: authHeader({ 'Content-Type': 'application/json' }),
		}
		fetch(
			`http://${process.env.API_BASE || 'localhost:3001'}/user/`,
			requestOptions
		)
			.then(response => response.json())
			.then(data => {
				setPeopleList(data.user)
			})
	}, [])

	return (
		<NormalPeoplePicker
			onResolveSuggestions={ResolveSuggestions}
			pickerSuggestionsProps={suggestionProps}
			onEmptyInputFocus={currentPersonas =>
				peopleList
					.filter(persona => !listContainsPersona(persona, currentPersonas))
					.splice(0, 5)
			}
			getTextFromItem={i => i.settings.displayName}
			className={'ms-PeoplePicker'}
			onRenderSuggestionsItem={i => (
				<Persona
					size={PersonaSize.size24}
					imageUrl={`data:image/png;base64,${i.avatar}`}
					text={i.settings.displayName}
					styles={{ inner: { padding: 5 } }}
				/>
			)}
			onRenderItem={i => (
				<Persona
					size={PersonaSize.size24}
					imageUrl={`data:image/png;base64,${i.item.avatar}`}
					text={i.item.settings.displayName}
					styles={{ inner: { padding: 5 } }}
					key={i.key}
				/>
			)}
			onChange={props.onChangeHandler}
		/>
	)
}
