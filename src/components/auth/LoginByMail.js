import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import { btwSignOn } from '../../actions/SignOnAction';
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


class LoginByMail extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {
			email: '',
			password: '',
			startValidation: false,
			valid: {}
		};
	}

	onKeyPress = (e) => {
		if (e.key === 'Enter' || e.which === 13) {
			this.btwSignOn();
		}
	};

	btwSignOn() {
		this.setState({ startValidation: true });
		const { email, password, valid } = this.state;
		if (valid.email && valid.password) {
			this.props.actions.btwSignOn(email, password);
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
						{ error && <div>Check your username or password</div> }

						<Row className='inputs-row'>
							<Col md={12}>
								<EmailInput onChange={(value, valid, name) => {
									const isValid = error ? true : valid;
									this.handleChange(value, isValid, name);
								}}
											isVoter={false}
											startValidation={startValidation}
											uniqueValidationEnabled={false}
											required
											label='Your email address' />
							</Col>
						</Row>
						<Row className='inputs-row'>
							<Col md={12}>
								<PasswordInput onChange={this.handleChange}
											   startValidation={startValidation}
											   required
											   label='Your password' />
							</Col>
						</Row>
						<Row className='inputs-row'>
							<Col md={12}>
								<Button
									disabled={isFetching}
									onClick={this.btwSignOn.bind(this)}>
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
		actions: bindActionCreators({ btwSignOn }, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginByMail));
