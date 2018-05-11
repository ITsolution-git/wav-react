import React from 'react';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

export default class InputBase extends InputBase {

}


export class TextInput extends InputBase {
    render = () => {
        const { value = '', onChange = () => {}, ...restProps } = this.props;
        return (
            <TextField
                {...restProps}
                value={value}
                onChange={onChange}
            />
        );
    };
}


export class Dropdown extends InputBase {
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
        const { label, onChange = () => {}, values = []} = this.props;

        return (
            <FormControl>
                <InputLabel classes={{ formControl: 'btw-dropdown'}}>{ label }</InputLabel>
                <Select
                    value={value}
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