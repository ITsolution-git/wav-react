import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BaseComponent from '../../shared/BaseComponent';
import {
    FirstNameInput,
    LastNameInput,
    CityInput,
    AddressInput,
    StateInput,
    EmailInput,
    DateOfBirthInput,
    GenderInput,
    PhoneInput,
    ZipCodeInput
} from '../../shared/validatedInputs/index';

import fieldConstants from '../../../constants/FieldConstants';

export default class VoterDetails extends BaseComponent {
    state = {
        details: this.props.voterDetails || {},
        valid: {
            [fieldConstants.firstName]: false,
            [fieldConstants.lastName]: false,
            [fieldConstants.city]: false,
            [fieldConstants.state]: false,
            [fieldConstants.email]: false
        }
    };

    handleChange = (value, isValid, name) => {
        this.setState(state => {
            const { details, valid } = state;
            return {
                details: { ...details, [name]: value },
                valid: { ...valid, [name]: isValid }
            }
        }, () => {
            const { details, valid } = this.state;
            const isValid = Object.values(valid).every(val => val);
            this.props.onChange(isValid, details);
        });
    };

    render() {
        const { details } = this.state;
        return (
            <div style={{ width: '90%'}}>
                <Row className='center-row'>
                    <Col md={6}>
                        <FirstNameInput onChange={this.handleChange}
                                        defaultValue={details[fieldConstants.firstName]}
                                        required />
                    </Col>
                    <Col md={6}>
                        <LastNameInput onChange={this.handleChange}
                                       defaultValue={details[fieldConstants.firstName]}
                                       required />
                    </Col>
                </Row>
                <Row className='center-row'>
                    <Col md={6}>
                        <CityInput onChange={this.handleChange}
                                   defaultValue={details[fieldConstants.city]}
                                   required />
                    </Col>
                    <Col md={6}>
                        <StateInput onChange={this.handleChange}
                                    defaultValue={details[fieldConstants.state]}
                                    required />
                    </Col>
                </Row>
                <Row className='center-row'>
                    <Col md={6}>
                        <EmailInput onChange={this.handleChange}
                                    defaultValue={details[fieldConstants.email]}
                                    required />
                    </Col>
                    <Col md={6}>
                        <DateOfBirthInput onChange={this.handleChange}
                                          defaultValue={details[fieldConstants.dateOfBirth]} />
                    </Col>
                </Row>
                <Row className='center-row'>
                    <Col md={6}>
                        <GenderInput onChange={this.handleChange}
                                     defaultValue={details[fieldConstants.gender]} />
                    </Col>
                    <Col md={6}>
                        <AddressInput onChange={this.handleChange}
                                      defaultValue={details[fieldConstants.address]} />
                    </Col>
                </Row>
                <Row className='center-row'>
                    <Col md={6}>
                        <PhoneInput onChange={this.handleChange}
                                    defaultValue={details[fieldConstants.phone]} />
                    </Col>
                    <Col md={6}>
                        <ZipCodeInput onChange={this.handleChange}
                                      defaultValue={details[fieldConstants.zipCode]} />
                    </Col>
                </Row>
            </div>
        );
    }
}