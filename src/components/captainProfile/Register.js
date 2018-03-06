import React, {Component} from 'react';
import {connect} from 'react-redux'
import IdentityAction from "../../actions/IdentityAction";
import YouTube from "react-youtube";

import '../../resources/captainProfile/register.css'
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
			}
		}
	}

	updateRegisterFields(field, event) {
		let identity = Object.assign({}, this.state.btwIdentity);
		identity [field] = event.target.value;
		this.setState({
			btwIdentity: identity
		})
	}

	btwRegister(event) {
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
			<div className='btw-register btw-container'>

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
							<label className="pull-left" for="firstname">First Name</label>
							<input type="text" className="input-field" id="firstname" ref="firstname"
								required="" aria-required="true"
								onChange={this.updateRegisterFields.bind(this, 'firstname')}></input>
						</div>

						<div className="form-group col-xs-6">
							<label className="pull-left" for="lastname">Last Name</label>
							<input type="text" className="input-field" id="lastname" ref="lastname"
								required="" aria-required="true"
								onChange={this.updateRegisterFields.bind(this, 'lastname')}></input>
						</div>
					</div>

					<div className="form-group">
						<label className="pull-left" for="username">Username</label>
						<input type="text" className="input-field" id="username" ref="username"
							required="" aria-required="true"
							onChange={this.updateRegisterFields.bind(this, 'username')}></input>
					</div>

					<div className="form-group">
						<label className="pull-left" for="email">Email</label>
						<input type="email" className="input-field" id="email" ref="email"
							required="" aria-required="true"
							onChange={this.updateRegisterFields.bind(this, 'email')}></input>
					</div>

					<div className="form-group">
						<label className="pull-left" for="password">Password</label>
						<input type="password" className="input-field" id="password" ref="password"
							required="" aria-required="true"
							onChange={this.updateRegisterFields.bind(this, 'password')}></input>
					</div>

					<div className="form-group">
						<label className="pull-left" for="confirmPassword">Confirm Password</label>
						<input type="password" className="input-field" id="confirmPassword" ref="confirmPassword"
							required="" aria-required="true"
							onChange={this.updateRegisterFields.bind(this, 'confirmPassword')}></input>
					</div>

					<div className="form-group">
						<button class="btn btn-primary" onClick={this.btwRegister.bind(this, 'btwSignOn')}>Sign Me Up</button>
					</div>
				</form>
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

export default connect(null, mapDispatchToProps)(Register);