import React from 'react';
import InputBase, { TextArea } from './InputBase';
import fields from '../../../constants/FieldConstants';
import { validate } from '../../../utility/InputValidator';

export default class profileInformationText extends InputBase {
    render () {
        const { startValidation = false, placeholder = 'Some personal details you think other users may want to know', helperText='This information will be displayed on your profile page.'} = this.props;
        return <TextArea label='Profile Information'
                          type='text'
                          id='profileInformationText'
                          row={5}
                          placeholder={placeholder}
                          validator={value => startValidation ? validate('text', value) : startValidation}
                          validatorError="This field is required"
                          name={fields.profileInformationText}
                          helperText={helperText}
                          {...this.props } />
    }
}