import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GoogleAction from '../actions/GoogleAction';
import IdentityAction from '../actions/IdentityAction';
import { googleClientId,  api_Key } from '../config/ApiKeys';


class Login extends Component {

	constructor() {
		super();
		this.state = {
			google         : {
				socialId         : googleClientId,
				apiKey           : api_Key,
				fetchBasicProfile: false,
				contacts         : '',
				accessInformation: ''
			},
			facebook       : {},
			isFetching     : false,
			isAuthenticated: false,
			btwIdentity    : {
				username: '',
				password: ''
			}
		}
	}


	updateLogonFields(field, event) {
		let identity = Object.assign({}, this.state.btwIdentity);
		identity [field] = event.target.value;
		this.setState({
			btwIdentity: identity
		})
	}

	btwSignOn() {
		this.props.btwSignOn(this.state.btwIdentity, 'btw');
	}

	componentDidMount() {
		//this.props.isSignedIn('login');
		//this.props.initializeGoogle(this.state.google, 'google');
	}

	render() {
		const { isError } = this.props;

		return (
			<div className="btw-login">
				<div className="btw-form">
                    <div className="card-content">
                        <p id="loginHeader">Log into your account</p>
                        { isError && <div> <h5 style={{color: 'red'}}>Check your username or password </h5></div>}
                    </div>
                    <div className="form-group">
                        <label className="pull-left">Username</label>
                        <input type="text" className="input-field" id="username" ref="username"
                               required="" aria-required="true"
                               onChange={this.updateLogonFields.bind(this, 'username')}></input>
                    </div>
                    <div className="form-group">
                        <label className="pull-left">Password</label>
                        <input type="password" className="input-field" id="password" ref="password"
                               required="" aria-required="true"
                               onChange={this.updateLogonFields.bind(this, 'password')}></input>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.btwSignOn.bind(this, 'btwSignOn')}>
                            Login
                        </button>
                    </div>
                    {/*<div id="googlebtn" className='btn-general btn'>*/}
                    {/*<span className='icon'></span>*/}
                    {/*<span className="btw-buttonText">Login with Google</span>*/}
                    {/*</div>*/}
                    <h8>Not registered? <Link to='/captainProfile/Register'>Register as a Captain</Link></h8>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { isError } = state.identity.btwSignOn;
	return {
		isError
	}
}


const mapDispatchToProps = (dispatch) => ({
	initializeGoogle: (google, source) => dispatch(GoogleAction.initGoogle(google.socialId, google.fetchBasicProfile, source)),
	isSignedIn      : (page) => dispatch(GoogleAction.isSignedIn(page)),
	btwSignOn       : (btwIdentity, source) => dispatch(IdentityAction.btwSignOn(btwIdentity.username, btwIdentity.password, source))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);