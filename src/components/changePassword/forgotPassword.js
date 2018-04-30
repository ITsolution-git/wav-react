import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { forgotPasswordRequest } from '../../actions/PasswordRequestAction';

import { validate } from '../../utility/InputValidator';
import BaseComponent from '../shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';

import history from '../../utility/History';

class ForgotPassword extends BaseComponent {
	constructor() {
		super();
		this.state = {
			info: this.getEmptyState(),
			isValid: this.getEmptyState(true),
			isUserFound: -1
		}
	}

	getEmptyState = (initValue = '') => {
		return {
            email: initValue
        };
	};

	updateFields(field, event) {
		let info = Object.assign({}, this.state.info);
		info[field] = event.target.value;
		this.setState({
			info: info
		})
	}

	validateFields(field, event) {
		const { info, isValid } = this.state,
			{ value } = event.target;
		let validation = { ...isValid };

		validation[field] = validate(field, value);

		this.setState({ isValid: validation });
	}

	onLink = (route, params) => {
        history.push(route, params);
    };

	onForgotPassword(event) {
		const { isValid, info } = this.state;
		let validation = { ...isValid };
        Object.keys(info).forEach(key => {
        	validation[key] = validate(key,  info[key]);
        });

		this.setState({ isValid: validation });

		return Object.keys(info).some(key => !validation[key])
			? true
			: this.props.forgotPasswordRequest(info.email);
	}

	renderInput = (name, label, inputType, colWidth = 12, errorMsg) => {
		return (
            <div className={`form-group col-xs-${colWidth}`}>
                <label className="pull-left" htmlFor={name}>{label}</label>
                <input type={inputType} className="input-field"
                       onChange={this.updateFields.bind(this, name)}
                       onBlur={this.validateFields.bind(this, name)} />
                { !this.state.isValid[name] && <span className="pull-left">{ errorMsg }</span> }
            </div>
		)
	};

	componentWillReceiveProps(props) {
		if (props.isUserFound) {
			this.setState({
				isUserFound: 1
			})
		}

		if (props.isUserFound === false) {
			this.setState({
				isUserFound: 0
			})
		}
	}

	render() {

		const { error } = this.props;
		const nameWidth = this.isMobile() ? 12 : 6;
		return (
			<div>
				<div className='btw-change-password btw-verify container'>
					<div className="intro">
						<p className="intro-title">
                        Enter the email you used to register an account with us.
                        We will send you an email to reset your password
						</p>
					</div>
					<br/>
					{ this.state.isUserFound === 0 && <span style={{ fontSize: "18px", color: "red" }}>User doesn't exist</span> }
					{ this.state.isUserFound === 1 && <span style={{ fontSize: "18px", color: "green" }}>Reset password request sent</span> }
					<form>
						{ this.renderInput('email', 'Email', 'email', 0, error || '* Email is not valid *') }
						<br/><br/>
					</form>
					<Row>
						<Col xs={6}>	
							{ this.isMobile() && this.renderBackToHome()}
						</Col>
						<Col md={12} xs={6}>
							<div id="btn_signup">
								<button className="btn btn-primary" onClick={this.onForgotPassword.bind(this, 'onForgotPassword')} disabled={ (isFetching || this.state.requestStatus === 1) ? "disabled" : ""}>Send Request</button>
								<button className="btn btn-primary" style={{ marginLeft: "15px"}} onClick={() => this.onLink(routes.login)}>Go Back</button>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    const { isUserFound } = state.request;
    return {
        isUserFound
    };
};


const mapDispatchToProps = (dispatch) => ({
	forgotPasswordRequest: (email) => dispatch(forgotPasswordRequest(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));