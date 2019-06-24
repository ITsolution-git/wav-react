import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap'

import { VoterAvatar, VoterInfo } from './index'
import { SocialList, StatusIcon } from '../index'

const VoterItem = (props) => {
	const { data, keyword, onSelectItem, active } = props
	return (
		<Row 
			onClick={onSelectItem} 
			className={classNames({ 'active-item': active }, 'btw-paper d-flex my-3 mx-0 py-3 btw-voter-item align-items-center')}>
			<Col xs='1'>
				<VoterAvatar {...data} />
			</Col>
			<Col xs='5' className='pl-4'>
				<VoterInfo {...data} keyword={keyword} />
			</Col>
			<Col xs='3'>
				<SocialList social={data.social} />
			</Col>
			<Col xs='3' className='p-0'>
				<StatusIcon type={data.status} />
			</Col>
		</Row>
	)
}

VoterItem.propTypes = {
	/* keyword searched */
	keyword: PropTypes.string,
	/* active whether selected or not by clicking */
	active: PropTypes.bool,
	/* voter data */
	data: PropTypes.object.isRequired,
	/* action click handler with this component */	
	onSelectItem: PropTypes.func.isRequired
}

VoterItem.defaultProps = {
	keyword: '',
	active: false,
	data: {}
}

export default VoterItem