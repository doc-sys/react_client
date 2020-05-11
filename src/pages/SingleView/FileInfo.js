import * as React from 'react'
import { Stack, StackItem, Persona, PersonaSize } from '@fluentui/react'
import Moment from 'react-moment'

import { useSelector } from 'react-redux'

export function FileInfo(props) {
	const fileItem = useSelector(state => state.currentFile.document)

	return (
		<Stack tokens={{ childrenGap: 10 }}>
			{fileItem.owner && (
				<>
					<Stack
						horizontal
						tokens={{ childrenGap: 20 }}
						styles={{
							root: { width: '100%', whiteSpace: 'nowrap', overflow: 'hidden' },
							inner: { maxWidth: 150 },
						}}
						style={{ '&:hover': { background: '#bebbb8' } }}
						horizontalAlign="space-between"
					>
						<StackItem>File Type</StackItem>
						<StackItem align="end">{fileItem.mime}</StackItem>
					</Stack>
					<Stack
						horizontal
						tokens={{ childrenGap: 20 }}
						styles={{ root: { width: '100%' } }}
						horizontalAlign="space-between"
					>
						<StackItem>Created</StackItem>
						<StackItem>
							<Moment format="DD.MM.YYYY">{fileItem.created}</Moment>
						</StackItem>
					</Stack>
					<Stack
						horizontal
						tokens={{ childrenGap: 20 }}
						styles={{ root: { width: '100%' } }}
						horizontalAlign="space-between"
					>
						<StackItem>Owner</StackItem>
						<StackItem>
							<Persona
								size={PersonaSize.size24}
								imageUrl={`data:image/png;base64,${fileItem.owner.avatar}`}
								text={fileItem.owner.settings.displayName}
								styles={{ details: { paddingRight: 0 } }}
							/>
						</StackItem>
					</Stack>
				</>
			)}
		</Stack>
	)
}
