import React from 'react';
import InputBase, { Dropdown } from './InputBase';
import { getAgeYears } from '../../../helpers/InputHelper';

export default class AgeInput extends InputBase {
    render () {
        return <Dropdown label='Date of Birth'
                         values={getAgeYears()}
                         { ...this.props } />
    }
}