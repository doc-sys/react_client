import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Nav } from '@fluentui/react'

export class Sidebar extends Component {
	static contextTypes = {
		router: PropTypes.object,
	}

	onClick(e, el) {
		e.preventDefault()
		this.props.history.push(el.url)
	}

	render() {
		const { items = [] } = this.props
		const { router } = this.context

		return (
			<Nav
				styles={{ root: { padding: 20 } }}
				selectedKey={router && router.route.location.pathname}
				groups={items}
				onLinkClick={this.onClick.bind(this)}
			/>
		)
	}
}
