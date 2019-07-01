import React from 'react';
import PropTypes from 'prop-types';
import SimpleAutoComplete from 'react-autocomplete';
import cn from 'classnames';

import colors from '../../constants/Colors';
import { BaseComponent } from './index';

class Autocomplete extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            defaultItem: {
                label: ''
            }
        };
    }

    onChange = e => {
        const value = e.target.value;
        const { defaultItem } = this.state;

        this.setState({ value });
        if (!value) {
            this.props.onSelect(defaultItem);
        }
    };

    onSelect = (value, item) => {
        this.setState({ value });
        this.props.onSelect(item);
    };

    getItemValue = item => item.label;

    renderInput = (props) => {
        const { inputClass } = this.props;
        return (
            <div className={cn('input-class', inputClass)}>
                <i className='fa fa-search' />
                <input {...props} />
            </div>
        )
    };

    renderItem = ({ id, label }, isHighlighted) => {
        return (
            <div key={id} className='item' style={{ background: isHighlighted ? colors.divider : colors.white }}>
                <div className='item-value'>{label}</div>
            </div>
        );
    };

    renderMenu = (items, value, style) => {
        return <div className='menu' style={{ ...style, ...this.menuStyle }} children={items} />
    };

    shouldItemRender = (item, value) => {
        return item.label.toLowerCase().indexOf(value.toLowerCase()) > -1;
    };

    render() {
        const { className, items } = this.props;
        const { value } = this.state;
        return (
            <div className={cn('btw-autocomplete', className)}>
                <SimpleAutoComplete
                    value={value}
                    items={items}
                    renderInput={this.renderInput}
                    getItemValue={this.getItemValue}
                    shouldItemRender={this.shouldItemRender}
                    renderMenu={this.renderMenu}
                    renderItem={this.renderItem}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                />
            </div>
        )
    }
}

Autocomplete.defaultProps = {
    inputClass: '',
    value: '',
    items: [],
    onSelect: () => { }
};

Autocomplete.propTypes = {
    // css class name for styling input text
    inputClass: PropTypes.string,
    // default value
    value: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    // array of items elements, each element is an object of { id, label }
    items: PropTypes.array.isRequired
};

export default Autocomplete;