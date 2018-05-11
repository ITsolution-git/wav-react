import React from 'react';
import InputBase, { Dropdown } from './InputBase';
import { getAgeYears } from '../../../helpers/InputHelper';
import fields from '../../../constants/FieldConstants';

export default class AgeInput extends InputBase {
    render () {
        return <Dropdown label='Date of Birth'
                         name={fields.age}
                         values={getAgeYears()}
                         { ...this.props } />
    }
}