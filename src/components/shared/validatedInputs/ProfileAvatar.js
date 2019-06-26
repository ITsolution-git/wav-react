import React, { PureComponent } from 'react'

import fields from '../../../constants/FieldConstants';
import AvatarInput from './AvatarInput'

export default class ProfileAvatar extends PureComponent {
	render() {		
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