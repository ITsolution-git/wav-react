import React from 'react';
import InputBase, { TextInput } from './InputBase';

export default class FirstNameInput extends InputBase {
    render () {
        return <TextInput label='First Name' type='text' {...this.props } />
    }
}