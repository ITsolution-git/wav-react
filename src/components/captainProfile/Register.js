import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { btwRegister } from '../../actions/SignOnAction';
import YouTube from 'react-youtube';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
	UsernameInput,
	EmailInput,
	PasswordInput,
	TextInput
} from '../shared/validatedInputs';
import colors from "../../constants/ColorConstants";

class Register extends BaseComponent {
	constructor() {
		super();
		this.state = {
			btwIdentity: {},
			isValid: {
				[fieldConstants.firstName]: false,
				[fieldConstants.lastName]: false,
				[fieldConstants.username]: false,
				[fieldConstants.email]: false,
				[fieldConstants.password]: false,
				'confirmPassword': false
			},
			termsAndPrivacy: false
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

		if (!termsAndPrivacy) {
			return;
		}
        if (Object.values(isValid).every(val => val)) {
            this.props.btwRegister(btwIdentity)
        }
	}

	componentWillReceiveProps(props) {
		if (props.isSuccess) {
			this.onLink(routes.makelist);
		}
	}

	render() {
		const opts = {
			playerVars: { // https://developers.google.com/youtube/player_parameters
			  autoplay: 0
			}
		};

		const {
			startValidation,
			termsAndPrivacy
		} = this.state;

		const { error } = this.props;
		return (
                <Row className="btw-register no-margin">
                    { this.isMobile() && this.renderBackground(colors.blue) }
                    <MobileLogo />
                    <Col md={5} mdOffset={1} className="no-padding">
                        { this.isDesktop() && <AboutInfo /> }
                    </Col>
					<Col mdOffset={1} md={4} xs={12} className="no-padding">
                        <div id="title" className="title-32-light-blue">WELCOME TO BETHEWAVE!</div>
                        <div className="title-24-blue">Help your friends vote.</div>
                        <div id="signup-text" className="title-24-blue">SIGN UP</div>
                        <Row>
                            <Col md={6}>
                                <FirstNameInput onChange={this.handleChange}
                                                startValidation={startValidation}
                                                required />
                            </Col>
                            <Col md={6}>
                                <LastNameInput onChange={this.handleChange}
                                               startValidation={startValidation}
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
                                            customError={error}
                                            required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <PasswordInput onChange={this.handleChange}
                                               startValidation={startValidation}
                                               required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <TextInput label='Confirm Password'
                                           type='password'
                                           validator={value => value === this.state.btwIdentity[fieldConstants.password]}
                                           validatorError='The passwords do not match'
                                           onChange={this.handleChange}
                                           name='confirmPassword'
                                           startValidation={startValidation}
                                           required />
                            </Col>
                        </Row>
						<div className="row">
							<div className="col-xs-1 padding0">
								<label className="checkbox-container">
									<input type="checkbox" onClick={this.onTermsAndPrivacy}/>
									<span className="checkmark"></span>
								</label>
							</div>
							<div className={ this.isMobile() ? "col-xs-11 padding0" : "col-xs-11 padding0 terms-privacy"}>
								<label>
									<span id="title-12-dark-blue">
										I have read and understood the term of use and by signing up, I agree to Bethewave's
										<Link id="link-small-red" target="_blank" to='/termsOfUse'> Terms of Use </Link>
										and <Link id="link-small-red" target="_blank" to='/privacyPolicy'> Privacy Policy</Link>
									</span>
								</label>
							</div>
						</div>
						{ startValidation && !termsAndPrivacy && <span>Terms and Privacy is required</span> }
                        <Row className="justify-content-center">
                            <Col md={12} xs={6} align="center">
                                <div id="btn_signup">
                                    <Button onClick={this.btwRegister.bind(this, 'btwSignOn')}>Sign Me Up!</Button>
                                </div>
                            </Col>
                        </Row>
						<Row>
							<Col>
								<span id='registered-text'>Already registered? </span>
                                <Link id="link-small" target="_blank" to='/'> Sign in </Link>
							</Col>
						</Row>
					</Col>
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