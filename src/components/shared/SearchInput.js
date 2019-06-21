import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BaseComponent, Button } from '../shared';

class SearchInput extends BaseComponent {

    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    componentWillReceiveProps(props) {
        if (props.value) {
            this.setState({ value: props.value });
        }
    }

    inputHandler = (event) => {
        const { value } = event.target;
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value)
    }

    clickHandler = () => {
        this.props.onChange(this.state.value);
    }

    clearHandler = () => {
        this.setState({ value: '' });
        if (this.isMobile()) {
            this.props.onChange('');
        }
    }

    renderIcon = () => {
        const isValue = !!this.state.value;

        return this.isMobile() ?
            <i className={classNames('fa', isValue ? 'fa-close' : 'fa-search')} onClick={this.clearHandler} /> :
            <i className={classNames('fa fa-search', { 'i-active': isValue })} />
    }

    render() {
        const { placeholder, className } = this.props;
        const { value } = this.state;
        const isValue = !!value;

        return (
            <div className={classNames('btw-search-input', this.isDesktop() ? 'left-addon' : 'right-addon', className)}>
                {this.renderIcon()}
                <input
                    type='text'
                    className={classNames({ 'btw-search-focus': isValue })}
                    placeholder={placeholder}
                    name='search'
                    value={value}
                    onChange={this.inputHandler}
                />
                < Button
                    type='button'
                    className='search-button'
                    onClick={this.clickHandler}
                    disabled={!isValue}>
                    Search
                </Button>
            </div >
        );
    }
}

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    noButton: PropTypes.bool,
    onChange: PropTypes.func
};

SearchInput.defaultProps = {
    noButton: false
}

export default SearchInput;
