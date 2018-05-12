import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';

export default class AddressInput extends InputBase {
    render () {
        return <TextInput label='Address'
                          type='text'
                          name={fields.address}
                          {...this.props } />
    }
}