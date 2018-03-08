import React, {Component} from 'react';
import {connect} from 'react-redux'
import IdentityAction from "../../actions/IdentityAction";
import YouTube from "react-youtube";

import { textValidation, emailValidation } from '../../utility/FormValidation'
class Register extends Component {


	constructor() {
		super();
		this.state = {
			btwIdentity:{
				firstname      : '',
				lastname       : '',
				username       : '',
				password       : '',
				confirmPassword: '',
				email          : ''
			},
			isValid:{
				firstname      : true,
				lastname       : true,
				username       : true,
				password       : true,
				confirmPassword: true,
				email          : true
			}
		}
	}

	updateRegisterFields(field, event) {
		let identity = Object.assign({}, this.state.btwIdentity);
		identity[field] = event.target.value;
		this.setState({
			btwIdentity: identity
		})
	}

	validateRegisterFields(field, event) {

		let validation = Object.assign({}, this.state.isValid);

		if ( field == 'email' ) {
			validation[field] = emailValidation(event.target.value);
		} else if ( field == 'confirmPassword' ) {
			validation[field] = this.state.btwIdentity.password == event.target.value
		} else {
			validation[field] = textValidation(event.target.value);
		}
		this.setState({
			isValid: validation
		})
	}

	btwRegister(event) {

		let validation = Object.assign({}, this.state.isValid);

		for (let key in this.state.btwIdentity) {
			if ( key == 'email' ) {
				validation[key] = emailValidation(this.state.btwIdentity[key]);
			} else if ( key == 'confirmPassword' ) {
				validation[key] = this.state.btwIdentity.password == this.state.btwIdentity[key]
			} else {
				validation[key] = textValidation(this.state.btwIdentity[key]);
			}
		}

		this.setState({
			isValid: validation
		})

		for (let key in this.state.btwIdentity) {
			if (validation[key] == false) {
				return ;
			}
		}

		this.props.btwRegister(this.state.btwIdentity)
	}

	render() {
		const opts = {
			height: '390',
			width: '640',
			playerVars: { // https://developers.google.com/youtube/player_parameters
			  autoplay: 0
			}
		};

		return (
			<div className='btw-identity btw-register'>

				<YouTube
					videoId="2g811Eo7K8U"
					opts={opts}
					className="video"
					onReady={this._onReady}
				/>

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
						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="firstname">First Name</label>
							<input type="text" className="input-field" id="firstname" ref="firstname"
								required="" aria-required="true"
								onChange={this.updateRegisterFields.bind(this, 'firstname')}
								onBlur={this.validateRegisterFields.bind(this, 'firstname')}></input>
							{ !this.state.isValid.firstname && <span className="pull-left">* First Name is not valid *</span> }
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" htmlFor="lastname">Last Name</label>
							<input type="text" className="input-field" id="lastname" ref="lastname"
								required="" aria-required="true"
								onChange={this.updateRegisterFields.bind(this, 'lastname')}
								onBlur={this.validateRegisterFields.bind(this, 'lastname')}></input>
							{ !this.state.isValid.lastname && <span className="pull-left">* Last Name is not valid *</span> }
						</div>
					</div>

					<div className="form-group">
						<label className="pull-left" htmlFor="username">Username</label>
						<input type="text" className="input-field" id="username" ref="username"
							required="" aria-required="true"
							onChange={this.updateRegisterFields.bind(this, 'username')}
							onBlur={this.validateRegisterFields.bind(this, 'username')}></input>
						{ !this.state.isValid.username && <span className="pull-left">* Username is not valid *</span> }
					</div>

					<div className="form-group">
						<label className="pull-left" htmlFor="email">Email</label>
						<input type="email" className="input-field" id="email" ref="email"
							required="" aria-required="true"
							onChange={this.updateRegisterFields.bind(this, 'email')}
							onBlur={this.validateRegisterFields.bind(this, 'email')}></input>
						{ !this.state.isValid.email && <span className="pull-left">* Email is not valid *</span> }
					</div>

					<div className="form-group">
						<label className="pull-left" htmlFor="password">Password</label>
						<input type="password" className="input-field" id="password" ref="password"
							required="" aria-required="true"
							onChange={this.updateRegisterFields.bind(this, 'password')}
							onBlur={this.validateRegisterFields.bind(this, 'password')}></input>
						{ !this.state.isValid.password && <span className="pull-left">* Password is not valid *</span> }
					</div>

					<div className="form-group">
						<label className="pull-left" htmlFor="confirmPassword">Confirm Password</label>
						<input type="password" className="input-field" id="confirmPassword" ref="confirmPassword"
							required="" aria-required="true"
							onChange={this.updateRegisterFields.bind(this, 'confirmPassword')}
							onBlur={this.validateRegisterFields.bind(this, 'confirmPassword')}></input>
						{ !this.state.isValid.confirmPassword && <span className="pull-left">* Confirm Password is not valid *</span> }
					</div>
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
}


const mapDispatchToProps = (dispatch) => ({
	btwRegister: (btwIdentity) => dispatch(IdentityAction.btwRegister(btwIdentity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);