import React, { useState } from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Typography, ButtonLink } from '../index'
import { isDesktop } from '../../../helpers/DeviceHelper'

const LeftSideMenu = (props) => {
	const [active, setActive] = useState('Profile')
	const onMenuHanlder = menu => () => {
		setActive(menu)
		props.onSetActiveMenu(menu)
	}

	return (
		<div className={cn('d-flex btw-setting-menu', { 'flex-column': isDesktop })}>
			<div className={cn('d-flex btw-setting-sub-menu', { 'flex-column': isDesktop })}>
				<Typography variant='body' fontWeight='700' className={cn('h6', { 'active': active === 'Profile' })} onClick={onMenuHanlder('Profile')}> Profile </Typography>
				<Typography variant='body' fontWeight='700' className={cn('h6', { 'active': active === 'Password' })} onClick={onMenuHanlder('Password')}> Password </Typography>
				<Typography variant='body' fontWeight='700' className={cn('h6', { 'active': active === 'Notification' })} onClick={onMenuHanlder('Notification')}> Notification </Typography>
			</div>
			<br />
			<ButtonLink onClick={props.onLogout} label='Log out' className='logout-button' />
		</div>
	)
}


LeftSideMenu.propTypes = {
	onSetActiveMenu: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired
}

export default LeftSideMenu