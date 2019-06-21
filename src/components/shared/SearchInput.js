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
        const { noButton } = this.props;
        const isValue = !!this.state.value;

        return (this.isMobile() || noButton) ?
            <i className={classNames('fa', isValue ? 'fa-close' : 'fa-search')} onClick={this.clearHandler} /> :
            <i className={classNames('fa fa-search', { 'i-active': isValue })} />
    }

    renderSearchButton = () => {
        const { noButton } = this.props;
        const { value } = this.state;

        if (!noButton) {
            return (
                <Button type='button' className='search-button' onClick={this.clickHandler} disabled={!value}>
                    Search
                </Button>
            );
        }
    }

    render() {
        const { placeholder, noButton, className } = this.props;
        const { value } = this.state;

        return (
            <div className={classNames('btw-search-input', { 'btw-search-no-button': noButton }, className)}>
                {this.renderIcon()}
                <input
                    type='text'
                    className={classNames({ 'btw-search-focus': !!value })}
                    placeholder={placeholder}
                    name='search'
                    value={value}
                    onChange={this.inputHandler}
                />
                {this.renderSearchButton()}
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
