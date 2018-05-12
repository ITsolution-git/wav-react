import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import validationTypes from '../../../constants/ValidationTypes';
import { validate } from '../../../utility/InputValidator';

export default class DateOfBirthInput extends InputBase {
    render () {
        return <TextInput label='Date of Birth'
                          placeholder='mm/dd/yyyy'
                          validator={value => validate(validationTypes.datetime, value)}
                          name={fields.dateOfBirth}
                          { ...this.props } />
    }
}