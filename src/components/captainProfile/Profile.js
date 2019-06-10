import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import fieldConstants from '../../constants/FieldConstants';
import Button from '../shared/Button';
import RadioButtons from '../shared/inputs/RadioButtons';
import { Dropdown } from '../shared/validatedInputs/InputBase'

import ProfileConstants from '../../constants/ProfileConstants'
import { getBtwUserProfile, btwLogout } from '../../actions/SignOnAction';
import { updateProfile, deleteUser } from '../../actions/UserAction';

import Dialog from '../shared/Dialog';

import {
	FirstNameInput,
	LastNameInput,
	EmailInput,
	PasswordInput,
	TextInput,
	AddressInput,
	PhoneInput,
	DateOfBirthInput,
	ZipCodeInput,
} from '../shared/validatedInputs';

class Profile extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			userProfile: {},
			isValid: {
				[fieldConstants.firstName]: false,
				[fieldConstants.lastName]: false,
				[fieldConstants.email]: false,
				[fieldConstants.address]: false,
				[fieldConstants.phone]: false,
				[fieldConstants.dateOfBirth]: false,
				[fieldConstants.zipCode]: false,
				[fieldConstants.password]: false,
				'confirmPassword': false,
				'confirmName': false
			},
			updateResult: null,
			showConfirmModal: false
		}

		props.actions.getBtwUserProfile();
	}

	/**
	 * Update profile from api result
	 * @param {*} nextProps 
	 */
	componentWillReceiveProps(nextProps) {
		if (this.props.profile.isFetching === true && nextProps.profile.isSuccess === true) {
			this.setState({
				userProfile: nextProps.profile.data
			})
		}
		if (this.props.user.isUpdatingProfile === true && nextProps.user.isUpdatingProfile === false) {
			this.setState({
				updateResult: nextProps.user.isUpdatedProfile
			})
		}
		// Signout when successfully closed account
		if (nextProps.user.isDeleteSuccess === true) {
			this.props.actions.btwLogout()
		}
	}

	/**
	 * Whenever input is changed, this func will update state.
	 */
    handleChange = (value, valid, name) => {
        this.setState(state => {
            const { userProfile, isValid } = state;
            return {
                userProfile: { ...userProfile, [name]: value },
                isValid: { ...isValid, [name]: valid }
            }
        });
	};
	
	/**
	 * Whenever subscription status is changed, this func will update state.
	 */
	handleChangeSubscription = (value) => {
		this.setState({
			userProfile: { ...this.state.userProfile, 'isSubscribed': value === 'yes' }
		});
	}

	/**
	 * Whenever selection is changed, this func will update state.
	 */
	handleSelect = (e) => {
		this.setState({
			userProfile: { ...this.state.userProfile, [e.target.name]: e.target.value }
		});
	}

	/**
	 * Api call for update profile
	 */
	updateProfile = () => {
		const { userProfile } = this.state
		let userid = userProfile.id
		let information = {}

		for (let item in userProfile) {
			if (userProfile[item] !== '' && item !== 'id' && item !== 'confirmPassword') {
				information[item] = userProfile[item]
			}
		}

		this.props.actions.updateProfile({userid, information})
	}

	/**
	 * Api call for close account
	 */
	closeAccount = () => {
		const { userProfile, isValid } = this.state;

		if (!isValid['confirmName']) {
			return ;
		}
		this.props.actions.deleteUser({ userid: userProfile.id })
		this.setState({
			showConfirmModal: false
		})
	}

	/**
	 * Close modal
	 */
	onCloseConfirmModal = () => {
        this.setState({showConfirmModal: false})
    }

	render() {
		const { userProfile } = this.state;

		return (
			<div>
				<div className="profile">
					<div className="row">
						<div className="col-lg-6 profile-info">
							<div className="title2">Personal Information</div>

							<form className="input-form">
								<Row>
									<Col md={6}>
										<FirstNameInput 
											defaultValue={userProfile.firstname || ''}
											onChange={this.handleChange}
											required
										/>
									</Col>
									<Col md={6}>
										<LastNameInput 
											defaultValue={userProfile.lastname || ''}
											onChange={this.handleChange}
											required
										/>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<EmailInput 
											defaultValue={userProfile.email || ''}
											onChange={this.handleChange}
											disabled={true}
										/>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<AddressInput 
											defaultValue={userProfile.address || ''}
											onChange={this.handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<PhoneInput 
											defaultValue={userProfile.phonenumber || ''}
											onChange={this.handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<DateOfBirthInput
											defaultValue={userProfile.dateofbirth || ''}
											onChange={this.handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<ZipCodeInput 
											name="zipcode"
											defaultValue={userProfile.zipcode || ''}
											onChange={this.handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<PasswordInput 
											onChange={this.handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
                                        <TextInput label='Confirm Password'
                                                   type='password'
                                                   validator={value => value === this.state.userProfile[fieldConstants.password]}
                                                   validatorError='The passwords do not match'
                                                   onChange={this.handleChange}
                                                   name='confirmPassword' />
									</Col>
								</Row>
							</form>
						</div>
						<div className="col-lg-6 profile-info">
							<div className="title2">Notification</div>

							<form className="input-form">
								<Row>
									<Col md={12}>
										<RadioButtons title='Email Subscription Status'
											values={[
												{ value: 'yes', label: 'Subscribed' },
												{ value: 'no', label: 'Turn off email notification'}
											]}
											onChange={this.handleChangeSubscription}
											value={userProfile.isSubscribed === true ? 'yes' : 'no'} />
									</Col>
								</Row>
							</form>

							<div className="title2">Preferences</div>

							<form className="input-form">
								<Row>
									<Col md={12}>
										<Dropdown 
											label='Preferred Language'
											name='language'
											defaultValue={userProfile.language}
											values={ProfileConstants.language}
											onChange={this.handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<Dropdown 
											label='Voting Preference'
											name='votingPreference'
											defaultValue={userProfile.votingPreference}
											values={ProfileConstants.votingPreference}
											onChange={this.handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<Dropdown 
											label='Areas of Interest'
											name='areaOfInterest'
											defaultValue={userProfile.areaOfInterest}
											values={ProfileConstants.areaOfInterest}
											onChange={this.handleChange}
										/>
									</Col>
								</Row>
							</form>

							<Row className="margin-right">
								<Col md={12} style={{textAlign:'center'}}>
								{ this.state.updateResult === true && <span style={{ fontSize: "18px", color: "green" }}>User Profile updated!</span> }
								{ this.state.updateResult === false && <span style={{ fontSize: "18px", color: "red" }}>User Profile wasn't updated!</span> }
								</Col>
							</Row>
							<Row className="margin-right">
								<Col md={12} xs={12} style={{textAlign:'center'}}>
									<div id="btn_signup">
										<Button onClick={this.updateProfile}>Update Profile</Button>
									</div>
								</Col>
							</Row>

							<div className="title2" style={{marginTop:'10px'}}>Account Services</div>

							<Row className="account-service">
								<Col md={6} xs={6}>
									<span>Delete account</span>
								</Col>
								<Col md={6} xs={6} style={{textAlign:'center'}}>
									<div id="btn_remove">
										<Button id="closeAccountBtn" onClick={() => this.setState({showConfirmModal: true})}>Close Account</Button>
									</div>
								</Col>
							</Row>

							<Dialog id='closeAccountDialog'
								title='Warning!'
								show={this.state.showConfirmModal}
								actionButtons={
									<Row>
										<Col md={6} xs={6} className="text-right">
											<Button id="closeAccountConfirmBtn" size='medium' onClick={this.closeAccount}>
												I understand
											</Button>
										</Col>
										<Col md={6} xs={6} className="text-left">
											<Button onClick={this.onCloseConfirmModal}>
												Go back
											</Button>
										</Col>
									</Row>
								}
								onClose={this.onCloseConfirmModal}>
									<div style={{padding:'15px'}}>
										<h4 style={{color:'grey', border:'1px solid red', padding:'10px'}}>Deleting your account will remove all progress and tasks associated with this account. Your Logon credentials would not work and in order to use this platform, you will need to re-register</h4>
										<h4>Confirm by typing in your name in the text below to authorize us to delete your account</h4>
									</div>

									<Row>
										<Col md={12} style={{padding:'0 30px'}}>
											<TextInput label='Firstname Lastname'
													type='text'
													id="confirmName"
													validator={value => value === (this.state.userProfile[fieldConstants.firstName] + ' ' + this.state.userProfile[fieldConstants.lastName])}
													validatorError='The name is not correct!'
													onChange={this.handleChange}
													name='confirmName' />
										</Col>
									</Row>
							</Dialog>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const profile = state.app[appDataTypes.profile];
    return {
		profile,
		user: state.user
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ getBtwUserProfile, updateProfile, deleteUser, btwLogout }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));