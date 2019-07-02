import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { changePasswordRequest, verifyTokenRequest } from '../../../actions/ChangePasswordActions';
import BaseComponent from '../../shared/BaseComponent';
import routes from '../../../constants/Routes';
import {
    PasswordInput,
    TextInput
} from '../../shared/validatedInputs';
import Button from '../../shared/Button';
import Typography from '../../shared/Typography';
import './styles/index.scss';


class ChangePassword extends BaseComponent {
    constructor() {
        super();
        this.state = {
            password: '',
            confirmPassword: '',
            valid: {
                password: false,
                confirmPassword: false
            },
            isValidToken: true,
            isChangedPassword: true
        }
    }

    async componentDidMount() {
        const { token } = this.props.match.params;
        await this.props.verifyTokenRequest(token);

        const { isValidToken } = this.props;
        this.setState({ isValidToken });
    }

    handleChange = (value, isValid, name) => {
        this.setState({
            [name]: value,
            valid: { ...this.state.valid, [name]: isValid }
        });
    };

    changePassword = async () => {
        const { valid, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            this.setState({
                valid: {
                    ...valid,
                    confirmPassword: false
                }
            })
            return
        }

        if (valid.password) {
            const { token } = this.props.match.params;
            const data = {
                newPassword: password,
                resetPasswordToken: token
            }
            await this.props.changePasswordRequest(data);

            const { isChangedPassword } = this.props;
            if (isChangedPassword) {
                this.onLink(routes.loginBySocial, { isReset: true });
            } else {
                this.setState({ isChangedPassword });
            }
        }
    }

    renderMessage = () => {
        const { isChangedPassword, isValidToken } = this.state;

        return (
            <React.Fragment>
                {!isChangedPassword && <Typography variant='functional' className='errorMessage' >Password doesn't not reset</Typography>}
                {!isValidToken && <Typography variant='functional' className='errorMessage' >Token is not valid</Typography>}
            </React.Fragment>
        )
    }

    render() {

        return (
            <div className='btw-change-password'>
                <div className='content btw-paper'>
                    {this.renderMessage()}
                    <Typography className='title'>Reset Password</Typography>
                    <Row className='inputs-row'>
                        <Col md={12}>
                            <PasswordInput
                                placeholder='Your password (at least 6 charachters)'
                                onChange={this.handleChange}
                                isVoter={false}
                                name='password'
                                uniqueValidationEnabled={false}
                                required />
                        </Col>
                    </Row>
                    <Row className='inputs-row'>
                        <Col md={12}>
                            <TextInput
                                placeholder='Confirm your password'
                                label='Confirm Password'
                                type='password'
                                id='confirmPassword'
                                validator={value => value === this.state.password}
                                validatorError='The passwords do not match'
                                onChange={this.handleChange}
                                name='confirmPassword'
                                required />
                        </Col>
                    </Row>
                    <Button fullWidth onClick={this.changePassword}>
                        Save New Password
                    </Button>
                    <Typography variant='body' className='remember'>
                        Remembered? <Link to={routes.loginBySocial}>Log in</Link>
                    </Typography>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const { isValidToken, isChangedPassword } = state.request;
    return {
        isValidToken,
        isChangedPassword
    };
};

const mapDispatchToProps = (dispatch) => ({
    changePasswordRequest: (data) => dispatch(changePasswordRequest(data)),
    verifyTokenRequest: (token) => dispatch(verifyTokenRequest(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword));