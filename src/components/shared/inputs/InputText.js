import React from 'react';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';

import InputBase from './InputBase';

export default class InputText extends InputBase {
    render() {
        const { label = '',  value = '', type } = this.props;
        return (
            <div>
                <FormControl>
                    <TextField
                        type={type}
                        label={label}
                        value={value}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                </FormControl>
            </div>
        );
    }
}
