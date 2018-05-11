import React from 'react';
import InputBase, { TextInput } from './InputBase';

export default class LastNameInput extends InputBase {
    render () {
        return <TextInput label='Last Name' type='text' {...this.props } />
    }
}