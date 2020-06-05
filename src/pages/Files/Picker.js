import * as React from 'react'
import { NormalPeoplePicker, Persona, PersonaSize } from '@fluentui/react'

import { authHeader } from '../../redux/_helpers/authHeader'

export function PeopleAutosuggest(props) {
	const [peopleList, setPeopleList] = React.useState([])
	// const [selectedList, setSelectedList] = React.useState([])

	const suggestionProps = {
		suggestionHeaderText: 'Suggested People',
		noResultsFoundText: 'No results found',
		loadingText: 'Loading',
		showRemoveButton: true,
	}

	const onFilterChanged = (filterText, currentPersonas, limitResults) => {
		if (filterText) {
			let filteredPersonas = filterPersonasByText(filterText)
			filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas)
			filteredPersonas = limitResults
				? filteredPersonas.slice(0, limitResults)
				: filteredPersonas

			return filteredPersonas
		} else {
			return []
		}
	}

	const filterPersonasByText = filterText => {
		return peopleList.filter(item =>
			doesTextStartWith(item.settings.displayName, filterText)
		)
	}

	const doesTextStartWith = (text, filterText) => {
		return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0
	}

	const listContainsPersona = (persona, personas) => {
		if (!personas || !personas.length || personas.length === 0) {
			return false
		}
		return (
			personas.filter(
				item => item.settings.displayName === persona.settings.displayName
			).length > 0
		)
	}

	const removeDuplicates = (personas, possibleDupes) => {
		return personas.filter(
			persona => !listContainsPersona(persona, possibleDupes)
		)
	}

	const onRemoveSuggestion = () => {}

	React.useEffect(() => {
		const requestOptions = {
			method: 'GET',
			headers: authHeader({ 'Content-Type': 'application/json' }),
		}
		fetch(
			`/api/user/`,
			requestOptions
		)
			.then(response => response.json())
			.then(data => {
				setPeopleList(data.user)
			})
	}, [])

	return (
		<NormalPeoplePicker
			onResolveSuggestions={onFilterChanged}
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
					styles={{ inner: { padding: 5 }, root: { padding: 5, margin: 5 } }}
				/>
			)}
			onRenderItem={i => (
				<Persona
					size={PersonaSize.size24}
					imageUrl={`data:image/png;base64,${i.item.avatar}`}
					text={i.item.settings.displayName}
					styles={{ inner: { padding: 5 }, root: { margin: 5 } }}
					key={i.key}
				/>
			)}
			onChange={props.onChangeHandler}
		/>
	)
}
