import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavDropdown } from 'react-bootstrap';

import { Icon } from '../shared';

/**
 * Profile title on header bar
 * @param  {name: String, level: string, size: number}
 * @return {Avatar and description (name and level) of Profile}
 */
const ProfileTitle = (props) => {
	return (
		<div className='d-flex'>
			<Icon name='profile' width={props.size} height={props.size} />
			<div className='d-flex flex-column btw-avatar-title'>
				<h6 className='btw-avatar-name'>{props.name}</h6>
				<h6 className='btw-avatar-level'>Level: {props.level}</h6>
			</div>
		</div>
	)
}

ProfileTitle.propTypes = {
	name: PropTypes.string.isRequired,
	level: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
}

ProfileTitle.defaultProps = {
	name: '',
	level: ''
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
		<Nav className='justify-content-end'>
		    <NavDropdown 
		        title={<ProfileTitle {...data} />}
		        className='btw-nav-dropdown'
		        id='nav-dropdown'>
		        <NavDropdown.Item eventKey={1.3} onClick={() => props.btwLogout()}>Sign Out</NavDropdown.Item>
		    </NavDropdown>                
		</Nav>
	)
}

ProfileDropdown.propTypes = {
	firstname: PropTypes.string.isRequired,
	lastname: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
	btwLogout: PropTypes.func.isRequired,
	isMobile: PropTypes.func.isRequired,
}

ProfileDropdown.defaultProps = {
	firstname: '',
	lastname: '',
	role: ''
}

export default ProfileDropdown