import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core';

import { changePasswordRequest } from '../../actions/PasswordRequestAction';
import BaseComponent from '../shared/BaseComponent';
import routes from '../../constants/Routes';
// import Button from '../shared/Button';
import {
	PasswordInput,
	TextInput
} from '../../components/shared/validatedInputs';

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

		const passwordErrorMsg = (
			<div>
				<div>At least one special character</div>
				<div>At least one number</div>
				<div>At lease one upper case character</div>
				<div>Minimum of 7 characters</div>
			</div>
		);

		return (
			<div className="btw-change-password">
				<Grid container alignItems='center' justify='center'>
					<Paper className='content'>
						<Grid container alignItems='center' justify='flex-start'>
							<Typography className='title'>Reset Password</Typography>
						</Grid>
						<TextField
							className='input'
							required
							autoFocus
							margin="normal"
							id="email"
							label="New password"
							type="password"
							fullWidth />
						<TextField
							className='input'
							required
							autoFocus
							margin="normal"
							id="email"
							label="Confirm new password"
							type="password"
							fullWidth />
						<Button
							className='button'
							variant='contained'
							color='primary'
							fullWidth>
							Save New Password
						</Button>
						<div className='remember'>
							Remembered? <Link to={routes.login}><b>Log in</b></Link>.
						</div>
					</Paper>
				</Grid>
			</div>
			// <div className='btw-change-password btw-verify'>
			// 	<div className="container">
			// 		<div className="verify-captain col-lg-9 col-md-12">
			// 			{ !this.state.isChangedPassword && <div className="warning-red">Password doesn't not reset</div> }
			// 			<div className="title-32-light-blue">
			// 				Enter your new password
			// 			</div>
			// 			<div className="text-18-dark-blue">
			// 				<PasswordInput 
			// 					onChange={this.handleChange}
			// 					isVoter={false}
			// 					name="password"
			// 					uniqueValidationEnabled={false}
			// 					required />
			// 				<TextInput label='Confirm Password'
			// 					type='password'
			// 					id="confirmPassword"
			// 					validator={value => value === this.state.password}
			// 					validatorError='The passwords do not match'
			// 					onChange={this.handleChange}
			// 					name='confirmPassword'
			// 					required />
			// 			</div>
			// 			<div id="btn-next">
			// 				<Button onClick={this.changePassword}>Submit</Button>
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>
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