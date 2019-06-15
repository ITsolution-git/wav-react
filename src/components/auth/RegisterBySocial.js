import React from 'react';

import BaseComponent from '../shared/BaseComponent';
import Paper from '../shared/Paper';
import Typography from '../shared/Typography';
import SocialButton from '../shared/SocialButton';

class RegisterBySocial extends BaseComponent {

    handleGoogleClick = () => {

    };

    handleFacebookClick = () => {

    };

    handleTwitterClick = () => {

    };

    handleMailClick = () => {

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
                    <Typography className='title'>Sign Up with Email</Typography>
                    <Typography variant='body' lightColor>Use any Sign Up method you like.</Typography>
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
                        <SocialButton iconName='envelope' onClick={this.handleMailClick}>
                            { this.renderText('Email') }
                        </SocialButton>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default RegisterBySocial;