import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { 
	Typography, 
	PasswordInput,
	Button
} from '../shared';

const PasswordSetting = (props) => {
	const [validated, setValidated] = useState(false)
	const [data, setData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	})

	const handleChange = (value, valid, name) => {
		if (value) {
			setData({ ...data, [name]: value })
		}
		if (data.currentPassword && data.newPassword && data.confirmPassword) {
			setValidated(true)
		}
	}

	const onSubmit = () => {

	}

	const onForgot = () => {

	}

	return (
		<div className='d-flex flex-column px-5'>
			<Typography variant='body my-4'>You can edit your password here.</Typography>
			<PasswordInput 
				className='my-3'
				name='currentPassword'
				label='Current password'
				id='currentPassword'
				onChange={handleChange}
	            startValidation={validated}
	            required />
	        <PasswordInput 
				className='my-3'
				name='newPassword'
				label='New password'
				id='newPassword'
				onChange={handleChange}
	            startValidation={validated}
	            required />
	        <PasswordInput 
				className='my-3'
				name='confirmPassword'
				label='Confirm new password'
				id='confirmPassword'
				onChange={handleChange}
	            startValidation={validated}
	            required />
	        <div className='d-flex justify-content-between align-items-center' >
	        	<Button className='my-3' size='medium' onClick={onSubmit}>Save Changes</Button>
	        	<Typography variant='body forgot-password' onClick={onForgot}><u>Forgot Password?</u></Typography>
	        </div>
		</div>
	)
}

PasswordSetting.defaultProps = {
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
}

PasswordSetting.propTypes = {
	currentPassword: PropTypes.string,
	newPassword: PropTypes.string,
	confirmPassword: PropTypes.string,
	onSubmit: PropTypes.func,
	onForgot: PropTypes.func
}

export default PasswordSetting