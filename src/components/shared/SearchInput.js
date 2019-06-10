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
        const { value } = event.target;

        this.setState({ value: value });
        this.isMobile() && this.props.onChange(value);
    }

    clickHandler = () => {
        this.props.onChange(this.state.value);
    }

    clearHandler = () => {
        this.setState({ value: '' });
        this.isMobile() && this.props.onChange('');
    }

    iconRender = () => {
        const isValue = this.state.value !== '';

        if (this.isMobile()) {
            return (
                <i className={classNames('fa', isValue ? 'fa-close' : 'fa-search')} onClick={this.clearHandler} />
            );
        } else {
            return (
                <i className={classNames('fa fa-search', isValue && 'i-active')} />
            );
        }
    }

    render() {
        const { placeholder } = this.props;
        const { value } = this.state;
        const isValue = value !== '';

        return (
            <div className={classNames('btw-search-input', this.isDesktop() ? 'left-addon' : 'right-addon')}>
                {this.iconRender()}
                <input
                    type='text'
                    className='btw-paper'
                    placeholder={placeholder}
                    name='search'
                    value={value}
                    onChange={this.inputHandler} />
                <button
                    type='button'
                    className={classNames('btw-paper', isValue && 'active-button')}
                    onClick={this.clickHandler}>
                    Search
                </button>
            </div >
        );
    }
}

export default SearchInput;
