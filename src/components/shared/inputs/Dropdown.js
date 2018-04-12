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
            <div style={{ height: '100px', width: '100px'}}>
                <FormControl>
                    <InputLabel classes={{ formControl: 'btw-dropdown'}}>{ label }</InputLabel>
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
            </div>
        );
    }
}