import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import { validate } from '../../../utility/InputValidator';

export default class FirstNameInput extends InputBase {
    render () {
        return <TextInput label='First Name'
                          type='text'
                          validator={value => validate('text', value)}
                          name={fields.firstName}
                          {...this.props } />
    }
}