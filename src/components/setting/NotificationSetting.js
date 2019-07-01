import React from 'react'
import PropTypes from 'prop-types'

import { 
	Typography, 
	SwitchButton
} from '../shared';

const NotificationSetting = (props) => {
	const onSwitchHandler = () => {
		props.onChange()
	}
	return (
		<div className='d-flex flex-column px-md-5 notify'>
			<Typography variant='body'> We want you to stay updated at all times, so we kindly recommend you to turn notifications on. We won’t spam you – only inform on the most important updates and your profile activity. </Typography>
			<div className='d-flex align-items-center mt-4'>
				<SwitchButton onSwitch={onSwitchHandler} checked={true} /> <span className='ml-2'>Enable email notifications</span>
			</div>
		</div>
	)
}

NotificationSetting.propTypes = {
	onChange: PropTypes.func.isRequired
}

NotificationSetting.defaultProps = {
	onChange: e => {}
}

export default NotificationSetting