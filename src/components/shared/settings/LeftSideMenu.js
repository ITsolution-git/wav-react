import React, { useState } from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Typography } from '../index'

const LeftSideMenu = (props) => {
	const [ active , setActive ] = useState('')
	const onMenuHanlder = menu => () => {
		setActive(menu)
		props.onSetActiveMenu(menu)
	}

	return (
		<div className='d-flex flex-column'>
			<Typography variant='body' className={cn('h6', {'font-weight-bold': active === 'Profile'})} onClick={onMenuHanlder('Profile')}> Profile </Typography>
			<Typography variant='body' className={cn('h6', {'font-weight-bold': active === 'Password'})} onClick={onMenuHanlder('Password')}> Password </Typography>
			<Typography variant='body' className={cn('h6', {'font-weight-bold': active === 'Notification'})} onClick={onMenuHanlder('Notification')}> Notification </Typography>
			<br />
			<Typography variant='body' className='h6' onClick={props.onLogout}> Log out </Typography>
		</div>
	)
}


LeftSideMenu.propTypes = {
	onSetActiveMenu: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired
}

export default LeftSideMenu