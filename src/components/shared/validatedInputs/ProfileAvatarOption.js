import React from 'react'
import PropTypes from 'prop-types'

import { RadioGroup, RadioOption } from '../index'

const ProfileAvatarOption = props => {
	return (
		<RadioGroup
			name='profile-avatar'
			value={props.value}
			onChange={props.onOptionChange}
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
	onOptionChange: PropTypes.func.isRequired
}

ProfileAvatarOption.defaultProps = {
	value: 'initial'
}

export default ProfileAvatarOption