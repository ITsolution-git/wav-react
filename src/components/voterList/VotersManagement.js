import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'

import { BaseComponent } from '../shared'
import { VotersList, VoterDetail, FilterBar } from './index'

class VotersManagement extends BaseComponent {
	render () {
		return (
			<Container className='btw-voter-page'>
				<Row className='text-center'>
					<Col>
						<FilterBar {...this.props} />
					</Col>
				</Row>
				<Row>
					<Col md='12' lg='6'>
						<VotersList {...this.props} />
					</Col>
					<Col md='12' lg='6'>
						<VoterDetail {...this.props} />
					</Col>
				</Row>				
			</Container>
		)		
	}
}

export default VotersManagement