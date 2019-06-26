/**
 * Show panel with title and components in settings page
 */

import React from 'react'
import PropTypes from 'prop-types'

const Panel = (props) => (
	<div className='d-flex flex-column btw-paper btw-profile-panel mb-4'>
		<div className='panel-title px-4 py-3'>
			<strong>{props.title}</strong>
		</div>
		<div className='panel-body px-5 py-3'>
			{props.children}
		</div>
	</div>
)

Panel.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
}

Panel.defaultProps = {
	title: '',
	children: <div /> 
}

export default Panel;