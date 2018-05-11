import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import validationTypes from '../../../constants/ValidationTypes';
import { validate } from '../../../utility/InputValidator';

export default class EmailInput extends InputBase {
    render () {
        return <TextInput label='Email'
                          type='email'
                          validator={value => validate(validationTypes.email, value)}
                          name={fields.email}
                          {...this.props } />
    }
}