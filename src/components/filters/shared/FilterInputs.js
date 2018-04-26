import React from 'react';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Input from 'material-ui/Input';

import BaseComponent from '../../shared/BaseComponent';

class InputBase extends BaseComponent {

    handleInputChange = (e) => {
        this.setState({ value: e.target.value }, this.handleParentChange);
    };

    handleCheckBoxChange = (e) => {
        this.setState({ checked: e.target.checked }, this.handleParentChange);
    };

    handleParentChange = () => {
        const { checked, value } = this.state;
        const { onChange = () => {}} = this.props;
        onChange(checked, value);
    };

    renderCheckbox = (label) => {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.state.checked}
                        onChange={this.handleCheckBoxChange}
                        color="primary"
                    />
                }
                label={label}
            />
        )
    }
}

export class FirstNameInput extends InputBase {
    state = {
        checked: false,
        value: ''
    };

    render () {
        const { value } = this.state;
        return (
            <FormGroup row>
                { this.renderCheckbox('First Name') }
                <Input value={value}
                       onChange={this.handleInputChange} />
            </FormGroup>
        );
    }
}


export class LastNameInput extends InputBase {
    state = {
        checked: false,
        value: ''
    };

    render () {
        const { value } = this.state;
        return (
            <FormGroup row>
                { this.renderCheckbox('Last Name') }
                <Input value={value}
                       onChange={this.handleInputChange} />
            </FormGroup>
        );
    }
}