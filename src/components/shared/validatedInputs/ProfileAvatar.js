import React, { PureComponent } from 'react'
import { Row, Col } from 'react-bootstrap'

import fields from '../../../constants/FieldConstants';
import profileImage from '../../../resources/icons/profile.png';
import AvatarInput from './AvatarInput'
import { Typography, DragDropImageUpload, ProfileAvatarOption } from '../index'

export default class ProfileAvatar extends PureComponent {
	state = {
		showOption: false,
		option: ''
	}

	onOptionChange = (option) => {
		this.setState({ option })
	}

	onUpdateAvatar = () => {
		this.setState({ showOption: true })
	}

	onCancel = () => {
		this.setState({ showOption: false })	
	}

	onChangeUpload = (file) => {
		if (this.props.onChangeUploadImage)
			this.props.onChangeUploadImage(file)
	}

	render() {
		const { showOption, option } = this.state

		if (showOption)
			return (
				<div className="d-flex flex-column btw-input">
					<label>Profile Picture</label>
					<Row className='no-gutters'>
						<Col md='2' className='p-md-0 mb-4'>
							<img className='btw-voter-img' src={profileImage} width={50} height={50} alt="" />
						</Col>
						<Col md='8' className=' mb-4'>
							<ProfileAvatarOption onOptionChange={this.onOptionChange}/>
						</Col>
						<Col md='2' className='p-md-0  mb-4'>
							<Typography className='avatar-cancel' onClick={this.onCancel}>Cancel</Typography>
						</Col>
					</Row>
					{option === 'upload' && 
						<Row className='no-gutters'>
							<Col md='2' />
							<Col md='10'>
								<DragDropImageUpload onChange={this.onChangeUpload} />
							</Col>
						</Row>
					}
				</div>
			)
		return (
			<AvatarInput 
				label='Profile Picture'
				name={fields.profileAvatar}
				onUpdateAvatar={this.onUpdateAvatar}
				id={fields.profileAvatar}
				{...this.props}
			/>
		)
	}
}