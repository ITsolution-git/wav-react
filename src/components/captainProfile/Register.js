import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { btwRegister } from '../../actions/SignOnAction';
import BaseComponent from '../shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';
import fieldConstants from '../../constants/FieldConstants';
import Button from '../shared/Button';
import Paper from '../shared/Paper';

import {
	FirstNameInput,
	LastNameInput,
	EmailInput,
	PasswordInput,
	TextInput
} from '../shared/validatedInputs';

class Register extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			btwIdentity: {},
			isValid: {
				[fieldConstants.firstName]: false,
				[fieldConstants.lastName]: false,
				[fieldConstants.email]: false,
				[fieldConstants.password]: false,
				'confirmPassword': false
			},
			termsAndPrivacy: false,
            showInfoModal: false
		}
	}

    handleChange = (value, valid, name) => {
        this.setState(state => {
            const { btwIdentity, isValid } = state;
            return {
                btwIdentity: { ...btwIdentity, [name]: value },
                isValid: { ...isValid, [name]: valid }
            }
        });
    };


    btwRegister() {
		const { isValid, btwIdentity, termsAndPrivacy } = this.state;
		this.setState({ startValidation: true });

		if (!termsAndPrivacy && this.isDesktop()) {
			return;
        }
        if (Object.values(isValid).every(val => val)) {
            this.props.btwRegister(btwIdentity)
        }
	}

	componentWillReceiveProps(props) {
		if (props.isSuccess) {
			this.onLink(routes.welcome);
		}
	}

	renderAlreadyRegistered = () => {
		return (
            <div id="registered-text-div">
                <span id='registered-text'>Already have an account? </span>
                <Link to='/'> Log in </Link>
            </div>
        );
	};

	render() {
		const {
			startValidation,
		} = this.state;
		const { error } = this.props;
		const errorInWhite = this.isMobile();

		return (
		    <div className="btw-register">
                <Paper className='paper'>
                    <div>Sign Up with Email</div>
                    <Row>
                        <Col md={6}>
                            <FirstNameInput onChange={this.handleChange}
                                            startValidation={startValidation}
                                            errorWhite={errorInWhite}
                                            required />
                        </Col>
                        <Col md={6}>
                            <LastNameInput onChange={this.handleChange}
                                           startValidation={startValidation}
                                           errorWhite={errorInWhite}
                                           required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <EmailInput onChange={(value, valid, name) => {
                                const isValid = this.props.error ? true : valid;
                                this.handleChange(value, isValid, name);
                            }}
                                        isVoter={false}
                                        startValidation={startValidation}
                                        uniqueValidationEnabled={false}
                                        errorWhite={errorInWhite}
                                        customError={error}
                                        required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <PasswordInput onChange={this.handleChange}
                                           startValidation={startValidation}
                                           errorWhite={errorInWhite}
                                           required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TextInput label='Confirm Password'
                                       type='password'
                                       id="confirmPassword"
                                       validator={value => value === this.state.btwIdentity[fieldConstants.password]}
                                       validatorError='The passwords do not match'
                                       onChange={this.handleChange}
                                       name='confirmPassword'
                                       errorWhite={errorInWhite}
                                       startValidation={startValidation}
                                       required />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={12} xs={12} align="center">
                            <div id="btn_signup">
                                <Button borderEnabled
                                        onClick={this.btwRegister.bind(this, 'btwSignOn')}>Sign Up</Button>
                            </div>
                        </Col>
                    </Row>
                    { this.renderAlreadyRegistered() }
                </Paper>
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
	btwRegister: (btwIdentity) => dispatch(btwRegister(btwIdentity))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
