import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import { Typography, Icon } from '../index'
import { isMobileOnly } from '../../../helpers/DeviceHelper'

const DragDropImageUpload = (props) => {
	let dropzoneRef;
	const openFile = (event) => {
		dropzoneRef.open();
	}

	return (
		<div className='btw-dnd-upload'>
			<Dropzone 
				disableClick
				ref={(node) => { dropzoneRef = node; }} 
				style={{position: "relative"}} 
				onDrop={acceptedFiles => props.onChange(acceptedFiles)}>
				{isMobileOnly ?
					<>
						<Icon name='upload' ext='svg' size='34' />
						<Typography variant='body'>Upload Photo</Typography>		
					</>
				:
					<Typography variant='body'>Drag an image here or <span onClick={openFile}>browse</span> for an image to upload</Typography>
				}
			</Dropzone>
		</div>				
	)
}

DragDropImageUpload.propTypes = {
	onChange: PropTypes.func.isRequired
}

DragDropImageUpload.defaultProps = {
	
}

export default DragDropImageUpload