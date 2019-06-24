import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import { BaseComponent, Paper, Typography, SocialButton } from '../shared';
import BottomLink from './BottomLink';
import routes from '../../constants/Routes';
import { signUpWithSocial } from '../../actions/AuthActions';
import appDataTypes from "../../constants/AppDataTypes";
import { getQueryObj } from './helpers/queryHelper';

class RegisterBySocial extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        const { location: { hash } } = this.props;
        const obj = getQueryObj(hash);

        if (obj.token) {

        }

        this.state = {
            email: '',
            password: '',
            startValidation: false,
            valid: {}
        };
    }

    handleGoogleClick = () => {

    };

    handleFacebookClick = () => {
        this.props.signUpWithSocial('facebook');
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
                    <BottomLink />
                </Paper>
            </div>
        )
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
    signUpWithSocial: connection => dispatch(signUpWithSocial(connection))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterBySocial));

