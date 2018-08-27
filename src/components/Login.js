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
			valid: {}
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
								{ this.isDesktop()
									?  <div id="title" className="title-32-blue">
                                        Login to your <div>account</div>
                                    	</div>
									: <div id="mobile-title" className="title-32-white">
                                        Sign in
									  </div>
								}
                                { this.state.isReset && <span style={{ fontSize: "18px", color: "green" }}>Password is reset, Login with your new password</span> }
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
                                <Link id="link-small" to='/changePassword/request'>Forgot password</Link>
                                <div id="button-class">
                                    <Button disabled={isFetching}
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
                </Row>
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
        actions: bindActionCreators({ btwSignOn, loadTaskList }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
