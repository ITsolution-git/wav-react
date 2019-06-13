import React from 'react';

import BaseComponent from '../shared/BaseComponent';
import Paper from '../shared/Paper';
import Typography from '../shared/Typography';
import SocialButton from '../shared/SocialButton';

class RegisterBySocial extends BaseComponent {

    handleGoogleClick = () => {

    };

    handleFacebokClick = () => {

    };


    render() {
        return (
            <div className='btw-register-social'>
                <Paper className='paper'>
                    <Typography className='title'>Sign Up with Email</Typography>
                    <Typography variant='body' lightColor>Use any Sign Up method you like.</Typography>
                    <div>
                        <SocialButton iconName='google-normal' onClick={this.handleGoogleClick}>

                        </SocialButton>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default RegisterBySocial;