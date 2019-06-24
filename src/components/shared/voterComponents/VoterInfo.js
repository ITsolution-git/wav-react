/**
 * usage: <VoterInfo name='First Last' sex='Male' street='address street' keyword='' />
 */
import React from 'react'
import PropTypes from 'prop-types';

/**
 * Show voters info like first name, last name, sex, address
 * @param  {String} name : first and last name
 * @param  {String} sex : user's sex
 * @param  {String} street : user's address
 * @return {Component} 
 */
const VoterInfo = (props) => {
	const { name, sex, street, keyword } = props
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
				{`${sex} | ${street}`}
			</div>
		</>
	)
}

VoterInfo.propTypes = {
	/* voter's name */
	name: PropTypes.string.isRequired,
	/* voter's gender */
	sex: PropTypes.string.isRequired,
	/* voter's address */
	street: PropTypes.string.isRequired,
	/* keyword searched */
	keyword: PropTypes.string
}
VoterInfo.defaultProps = {
	name: '',
	sex: '',
	street: ''
}

export default VoterInfo;