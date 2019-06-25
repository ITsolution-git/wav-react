import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap'

import { BaseComponent, Typography } from '../shared';

class Profile extends BaseComponent {
	render() {
		return (
			<Container>
				<Row className='my-4'>
					<Col>
						<Typography> Account Settings </Typography>
					</Col>
				</Row>
				<Row className='my-4'>
					<Col lg={3}>
						leftside
					</Col>
					<Col lg={9}>
						rightside
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));
