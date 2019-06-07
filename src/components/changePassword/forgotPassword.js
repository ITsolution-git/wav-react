import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { forgotPasswordRequest } from '../../actions/PasswordRequestAction';
import BaseComponent from '../shared/BaseComponent';
import routes from '../../constants/Routes';
import Button from '../shared/Button';
import { EmailInput } from '../../components/shared/validatedInputs';

class ForgotPassword extends BaseComponent {
    constructor() {
        super();
        this.state = {
            email: '',
            isValid: false,
            isUserFound: -1
        }
    }

    componentWillReceiveProps(props) {
        const { isUserFound } = props;
        this.setState({ isUserFound: isUserFound ? 1 : 0 });
    }

    handleChange = (value, valid, name) => {
        this.setState({ email: value, isValid: valid });
    };

    onForgotPassword = () => {
        const { isValid, email } = this.state;
        const { forgotPasswordRequest } = this.props;
        isValid && forgotPasswordRequest(email);
    }

    renderMessage = () => {
        const { isUserFound } = this.state;
        return (
            <React.Fragment>
                {isUserFound === 0 && <span className='errorMessage'>User doesn't exist</span>}
                {isUserFound === 1 && <span className='successMessage'>Reset password request sent</span>}
            </React.Fragment>
        )
    }

    render() {
        const { email } = this.state;

        return (
            <div className="btw-forgot-password">
                <div className='content'>
                    <div className='title'>Reset Password</div>
                    <div className='description'>
                        Enter the email address associated with your account and
                        we’ll send you a link to create a new Password
					</div>
                    {this.renderMessage()}
                    <EmailInput
                        defaultValue={email}
                        onChange={this.handleChange}
                        uniqueValidationEnabled={false}
                        required />
                    <Button
                        color='blue4'
                        style={{ width: '100%' }}
                        onClick={this.onForgotPassword.bind(this, 'onForgotPassword')}>
                        Send Request
                    </Button>
                    <div className='remember'>
                        Remembered? <Link to={routes.login}>Log in.</Link>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const { isUserFound } = state.request;
    return {
        isUserFound
    };
};

const mapDispatchToProps = (dispatch) => ({
    forgotPasswordRequest: (email) => dispatch(forgotPasswordRequest(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));