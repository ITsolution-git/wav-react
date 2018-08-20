import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import BaseComponent from '../components/shared/BaseComponent';
import appDataTypes from '../constants/AppDataTypes';
import { btwSignOn } from '../actions/SignOnAction';
import { getHomeRoute } from '../helpers/AuthHelper';
import Spinner from '../components/shared/Spinner';
import Button from '../components/shared/Button';

class Login extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {
			email: '',
			password: '',
			emptyField: null,
			isReset: false
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
		const { email, password } = this.state;
		if (!email.length || !password.length) {
			this.setState({emptyField: true});
		} else {
			this.props.actions.btwSignOn(email, password);
		}
	}

    componentWillReceiveProps(props)  {
		if (props.isSuccess) {
			this.onLink(getHomeRoute());
		}
	}

	componentDidMount() {
		if (this.props.location.state) {
			this.setState({isReset: this.props.location.state.isReset})
		}
	}

	render() {
		const { error, isFetching } = this.props;
		const { password, email, emptyField } = this.state;

		return (
			<div className="btw-login container">
				<div className="btw-form" onKeyPress={this.onKeyPress}>
                    <div className="card-content">
						<p id="loginHeader" className="title">Log into your account </p>
                        { error && <div> <h5 style={{color: 'red'}}>Check your username or password </h5></div>}
                    </div>
					{ this.state.isReset && <span style={{ fontSize: "18px", color: "green" }}>Password is reset, Login with your new password</span> }
					<br/><br/>
                    <div className="form-group">
                        <input type="email" className="input-field" id="email" ref="email"
							   required="" aria-required="true"
							   placeholder="Email"
                               onChange={event => this.updateLogonFields(event, 'email')} />
												{!email && emptyField && <span style={{'color': 'red'}}> ** Enter Email </span> }
                    </div>
                    <div className="form-group">
                        <input type="password" className="input-field" id="password" ref="password"
							   required="" aria-required="true"
							   placeholder="Password"
                               onChange={event => this.updateLogonFields(event, 'password')} />
												{!password && emptyField && <span style={{'color': 'red'}}> ** Enter password </span> }
                    </div>
					<div className="link">
						<Link to='/captainProfile/register' className="pull-left">Register</Link>
						<div className="vertical-divider"></div>
						<Link to='/changePassword/request' className="pull-right">Forgot your password?</Link>
					</div>
                    <div className="form-group">
                        <Button disabled={isFetching}
								 onClick={this.btwSignOn.bind(this)}>
                            Login
                        </Button>
                    </div>
					<Spinner loading={isFetching} size={50} />
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
