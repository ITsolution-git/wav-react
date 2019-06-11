import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { changePasswordRequest } from '../../actions/PasswordRequestAction';
import BaseComponent from '../shared/BaseComponent';
import routes from '../../constants/Routes';
import {
    PasswordInput,
    TextInput
} from '../../components/shared/validatedInputs';
import Button from '../shared/Button';
import Typography from '../shared/Typography';

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
            isChangedPassword: true
        }
    }

    handleChange = (value, isValid, name) => {
        this.setState({
            [name]: value,
            valid: { ...this.state.valid, [name]: isValid }
        });
    };

    changePassword = () => {
        const { valid, password, confirmPassword } = this.state;

        console.log(this.props)
        if (!this.props.location.state.id) {
            return true;
        }

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

            let param = this.props.location.state.id, info = {};

            info['password'] = password
            info['confirmPassword'] = confirmPassword
            info["userid"] = param;
            return this.props.changePasswordRequest(info);
        }
    }

    componentWillReceiveProps(props) {
        if (props.isChangedPassword) {
            this.onLink(routes.login, { isReset: true });
            return;
        } else {
            this.setState({ "isChangedPassword": false });
        }
    }

    render() {

        // Todo: It is not used by sergey
        // const passwordErrorMsg = (
        //     <div>
        //         <div>At least one special character</div>
        //         <div>At least one number</div>
        //         <div>At lease one upper case character</div>
        //         <div>Minimum of 7 characters</div>
        //     </div>
        // );

        const { isChangedPassword } = this.state;

        return (
            <div className="btw-change-password">
                <div className='content btw-paper'>
                    {!isChangedPassword && <Typography variant='functional' className='errorMessage' displayInline>Password doesn't not reset</Typography>}
                    <Typography className='title'>Reset Password</Typography>
                    <PasswordInput
                        onChange={this.handleChange}
                        isVoter={false}
                        name="password"
                        uniqueValidationEnabled={false}
                        required />
                    <TextInput label='Confirm Password'
                        type='password'
                        id="confirmPassword"
                        validator={value => value === this.state.password}
                        validatorError='The passwords do not match'
                        onChange={this.handleChange}
                        name='confirmPassword'
                        required />
                    <Button style={{ width: '100%' }} onClick={this.changePassword}>
                        Save New Password
                    </Button>
                    <Typography variant='body' className='remember'>
                        Remembered? <Link to={routes.login}>Log in.</Link>
                    </Typography>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const { isChangedPassword } = state.request;
    return {
        isChangedPassword
    };
};

const mapDispatchToProps = (dispatch) => ({
    changePasswordRequest: (info) => dispatch(changePasswordRequest(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword));