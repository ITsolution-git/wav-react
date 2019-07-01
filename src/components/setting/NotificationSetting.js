import React from 'react'
import PropTypes from 'prop-types'

import { 
	Typography, 
	Checkbox
} from '../shared';

const NotificationSetting = (props) => {
	return (
		<div className='d-flex flex-column px-5'>
			<Typography variant='body'> We want you to stay updated at all times, so we kindly recommend you to turn notifications on. We won’t spam you – only inform on the most important updates and your profile activity. </Typography>
			<Checkbox label='Enable email notifications' className='mt-4' checked onChange={props.onChange}/>
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