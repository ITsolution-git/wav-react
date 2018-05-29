import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';

export default class UsernameInput extends InputBase {
    render () {
        return <TextInput label='Username'
                          type='text'
                          name={fields.username}
                          {...this.props } />
    }
}