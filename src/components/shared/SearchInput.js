import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseComponent from './BaseComponent';
import Button from './Button';

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
        const isEmpty = value === '';

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
                <Button
                    type='button'
                    className='btw-paper search-button'
                    onClick={this.clickHandler}
                    disabled={isEmpty}>
                    Search
                </Button>
            </div >
        );
    }
}

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchInput;
