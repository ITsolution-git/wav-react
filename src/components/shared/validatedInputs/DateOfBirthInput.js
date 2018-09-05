import React from 'react';
import InputBase, { Dropdown } from './InputBase';
import fields from '../../../constants/FieldConstants';

export default class DateOfBirthInput extends InputBase {
    getValues = () => {
        const currentYear = (new Date()).getFullYear();
        return Array.from(Array(100).keys()).map(el => (currentYear - el).toString());
    };

    render () {
        return <Dropdown label='Birthday'
                         values={ this.getValues() }
                          name={fields.dateOfBirth}
                          { ...this.props } />
    }
}
