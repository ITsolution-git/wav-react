import React, { useState } from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Typography, ButtonLink } from '../index'

const LeftSideMenu = (props) => {
	const [ active , setActive ] = useState('Profile')
	const onMenuHanlder = menu => () => {
		setActive(menu)
		props.onSetActiveMenu(menu)
	}

	return (
		<div className='d-flex flex-column btw-setting-menu'>
			<div className='d-flex flex-column btw-setting-sub-menu'>
				<Typography variant='body' className={cn('h6', {'active': active === 'Profile'})} onClick={onMenuHanlder('Profile')}> Profile </Typography>
				<Typography variant='body' className={cn('h6', {'active': active === 'Password'})} onClick={onMenuHanlder('Password')}> Password </Typography>
				<Typography variant='body' className={cn('h6', {'active': active === 'Notification'})} onClick={onMenuHanlder('Notification')}> Notification </Typography>
			</div>
			<br />
			<ButtonLink onClick={props.onLogout} label='Log out'/>
		</div>
	)
}


LeftSideMenu.propTypes = {
	onSetActiveMenu: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired
}

export default LeftSideMenu