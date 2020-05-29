import * as React from 'react'
import {
	Stack,
	StackItem,
	FontIcon,
	FontSizes,
	FontWeights,
} from '@fluentui/react'

import { authHeader } from '../../redux/_helpers/authHeader'

import { useSelector } from 'react-redux'

import { Document, Page, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export function PreviewHandler(props) {
	const fileItem = useSelector(state => state.currentFile.document)

	const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg']
	if (fileItem && fileItem.extension === 'pdf') {
		return <PDFHandler />
	} else if (fileItem && imageTypes.includes(fileItem.extension)) {
		return <ImageHandler />
	} else return <NoPreviewHandler />
}

function PDFHandler(props) {
	const [page, setPage] = React.useState(1)
	const [maxPages, setMaxPages] = React.useState(1)

	const fileItem = useSelector(state => state.currentFile.document)

	const onLoadSuccess = doc => {
		const { numPages } = doc
		setMaxPages(numPages)
	}

	return (
		<Stack styles={{ root: { alignItems: 'center' } }}>
			<StackItem>
				<Document
					file={{
						url: `/api/document/checkout/${fileItem.fileId}`,
						httpHeaders: authHeader(),
					}}
					onLoadSuccess={onLoadSuccess}
					onLoadError={console.error}
					onSourceError={console.error}
					fillWidth={true}
				>
					<Page
						pageNumber={page}
						style={{ width: '100%', overflow: 'hide' }}
						width={400}
					/>
				</Document>
			</StackItem>
			<StackItem>
				<Stack horizontal>
					<StackItem>
						<FontIcon
							iconName="ChevronLeftMed"
							onClick={() => (page === 0 ? '' : setPage(page - 1))}
						/>
					</StackItem>
					<StackItem>
						<p
							style={{ margin: 0, paddingLeft: 5, paddingRight: 5 }}
						>{`${page} of ${maxPages}`}</p>
					</StackItem>
					<StackItem>
						<FontIcon
							iconName="ChevronRightMed"
							onClick={() => (page === maxPages ? '' : setPage(page + 1))}
						/>
					</StackItem>
				</Stack>
			</StackItem>
		</Stack>
	)
}

function ImageHandler(props) {
	let token = localStorage.getItem('token')
	const fileItem = useSelector(state => state.currentFile.document)

	return (
		<img
			src={`/api/document/checkout/${fileItem.fileId}?token=${token}`}
			alt="Meaningful text"
			style={{ width: '100%' }}
		/>
	)
}

function NoPreviewHandler() {
	return (
		<Stack
			horizontalAlign="center"
			verticalAlign="center"
			styles={{ root: { minWidth: 400, minHeight: 300, color: '#979593' } }}
			className=""
			tokens={{ childrenGap: 10 }}
		>
			<StackItem
				styles={{
					root: { fontSize: FontSizes.large, fontWeight: FontWeights.bold },
				}}
			>
				:(
			</StackItem>
			<StackItem>No content to preview</StackItem>
		</Stack>
	)
}
