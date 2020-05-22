import * as React from 'react'
import {
	CommandBar,
	DialogFooter,
	Dialog,
	PrimaryButton,
	DefaultButton,
	DialogType,
} from '@fluentui/react'
import { PeopleAutosuggest } from '../Files/Picker'

import { useDispatch, useSelector } from 'react-redux'

import { documentActions } from '../../redux/_actions/document.actions'

import { history } from '../../redux/_helpers/history'

export function SVToolbar(props) {
	const [showShareModal, toogleShareModal] = React.useState(false)
	const [showDeleteModal, setDeleteModal] = React.useState(false)
	const [showArchiveModal, setArchiveModal] = React.useState(false)

	const [selectedToShare, setSelectedToShare] = React.useState([])

	const loading = useSelector(state => state.currentFile.loadingDocument)
	const file = useSelector(state => state.currentFile.document)
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
		{
			key: 'archive',
			text: 'Archive',
			iconProps: { iconName: 'Archive' },
			onClick: () => {
				setArchiveModal(!showArchiveModal)
			},
			disabled: loading,
		},
		{
			key: 'queue',
			text: 'Add Queue',
			iconProps: { iconName: 'BuildQueueNew' },
			subMenuProps: {
				items: [
					{
						key: 'ocr',
						text: 'OCR',
						iconProps: { iconName: 'TextRecognition' },
						onClick: () => dispatch(documentActions.queueOCR(file.fileId)),
						disabled: file.ocr,
					},
					{
						key: 'keywords',
						text: 'Keyword Extraction',
						iconProps: { iconName: 'KeyPhraseExtraction' },
						onClick: () => dispatch(documentActions.queueKey(file.fileId)),
						disabled: file.key,
					},
				],
			},
		},
	]

	return (
		<div>
			<Dialog
				hidden={!showShareModal}
				onDismiss={() => toogleShareModal(false)}
				dialogContentProps={{
					type: DialogType.largeHeader,
					title: 'Share file',
					subText:
						'Please select the users you wish to share with. Users can modify file as if they were their own.',
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
							selectedToShare.forEach(user => {
								dispatch(documentActions.share(file.fileId, user._id))
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
					title: 'Delete File',
					subText:
						'You are about to delete this file for you and everybody you shared it with. Proceed with caution.',
				}}
				modalProps={{
					isBlocking: true,
					styles: { main: { maxWidth: 450 } },
				}}
			>
				<DialogFooter>
					<PrimaryButton
						onClick={() => {
							dispatch(documentActions.delete(file.fileId))
							setDeleteModal(false)
							history.push('/')
						}}
					>
						Delete
					</PrimaryButton>
					<DefaultButton onClick={() => setDeleteModal(false)}>Cancel</DefaultButton>
				</DialogFooter>
			</Dialog>

			<Dialog
				hidden={!showArchiveModal}
				onDismiss={() => setArchiveModal(false)}
				dialogContentProps={{
					type: DialogType.largeHeader,
					title: 'Archive file',
					subText:
						'You are about to move this file into the archive. It will not be easlily retrived. Proceed with caution.',
				}}
				modalProps={{
					isBlocking: true,
					styles: { main: { maxWidth: 450 } },
				}}
			>
				<DialogFooter>
					<PrimaryButton
						onClick={() => {
							dispatch(documentActions.archive(file.fileId))
							setArchiveModal(false)
						}}
					>
						Archive
					</PrimaryButton>
					<DefaultButton onClick={() => setArchiveModal(false)}>
						Cancel
					</DefaultButton>
				</DialogFooter>
			</Dialog>

			<CommandBar items={_items} styles={{ root: { paddingLeft: 0 } }} />
		</div>
	)
}
