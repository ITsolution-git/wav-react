import React, { PureComponent, useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import cn from 'classnames'

import fields from '../../../constants/FieldConstants';
import profileImage from '../../../resources/icons/profile.png';
import AvatarInput from './AvatarInput'
import { Typography, RadioGroup, RadioOption, Icon } from '../index'
import { isMobileOnly } from '../../../helpers/DeviceHelper'

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

const DragDropImageUpload = (props) => {
	const inputEl = useRef(null);
	const wrapperEl = useRef(null);
	const [ drag, setDrag ] = useState(false)
	const [ files, setFiles ] = useState(null)

	const openFile = () => {
		inputEl.current.click();
	}

	const handleDrag = (e) => {
		e.preventDefault()
		e.stopPropagation()
		console.log(files)
	}

	const handleDragIn = (e) => {
		e.preventDefault()
		e.stopPropagation()
		// this.dragCounter++
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setDrag(true)
		}
	}

	const handleDragOut = (e) => {
	    e.preventDefault()
	    e.stopPropagation()
		setDrag(false)
	}

	const handleDrop = (e) => {
	    e.preventDefault()
	    e.stopPropagation()
	    setDrag(false)
	    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
	        setFiles(e.dataTransfer.files)
	        e.dataTransfer.clearData()
	    }
	}

	const onChangeFile = (e) => {
		setFiles(e.target.files)
	}

	useEffect(() => {
		const wrapperRef = wrapperEl.current

		if (wrapperRef) {
			wrapperRef.addEventListener('dragenter', handleDragIn)
		    wrapperRef.addEventListener('dragleave', handleDragOut)
		    wrapperRef.addEventListener('dragover', handleDrag)
		    wrapperRef.addEventListener('drop', handleDrop)
		}
		return () => {
			wrapperRef.removeEventListener('dragenter', handleDragIn)
		    wrapperRef.removeEventListener('dragleave', handleDragOut)
		    wrapperRef.removeEventListener('dragover', handleDrag)
		    wrapperRef.removeEventListener('drop', handleDrop)
		}
	})
	return (
		<div className={cn('btw-dnd-upload', {'dragging': drag})} ref={wrapperEl} onClick={isMobileOnly && openFile}>
			<input type='file' className='d-none' ref={inputEl} onChange={onChangeFile} />
			{isMobileOnly ?
				<>
					<Icon name='upload' ext='svg' size='34' />
					<Typography variant='body'>Upload Photo</Typography>		
				</>
			:
				<Typography variant='body'>Drag an image here or <span onClick={openFile}>browse</span> for an image to upload</Typography>
			}
		</div>
	)
}

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
								<DragDropImageUpload />
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