import React from 'react';
import InputBase, { Dropdown } from './InputBase';
import States from '../../../constants/States';
import fields from '../../../constants/FieldConstants';

export default class StateInput extends InputBase {
    render () {
        return <Dropdown label='State' id="state"
                         values={ Object.keys(States)}
                         name={fields.state}
                         { ...this.props } />
    }
}