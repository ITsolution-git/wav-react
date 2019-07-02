import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

import { BaseComponent, Paper, Typography, SocialButton, Spinner } from '../shared';
import BottomLink from './BottomLink';
import routes from '../../constants/Routes';
import { authorizeWithSocial, signUpWithToken  } from '../../actions/AuthActions';
import appDataTypes from '../../constants/AppDataTypes';
import { getQueryObj } from './helpers/queryHelper';
import './styles/index.scss';
import colors from '../../constants/Colors';
import socialTypes from './helpers/socialTypes';


class RegisterBySocial extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        const { location: { hash }, actions } = this.props;
        const userInfo = getQueryObj(hash);

        if (userInfo.token) {
            actions.signUpWithToken(userInfo);
        }
    }

    handleSocialClick = connection => () => {
        this.props.actions.authorizeWithSocial(connection);
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
        const { error, isFetching } = this.props;

        return (
            <div className='btw-register-social'>
                <Spinner loading={isFetching} />
                <Paper className='paper'>
                    <Row className='no-margin'>
                        <Typography className='title'>Sign Up with Email</Typography>
                        <Typography variant='body' lightColor>Use any Sign Up method you like.</Typography>
                    </Row>
                    <Row className='no-margin'>
                        <Typography fontWeight='normal' variant='body' color={colors.error}>{ error }</Typography>
                    </Row>
                    <Row className='no-margin'>
                        <Typography fontWeight='normal' variant='body' color={colors.error}>{ error }</Typography>
                    </Row>
                    <div className='buttons'>
                        <SocialButton iconName='google-normal' onClick={this.handleSocialClick(socialTypes.google)}>
                            { this.renderText('Google') }
                        </SocialButton>
                        <SocialButton iconName='facebook-normal' onClick={this.handleSocialClick(socialTypes.facebook)}>
                            { this.renderText('Facebook') }
                        </SocialButton>
                        <SocialButton iconName='twitter-normal' onClick={this.handleSocialClick(socialTypes.twitter)}>
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
    const { error, isSuccess, isFetching } = state.app[appDataTypes.signOn];
    return {
        error,
        isSuccess,
        isFetching
    };
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ authorizeWithSocial, signUpWithToken }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterBySocial));

