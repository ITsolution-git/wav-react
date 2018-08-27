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
                              <span>
                                  <span>At least one special character</span><br />
                                  <span>At least one number</span><br />
                                  <span>At lease one upper case character</span><br />
                                  <span>Minimum of 7 characters</span><br />
                              </span>
                          }
                          name={fields.password}
                          {...this.props } />
    }
}