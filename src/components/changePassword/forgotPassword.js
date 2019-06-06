import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { forgotPasswordRequest } from '../../actions/PasswordRequestAction';
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core';

import { validate } from '../../utility/InputValidator';
import BaseComponent from '../shared/BaseComponent';
import routes from '../../constants/Routes';
import Spinner from '../../components/shared/Spinner';
// import Button from "../shared/Button";

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
		const { info, isValid } = this.state;
		const { value } = event.target;
		let validation = { ...isValid };

		validation[field] = validate(field, value);

		this.setState({ isValid: validation });
	}

	onForgotPassword(event) {
		const { isValid, info } = this.state;
		let validation = { ...isValid };
		Object.keys(info).forEach(key => {
			validation[key] = validate(key, info[key]);
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
				{!this.state.isValid[name] && <span className="pull-left">{errorMsg}</span>}
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

		const { error, isFetching } = this.props;

		return (
			<div className="btw-forgot-password">
				<Grid container alignItems='center' justify='center'>
					<Paper className='content'>
						<Grid container alignItems='center' justify='flex-start'>
							<Typography className='title'>Reset Password</Typography>
						</Grid>
						<Grid container alignItems='center' justify='flex-start'>
							<Typography className='description'>
								Enter the email address associated with your account and
								we’ll send you a link to create a new Password
							</Typography>
						</Grid>
						<TextField
							className='input'
							required
							autoFocus
							margin="normal"
							id="email"
							label="Email"
							type="email"
							// value={this.state.info}
							onChange={this.updateFields.bind(this, 'email')}
							fullWidth />
						<Button
							className='button'
							variant='contained'
							color='primary'
							onClick={this.onForgotPassword.bind(this, 'onForgotPassword')}
							fullWidth>
							Send Verification Link
						</Button>
						<div className='remember'>
							Remembered? <Link to={routes.login}><b>Log in</b></Link>.
						</div>
					</Paper>
				</Grid>

				{/* <div className='btw-forget-password'>
                    {!this.isMobile() && this.renderBackToHome()}
                    <div className="intro">
                        <p className="intro-title">
                            Enter the email you used to register an account with us.
							We will send you an email to reset your password
						</p>
                    </div>
                    <br />
                    {this.state.isUserFound === 0 && <span style={{ fontSize: "18px", color: "red" }}>User doesn't exist</span>}
                    {this.state.isUserFound === 1 && <span style={{ fontSize: "18px", color: "green" }}>Reset password request sent</span>}
                    <form>
                        {this.renderInput('email', 'Email', 'email', 0, error || '* Email is not valid *')}
                        <br /><br />
                    </form>
                    <Row>
                        <Col xs={6}>
                            {this.isMobile() && this.renderBackToHome()}
                        </Col>
                        <Col md={12} xs={6}>
                            <div id="btn_signup">
                                <Button onClick={this.onForgotPassword.bind(this, 'onForgotPassword')}>Send Request</Button>
                            </div>

                            <Spinner loading={isFetching} size={50} />
                        </Col>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Send Request
                            </Button>
                    </Row>
                </div> */}
			</div >
		);
	}
}

const mapStateToProps = (state) => {
	const { isUserFound, isFetching } = state.request;
	return {
		isUserFound,
		isFetching
	};
};


const mapDispatchToProps = (dispatch) => ({
	forgotPasswordRequest: (email) => dispatch(forgotPasswordRequest(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));