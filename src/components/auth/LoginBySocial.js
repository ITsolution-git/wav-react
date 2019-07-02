import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {BaseComponent, Paper, Typography, SocialButton, Spinner} from '../shared';
import BottomLink from './BottomLink';
import routes from '../../constants/Routes';
import './styles/index.scss';
import { authorizeWithSocial, signInWithToken } from '../../actions/AuthActions';
import { getQueryObj } from './helpers/queryHelper';
import socialTypes from './helpers/socialTypes';
import appDataTypes from '../../constants/AppDataTypes';
import colors from "../../constants/Colors";


class LoginBySocial extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        const { location: { hash }, actions } = this.props;
        const userInfo = getQueryObj(hash);

        if (userInfo.token) {
            actions.signInWithToken(userInfo);
        }
    }

    handleSocialClick = connection => () => {
        this.props.actions.authorizeWithSocial(connection, true);
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
        const { error, isFetching } = this.props;

        return (
            <div className='btw-login-social'>
                <Spinner loading={isFetching} />
                <Paper className='paper'>
                    <Row className='no-margin'>
                        <Typography className='title'>Log In to your account</Typography>
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
                    <BottomLink title={`Don't have an account?`}
                                link={routes.registerBySocial}
                                linkText='Sign up'/>
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
    actions: bindActionCreators({ authorizeWithSocial, signInWithToken }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginBySocial));
