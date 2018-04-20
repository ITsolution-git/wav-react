import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../components/shared/BaseComponent';
import appDataTypes from '../constants/AppDataTypes';
import { btwSignOn } from '../actions/SignOnAction';
import { getHomeRoute } from '../helpers/AuthHelper';
import Spinner from '../components/shared/Spinner';


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

	onKeyPress = (e) => {
		if(e.key === 'Enter' || e.which === 13) {
			this.btwSignOn();
		}
	};

	btwSignOn() {
		const { username, password } = this.state;
		if (!username.length || !password.length) {
			this.setState({emptyField: true});
		} else {
			this.props.actions.btwSignOn(username, password);
		}
	}

    componentWillReceiveProps(props)  {
		if (props.isSuccess) {
			this.onLink(getHomeRoute());
		}
	}

	render() {
		const { error, isFetching } = this.props;
		const { password, username, emptyField } = this.state;
		return (
			<div className="btw-login container">
				<div className="btw-form" onKeyPress={this.onKeyPress}>
                    <div className="card-content">
                        <p id="loginHeader">Log into your account</p>
                        { error && <div> <h5 style={{color: 'red'}}>Check your username or password </h5></div>}
                    </div>
                    <div className="form-group">
                        <label className="pull-left">Username</label>
                        <input type="text" className="input-field" id="username" ref="username"
                               required="" aria-required="true"
                               onChange={event => this.updateLogonFields(event, 'username')} />
												{!username && emptyField && <span style={{'color': 'red'}}> ** Enter username </span> }
                    </div>
                    <div className="form-group">
                        <label className="pull-left">Password</label>
                        <input type="password" className="input-field" id="password" ref="password"
                               required="" aria-required="true"
                               onChange={event => this.updateLogonFields(event, 'password')} />
												{!password && emptyField && <span style={{'color': 'red'}}> ** Enter password </span> }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary"
								disabled={isFetching}
								onClick={this.btwSignOn.bind(this)}>
                            Login
                        </button>
                    </div>
					<Spinner loading={isFetching} size={50} />
                   {/* <h8>Not registered? <Link to='/captainProfile/Register'>Register as a Captain</Link></h8>*/}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { error, isSuccess, isFetching } = state.app[appDataTypes.signOn];
	return {
		error,
        isFetching,
        isSuccess
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ btwSignOn }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
