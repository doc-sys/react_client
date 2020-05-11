import * as React from 'react'
import {
	CommandBar,
	DialogFooter,
	Dialog,
	PrimaryButton,
	DefaultButton,
	DialogType,
} from '@fluentui/react'

import { useDispatch, useSelector } from 'react-redux'

import { history } from '../../redux/_helpers/history'
import { documentActions } from '../../redux/_actions/document.actions'

import { PeopleAutosuggest } from './Picker'

const _farItems = [
	{
		key: 'info',
		text: 'Info',
		// This needs an ariaLabel since it's icon-only
		ariaLabel: 'Info',
		iconOnly: true,
		iconProps: { iconName: 'Info' },
		onClick: () => console.log('Info'),
	},
]

export function HomeToolbar(props) {
	const [showShareModal, toogleShareModal] = React.useState(false)
	const [showDeleteModal, setDeleteModal] = React.useState(false)
	const [selectedToShare, setSelectedToShare] = React.useState([])

	const dispatch = useDispatch()

	const _items = [
		{
			key: 'upload',
			text: 'New',
			iconProps: { iconName: 'Upload' },
			onClick: () => history.push('/upload'),
			disabled: props.itemsSelected,
		},
		{
			key: 'delete',
			text: 'Delete',
			iconProps: { iconName: 'Delete' },
			disabled: !props.itemsSelected,
			onClick: () => setDeleteModal(true),
		},
		{
			key: 'share',
			text: 'Share',
			iconProps: { iconName: 'Share' },
			onClick: () => {
				toogleShareModal(!showShareModal)
			},
			disabled: !props.itemsSelected,
		},
	]

	return (
		<div>
			<Dialog
				hidden={!showShareModal}
				onDismiss={() => toogleShareModal(false)}
				dialogContentProps={{
					type: DialogType.largeHeader,
					title: 'Share Documents',
					subText:
						'Please select the users you wish to share with. Users can modify documents as if they were their own.',
				}}
				modalProps={{
					isBlocking: true,
					styles: { main: { maxWidth: 450 } },
				}}
			>
				<PeopleAutosuggest onChangeHandler={setSelectedToShare} />
				<DialogFooter>
					<PrimaryButton
						onClick={() => {
							props.selection.forEach(file => {
								selectedToShare.forEach(user => {
									dispatch(documentActions.share(file.fileId, user._id))
								})
							})
						}}
					>
						Share
					</PrimaryButton>
					<DefaultButton onClick={() => toogleShareModal(false)}>
						Cancel
					</DefaultButton>
				</DialogFooter>
			</Dialog>

			<Dialog
				hidden={!showDeleteModal}
				onDismiss={() => setDeleteModal(false)}
				dialogContentProps={{
					type: DialogType.largeHeader,
					title: 'Delete Documents',
					subText:
						'You are about to delete all selected documents for you and everybody you shared them with. Proceed with caution.',
				}}
				modalProps={{
					isBlocking: true,
					styles: { main: { maxWidth: 450 } },
				}}
			>
				<DialogFooter>
					<PrimaryButton
						onClick={() => {
							props.selection.forEach(el => {
								dispatch(documentActions.delete(el.fileId))
							})
							setDeleteModal(false)
						}}
					>
						Delete
					</PrimaryButton>
					<DefaultButton onClick={() => setDeleteModal(false)}>Cancel</DefaultButton>
				</DialogFooter>
			</Dialog>
			<CommandBar
				items={_items}
				farItems={_farItems}
				styles={{ root: { paddingLeft: 0 } }}
			/>
		</div>
	)
}
