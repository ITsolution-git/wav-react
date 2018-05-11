import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import { validate } from '../../../utility/InputValidator';

export default class LastNameInput extends InputBase {
    render () {
        return <TextInput label='Last Name'
                          type='text'
                          validator={value => validate('text', value)}
                          name={fields.lastName}
                          {...this.props } />
    }
}