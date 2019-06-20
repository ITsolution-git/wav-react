import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import classNames from 'classnames';

import { FilterLinks } from '../../constants'
import { Button, Icon } from '../shared';
const Item = (props) => {
	const { filter, activeItem, onClickItem } = props

	return (
		<div
			onClick={onClickItem(filter.name)}
			className={classNames('btw-voter-filter-item', { 'active-item': filter.name === activeItem })}>
			{filter.label}
		</div>
	)
}

const FilterItems = (props) => {
	const [ activeItem, setActiveItem ] = useState(FilterLinks[0].name)
	const onClickItem = (filter) => event => setActiveItem(filter)

	return (
		<div className='d-flex justify-content-center'>
			{FilterLinks.map((item, key) => <Item key={key} filter={item} activeItem={activeItem} onClickItem={onClickItem} {...props} />)}
		</div>
	)
}

const FilterBar = (props) => {
	return (
		<div className='btw-voter-filter mb-5'>
			<Button size='medium' className='btw-voter-add-btn' onClick={() => {}}>
				<Icon name='plus-white' width={15} className='mr-3' />Add Voters
			</Button>
			<Col>
				<FilterItems />
			</Col>
		</div>
	)
}

export default FilterBar;