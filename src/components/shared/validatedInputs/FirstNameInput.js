import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import { validate } from '../../../utility/InputValidator';

export default class FirstNameInput extends InputBase {
    render () {
        const { startValidation, placeholder = 'Your first name' } = this.props;
        return <TextInput label='First Name'
                          type='text'
                          id='firstname'
                          placeholder={placeholder}
                          validator={value => startValidation ? validate('text', value) : true }
                          validatorError="Minimum of two characters required"
                          name={fields.firstName}
                          {...this.props } />
    }
}