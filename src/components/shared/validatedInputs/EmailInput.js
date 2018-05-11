import React from 'react';
import InputBase, { TextInput } from './InputBase';

export default class EmailInput extends InputBase {
    render () {
        return <TextInput label='Email' type='email' {...this.props } />
    }
}