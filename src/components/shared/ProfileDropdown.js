import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

import { Icon } from '../shared';
import coinImage from '../../resources/images/coin.png';
/**
 * Profile title on header bar
 * @param  {name: String, level: string, size: number}
 * @return {Avatar and description (name and level) of Profile}
 */
const ProfileTitle = (props) => {
	return (
		<div className='d-flex'>			
			{props.src ? 
				<img className='rounded-circle' src={props.src} width={props.size} height={props.size} alt=""/>
				: <Icon name='profile' width={props.size} height={props.size} />
			}
			{props.detail && 
				<div className='d-flex flex-column justify-content-center btw-avatar-title ml-2'>
					<h6 className='btw-avatar-name'>{props.name}</h6>
					<h6 className='btw-avatar-email'>{props.email}</h6>
				</div>
			}
		</div>
	)
}

ProfileTitle.propTypes = {
	src: PropTypes.string,
	detail: PropTypes.bool,
	name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
}

ProfileTitle.defaultProps = {
	src: '',
	name: '',
	email: '',
	detail: false
}

/**
 * Show profile's level and coins in dropdow menu on header
 * @param  String level	: user's level
 * @param  Number coin	: user's coin number
 */
const ProfileLevel = (props) => {
	return (
		<div className='d-flex flex-column btw-profile-level'>
			<div className='mb-3'>
				<h6 className='level-caption'>Current Level:</h6>
				<h6 className='level-value'>{props.level}</h6>
			</div>
			<div>
				<h6 className='level-caption'>Points balance:</h6>
				<h6 className='level-value'><img src={coinImage} alt=""/>{props.coin}</h6>
			</div>
		</div>
	)
}
ProfileLevel.propTypes = {
	level: PropTypes.string.isRequired,
	coin: PropTypes.number.isRequired,
}
ProfileLevel.defaultProps = {
	level: 'Captain',
	coin: 0
}

/**
 * Profile Dropdown on Header bar
 * @param  {profile info, handle actions (Please check prop-types)}
 * @return {Profile dropdown component}
 */
const ProfileDropdown = (props) => {
	const size = props.isMobile() ? '50px' : '40px';
	const name = `${props.firstname} ${props.lastname}`
	const level = props.role
	const data = {size, name, level}
	return (
		<div className='justify-content-end'>
		    <Dropdown 
		    	alignRight
		        className='btw-nav-dropdown'
		        id='nav-dropdown'>
		        <Dropdown.Toggle id="dropdown-basic">
		        	<Icon className='menu-icon' name='menu' ext='svg' width={22} height={22} />
		            <div className='menu-profile'><ProfileTitle {...data} /></div>
	          	</Dropdown.Toggle>

	          	<Dropdown.Menu>
			        <Dropdown.Item eventKey={1.1}>
			        	<ProfileTitle {...data} detail={true} />
			        </Dropdown.Item>
			        <Dropdown.Divider />
			        <Dropdown.Item eventKey={1.2}>
			        	<ProfileLevel {...data} />
			        </Dropdown.Item>
			        <Dropdown.Divider />
			        <Dropdown.Item eventKey={1.3} onClick={() => props.btwSettings()}>
			        	<Icon className='menu-icon' name='settings' ext='svg' width={15} height={15} />Account Settings
		        	</Dropdown.Item>
			        <Dropdown.Item eventKey={1.4} onClick={() => props.btwLogout()}>
			        	<Icon className='menu-icon' name='logout' ext='svg' width={15} height={15} />Log Out
		        	</Dropdown.Item>
		        </Dropdown.Menu>
		    </Dropdown>                
		</div>
	)
}

ProfileDropdown.propTypes = {
	firstname: PropTypes.string.isRequired,
	lastname: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
	btwLogout: PropTypes.func.isRequired,
	btwSettings: PropTypes.func.isRequired,
	isMobile: PropTypes.func.isRequired,
}

ProfileDropdown.defaultProps = {
	firstname: '',
	lastname: '',
	role: ''
}

export default ProfileDropdown