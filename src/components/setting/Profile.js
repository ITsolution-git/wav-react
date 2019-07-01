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
	ButtonLink,
} from '../shared';
import { ProfileInformation, PasswordSetting, NotificationSetting, DeleteAccountDialog } from './index'

class Profile extends BaseComponent {
	state = {
		activeMenu: '',
		openDeleteModal: false,
	}
	onGotoPanel = menu => {
		this.setState({ activeMenu: menu })
	}

	onLogout = event => {

	}

	onOpenDeleteAccountModal = event => {
		this.setState({ openDeleteModal: true })
	}

	onCloseModal = event => {
		this.setState({ openDeleteModal: false })	
	}

	showSection = () => {
		const { activeMenu } = this.state
		switch(activeMenu) {
			case 'Password':
				return <PasswordSetting />
			case 'Notification':
				return <NotificationSetting />
			case 'Profile':
			default:
				return <>
						<ProfileInformation />
						<ButtonLink className='my-5 ml-3' label={'Delete your account'} onClick={this.onOpenDeleteAccountModal} />
					</>

		}
	}

	onDeleteAccount = () => {

	}

	onSaveChange = () => {

	}

	render() {
		const { openDeleteModal } = this.state
		return (
			<Container className='btw-account-settings'>
				<Row className='my-4 d-none d-md-block'>
					<Col>
						<Typography> Account Settings </Typography>
					</Col>
				</Row>
				<Row className='my-4'>
					<Col lg={2} className='side-wrapper'>
						<LeftSideMenu onSetActiveMenu={this.onGotoPanel} onLogout={this.onLogout}  />
					</Col>
					{ this.isMobileOnly() ? 
						<Col>
							{this.showSection()}
						</Col>
					:
						<Col lg={8}>
							<Panel title='Profile Information'>
								<ProfileInformation />
							</Panel>
							<Panel title='Password'>
								<PasswordSetting />
							</Panel>
							<Panel title='Notification'>
								<NotificationSetting />
							</Panel>
							<ButtonLink className='mt-5' label={'Delete your account'} onClick={this.onOpenDeleteAccountModal} />
						</Col>
					}
				</Row>
				<DeleteAccountDialog 
					open={openDeleteModal}
					onClose={this.onCloseModal}
					onDelete={this.onDeleteAccount}
				/>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));
