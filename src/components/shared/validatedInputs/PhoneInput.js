import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import validationTypes from '../../../constants/ValidationTypes';
import { validate } from '../../../utility/InputValidator';

export default class PhoneInput extends InputBase {
    render () {
        return <TextInput label='Phone'
                          type='phone'
                          maxLength={11}
                          validator={value => validate(validationTypes.phone, value)}
                          validatorError='10~11 digits are required'
                          name={fields.phone}
                          {...this.props } />
    }
}