/**
 * usage: <VoterInfo name='First Last' gender='Male' street='address street' keyword='' />
 */
import React from 'react'
import PropTypes from 'prop-types';

/**
 * Show voters info like first name, last name, gender, address
 * @param  {String} name : first and last name
 * @param  {String} gender : user's gender
 * @param  {String} street : user's address
 * @return {Component} 
 */
const VoterInfo = (props) => {
	const { name, gender, street, keyword } = props
	let nameHtml = name
	if (keyword) {
		let regex = new RegExp(keyword, 'g')
		let matchString = name.match(regex)
		if (matchString)
			nameHtml = name.replace(regex, `<b>${matchString[0]}</b>`);
	}
	return (
		<>
		    <div className='name' dangerouslySetInnerHTML={{ __html: nameHtml }} />
		    <div className='description'>
		        {`${gender} | ${street}`}
		    </div>
		</>
	)
}

VoterInfo.propTypes = {
	name: PropTypes.string.isRequired,
	gender: PropTypes.string.isRequired,
	street: PropTypes.string.isRequired,
	keyword: PropTypes.string
}
VoterInfo.defaultProps = {
	name: '',
	gender: '',
	street: ''
}

export default VoterInfo;