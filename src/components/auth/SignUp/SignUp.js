import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

import { BaseComponent, Paper, Typography, Spinner } from '../../shared';
import { BottomLink, SocialButton } from '../components';
import routes from '../../../constants/Routes';

import { authorizeWithSocial, signUpWithToken  } from '../../../actions/AuthActions';
import appDataTypes from '../../../constants/AppDataTypes';
import { getQueryObj } from '../helpers/queryHelper';
import colors from '../../../constants/Colors';
import socialTypes from '../helpers/socialTypes';
import './styles.scss';

class SignUp extends BaseComponent {
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
        // this.onLink(routes.registerByMail);
    };

    renderText = (network, color) => {
        return (
            <Typography variant='body' color={color} displayInline>Sign Up with { network }</Typography>
        )
    };

    render() {
        const { error, isFetching } = this.props;

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
                        <Typography className='text-center' variant='functional' color={colors.secondary}>Or sign up with email:</Typography>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));

