import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import appDataTypes from '../constants/AppDataTypes';
import { btwSignOn } from '../actions/SignOnAction';

class Login extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			username: '',
			password: ''
        };
	}

	updateLogonFields = (event, field) => {
		this.setState({[field]: event.target.value});
	};

	btwSignOn() {
		const { username, password } = this.state;
		this.props.actions.btwSignOn(username, password, 'btw');
	}

	render() {
		const { error } = this.props;

		return (
			<div className="btw-login">
				<div className="btw-form">
                    <div className="card-content">
                        <p id="loginHeader">Log into your account</p>
                        { error && <div> <h5 style={{color: 'red'}}>Check your username or password </h5></div>}
                    </div>
                    <div className="form-group">
                        <label className="pull-left">Username</label>
                        <input type="text" className="input-field" id="username" ref="username"
                               required="" aria-required="true"
                               onChange={event => this.updateLogonFields(event, 'username')} />
                    </div>
                    <div className="form-group">
                        <label className="pull-left">Password</label>
                        <input type="password" className="input-field" id="password" ref="password"
                               required="" aria-required="true"
                               onChange={event => this.updateLogonFields(event, 'password')} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.btwSignOn.bind(this, 'btwSignOn')}>
                            Login
                        </button>
                    </div>
                    <h8>Not registered? <Link to='/captainProfile/Register'>Register as a Captain</Link></h8>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { error } = state.app[appDataTypes.signOn];
	return { error };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ btwSignOn }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);