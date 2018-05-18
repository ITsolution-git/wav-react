import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import validationTypes from '../../../constants/ValidationTypes';
import { validate } from '../../../utility/InputValidator';

export default class DateOfBirthInput extends InputBase {

    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue
        }
    }

    handleChange = (value, isValid, name) => {
        const { onChange } = this.props

        if (value.length === 2 || value.length === 5) {
            if (this.state.value.length < value.length) {
                value += '/'
            }
        }

        this.setState({value})
        onChange(value, isValid, name)
    }

    render () {
        return <TextInput label='Date of Birth'
                          placeholder='mm/dd/yyyy'
                          validator={value => validate(validationTypes.datetime, value)}
                          name={fields.dateOfBirth}
                          defaultValue={this.state.value}
                          { ...this.props }
                          onChange={this.handleChange} />
    }
}