import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core';

import { forgotPasswordRequest } from '../../actions/PasswordRequestAction';
import { validate } from '../../utility/InputValidator';
import BaseComponent from '../shared/BaseComponent';
import routes from '../../constants/Routes';
// TODO: commented by sergey
// import Spinner from '../../components/shared/Spinner';

const errorMsg = '* Email is not valid *';
const fieldName = 'email';

class ForgotPassword extends BaseComponent {
    constructor() {
        super();
        this.state = {
            info: this.getEmptyState(),
            isValid: this.getEmptyState(true),
            isUserFound: -1
        }
    }

    getEmptyState = (initValue = '') => {
        return {
            email: initValue
        };
    };

    updateFields(field, event) {
        let info = Object.assign({}, this.state.info);
        info[field] = event.target.value;
        this.setState({
            info: info
        })
    }

    validateFields(field, event) {
        const { isValid } = this.state;
        const { value } = event.target;
        let validation = { ...isValid };

        validation[field] = validate(field, value);
        this.setState({ isValid: validation });
    }

    onForgotPassword(event) {
        const { isValid, info } = this.state;
        let validation = { ...isValid };

        Object.keys(info).forEach(key => {
            validation[key] = validate(key, info[key]);
        });
        this.setState({ isValid: validation });
        return Object.keys(info).some(key => !validation[key])
            ? true
            : this.props.forgotPasswordRequest(info.email);
    }

    componentWillReceiveProps(props) {
        if (props.isUserFound) {
            this.setState({
                isUserFound: 1
            })
        }

        if (props.isUserFound === false) {
            this.setState({
                isUserFound: 0
            })
        }
    }

    render() {

        // TODO: It is connected with Spinner. by sergey
        // const { isFetching } = this.props;
        const { isValid, isUserFound } = this.state;

        return (
            <div className="btw-forgot-password">
                <Grid container alignItems='center' justify='center'>
                    <Paper className='content'>
                        <Grid container alignItems='center' justify='flex-start'>
                            <Typography className='title'>Reset Password</Typography>
                        </Grid>
                        <Grid container alignItems='center' justify='flex-start'>
                            <Typography className='description'>
                                Enter the email address associated with your account and
								we’ll send you a link to create a new Password
							</Typography>
                        </Grid>
                        {isUserFound === 0 && <span style={{ fontSize: "12px", color: "red" }}>User doesn't exist</span>}
                        {isUserFound === 1 && <span style={{ fontSize: "12px", color: "green" }}>Reset password request sent</span>}
                        <TextField
                            className='input'
                            required
                            autoFocus
                            margin="normal"
                            label="Email"
                            type="email"
                            onChange={this.updateFields.bind(this, fieldName)}
                            onBlur={this.validateFields.bind(this, fieldName)}
                            fullWidth />
                        {!isValid[fieldName] && <span style={{ fontSize: "12px", color: "red" }}>{errorMsg}</span>}
                        {/* TODO: Please update Spinner It is not overlay. by Sergey*/}
                        {/* <Spinner loading={isFetching} size={50} /> */}
                        <Button
                            className='button'
                            variant='contained'
                            color='primary'
                            onClick={this.onForgotPassword.bind(this, 'onForgotPassword')}
                            fullWidth>
                            Send Verification Link
						</Button>
                        <div className='remember'>
                            Remembered? <Link to={routes.login}>Log in</Link>.
						</div>
                    </Paper>
                </Grid>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const { isUserFound, isFetching } = state.request;
    return {
        isUserFound,
        isFetching
    };
};

const mapDispatchToProps = (dispatch) => ({
    forgotPasswordRequest: (email) => dispatch(forgotPasswordRequest(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));