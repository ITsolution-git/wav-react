import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import BaseComponent from '../../shared/BaseComponent';

export default class InputBase extends BaseComponent {
    baseState = {
        value: '',
        isValid: true,
        error: ''
    };

    onChange = (e) => {
        const { value } = e.target;
        this.setState(({ value }), () => {
            if (!this.state.isValid) {
                this.validate();
                return;
            }
            this.onParentChange();
        });
    };

    onFocusOut = () => {
      this.validate();
    };

    onParentChange = () => {
        const { onChange, name } = this.props;
        const { value, isValid } = this.state;
        onChange(value, isValid, name);
    };

    validate = (props = this.props) => {
        let error = '';
        const { value } = this.state;
        const {
            label,
            validator,
            customError,
            validatorError,
            required
        } = props;

        if (required && !value) {
            error = `${label} is required`;
        }
        if (validator && value && !validator(value)) {
            error = validatorError || `${label} is incorrect`;
        }
        if (customError) {
            error = customError;
        }
        this.setState(() => ({ error, isValid: !error }), this.onParentChange);
    };

    checkForValidation = (props) => {
        const { customError, startValidation } = props;
        if (this.props.customError === customError && this.props.startValidation === startValidation) {
            return;
        }
        if (customError || startValidation) {
            this.validate();
        }
    };
}


export class TextInput extends InputBase {
    state = this.baseState;

    componentWillReceiveProps(props) {
        this.checkForValidation(props);
    }

    render = () => {
        const {
            required,
            disabled,
            fullWidth,
            label
        } = this.props;

        const {
            value,
            isValid,
            error
        } = this.state;

        return (
            <FormControl error={!isValid}
                         required={required}
                         disabled={disabled}
                         fullWidth={fullWidth}>
                <InputLabel>{ label }</InputLabel>
                <Input value={value}
                       onBlur={this.onFocusOut}
                       onChange={this.onChange} />
                <FormHelperText classes={{root: 'btw-input-error'}}>{ error }</FormHelperText>
            </FormControl>
        );
    };
}


export class Dropdown extends InputBase {
    state = this.baseState;

    componentWillReceiveProps(props) {
        this.checkForValidation(props);
    }

    mapItem = (item) => {
        if (typeof item === 'string') {
            return {
                label: item,
                value: item
            }
        }
        return item;
    };

    render = () => {
        const {
            values = [],
            required,
            disabled,
            fullWidth,
            label
        } = this.props;
        const {
            value,
            error,
            isValid
        } = this.state;
        return (
            <FormControl className='btw-validated-dropdown'
                         error={!isValid}
                         required={required}
                         disabled={disabled}
                         fullWidth={fullWidth} >
                <InputLabel>{ label }</InputLabel>
                <Select
                    value={value}
                    onChange={this.onChange}
                    onBlur={this.onFocusOut}>
                    { values.map(this.mapItem).map((item, index) => {
                        return (
                            <MenuItem key={index} value={item.value}>{ item.label}</MenuItem>
                        )
                    })}
                </Select>
                <FormHelperText>{ error }</FormHelperText>
            </FormControl>
        );
    };
}