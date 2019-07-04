import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BaseComponent, Paper, Typography, Spinner, Button, ErrorAlarm } from '../../shared';
import { BottomLink, SocialButton, LeftIcon } from '../components';
import routes from '../../../constants/Routes';
import { authorizeWithSocial, signInWithToken, signInWithMail } from '../../../actions/AuthActions';
import { getQueryObj } from '../helpers/queryHelper';
import socialTypes from '../helpers/socialTypes';
import appDataTypes from '../../../constants/AppDataTypes';
import colors from '../../../constants/Colors';
import {
    EmailInput,
    PasswordInput,
} from '../../shared/validatedInputs';
import './styles.scss';


class SignIn extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        const { location: { hash }, actions } = this.props;
        const userInfo = getQueryObj(hash);

        if (userInfo.token) {
            actions.signInWithToken(userInfo);
        }

        this.state = {
            email: '',
            password: '',
            startValidation: false,
            valid: {}
        };

    }

    handleSocialClick = connection => () => {
        this.props.actions.authorizeWithSocial(connection, true);
    };

    handleChange = (value, isValid, name) => {
        this.setState({
            [name]: value,
            valid: { ...this.state.valid, [name]: isValid }
        });
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter' || e.which === 13) {
            this.signInWithMail();
        }
    };

    signInWithMail = () => {
        this.setState({ startValidation: true });
        const { email, password, valid } = this.state;
        if (valid.email && valid.password) {
            this.props.actions.signInWithMail(email, password);
        }
    };

    renderText = (network, color) => {
        return (
            <Typography variant='body' color={color} displayInline>Log in with {network}</Typography>
        )
    };

    render() {
        const { error, isFetching } = this.props;
        const { startValidation } = this.state;

        return (
            <div className='btw-sign-in'>
                <Spinner loading={isFetching} />
                <ErrorAlarm >
                    <Typography variant='body' fontWeight='600'>
                        That’s strange
                    </Typography>
                    <Typography variant='body' fontWeight='600'>
                        We couldn’t find an account matching the username and password you entered.
                        Please check your username and password and try again.
                    </Typography>
                </ErrorAlarm>
                <Paper className='paper'>
                    <Row className='no-margin'>
                        <Typography className='title'>Log In</Typography>
                    </Row>
                    <Row className='no-margin'>
                        <Typography fontWeight='normal' variant='body' color={colors.error}>{error}</Typography>
                    </Row>
                    <div className='buttons'>
                        <SocialButton networkType='google' onClick={this.handleSocialClick(socialTypes.google)}>
                            {this.renderText('Google', colors.main)}
                        </SocialButton>
                        <SocialButton networkType='facebook' onClick={this.handleSocialClick(socialTypes.facebook)}>
                            {this.renderText('Facebook', colors.white)}
                        </SocialButton>
                        <SocialButton networkType='twitter' onClick={this.handleSocialClick(socialTypes.twitter)}>
                            {this.renderText('Twitter', colors.white)}
                        </SocialButton>
                    </div>
                    <Typography className='text-center email-text' variant='functional' color={colors.secondary}>Or log in with email:</Typography>
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
                            <Button
                                disabled={isFetching}
                                onClick={this.signInWithMail}>
                                Log In
                            </Button>
                        </Col>
                    </Row>
                    <BottomLink title=''
                        link={routes.forgotPassword}
                        linkText='Forgot Password' />
                    <BottomLink title="Don't have an account?"
                        link={routes.signUp}
                        linkText='Sign Up' />
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
    actions: bindActionCreators({ authorizeWithSocial, signInWithToken, signInWithMail }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
