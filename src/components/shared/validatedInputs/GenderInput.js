import React from 'react';
import InputBase, { Dropdown } from './InputBase';

export default class GenderInput extends InputBase {
    render () {
        return <Dropdown label='Gender'
                         values={['Male', 'Female']}
                         { ...this.props } />
    }
}