import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changePasswordRequest } from '../../actions/PasswordRequestAction';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

import { validate } from '../../utility/InputValidator';
import BaseComponent from '../shared/BaseComponent';
import routes from '../../constants/Routes';
import Button from '../shared/Button';

class ChangePassword extends BaseComponent {
	constructor() {
		super();
		this.state = {
			info: this.getEmptyState(),
			isValid: this.getEmptyState(true),
			isChangedPassword: true
		}
	}

	getEmptyState = (initValue = '') => {
		return {
            password: initValue !== '' ? false : '',
            confirmPassword: initValue
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

		validation[field] = field === 'confirmPassword'
			? info.password === value
			: validate(field, value);

		this.setState({ isValid: validation });
	}

	onChangePassword(event) {
		const { isValid, info } = this.state;
		let validation = { ...isValid };
        Object.keys(info).forEach(key => {
        	validation[key] = key === 'confirmPassword'
				? info.password === info[key]
				: validate(key,  info[key]);
        });

		this.setState({ isValid: validation });

		if (!this.props.location.state.id) {
			return true;
		}

		let param = this.props.location.state.id;

		if (Object.keys(info).some(key => !validation[key])) {
			return true;
		} else {
			info["userid"] = param;
			return this.props.changePasswordRequest(info);
		}
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
		if (props.isChangedPassword) {
			this.onLink(routes.login, { isReset: true });
			return;
		} else {
			this.setState({ "isChangedPassword": false});
		}
	}

	render() {

		const passwordErrorMsg = (
			<div>
				<div>At least one special character</div>
				<div>At least one number</div>
				<div>At lease one upper case character</div>
				<div>Minimum of 7 characters</div>
			</div>
		);

		return (
			<div>
				<div className='btw-change-password btw-verify container'>
					<div className="intro">
						<p className="intro-title">
                            Enter your new password
						</p>
					</div>
					<form>
						{ !this.state.isChangedPassword && <span style={{ fontSize: "18px" }}>Password doesn't not reset</span> }
						<br/><br/>
						<div className={classNames({'password-div': !this.state.isValid['password'] })}>
							{ this.renderInput('password', 'Password', 'password', 0, passwordErrorMsg) }
						</div>
						{ this.renderInput('confirmPassword', 'Confirm Password', 'password', 0, '* The passwords do not match *') }
						<br/><br/>
					</form>
					<Row>
						<Col xs={6}>	
							{ this.isMobile() && this.renderBackToHome()}
						</Col>
						<Col md={12} xs={6}>
							<div id="btn_signup">
								<Button onClick={this.onChangePassword.bind(this, 'onChangePassword')}>Change</Button>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    const { isChangedPassword } = state.request;
    return {
		isChangedPassword
    };
};


const mapDispatchToProps = (dispatch) => ({
	changePasswordRequest: (info) => dispatch(changePasswordRequest(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword));