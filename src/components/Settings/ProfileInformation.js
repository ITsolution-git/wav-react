import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { 
	EmailInput,
	FirstNameInput,
	LastNameInput,
	ProfileInformationText,
	Button,
	ProfileAvatar,
} from '../shared';

const ProfileInformation = (props) => {
	const [validated, setValidated] = useState(false)
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		bio: ''
	})
	
	const handleChange = (value, valid, name) => {
		if (value) {
			setData({ ...data, [name]: value})
		}
		if (data.firstName && data.lastName && data.email) {
			setValidated(true)
		}
	}

	const onSubmit = () => {

	}

	return (
		<div className='d-flex flex-column px-5 profile-info'>
			<ProfileAvatar
				className='my-3'
				onChange={handleChange}
				startValidation={validated}
			/>
			<FirstNameInput 
				className='my-3'
				onChange={handleChange}
	            startValidation={validated}
	            required />
			<LastNameInput 
				className='my-3'
				onChange={handleChange}
			    startValidation={validated}
			    required />
			<EmailInput 
				className='my-3'
				onChange={handleChange}
			    isVoter={false}
			    startValidation={validated}
			    uniqueValidationEnabled={false}
			    required />
			<ProfileInformationText 
				className='my-3'
				onChange={handleChange}
			    startValidation={false} />
			<Button className='my-3' size='medium' onClick={onSubmit}>Save Changes</Button>
		</div>
	)
}

ProfileInformation.defaultProps = {
	firstName: '',
	lastName: '',
	email: '',
	bio: ''
}

ProfileInformation.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	email: PropTypes.string,
	bio: PropTypes.string,
	onSubmit: PropTypes.func
}

export default ProfileInformation