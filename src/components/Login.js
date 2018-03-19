import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../components/shared/BaseComponent';
import appDataTypes from '../constants/AppDataTypes';
import { btwSignOn } from '../actions/SignOnAction';
import { getHomeRoute } from '../helpers/AuthHelper';


class Login extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {
			username: '',
			password: '',
			emptyField: null
        };
	}

	updateLogonFields = (event, field) => {
		this.setState({[field]: event.target.value});
	};

	btwSignOn() {
		const { username, password } = this.state;
		if (!username.length || !password.length) {
			this.setState({emptyField: true});
		} else {
			this.props.actions.btwSignOn(username, password, 'btw');
		}
	}

    componentWillReceiveProps(props)  {
		if (props.isSuccess) {
			this.onLink(getHomeRoute());
		}
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
												{!this.state.username.length && this.state.emptyField && <span> ** Enter username </span> }
                    </div>
                    <div className="form-group">
                        <label className="pull-left">Password</label>
                        <input type="password" className="input-field" id="password" ref="password"
                               required="" aria-required="true"
                               onChange={event => this.updateLogonFields(event, 'password')} />
												{!this.state.password.length && this.state.emptyField && <span> ** Enter password </span> }
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
	const { error, isSuccess } = state.app[appDataTypes.signOn];
	return {
		error,
        isSuccess
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ btwSignOn }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));