import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import qs from 'qs';
import moment from 'moment'

import BaseComponent from '../shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import { signInWithMail, signInWithToken } from '../../actions/AuthActions';
import Spinner from '../shared/Spinner';
import Button from '../shared/Button';
import {
	EmailInput,
	PasswordInput
} from '../shared/validatedInputs';
import Paper from '../shared/Paper';
import routes from '../../constants/Routes';
import { Typography } from '../shared';
import BottomLink from './BottomLink';
import colors from "../../constants/Colors";


class LoginByMail extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		const { location: { hash }, actions } = this.props;
		const params = qs.parse(hash);

		const obj = {
			token: params['#access_token'],
			idToken: params['id_token'],
			expiresIn: parseInt(params['expires_in'], 10),
			startTime: moment().valueOf()
		};

		if (obj.token) {
			actions.signInWithToken(obj);
		}

		this.state = {
			email: '',
			password: '',
			startValidation: false,
			valid: {}
		};
	}

	onKeyPress = (e) => {
		if (e.key === 'Enter' || e.which === 13) {
			this.signInWithMail();
		}
	};

	signInWithMail() {
		this.setState({ startValidation: true });
		const { email, password, valid } = this.state;
		if (valid.email && valid.password) {
			this.props.actions.signInWithMail(email, password);
		}
	}

	componentWillReceiveProps(props) {
		if (props.isSuccess) {
			this.redirectToHome();
		}
	}

	handleChange = (value, isValid, name) => {
		this.setState({
			[name]: value,
			valid: { ...this.state.valid, [name]: isValid }
		});
	};


	render() {
		const { error, isFetching } = this.props;
		const { startValidation } = this.state;

		return (
			<div className='btw-login-mail'>
				<Paper className='paper'>
					<div className="btw-form" onKeyPress={this.onKeyPress}>
						<Typography className='title'>Log In by Email</Typography>
						<Row className='inputs-row'>
							<Col md={12} xs={12}>
								<Typography fontWeight='normal' variant='body' color={colors.error}>{ error }</Typography>
							</Col>
						</Row>
						<Row className='inputs-row'>
							<Col md={12}>
								<EmailInput onChange={this.handleChange}
											isVoter={false}
											startValidation={startValidation}
											uniqueValidationEnabled={false}
											required
											label='Email'
											placeholder='Your email address' />
							</Col>
						</Row>
						<Row className='inputs-row'>
							<Col md={12}>
								<PasswordInput onChange={this.handleChange}
											   startValidation={startValidation}
											   required
											   label='Password'
											   placeholder='Your password' />
							</Col>
						</Row>
						<Row className='inputs-row'>
							<Col md={12}>
								<Button
									disabled={isFetching}
									onClick={this.signInWithMail.bind(this)}>
									Log In
								</Button>
							</Col>
						</Row>

						<Link className='forgot-password-link' to={routes.forgotPassword}>Forgot password?</Link>

						<div className='go-to-signup'>
							<BottomLink title={`Don't have an account?`}
										link={routes.registerBySocial}
										linkText='Sign up'/>
						</div>
						<Col md={12}>
							<Spinner loading={isFetching} size={50} />
						</Col>
					</div>
				</Paper>
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
		actions: bindActionCreators({ signInWithMail, signInWithToken }, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginByMail));
