import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

import fields from '../../../constants/FieldConstants';
import profileImage from '../../../resources/icons/profile.png';
import AvatarInput from './AvatarInput'
import { Typography, RadioGroup, RadioOption } from '../index'

const ProfileAvatarOption = props => {
	return (
		<RadioGroup
			name='profile-avatar'
			value={props.value}
			onChange={props.onChange}
		>
			<RadioOption value='initial'>Use initials</RadioOption>
			<RadioOption value='twitter'>Sync you profile picture with Twitter</RadioOption>
			<RadioOption value='facebook'>Sync you profile picture with Facebook</RadioOption>
			<RadioOption value='linkedin'>Sync you profile picture with Linkedin</RadioOption>
			<RadioOption value='upload'>Upload an image</RadioOption>
		</RadioGroup>
	)
}

ProfileAvatarOption.propTypes = {
	value: PropTypes.oneOf(['initial', 'twitter', 'facebook', 'linkedin', 'upload']),
	onChange: PropTypes.func.isRequired
}

ProfileAvatarOption.defaultProps = {
	value: 'initial'
}


export default class ProfileAvatar extends PureComponent {
	render() {
		if (!this.props.src)
			return (
				<div className="d-flex flex-column btw-input">
					<label>Profile Picture</label>
					<Row>
						<Col md='2' className='p-md-0 mb-4'>
							<img className='btw-voter-img' src={profileImage} width={50} height={50} alt="" />
						</Col>
						<Col md='8' className=' mb-4'>
							<ProfileAvatarOption />
						</Col>
						<Col md='2' className='p-md-0  mb-4'>
							<Typography className='avatar-cancel'>Cancel</Typography>
						</Col>
					</Row>
				</div>
			)
		return (
			<AvatarInput 
				label='Profile Picture'
				name={fields.profileAvatar}
				id={fields.profileAvatar}
				{...this.props}
			/>
		)
	}
}