import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import { BaseComponent } from '../shared'
import { VotersList, VoterDetail, FilterBar } from './index'

class VotersManagement extends BaseComponent {
	render () {
		return (
			<Container>
				<Row className='text-center'>
					<Col>
						<FilterBar {...this.props} />
					</Col>
				</Row>
				<Row>
					<Col>
						<VotersList {...this.props} />
					</Col>
					<Col>
						<VoterDetail {...this.props} />
					</Col>
				</Row>				
			</Container>
		)		
	}
}

export default VotersManagement