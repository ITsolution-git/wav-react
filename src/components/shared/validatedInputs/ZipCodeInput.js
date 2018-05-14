import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import validationTypes from '../../../constants/ValidationTypes';
import { validate } from '../../../utility/InputValidator';

export default class ZipCodeInput extends InputBase {
    render () {
        return <TextInput label='Zip code'
                          type='text'
                          maxLength={5}
                          validator={value => validate(validationTypes.zip, value)}
                          validatorError='5 digits are required'
                          name={fields.zipCode}
                          {...this.props } />
    }
}