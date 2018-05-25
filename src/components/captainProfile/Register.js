import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { btwRegister } from '../../actions/SignOnAction';
import YouTube from 'react-youtube';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { validate } from '../../utility/InputValidator';
import BaseComponent from '../shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';

class Register extends BaseComponent {
	constructor() {
		super();
		this.state = {
			btwIdentity: this.getEmptyState(),
			isValid: this.getEmptyState(true),
			termsAndPrivacy: -1
		}
	}

	getEmptyState = (initValue = '') => {
		return {
            firstname: initValue,
            lastname: initValue,
            username: initValue,
            password: initValue !== '' ? false : '',
            confirmPassword: initValue,
            email: initValue
        };
	};

	updateRegisterFields(field, event) {
		let identity = Object.assign({}, this.state.btwIdentity);
		identity[field] = event.target.value;
		this.setState({
			btwIdentity: identity
		})
	}

	onTermsAndPrivacy(event) {
		this.setState({
			termsAndPrivacy: this.state.termsAndPrivacy === -1 ? 1 : 1 - this.state.termsAndPrivacy
		})
	}

	validateRegisterFields(field, event) {
		const { btwIdentity, isValid } = this.state,
			{ value } = event.target;
		let validation = { ...isValid };

		validation[field] = field === 'confirmPassword'
			? btwIdentity.password === value
			: validate(field, value);

		this.setState({ isValid: validation });
	}

	btwRegister(event) {
		const { isValid, btwIdentity } = this.state;
		let validation = { ...isValid };
        Object.keys(btwIdentity).forEach(key => {
        	validation[key] = key === 'confirmPassword'
				? btwIdentity.password === btwIdentity[key]
				: validate(key,  btwIdentity[key]);
        });

		this.setState({ isValid: validation });

		if (this.state.termsAndPrivacy < 1) {

			this.setState({ termsAndPrivacy: 0 });
			return;
		}

		return Object.keys(btwIdentity).some(key => !validation[key])
			? true
			: this.props.btwRegister(btwIdentity);
	}

	renderInput = (name, label, inputType, colWidth = 12, errorMsg) => {
		return (
            <div className={`form-group col-xs-${colWidth}`}>
                <input type={inputType} className="input-field btw-input-new"
                       onChange={this.updateRegisterFields.bind(this, name)}
					   onBlur={this.validateRegisterFields.bind(this, name)}
					   placeholder={label} />
                { !this.state.isValid[name] && <span className="pull-left">{ errorMsg }</span> }
            </div>
		)
	};

	componentWillReceiveProps(props) {
		if (props.isSuccess) {
			this.onLink(routes.makelist);
			return;
		}
		if (props.error) {
            const isValid = {... this.state.isValid };
            isValid.email = false;
            this.setState({ isValid });
		}
	}

	render() {
		const opts = {
			playerVars: { // https://developers.google.com/youtube/player_parameters
			  autoplay: 0
			}
		};

		const passwordErrorMsg = (
			<div>
				<div>* At least one special character *</div>
				<div>* At least one number *</div>
				<div>* At lease one upper case character *</div>
				<div>* Minimum of 7 characters *</div>
			</div>
		);
		const { error } = this.props;
		const nameWidth = this.isMobile() ? 12 : 6;
		return (
			<div>

				<div className="new-btw-register">
					<div className="row">

						<div className="col-lg-6 register-form">
							<div className="title1">Welcome to BeTheWave!</div>
							<div className="title2">Help your friends register & vote</div>
							<div className="title-line"></div>

							<div className="subtitle1">Create an account</div>
							<Link to='/' className="subtitle2">(Already have an account? Log in.)</Link>

							<form className="input-form">
								<div className="row">
									{ this.renderInput('firstname', 'First Name (Legal)', 'text', nameWidth, '* First Name is not valid *') }
									{ this.renderInput('lastname', 'Last Name (Legal)', 'text', nameWidth, '* Last Name is not valid *') }
								</div>
								{ this.renderInput('username', 'Username', 'text', 0, '* Username is not valid *') }
								{ this.renderInput('email', 'Email', 'email', 0, error || '* Email is not valid *') }
								<div className={classNames({'password-div': !this.state.isValid['password'] })}>
									{ this.renderInput('password', 'Password', 'password', 0, passwordErrorMsg) }
								</div>
								{ this.renderInput('confirmPassword', 'Confirm Password', 'password', 0, '* The passwords do not match *') }
								<div className="">
									<div className="row marginTermsPolicy">
										<div className="col-xs-1 padding0">
											<label className="checkbox-container">
												<input type="checkbox" onClick={this.onTermsAndPrivacy.bind(this)}/>
												<span className="checkmark"></span>
											</label>
										</div>
										<div className={ this.isMobile() ? "col-xs-11 padding0" : "col-xs-11 padding0 terms-privacy"}>
											<label>
												I have read and understood the term of use and by signing up, I agree to Bethewave's <Link target="_blank" to='/termsOfUse'>Terms of Use</Link> and <Link target="_blank" to='/privacyPolicy'>Privacy Policy</Link>
											</label>
										</div>
									</div>
									{ this.state.termsAndPrivacy === 0 && <span className="pull-left">* Terms and Privacy is required *</span> }
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







				{/* <h8 className="pull-right" style={{ marginTop: '-30px', marginRight: '30px'}}>Already registered? <Link to='/'>Sign in here</Link></h8>
				<div className='btw-identity btw-register container'>
					<div>
						<YouTube
							videoId="qSTwrt8oE3g"
							opts={opts}
							className="video"
							onReady={this._onReady}
						/>
					</div>
					<div className="intro">
						<p className="intro-title">
							Your Information
						</p>
					</div>
					<form>
						<div className="row">
							{ this.renderInput('firstname', 'First Name (Legal)', 'text', nameWidth, '* First Name is not valid *') }
							{ this.renderInput('lastname', 'Last Name (Legal)', 'text', nameWidth, '* Last Name is not valid *') }
						</div>
						{ this.renderInput('username', 'Username', 'text', 0, '* Username is not valid *') }
						{ this.renderInput('email', 'Email', 'email', 0, error || '* Email is not valid *') }
						<div className={classNames({'password-div': !this.state.isValid['password'] })}>
							{ this.renderInput('password', 'Password', 'password', 0, passwordErrorMsg) }
						</div>
						{ this.renderInput('confirmPassword', 'Confirm Password', 'password', 0, '* The passwords do not match *') }
						<div className="">
							<div className="row margin0">
								<div className="col-xs-1 padding0">
									<label className="checkbox-container">
										<input type="checkbox" onClick={this.onTermsAndPrivacy.bind(this)}/>
										<span className="checkmark"></span>
									</label>
								</div>
								<div className={ this.isMobile() ? "col-xs-11 padding0" : "col-xs-11 padding0 terms-privacy"}>
									<label>
										I have read and understood the term of use and by signing up, I agree to Bethewave's <Link target="_blank" to='/termsOfUse'>Terms of Use</Link> and <Link target="_blank" to='/privacyPolicy'>Privacy Policy</Link>
									</label>
								</div>
							</div>
							{ this.state.termsAndPrivacy === 0 && <span className="pull-left">Terms and Privacy is required</span> }
						</div>
						<br/><br/>
					</form>
					<Row>
						<Col xs={6}>	
							{ this.isMobile() && this.renderBackToHome()}
						</Col>
						<Col md={12} xs={6}>
							<div id="btn_signup">
								<button className="btn btn-primary" onClick={this.btwRegister.bind(this, 'btwSignOn')}>Sign Me Up</button>
							</div>
						</Col>
					</Row>
				</div> */}
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