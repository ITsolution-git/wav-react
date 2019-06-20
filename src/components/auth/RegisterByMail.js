import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { signupWitMail } from '../../actions/AuthActions';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';
import fieldConstants from '../../constants/FieldConstants';
import {
	FirstNameInput,
	LastNameInput,
	EmailInput,
	PasswordInput,
	TextInput
} from '../shared/validatedInputs';
import { Button, Paper, Typography, BaseComponent } from '../shared';
import BottomLink from './BottomLink';
import colors from '../../constants/Colors';

class RegisterByMail extends BaseComponent {
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


    signupWitMail() {
		const { isValid, btwIdentity } = this.state;
		this.setState({ startValidation: true });

        if (Object.values(isValid).every(val => val)) {
            this.props.signupWitMail(btwIdentity)
        }
	}

	componentWillReceiveProps(props) {
		if (props.isSuccess) {
			this.onLink(routes.welcome);
		}
	}

	render() {
		const {
			startValidation,
		} = this.state;
		const { error } = this.props;

		return (
		    <div className='btw-register-mail'>
                <Paper className='paper'>
                    <Typography className='title'>Sign Up with Email</Typography>
                    <Row className='inputs-row'>
                        <Col md={6}>
                            <FirstNameInput onChange={this.handleChange}
                                            startValidation={startValidation}
                                            required />
                        </Col>
                        <Col md={6}>
                            <LastNameInput onChange={this.handleChange}
                                           startValidation={startValidation}
                                           required />
                        </Col>
                    </Row>
                    <Row className='inputs-row'>
                        <Col md={12}>
                            <EmailInput onChange={this.handleChange}
                                        isVoter={false}
                                        startValidation={startValidation}
                                        uniqueValidationEnabled={false}
                                        required />
                        </Col>
                    </Row>
                    <Row className='inputs-row'>
                        <Col md={12}>
                            <PasswordInput onChange={this.handleChange}
                                           placeholder='Your password (at least 6 charachters)'
                                           startValidation={startValidation}
                                           required />
                        </Col>
                    </Row>
                    <Row className='inputs-row'>
                        <Col md={12}>
                            <TextInput label='Confirm Password'
                                       type='password'
                                       id="confirmPassword"
                                       placeholder='Confirm your password'
                                       validator={value => value === this.state.btwIdentity[fieldConstants.password]}
                                       validatorError='The passwords do not match'
                                       onChange={this.handleChange}
                                       name='confirmPassword'
                                       startValidation={startValidation}
                                       required />
                        </Col>
                    </Row>
                    <Row className='inputs-row'>
                        <Col md={12} xs={12} align="center">
                            <div id="btn_signup">
                                <Button onClick={this.signupWitMail.bind(this, 'btwSignOn')}>Sign Up</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className='inputs-row'>
                        <Col md={12} xs={12}>
                            <Typography fontWeight='normal' variant='body' color={colors.error}>{ error }</Typography>
                        </Col>
                    </Row>
                    <BottomLink />
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
	signupWitMail: (btwIdentity) => dispatch(signupWitMail(btwIdentity))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterByMail));
