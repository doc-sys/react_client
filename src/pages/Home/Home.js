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

export function Home(props) {
	return (
		<Stack>
			<StackItem>
				<span className="ms-fontSize-42 ms-fontWeight-semibold">Dashboard</span>
			</StackItem>
		</Stack>
	)
}
