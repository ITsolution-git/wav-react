import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap'

import { VoterAvatar, VoterInfo } from './index'
import { SocialList, StatusIcon } from '../index'

const VoterItem = (props) => {
	const { data, keyword } = props
	return (
		<Row className='btw-paper d-flex my-3 mx-0 py-3 btw-voter-item align-items-center'>
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
	keyword: PropTypes.string,
	data: PropTypes.object.isRequired
}

VoterItem.defaultProps = {
	keyword: '',
	data: {}
}

export default VoterItem