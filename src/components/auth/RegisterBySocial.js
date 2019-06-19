import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import { BaseComponent, Paper, Typography, SocialButton } from '../shared';
import AlreadyRegistered from './AlreadyRegistered';
import routes from '../../constants/Routes';

class RegisterBySocial extends BaseComponent {

    handleGoogleClick = () => {

    };

    handleFacebookClick = () => {

    };

    handleTwitterClick = () => {

    };

    handleMailClick = () => {
        this.onLink(routes.registerByMail);
    };

    renderText = (network) => {
        return (
            <>
                <Typography variant='body' displayInline>Sign Up with</Typography>
                <Typography variant='body' fontWeight='600' displayInline> { network }</Typography>
            </>
        )
    };

    render() {
        return (
            <div className='btw-register-social'>
                <Paper className='paper'>
                    <Row className='no-margin'>
                        <Typography className='title'>Sign Up with Email</Typography>
                        <Typography variant='body' lightColor>Use any Sign Up method you like.</Typography>
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
                    <AlreadyRegistered />
                </Paper>
            </div>
        )
    }
}

export default withRouter(RegisterBySocial);