import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { btwRegister } from '../../actions/SignOnAction';
import YouTube from 'react-youtube';

import { validate } from '../../utility/InputValidator';
import BaseComponent from '../shared/BaseComponent';

class Register extends BaseComponent {
	constructor() {
		super();
		this.state = {
			btwIdentity: this.getEmptyState(),
			isValid: this.getEmptyState(true)
		}
	}

	getEmptyState = (initValue = '') => {
		return {
            firstname: initValue,
            lastname: initValue,
            username: initValue,
            password: initValue,
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

		return Object.keys(btwIdentity).some(key => !validation[key])
			? true
			: this.props.btwRegister(btwIdentity);
	}

	renderInput = (name, label, inputType, colWidth = 12, errorMsg) => {
		return (
            <div className={`form-group col-xs-${colWidth}`}>
                <label className="pull-left" htmlFor={name}>{label}</label>
                <input type={inputType} className="input-field"
                       onChange={this.updateRegisterFields.bind(this, name)}
                       onBlur={this.validateRegisterFields.bind(this, name)} />
                { !this.state.isValid[name] && <span className="pull-left">{ errorMsg }</span> }
            </div>
		)
	};

	render() {
		const opts = {
			playerVars: { // https://developers.google.com/youtube/player_parameters
			  autoplay: 0
			}
		};

		return (
			<div className='btw-identity btw-register'>
				{ this.renderBackToHome()}
				<div>
					<YouTube
						videoId="2g811Eo7K8U"
						opts={opts}
						className="video"
						onReady={this._onReady}
					/>
				</div>
				<div className="intro">
					<p className="intro-title">
						What's the best way to stay in touch with you ?
					</p>
					<p className="intro-desc">
						As a member, you can rely on timely reminders for appointments and screenings to keep you healthy. Tell us the best ways to reach you, so you can get the most from your care experience.
					</p>
				</div>
				<form>
					<div className="row">
						{ this.renderInput('firstname', 'First Name', 'text', 6, '* First Name is not valid *') }
                        { this.renderInput('lastname', 'Last Name', 'text', 6, '* Last Name is not valid *') }
					</div>
                    { this.renderInput('username', 'Username', 'text', 0, '* Username is not valid *') }
                    { this.renderInput('email', 'Email', 'email', 0, '* Email is not valid *') }
                    { this.renderInput('password', 'Password', 'password', 0, '* Password is not valid *') }
                    { this.renderInput('confirmPassword', 'Confirm Password', 'password', 0, '* The passwords do not match *') }
				</form>
				<div id="btn_signup">
					<button className="btn btn-primary" onClick={this.btwRegister.bind(this, 'btwSignOn')}>Sign Me Up</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {}
};


const mapDispatchToProps = (dispatch) => ({
	btwRegister: (btwIdentity) => dispatch(btwRegister(btwIdentity))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));