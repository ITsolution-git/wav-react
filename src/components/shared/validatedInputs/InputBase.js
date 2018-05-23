import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import BaseComponent from '../../shared/BaseComponent';
import FieldConstants from '../../../constants/FieldConstants';

export default class InputBase extends BaseComponent {
    baseState = {
        isValid: true,
        error: ''
    };

    onChange = (e) => {
        let { value } = e.target;
        const { onInputChange = () => {}} = this.props;
        onInputChange(e);

        this.setState(({ value }), () => {
            if (!this.state.isValid) {
                this.validate();
                return;
            }
            this.onParentChange();
        });
    };

    onFocusOut = (e) => {
      const { onBlur = () => {}} = this.props;
      onBlur(e);
      this.validate();
    };

    onParentChange = () => {
        const { onChange, name, defaultValue = '' } = this.props;
        const { value = defaultValue, isValid } = this.state;
        onChange(value, isValid, name);
    };

    validate = (props = this.props) => {
        let error = '';
        const {
            label,
            validator,
            customError,
            validatorError,
            required,
            defaultValue = ''
        } = props;
        const { value = defaultValue } = this.state;

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
        if (customError !== this.props.customError || startValidation) {
            this.validate(props);
        }
    };

    onMount = () => {
        if (this.props.startValidation) {
            this.validate();
        }
    }
}


export class TextInput extends InputBase {
    state = this.baseState;

    componentWillReceiveProps(props) {
        this.checkForValidation(props);
        if (props.defaultValue !== this.props.defaultValue) {
            this.setState({ value: props.defaultValue || '' })
        }
    }

    componentWillMount() {
        this.onMount();
    }

    render = () => {
        const {
            required,
            disabled,
            label,
            placeholder,
            defaultValue,
            fullWidth = true,
            maxLength = 50
        } = this.props;

        const {
            value = defaultValue || '',
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
                       placeholder={placeholder}
                       onBlur={this.onFocusOut}
                       onChange={e => {
                           const { value } = e.target;
                           if (value.length <= maxLength) {
                               this.onChange(e);
                           }
                       }} />
                <FormHelperText classes={{root: 'btw-input-error'}}>{ error }</FormHelperText>
            </FormControl>
        );
    };
}

export class TextInput1 extends InputBase {
    state = this.baseState;

    componentWillReceiveProps(props) {
        this.checkForValidation(props);
        if (props.defaultValue !== this.props.defaultValue) {
            this.setState({ value: props.defaultValue || '' })
        }
    }

    componentWillMount() {
        this.onMount();
    }

    render = () => {
        const {
            required,
            disabled,
            label,
            placeholder,
            defaultValue,
            fullWidth = true,
            maxLength = 50
        } = this.props;

        const {
            value = defaultValue || '',
            isValid,
            error
        } = this.state;

          return (
            <FormControl error={!isValid}
                         required={required}
                         disabled={disabled}
                         fullWidth={fullWidth}>
                <input value={value}
                       placeholder={label}
                       onBlur={this.onFocusOut}
                       className="btw-input-new"
                       onChange={e => {
                           const { value } = e.target;
                           if (value.length <= maxLength) {
                               this.onChange(e);
                           }
                       }} />
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

    componentWillMount() {
        this.onMount();
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
            label,
            values = [],
            required,
            disabled,
            defaultValue,
            fullWidth = true
        } = this.props;
        const {
            value = defaultValue || '',
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