import React from 'react'
import cn from 'classnames'

import profileImage from '../../../resources/icons/profile.png';
import BaseComponent from '../../shared/BaseComponent';

class AvatarInput extends BaseComponent {
	state = {
		isValid: true,
		imageSrc: '',
		error: ''
	}

	componentWillReceiveProps(props) {
		if (props.startValidation && props.startValidation !== this.props.startValidation) {
			this.setState({ isValid: false, error: props.errorMessage })
		}
	}

	onButtonHandler = event => {
		this.refs.fileElement.click()
	}

	onInputHandler = event => {
		const { files } = event.target;
		if (files.length) {
			this.setState({ imageSrc: URL.createObjectURL(files[0]) })
		    this.props.onChange(files[0], this.state.isValid, this.props.name);
		} else if (this.props.required) {
			this.setState({ isValid: false, error: this.props.errorMessage })			
		}
	}

	render () {
		const {
			label,
			className,
			disabled,
			src = profileImage,
			id = 'imageAvatar',
		} = this.props

		const {
			isValid,
			error,
			imageSrc,
		} = this.state

		return (
				<div className={cn('btw-input', { disabled, error: !isValid }, className)}>
				    <label htmlFor={id}>{ label }</label>
				    <div className='d-flex align-items-center'>
				    	<img className='rounded-circle' src={imageSrc || src} width={50} height={50} alt=""/>
				    	<button className='ml-5 photo-button' onClick={this.onButtonHandler}>Update Photo</button>
				        <input 
				        	ref='fileElement'
			               id={id}
			               type='file'
			               className='d-none'	               
			               onChange={this.onInputHandler}
			               disabled={disabled} />
				    </div>
				    <div className='error-msg'>
				        { error }
				    </div>
				</div>
		)
	}
}
export default AvatarInput