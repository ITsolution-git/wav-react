import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BaseComponent, Paper, Typography, Spinner } from '../../shared';
import { BottomLink, SocialButton } from '../components';
import routes from '../../../constants/Routes';
import { authorizeWithSocial, signInWithToken } from '../../../actions/AuthActions';
import { getQueryObj } from '../helpers/queryHelper';
import socialTypes from '../helpers/socialTypes';
import appDataTypes from '../../../constants/AppDataTypes';
import colors from '../../../constants/Colors';
import './styles.scss';


class SignIn extends BaseComponent {

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
        // this.onLink(routes.loginByMail);
    };

    renderText = (network, color) => {
        return (
            <Typography variant='body' color={color} displayInline>Log in with { network }</Typography>
        )
    };

    render() {
        const { error, isFetching } = this.props;

        return (
            <div className='btw-sign-in'>
                <Spinner loading={isFetching} />
                <Paper className='paper'>
                    <Row className='no-margin'>
                        <Typography className='title'>Log In</Typography>
                    </Row>
                    <Row className='no-margin'>
                        <Typography fontWeight='normal' variant='body' color={colors.error}>{ error }</Typography>
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
                        <Typography className='text-center' variant='functional' color={colors.secondary}>Or log in with email:</Typography>
                    </div>
                    <BottomLink title={`Don't have an account?`}
                                link={routes.signUp}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
