import React from 'react';
import TextField from 'material-ui/TextField';

import InputBase from './InputBase';

export default class InputText extends InputBase {
    render() {
        const { value = '', ...restProps } = this.props;
        return (
            <TextField
                {...restProps}
                value={value}
                onChange={this.handleChange}
            />
        );
    }
}
