import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import filterLinks from '../../constants/VoterFilters'
import { Button, Icon } from '../shared';
import { isMobileOnly } from '../../helpers/DeviceHelper'

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
	const [activeItem, setActiveItem] = useState(filterLinks(isMobileOnly)[0].name)
	const onClickItem = (filter) => event => {
		setActiveItem(filter)
		if (props.onSelectFilter) props.onSelectFilter(filter)
	}

	return (
		<div className='d-flex justify-content-center'>
			{filterLinks(isMobileOnly).map((item, key) =>
				<Item
					key={key}
					filter={item}
					activeItem={activeItem}
					onClickItem={onClickItem}
					{...props}
				/>
			)}
		</div>
	)
}

const FilterBar = (props) => {
	const { onSelectFilter, onGototAddVoter } = props
	return (
		<div className='btw-voter-filter'>
			<Button size='medium' className='btw-voter-add-btn' onClick={onGototAddVoter}>
				<Icon name='plus-white' width={15} className='mr-3' />Add Voters
			</Button>
			<Col>
				<FilterItems onSelectFilter={onSelectFilter} />
			</Col>
		</div>
	)
}
FilterBar.propTypes = {
	onSelectFilter: PropTypes.func.isRequired,
	onGototAddVoter: PropTypes.func.isRequired
}

export default FilterBar;