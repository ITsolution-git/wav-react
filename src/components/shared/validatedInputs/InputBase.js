import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from 'react-select';
import cn from 'classnames';

import BaseComponent from '../../shared/BaseComponent';
import Icon from '../../shared/Icon';

export default class InputBase extends BaseComponent {
    baseState = {
        isValid: true,
        error: ''
    };

    onChange = (e) => {
        let { value } = e.target;
        const { onInputChange = () => { } } = this.props;
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
        const { onBlur = () => { } } = this.props;
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
    };

    resolveLabel = () => {
        const { label } = this.props;
        return `${label}`;
    };
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

    renderRightIcon = () => {
        const { isValid, value } = this.state;
        const { rightIcon = null, useGreenMark = true } = this.props;

        if (rightIcon) {
            return rightIcon
        }

        return value && isValid && useGreenMark
            ? <Icon width={14} height={10.5} name='green-mark' ext='svg' />
            : null;

    };

    render = () => {
        const {
            defaultValue,
            type,
            maxLength = 50,
            label,
            id,
            style,
            className,
            disabled,
            placeholder
        } = this.props;

        const {
            value = defaultValue || '',
            isValid,
            error
        } = this.state;

        return (
            <div className={cn('btw-input', { disabled, error: !isValid })}>
                <label htmlFor={id}>{ label }</label>
                <div className={cn('text-box')}>
                    <input value={value}
                           id={id}
                           className={cn('btw-input', className)}
                           style={style}
                           type={type}
                           onBlur={this.onFocusOut}
                           onChange={e => {
                               const { value } = e.target;
                               if (value.length <= maxLength) {
                                   this.onChange(e);
                               }
                           }}
                           placeholder={placeholder}
                           disabled={disabled} />
                <span className='right-icon'>
                  { this.renderRightIcon() }
                </span>
                </div>
                <div className='error-msg'>
                    { error }
                </div>
            </div>
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
            values = [],
            required,
            disabled,
            defaultValue,
            errorWhite = false,
            fullWidth = true,
            classes
        } = this.props;
        const {
            value = defaultValue || '',
            error,
            isValid
        } = this.state;
        return (
            <FormControl required={required}
                disabled={disabled}
                fullWidth={fullWidth} >
                <Select
                    className={`btw-validated-dropdown ${classes}`}
                    value={value}
                    onChange={option => {
                        const e = { target: { value: (option || {}).value || '' } };
                        this.onChange(e);
                    }}
                    placeholder={this.resolveLabel()}
                    onBlur={this.onFocusOut}
                    options={values.map(this.mapItem)}
                />
                <FormHelperText classes={{ root: cn('btw-input-error', { 'btw-error-white': errorWhite }) }}
                    error={!isValid}>{error}</FormHelperText>
            </FormControl>
        );
    };
}
