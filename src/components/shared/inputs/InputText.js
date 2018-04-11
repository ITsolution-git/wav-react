import React from 'react';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';

import InputBase from './InputBase';

export default class InputText extends InputBase {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: null
        }
    }

    render() {
        const { label = '' } = this.props;
        return (
            <div>
                <FormControl>
                    <TextField
                        label={label}
                        value={this.state.value}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                </FormControl>
            </div>
        );
    }
}
