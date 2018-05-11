import React from 'react';
import InputBase, { TextInput } from './InputBase';

export default class PhoneInput extends InputBase {
    render () {
        return <TextInput label='Phone' type='phone' {...this.props } />
    }
}