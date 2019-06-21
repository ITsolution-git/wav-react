import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ButtonGroup } from 'react-bootstrap';

import { BaseComponent, SearchInput, Button } from '../../shared';

class ConsultControl extends BaseComponent {

    askButtonHandler = () => {
    }

    renderSortGroup = () => {
        const { sortTypes, selectedSort, onSelectSort } = this.props;

        return (
            <ButtonGroup className='sort-group'>
                {
                    sortTypes.map((sort, index) => (
                        <Button
                            key={index}
                            color='white'
                            size='medium'
                            onClick={() => onSelectSort(sort)}
                            className={classNames('sort-button', { 'sort-select': selectedSort === sort })}>
                            {sort}
                        </Button>
                    ))
                }
            </ButtonGroup>
        )
    }

    render() {
        const { searchString, onSearch } = this.props;

        return (
            <div className='btw-consult-control'>
                <SearchInput
                    noButton
                    placeholder='Search among 875 questions'
                    value={searchString}
                    onChange={onSearch}
                    className='search-input' />
                <div className='button-group'>
                    {this.renderSortGroup()}
                    <Button size='medium' onClick={this.askButtonHandler} className='ask-button'>
                        Ask Question
                    </Button>
                </div>

            </div>
        );
    }
}

ConsultControl.propTypes = {
    sortTypes: PropTypes.array,
    selectedSort: PropTypes.string,
    searchString: PropTypes.string,
    onSearch: PropTypes.func,
    onSelectSort: PropTypes.func
};

export default ConsultControl;