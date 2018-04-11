import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import InputBase from './InputBase';

export default class Dropdown extends InputBase {

    render() {
        const { values = [], label = '', value = '' } = this.props;
        return (
            <FormControl>
                <InputLabel>{ label }</InputLabel>
                <Select
                    value={value}
                    onChange={this.handleChange}>
                    { values.map(this.mapItem).map((item, index) => {
                        return (
                            <MenuItem key={index} value={item.value}>{ item.label}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        );
    }
}