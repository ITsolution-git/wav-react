/**
 * Show panel with title and components in settings page
 */

import React from 'react'
import PropTypes from 'prop-types'

const Panel = (props) => (
	<div className='d-flex flex-column btw-paper btw-profile-panel mb-4' id={props.id}>
		<div className='panel-title px-4 py-3'>
			<strong>{props.title}</strong>
		</div>
		<div className='panel-body px-5 py-3'>
			{props.children}
		</div>
	</div>
)

Panel.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
}

Panel.defaultProps = {
	id: '',
	title: '',
	children: <div /> 
}

export default Panel;