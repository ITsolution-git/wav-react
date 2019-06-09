import React from 'react';
import classNames from 'classnames';

import BaseComponent from './BaseComponent';

class SearchInput extends BaseComponent {

    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    inputHandler = (event) => {
        const { onChange } = this.props;
        const { value } = event.target;

        this.setState({ value: value });
        onChange(value);
    }

    clickHandler = () => {
        const { onChange } = this.props;
        onChange(this.state.value);
    }

    render() {
        const { placeholder } = this.props;
        const isValue = this.state.value !== '';

        return (
            <div className='btw-search-input'>
                <input
                    type='text'
                    className='btw-paper'
                    placeholder={placeholder}
                    name='search'
                    onChange={this.inputHandler} />
                <button
                    type='button'
                    className={classNames('btw-paper', isValue && 'active-button')}
                    onClick={this.clickHandler}>
                    Search
                </button>
            </div>
        );
    }
}

export default SearchInput;
