import * as React from 'react'

import {
	Dialog,
	DialogType,
	DialogFooter,
	PrimaryButton,
	DefaultButton,
} from '@fluentui/react'

export const shareModal = props => {
	let hidden = props.hidden
	return (
		<Dialog
			hidden={props.hidden}
			onDismiss={() => (hidden = !hidden)}
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
				<DefaultButton onClick={() => (hidden = !hidden)}>Cancel</DefaultButton>
			</DialogFooter>
		</Dialog>
	)
}
