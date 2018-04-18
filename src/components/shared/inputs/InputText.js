import React from 'react';
import Input from 'material-ui/Input';

import InputBase from './InputBase';

export default class InputText extends InputBase {
    render() {
        const { value = '', ...restProps } = this.props;
        return (
            <Input
                {...restProps}
                value={value}
                onChange={this.handleChange}
            />
        );
    }
}
