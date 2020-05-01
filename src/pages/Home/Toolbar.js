import * as React from 'react'
import {
	CommandBar,
	DialogFooter,
	Dialog,
	PrimaryButton,
	DefaultButton,
	DialogType,
} from '@fluentui/react'

import { shareModal } from './shareModal'

import { history } from '../../redux/_helpers/history'

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

	const _items = [
		{
			key: 'upload',
			text: 'New',
			iconProps: { iconName: 'Upload' },
			onClick: () => history.push('/upload'),
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
				<p>TEXT</p>
				<DialogFooter>
					<PrimaryButton onClick={null}>Share</PrimaryButton>
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
					<PrimaryButton onClick={null}>Share</PrimaryButton>
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
