import React from 'react';
import InputBase, { Dropdown } from './InputBase';
import States from '../../../constants/States';

export default class StateInput extends InputBase {
    render () {
        return <Dropdown label='State'
                         values={ Object.keys(States)}
                         { ...this.props } />
    }
}