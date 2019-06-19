import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import { BaseComponent, Paper, Typography, SocialButton } from '../shared';
import BottomLink from './BottomLink';
import routes from '../../constants/Routes';

class LoginBySocial extends BaseComponent {

    handleGoogleClick = () => {

    };

    handleFacebookClick = () => {

    };

    handleTwitterClick = () => {

    };

    handleMailClick = () => {
        this.onLink(routes.loginByMail);
    };

    renderText = (network) => {
        return (
            <>
                <Typography variant='body' displayInline>Log in with</Typography>
                <Typography variant='body' fontWeight='600' displayInline> { network }</Typography>
            </>
        )
    };

    render() {
        return (
            <div className='btw-login-social'>
                <Paper className='paper'>
                    <Row className='no-margin'>
                        <Typography className='title'>Log In to your account</Typography>
                    </Row>
                    <div className='buttons'>
                        <SocialButton iconName='google-normal' onClick={this.handleGoogleClick}>
                            { this.renderText('Google') }
                        </SocialButton>
                        <SocialButton iconName='facebook-normal' onClick={this.handleFacebookClick}>
                            { this.renderText('Facebook') }
                        </SocialButton>
                        <SocialButton iconName='twitter-normal' onClick={this.handleTwitterClick}>
                            { this.renderText('Twitter') }
                        </SocialButton>
                        <Row className='no-margin'>
                            <div className='btw-social-divider'>
                                <div>OR</div>
                            </div>
                        </Row>
                        <SocialButton iconName='envelope' onClick={this.handleMailClick}>
                            { this.renderText('Email') }
                        </SocialButton>
                    </div>
                    <BottomLink title={`Don't have an account?`}
                                link={routes.registerBySocial}
                                linkText='Sign up'/>
                </Paper>
            </div>
        )
    }
}

export default withRouter(LoginBySocial);