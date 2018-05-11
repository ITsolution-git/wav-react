import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BaseComponent from '../../shared/BaseComponent';
import {
    TextInput,
    StateInput,
    EmailInput,
    AgeInput,
    GenderInput,
    PhoneInput,
    ZipCodeInput
} from '../../shared/validatedInputs/index';

const fields = {
    city: 'city',
    state: 'state',
    email: 'email',
    age: 'age',
    gender: 'gender',
    address: 'address',
    phone: 'phone',
    zipCode: 'zipCode'
};

export default class VoterDetails extends BaseComponent {
    state = {};

    handleChange = (name, value, isValid) => {

    };

    getData = () => {

    };

    render() {
        return (
            <div style={{ width: '80%'}}>
                <Row className='center-row'>
                    <Col md={6}>
                        <TextInput label='City'
                                   onChange={(val, valid) => this.handleChange(fields.city, val, valid)}
                                   required />
                    </Col>
                    <Col md={6}>
                        <StateInput onChange={(val, valid) => this.handleChange(fields.state, val, valid)}
                                    required />
                    </Col>
                </Row>
                <Row className='center-row'>
                    <Col md={6}>
                        <EmailInput onChange={(val, valid) => this.handleChange(fields.email, val, valid)}
                                    required />
                    </Col>
                    <Col md={6}>
                        <AgeInput onChange={(val, valid) => this.handleChange(fields.age, val, valid)} />
                    </Col>
                </Row>
                <Row className='center-row'>
                    <Col md={6}>
                        <GenderInput onChange={(val, valid) => this.handleChange(fields.gender, val, valid)} />
                    </Col>
                    <Col md={6}>
                        <TextInput label='Address'
                                   onChange={(val, valid) => this.handleChange(fields.address, val, valid)}/>
                    </Col>
                </Row>
                <Row className='center-row'>
                    <Col md={6}>
                        <PhoneInput onChange={(val, valid) => this.handleChange(fields.phone, val, valid)} />
                    </Col>
                    <Col md={6}>
                        <ZipCodeInput onChange={(val, valid) => this.handleChange(fields.zipCode, val, valid)} />
                    </Col>
                </Row>
            </div>
        );
    }
}