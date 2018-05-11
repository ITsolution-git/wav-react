import React from 'react';
import InputBase, { Dropdown } from './InputBase';
import fields from '../../../constants/FieldConstants';

export default class GenderInput extends InputBase {
    render () {
        return <Dropdown label='Gender'
                         name={fields.gender}
                         values={['Male', 'Female']}
                         { ...this.props } />
    }
}