import React from 'react';
import InputBase, { TextInput } from './InputBase';

export default class EmailInput extends TextInput {
    render () {
        return <TextInput label='Email' type='email' {...this.props } />
    }
}