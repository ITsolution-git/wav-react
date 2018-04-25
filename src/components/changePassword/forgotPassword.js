import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { validate } from '../../utility/InputValidator';
import BaseComponent from '../shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';

class ForgotPassword extends BaseComponent {
	constructor() {
		super();
		this.state = {
			info: this.getEmptyState(),
			isValid: this.getEmptyState(true)
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

	onForgotPassword(event) {
		const { isValid, info } = this.state;
		let validation = { ...isValid };
        Object.keys(info).forEach(key => {
        	validation[key] = validate(key,  info[key]);
        });

		this.setState({ isValid: validation });

		// return Object.keys(info).some(key => !validation[key])
		// 	? true
		// 	: this.props.btwRegister(btwIdentity);
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
		// if (props.isSuccess) {
		// 	this.onLink(routes.makelist);
		// 	return;
		// }
		// if (props.error) {
        //     const isValid = {... this.state.isValid };
        //     isValid.email = false;
        //     this.setState({ isValid });
		// }
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
								<button className="btn btn-primary" onClick={this.onForgotPassword.bind(this, 'onForgotPassword')}>Send Request</button>
							</div>
						</Col>
					</Row>
				</div>
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
	// btwRegister: (btwIdentity) => dispatch(btwRegister(btwIdentity))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));