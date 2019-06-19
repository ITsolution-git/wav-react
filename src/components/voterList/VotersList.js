import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { SearchInput, VoterCardView } from '../shared'

const list = [{
        id: 1,
        name: 'Denis Damin 1',
        first: 'Denis',
        last: 'Damin',
        street: 'New work Sr. 1289',
        gender: 'Male',
        social: {
            twitter: false,
            linkedIn: false,
            facebook: true
        },
        status: 'Infrequent'
    },
    {
        id: 2,
        name: 'Denis Damin 2',
        first: 'Denis',
        last: 'Damin',
        street: 'New work Sr. 1289',
        gender: 'Female',
        social: {
            twitter: true,
            linkedIn: true,
            facebook: true
        },
        status: 'Regular'
    },
    {
        id: 3,
        name: 'Denis Damin 3',
        first: 'Denis',
        last: 'Damin',
        street: 'New work Sr. 1289',
        gender: 'Female',
        social: {
            twitter: true,
            linkedIn: true,
            facebook: true
        },
        status: 'Not registered'
    }]

/**
 * Show status string for result searched
 * @return {Status Component}
 */
const StatusBar = (props) => {
	const { isShow, count, keyword } = props
	if (!isShow || !keyword) return ''
	return (
		<div className='mb-4'>
			We found {count} results for '{keyword}'
		</div>
	)
}
StatusBar.propTypes = {
	isShow: PropTypes.bool.isRequired,
	count: PropTypes.number.isRequired,
	keyword: PropTypes.string.isRequired
}
StatusBar.defaultProps = {
	isShow: false,
	count: 0,
	keyword: ''
}

/**
 * Voters List
 * @param  {Array} list: voters list
 * @return {Component}
 */
const VotersList = (props) => {
	const { list, keyword } = props
	console.log(keyword)
	return (
		<div className='btw-voter-list mt-5'>
			<StatusBar isShow={true} count={3} keyword={keyword} />
			{list.map((item, key) => <VoterCardView key={key} data={item} keyword={keyword} />)}
		</div>
	)
}
VotersList.propTypes = {
	list: PropTypes.array.isRequired,
	keyword: PropTypes.string
}
VotersList.defaultProps = {
	list: []
}

/**
 * Voters list view with search input box
 * @param  {Array} list : voters list
 */
const VotersListView = (props) => {
	const [keyword, setKeyword] = useState('')
	const searchInputHandler = value => setKeyword(value)
	// const { list } = props
	return (
		<div className='btw-voter-list-view'>
			<SearchInput
                placeholder='Search by name or address'
                onChange={searchInputHandler}/>
			<VotersList list={list} keyword={keyword} />
		</div>
	)
}
VotersListView.propTypes = {
	list: PropTypes.array.isRequired,
}
VotersListView.defaultProps = {
	list: []
}

export default VotersListView;