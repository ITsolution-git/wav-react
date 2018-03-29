import React from 'react';
import {
    Modal,
    Row,
    Col,
    Button
} from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';

export default class ConfirmationDialog extends BaseComponent {
    render() {
        const {
            show,
            onClose,
            submitText,
            title='',
            description,
            onSubmit
        } = this.props;
        return (
            <Modal show={show}
                   onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <div>{ description }</div>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col md={12} className="btn-container">
                            <Button className='btn-primary' onClick={onSubmit}>{submitText}</Button>
                            <Button className='btn-primary' onClick={onClose}>Cancel</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        );
    }
}
