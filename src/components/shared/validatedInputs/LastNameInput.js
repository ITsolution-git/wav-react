import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import { validate } from '../../../utility/InputValidator';

export default class LastNameInput extends InputBase {
    render() {
        const { startValidation, placeholder = 'Your last name' } = this.props;
        return <TextInput label='Last Name'
            type='text'
            id='lastname'
            placeholder={placeholder}
            validator={value => startValidation ? validate('name', value) : true}
            validatorError="Name must be at least 2 characters without number and special character"
            name={fields.lastName}
            {...this.props} />
    }
}