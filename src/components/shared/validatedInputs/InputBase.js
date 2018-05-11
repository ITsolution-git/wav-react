import React from 'react';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
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
        onChange(value, name, isValid);
    };

    validate = (props = this.props) => {
        let error = '';
        const { value } = this.state;
        const {
            label,
            validator,
            customError,
            required
        } = props;

        if (required && !value) {
            error = `${label} is required *`;
        }
        if (validator && value) {
            error = !validator(value) && `${label} is incorrect`;
        }
        if (customError) {
            error = customError;
        }
        this.setState(() => ({ error, isValid: !error }), this.onParentChange);
    };

    checkForValidation = (props) => {
        const { customError, startValidation } = props;
        if (customError || startValidation) {
            this.validate();
        }
    };

    resolveLabel = () => {
        const { error } = this.state;
        const { label, required } = this.props;
        return !!error ? error : `${label} ${required && '*' || ''}`;
    };
}


export class TextInput extends InputBase {
    state = this.baseState;

    componentWillReceiveProps(props) {
        this.checkForValidation(props);
    }

    render = () => {
        const { label, onChange, required, validator, ...restProps } = this.props;
        const { value, isValid } = this.state;

        return (
            <TextField
                error={!isValid}
                label={this.resolveLabel()}
                value={value}
                onBlur={this.onFocusOut}
                onChange={this.onChange}
                {...restProps}
            />
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
        const { values = [], onChange, ...restProps} = this.props;
        const { isValid } = this.state;
        return (
            <FormControl className='btw-validated-dropdown' error={!isValid} >
                <InputLabel>{ this.resolveLabel() }</InputLabel>
                <Select
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={this.onFocusOut}
                    { ...restProps }>
                    { values.map(this.mapItem).map((item, index) => {
                        return (
                            <MenuItem key={index} value={item.value}>{ item.label}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        );
    };
}