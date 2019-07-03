import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import { bindActionCreators } from 'redux';

import { BaseComponent, Paper, Typography, Spinner, EmailInput, PasswordInput, Button, TextInput } from '../../shared';
import { BottomLink, LeftIcon, SocialButton } from '../components';
import { authorizeWithSocial, signUpWithToken, signUpWitMail  } from '../../../actions/AuthActions';
import appDataTypes from '../../../constants/AppDataTypes';
import { getQueryObj } from '../helpers/queryHelper';
import colors from '../../../constants/Colors';
import routes from '../../../constants/Routes';
import socialTypes from '../helpers/socialTypes';
import './styles.scss';
import fieldConstants from "../../../constants/FieldConstants";

class SignUp extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        const { location: { hash }, actions } = this.props;
        const userInfo = getQueryObj(hash);

        if (userInfo.token) {
            actions.signUpWithToken(userInfo);
        }

        this.state = {
            btwIdentity: {},
            isValid: {
                fullName: false,
                [fieldConstants.email]: false,
                [fieldConstants.password]: false
            },
            startValidation: false
        }
    }

    handleSocialClick = connection => () => {
        this.props.actions.authorizeWithSocial(connection);
    };

    signUpWitMail = () => {
        const { isValid, btwIdentity } = this.state;
        this.setState({ startValidation: true });

        if (Object.values(isValid).every(val => val)) {
            this.props.signupWitMail(btwIdentity)
        }
    };

    handleChange = (value, valid, name) => {
        this.setState(state => {
            const { btwIdentity, isValid } = state;
            return {
                btwIdentity: { ...btwIdentity, [name]: value },
                isValid: { ...isValid, [name]: valid }
            }
        });
    };

    renderText = (network, color) => {
        return (
            <Typography variant='body' color={color} displayInline>Sign Up with { network }</Typography>
        )
    };

    render() {
        const { error, isFetching } = this.props;
        const { startValidation } = this.state;

        return (
            <div className='btw-sign-up'>
                <Spinner loading={isFetching} />
                <Paper className='paper'>
                    <Row className='no-margin'>
                        <Typography className='title'>Sign Up</Typography>
                    </Row>
                    <div className='buttons'>
                        <SocialButton networkType='google' onClick={this.handleSocialClick(socialTypes.google)}>
                            { this.renderText('Google', colors.main) }
                        </SocialButton>
                        <SocialButton networkType='facebook' onClick={this.handleSocialClick(socialTypes.facebook)}>
                            { this.renderText('Facebook', colors.white) }
                        </SocialButton>
                        <SocialButton networkType='twitter' onClick={this.handleSocialClick(socialTypes.twitter)}>
                            { this.renderText('Twitter', colors.white) }
                        </SocialButton>
                    </div>
                    <Typography className='text-center email-text' variant='functional' color={colors.secondary}>Or sign up with email:</Typography>
                    <Row>
                        <Col md={12} className='input'>
                            <TextInput onChange={this.handleChange}
                                        hideLabel
                                        label='Full Name'
                                        placeholder='Full Name'
                                        leftIcon={<LeftIcon name='profile' />}
                                        startValidation={startValidation}
                                        required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='input'>
                            <EmailInput onChange={this.handleChange}
                                        isVoter={false}
                                        hideLabel
                                        placeholder='email@example.com'
                                        leftIcon={<LeftIcon name='envelope' />}
                                        startValidation={startValidation}
                                        uniqueValidationEnabled={false}
                                        required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='input'>
                            <PasswordInput onChange={this.handleChange}
                                           label='Password'
                                           hideLabel
                                           leftIcon={<LeftIcon name='lock' />}
                                           placeholder='Password'
                                           startValidation={startValidation}
                                           required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Typography variant='functional' color={colors.secondary}>
                                By Clicking one of the Sign Up buttons <br />
                                I agree <Link to={routes.termsAndConditions} target='_blank'>terms of service</Link>
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button
                                disabled={isFetching}
                                onClick={this.signUpWitMail}>
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                    <BottomLink />
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { error, isSuccess, isFetching } = state.app[appDataTypes.signOn];
    return {
        error,
        isSuccess,
        isFetching
    };
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ authorizeWithSocial, signUpWithToken, signUpWitMail }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));

