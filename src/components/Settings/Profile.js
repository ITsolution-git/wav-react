import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap'

import { 
	BaseComponent, 
	Typography, 
	LeftSideMenu,
	Panel,
} from '../shared';
import { ProfileInformation, PasswordSetting, NotificationSetting } from './index'

class Profile extends BaseComponent {
	onGotoPanel = menu => {

	}

	onLogout = event => {

	}

	render() {
		return (
			<Container>
				<Row className='my-4 d-none d-md-block'>
					<Col>
						<Typography> Account Settings </Typography>
					</Col>
				</Row>
				<Row className='my-4'>
					<Col lg={2}>
						<LeftSideMenu onSetActiveMenu={this.onGotoPanel} onLogout={this.onLogout}  />
					</Col>
					<Col lg={8}>
						<Panel title='Profile Information'>
							<ProfileInformation />
						</Panel>
						<Panel title='Password'>
							<PasswordSetting />
						</Panel>
						<Panel title='Password'>
							<NotificationSetting />
						</Panel>
						
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
