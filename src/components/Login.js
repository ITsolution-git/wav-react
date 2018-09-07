import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../components/shared/BaseComponent';
import appDataTypes from '../constants/AppDataTypes';
import TaskRoutes from '../constants/TaskRoutes';
import { btwSignOn } from '../actions/SignOnAction';
import { getHomeRoute } from '../helpers/AuthHelper';
import Spinner from '../components/shared/Spinner';
import Button from '../components/shared/Button';
import { loadTaskList } from '../actions/TaskListAction';
import AboutInfo from '../components/shared/AboutInfo';
import MobileLogo from '../components/layout/MobileLogo';
import {
    EmailInput,
    PasswordInput
} from '../components/shared/validatedInputs';
import colors from '../constants/ColorConstants';
import Dialog from './shared/Dialog';
import { forgotPasswordRequest } from '../actions/PasswordRequestAction';


class Login extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {
			email: '',
			password: '',
			isReset: false,
			signinFromEmail: !!props.location.search,
			paramsFromEmail: props.location.search ? qs.parse(props.location.search) : {},
			startValidation: false,
			valid: {},
			showForgotPasswordModal: false,
			forgotPasswordEmail: '',
			showWarning: false
		};
	}

	onKeyPress = (e) => {
		if(e.key === 'Enter' || e.which === 13) {
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

    componentWillReceiveProps(props)  {
		if (props.isSuccess) {
			const { paramsFromEmail } = this.state;
			if (this.state.signinFromEmail) {
				this.props.actions.loadTaskList();
				this.onLink(TaskRoutes['TS_GRP_' + paramsFromEmail['type']] + '?taskId=' + paramsFromEmail['id'])
			} else {
				this.onLink(getHomeRoute());
			}
		}

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

		if (props.isRequestFetching === false) {
			this.setState({
				showWarning: true
			})
		}
	}

	componentDidMount() {
		if (this.props.location.state) {
			this.setState({isReset: this.props.location.state.isReset})
		}
	}

    handleChange = (value, isValid, name) => {
		this.setState({
			[name]: value,
			valid: {...this.state.valid, [name]: isValid }
		});
	};

	showForgotPasswordModal = (e) => {
		e.preventDefault()

		this.setState({
			showForgotPasswordModal: !this.state.showForgotPasswordModal
		})
	}

	closeForgotPasswordModal = (e) => {
		if (e) e.preventDefault()

		this.setState({
			showWarning: false,
			showForgotPasswordModal: false
		})
	}

	changeForgotPasswordEmail = (value, valid, name) => {
		this.setState({
			[name]: value,
			valid: {...this.state.valid, [name]: valid }
		})
	}

	sendForgotPasswordRequest = () => {
		if (this.state.valid['forgotPasswordEmail']) {
			this.props.forgotPasswordRequest(this.state.forgotPasswordEmail);
		}
	}

	render() {
		const { error, isFetching } = this.props;
		const { startValidation } = this.state;


		return (
                <Row className="btw-login no-margin">
					{ this.isMobile() && this.renderBackground(colors.blue) }
					<MobileLogo />
                    <Col md={5} mdOffset={1} className="no-padding">
                        { this.isDesktop() && <AboutInfo /> }
                    </Col>
                    <Col md={5} xs={12} className="no-padding">
                        <div className="btw-form" onKeyPress={this.onKeyPress}>
                            <Col mdOffset={2} xsOffset={2} xs={8}>
								{ this.state.isReset && <div className="warning-green" id="resetPasswordSuccess">Password is reset, Login with your new password</div> }
								<br/>
								{ this.isDesktop()
									?  <div id="title" className="title-32-blue">
                                        Login to your <div>account</div>
                                    	</div>
									: <div id="mobile-title" className="title-32-white">
                                        Sign in
									  </div>
								}
                                <Row>
                                    <Col md={7}>
                                        <EmailInput onChange={(value, valid, name) => {
                                            const isValid = error ? true : valid;
                                            this.handleChange(value, isValid, name);
                                        }}
                                                    isVoter={false}
                                                    startValidation={startValidation}
                                                    uniqueValidationEnabled={false}
                                                    required />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={7}>
                                        <PasswordInput onChange={this.handleChange}
                                                       startValidation={startValidation}
                                                       required />
                                    </Col>
                                </Row>
                                <a id="link-small" href="" onClick={this.showForgotPasswordModal}>Forgot password</a>
                                <div id="button-class">
                                    <Button disabled={isFetching}
											 borderEnabled
                                            onClick={this.btwSignOn.bind(this)}>
										{ this.isMobile() ? 'Go!' : 'Log In' }
                                    </Button>
                                </div>
                                { error && <div> <h5 style={{color: 'red'}}>Check your username or password </h5></div>}
                                <div>
								<span id="new-text">
									{ this.isDesktop()
                                        ? 'New to BeTheWave?'
                                        : 'Not Registered'
                                    }
								</span>
                                    <Link id="link-large" to='/captainProfile/register'> Sign up</Link>
                                </div>
                                <Col md={6}>
                                    <Spinner loading={isFetching} size={50} />
                                </Col>
                            </Col>
                        </div>
                    </Col>

					<Dialog show={this.state.showForgotPasswordModal}
                            onClose={this.closeForgotPasswordModal}
							className="login-center-modal">
                        <div className="forgot-password">
							{ this.state.isUserFound === 0 && this.state.showWarning && <div className="warning-red">User doesn't exist</div> }
							{ this.state.isUserFound === 1 && this.state.showWarning && <div className="warning-green">Reset password request sent</div> }
							<div className="title-32-light-blue">
								Forgot your password?
							</div>
							<div className="title-20-blue">
								We'll send you an email with a link to reset it!
							</div>
							<div className="text-18-dark-blue">
								<EmailInput 
									onChange={this.changeForgotPasswordEmail}
									isVoter={false}
									name="forgotPasswordEmail"
									startValidation={startValidation}
									uniqueValidationEnabled={false}
									required />
							</div>
							<div id="btn-next">
								<Button onClick={this.sendForgotPasswordRequest}>Go!</Button>
							</div>
							<div id="btn-next">
								Back to <a href="" onClick={this.closeForgotPasswordModal}><b>Sign in</b></a>.
							</div>
						</div>
                    </Dialog>
                </Row>
		);
	}
}

const mapStateToProps = (state) => {
	const { error, isSuccess, isFetching } = state.app[appDataTypes.signOn];
	return {
		error,
		isFetching,
		isSuccess,
		isUserFound: state.request.isUserFound,
		isRequestFetching: state.request.isFetching
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
		actions: bindActionCreators({ btwSignOn, loadTaskList }, dispatch),
		forgotPasswordRequest: (email) => dispatch(forgotPasswordRequest(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
