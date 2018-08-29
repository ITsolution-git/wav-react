import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';

export default class CityInput extends InputBase {
    render () {
        return <TextInput label='City'
                          type='text'
                          id="city"
                          name={fields.city}
                          {...this.props } />
    }
}