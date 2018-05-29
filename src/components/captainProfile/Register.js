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

import {
	FirstNameInput,
	LastNameInput,
	UsernameInput,
	EmailInput,
	PasswordInput,
	TextInput
} from '../shared/validatedInputs';

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
			<div>
				<div className="new-btw-register">
					<div className="row">
						<div className="col-lg-6 register-form">
							<div className="title1">Welcome to BeTheWave!</div>
							<div className="title2">Help your friends register & vote</div>
							<div className="title-line"></div>
							{ this.renderRequiredFieldMsg() }
							<div className="subtitle1">Create an account</div>
							<Link to='/' className="subtitle2">(Already have an account? Log in.)</Link>

							<form className="input-form">
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
										<UsernameInput onChange={this.handleChange}
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
								<div className="">
									<div className="row marginTermsPolicy">
										<div className="col-xs-1 padding0">
											<label className="checkbox-container">
												<input type="checkbox" onClick={this.onTermsAndPrivacy}/>
												<span className="checkmark"></span>
											</label>
										</div>
										<div className={ this.isMobile() ? "col-xs-11 padding0" : "col-xs-11 padding0 terms-privacy"}>
											<label>
												I have read and understood the term of use and by signing up, I agree to Bethewave's <Link target="_blank" to='/termsOfUse'>Terms of Use</Link> and <Link target="_blank" to='/privacyPolicy'>Privacy Policy</Link>
											</label>
										</div>
									</div>
									{ startValidation && !termsAndPrivacy && <span>Terms and Privacy is required</span> }
								</div>
								<br/><br/>
							</form>
							<Row className="margin-right">
								<Col xs={6}>	
								</Col>
								<Col md={12} xs={6}>
									<div id="btn_signup">
										<button className="btn btn-signup" onClick={this.btwRegister.bind(this, 'btwSignOn')}>Sign Me Up!</button>
									</div>
								</Col>
							</Row>
						</div>

						<div className="col-lg-6 register-video">
							<YouTube
								videoId="qSTwrt8oE3g"
								opts={opts}
								className="video"
								onReady={this._onReady}
							/>
							<div className="subtitle1">
								If you're here, it's because you've agreed to help us with something really important.
							</div>

							<div className="subtitle2">
								We need to make 2018 a wave election for progressives, and one of the most important things you can do is make sure all your progressive friends vote.
							</div>

							<div className="subtitle2">
								BeTheWave is an app that makes this easy, and you'are one of the first people to use it. As a captain on BeTheWave, you'll list out the names of the friends you want to help and then we'll take you step by step through the process of getting them registered and to the polls.
							</div>

							<div className="subtitle2">
								This is a prototype, and there might be some bugs and hiccups along the way. Your feedback is going to be crucial to making sure the final product is successful.
							</div>

							<div className="subtitle1">
								Thanks for being part of this!
							</div>
							<br/>
						</div>
					</div>
				</div>
			</div>
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