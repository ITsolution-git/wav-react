import React from 'react';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import BaseComponent from '../../shared/BaseComponent';

export default class InputBase extends BaseComponent {
    baseState = {
        value: ''
    };
}


export class TextInput extends InputBase {
    state = this.baseState;

    render = () => {
        const { onChange = () => {}, label, required, ...restProps } = this.props;
        return (
            <TextField
                label={`${label} ${ required && '*' || ''} `}
                {...restProps}
                value={this.state.value}
                onChange={onChange}
            />
        );
    };
}


export class Dropdown extends InputBase {
    state = this.baseState;

    mapItem = (item) => {
        if (typeof item === 'string') {
            return {
                label: item,
                value: item
            }
        }
        return item;
    };

    render = () => {
        const { label, required, onChange = () => {}, values = []} = this.props;

        return (
            <FormControl className='btw-validated-dropdown'>
                <InputLabel>{`${label} ${ required && '*' || ''}`}</InputLabel>
                <Select
                    value={this.state.value}
                    onChange={onChange}>
                    { values.map(this.mapItem).map((item, index) => {
                        return (
                            <MenuItem key={index} value={item.value}>{ item.label}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        );
    };
}