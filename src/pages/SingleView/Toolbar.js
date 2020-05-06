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

import { documentActions } from '../../redux/_actions/document.actions'

import { history } from '../../redux/_helpers/history'

export function SVToolbar(props) {
	const [showShareModal, toogleShareModal] = React.useState(false)
	const [showDeleteModal, setDeleteModal] = React.useState(false)

	const loading = useSelector(state => state.loadedDoc.loadingDocument)
	const file = useSelector(state => state.loadedDoc.document)
	const dispatch = useDispatch()

	const _items = [
		{
			key: 'download',
			text: 'Download',
			iconProps: { iconName: 'Download' },
			disabled: loading,
			onClick: () => dispatch(documentActions.checkout(file.fileId)),
		},
		{
			key: 'delete',
			text: 'Delete',
			iconProps: { iconName: 'Delete' },
			disabled: loading,
			onClick: () => setDeleteModal(true),
		},
		{
			key: 'share',
			text: 'Share',
			iconProps: { iconName: 'Share' },
			onClick: () => {
				toogleShareModal(!showShareModal)
			},
			disabled: loading,
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
						'You are about to delete this document for you and everybody you shared it with. Proceed with caution.',
				}}
				modalProps={{
					isBlocking: true,
					styles: { main: { maxWidth: 450 } },
				}}
			>
				<DialogFooter>
					<PrimaryButton onClick={null}>Delete</PrimaryButton>
					<DefaultButton onClick={() => setDeleteModal(false)}>Cancel</DefaultButton>
				</DialogFooter>
			</Dialog>

			<CommandBar items={_items} styles={{ root: { paddingLeft: 0 } }} />
		</div>
	)
}
