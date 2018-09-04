import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { btwRegister } from '../../actions/SignOnAction';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

import BaseComponent from '../shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';
import fieldConstants from '../../constants/FieldConstants';
import Button from '../shared/Button';
import AboutInfo from '../shared/AboutInfo';
import MobileLogo from '../layout/MobileLogo';

import {
	FirstNameInput,
	LastNameInput,
	EmailInput,
	PasswordInput,
	TextInput
} from '../shared/validatedInputs';
import colors from "../../constants/ColorConstants";
import Dialog from '../shared/Dialog';

class Register extends BaseComponent {
	constructor() {
		super();
		this.state = {
			btwIdentity: {},
			isValid: {
				[fieldConstants.firstName]: false,
				[fieldConstants.lastName]: false,
				[fieldConstants.email]: false,
				[fieldConstants.password]: false,
				'confirmPassword': false
			},
			termsAndPrivacy: false,
            showInfoModal: false
		}
	}

	onTermsAndPrivacy = () => {
		this.setState({ termsAndPrivacy: !this.state.termsAndPrivacy})
	};

    handleChange = (value, valid, name) => {
        this.setState(state => {
            const { btwIdentity, isValid } = state;
            return {
                btwIdentity: { ...btwIdentity, [name]: value },
                isValid: { ...isValid, [name]: valid }
            }
        });
    };


    btwRegister() {
		const { isValid, btwIdentity, termsAndPrivacy } = this.state;
		this.setState({ startValidation: true });

		if (!termsAndPrivacy && this.isDesktop()) {
			return;
        }
        if (Object.values(isValid).every(val => val)) {
            this.props.btwRegister(btwIdentity)
        }
	}

    onCloseInfoModal = () => {
    	this.setState({ showInfoModal: false })
	};

	componentWillReceiveProps(props) {
		if (props.isSuccess) {
			this.onLink(routes.welcome);
		}
	}

	renderAlreadyRegistered = () => {
		return (
            <div id="registered-text-div">
                <span id='registered-text'>Already registered? </span>
                <Link id="link-small" target="_blank" to='/'> Sign in </Link>
            </div>
        );
	};

	render() {
		const {
			startValidation,
			termsAndPrivacy,
            showInfoModal
		} = this.state;
		const { error } = this.props;
		const errorInWhite = this.isMobile();

		return (
                <Row className="btw-register no-margin">
                    { this.isMobile() && this.renderBackground(colors.blue) }
					{ this.isMobile() && <Row>
						<Col xs={6}>
                            <MobileLogo />
						</Col>
						<Col xs={6}>
                            <FontAwesome className="pull-right"
										 id="info-icon"
										 onClick={() => this.setState({ showInfoModal: true })}
										 name='info-circle' />
						</Col>
					</Row> }
                    <Col md={5} mdOffset={1} className="no-padding">
                        { this.isDesktop() && <AboutInfo /> }
                    </Col>
					<Col mdOffset={1} md={4} xsOffset={2} xs={8} className="no-padding">

						 { this.isDesktop() && <div id="title" className="title-32-light-blue">WELCOME TO BETHEWAVE!</div> }
						 { this.isDesktop()
							 ? <Row id="signup-text">
								 <Col md={6}>
                                     <div className="title-24-blue">SIGN UP</div>
								 </Col>
								 <Col md={6}>{ this.renderAlreadyRegistered() }</Col>
							   </Row>
							 : <div id="signup-text-mobile" className="title-24-white">Sign up</div>
						 }
                        <Row>
                            <Col md={6}>
                                <FirstNameInput onChange={this.handleChange}
                                                startValidation={startValidation}
                                                errorWhite={errorInWhite}
                                                required />
                            </Col>
                            <Col md={6}>
                                <LastNameInput onChange={this.handleChange}
                                               startValidation={startValidation}
                                               errorWhite={errorInWhite}
                                               required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <EmailInput onChange={(value, valid, name) => {
                                    const isValid = this.props.error ? true : valid;
                                    this.handleChange(value, isValid, name);
                                }}
                                            isVoter={false}
                                            startValidation={startValidation}
                                            uniqueValidationEnabled={false}
                                            errorWhite={errorInWhite}
                                            customError={error}
                                            required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <PasswordInput onChange={this.handleChange}
                                               startValidation={startValidation}
                                               errorWhite={errorInWhite}
                                               required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <TextInput label='Confirm Password'
                                           type='password'
                                           id="confirmPassword"
                                           validator={value => value === this.state.btwIdentity[fieldConstants.password]}
                                           validatorError='The passwords do not match'
                                           onChange={this.handleChange}
                                           name='confirmPassword'
                                           errorWhite={errorInWhite}
                                           startValidation={startValidation}
                                           required />
                            </Col>
                        </Row>
						{ this.isDesktop() && <div>
                            <div className="row">
                                <div className="col-xs-1 padding0">
                                    <label className="checkbox-container">
                                        <input type="checkbox" onClick={this.onTermsAndPrivacy}/>
									<span className="checkmark" id="terms_policy"></span>
                                    </label>
                                </div>
                                <div className={ this.isMobile() ? "col-xs-11 padding0" : "col-xs-11 padding0 terms-privacy"}>
                                    <label>
									<span className="title-14-dark-blue">
										I have read and understood the term of use and by signing up, I agree to Bethewave's
										<Link id="link-small-red" target="_blank" to='/termsOfUse'> Terms of Use </Link>
										and <Link id="link-small-red" target="_blank" to='/privacyPolicy'> Privacy Policy</Link>
									</span>
                                    </label>
                                </div>
                            </div>
                            { startValidation && !termsAndPrivacy && <span className="error-text">Terms and Privacy is required</span> }
						</div> }
                        <Row className="justify-content-center">
                            <Col md={12} xs={12} align="center">
                                <div id="btn_signup">
                                    <Button onClick={this.btwRegister.bind(this, 'btwSignOn')}>Sign Me Up!</Button>
                                </div>
                            </Col>
                        </Row>
                        { this.isMobile() &&
							<Row>
								<Col> { this.renderAlreadyRegistered() }</Col>
							</Row> }
					</Col>
                    <Dialog show={showInfoModal}
                            closeButton
                            onClose={this.onCloseInfoModal}>
                        <div>
							<div className="title-20-light-blue">
								If you're here, it's because you've <br />
								agreed to help us with something <br />
								really important.
							</div>
							<div id="about-dialog-content" className="text-18-dark-blue">
								We need to make 2018 a wave election for <br />
								progressives, and one of the most <br />
								important things you can do is make sure <br />
								all your progressive friends vote.
								<br /><br />
								BeTheWave is an app that makes this easy, <br />
								and you'are one of the first people to use <br />
								it. As a captain on BeTheWave, you'll list <br />
								out the names of the friends you want to <br />
								help and then we'll take you step by step <br />
								through the process of getting them <br />
								registered and to the polls.
							</div>
							<div className="title-20-dark-blue">
								Thanks for being part of this!
							</div>
						</div>
                    </Dialog>
				</Row>
		);
	}
}

const mapStateToProps = (state) => {
    const { error, isSuccess } = state.app[appDataTypes.register];
    return {
        error,
        isSuccess
    };
};


const mapDispatchToProps = (dispatch) => ({
	btwRegister: (btwIdentity) => dispatch(btwRegister(btwIdentity))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
