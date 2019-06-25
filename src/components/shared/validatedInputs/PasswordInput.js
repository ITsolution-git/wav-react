import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import validationTypes from '../../../constants/ValidationTypes';
import { validate } from '../../../utility/InputValidator';

export default class PasswordInput extends InputBase {
    render () {
        return <TextInput label='Password'
                          type='password'
                          id='password'
                          validator={value => validate(validationTypes.password, value)}
                          validatorError={
                              <div className="btw-password-error">
                                  <div id="requirements">Your Password must be at least 7 characters with one special character and one upper case letter</div>
                              </div>
                          }
                          name={fields.password}
                          {...this.props } />
    }
}