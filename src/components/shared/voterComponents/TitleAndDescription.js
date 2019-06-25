import React from 'react'
import PropTypes from 'prop-types';
import { Typography } from '../index';

const TitleAndDescription = (props) => (
	<div className='d-flex flex-column'>
		<Typography className=''>
		    {props.title}
		</Typography>
		<Typography className='' variant='body'>
		    {props.description1}
		</Typography>
		<br/>
		<Typography className='' variant='body'>
		    {props.description2}
		</Typography>
	</div>
)

TitleAndDescription.propTypes = {
    title: PropTypes.string.isRequired,
    description1: PropTypes.string,
    description2: PropTypes.string,
};

TitleAndDescription.defaultProps = {
	title: '',
	description1: '',
	description2: ''
}

export default TitleAndDescription