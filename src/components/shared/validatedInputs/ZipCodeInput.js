import React from 'react';
import InputBase, { TextInput } from './InputBase';

export default class ZipCodeInput extends InputBase {
    render () {
        return <TextInput label='Zip code' type='text' {...this.props } />
    }
}