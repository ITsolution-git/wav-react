import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import { Row, Col } from 'react-bootstrap';
import Checkbox from 'material-ui/Checkbox';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import { getAgeYears } from '../../../helpers/InputHelper';
import States from '../../../constants/States';
import SharedInputBase from '../../shared/inputs/InputBase';

class InputBase extends SharedInputBase {
    baseState = {
        checked: false,
        value: ''
    };

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
                classes={{ root: 'checkbox-label' }}
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
    };

    renderInputRow = (label, type = 'text' ) => {
        const { value } = this.state;
        return (
            <Row>
                <Col md={7} xs={7} className='no-padding'>
                    { this.renderCheckbox(label) }
                </Col>
                <Col md={5} xs={5} className='no-padding'>
                    <Input value={value}
                           type={type}
                           className='text-input'
                           onChange={this.handleInputChange} />
                </Col>
            </Row>
        )
    };

    renderDropdownRow = (label, values) => {
        const { value } = this.state;
        return (
            <Row>
                <Col md={7} xs={7} className='no-padding'>
                    { this.renderCheckbox(label) }
                </Col>
                <Col md={5} xs={5} className='no-padding'>
                    <Select
                        value={value}
                        onChange={this.handleInputChange}>
                        { values.map(this.mapItem).map((item, index) => {
                            return (
                                <MenuItem key={index} value={item.value}>{ item.label}</MenuItem>
                            )
                        })}
                    </Select>
                </Col>
            </Row>
        )
    };
}

export class FirstNameInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderInputRow('First Name');
    }
}


export class LastNameInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderInputRow('Last Name');
    }
}

export class EmailInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderInputRow('Email', 'email');
    }
}

export class UsernameInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderInputRow('Username');
    }
}

export class CityInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderInputRow('City');
    }
}

export class AddressInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderInputRow('Address');
    }
}

export class PhoneInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderInputRow('Phone', 'tel');
    }
}

export class ZipCodeInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderInputRow('ZipCode', 'number');
    }
}

export class DateOfBirthInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderDropdownRow('Date Of Birth', getAgeYears());
    }
}

export class VoterStatusInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderInputRow('Voter Status');
    }
}

export class StateInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderDropdownRow('State', Object.keys(States));
    }
}

export class GenderInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderDropdownRow('Gender', [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
        ]);
    }
}

export class IsRegisteredInput extends InputBase {
    state = this.baseState;
    render () {
        return this.renderDropdownRow('Is Registered', [
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
        ]);
    }
}