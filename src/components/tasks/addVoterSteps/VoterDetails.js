import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BaseComponent from '../../shared/BaseComponent';
import TextInput from '../../shared/validatedInputs/TextInput';
import StateInput from '../../shared/validatedInputs/StateInput';

export default class VoterDetails extends BaseComponent {
    render() {
        return (
            <div style={{ width: '70%'}}>
                <Row className='center-row'>
                    <Col md={6}>
                        <TextInput label='City*' />
                    </Col>
                    <Col md={6}>
                        <StateInput />
                    </Col>
                </Row>
            </div>
        );
    }
}