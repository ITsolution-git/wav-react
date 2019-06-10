import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import Dialog from '../shared/Dialog';
import Button from '../shared/Button';

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
            <Dialog show={show}
                    title={title}
                    actionButtons={
                        <Row>
                            <Col md={3} xs={3}>
                                <Button onClick={onSubmit}>{submitText}</Button>
                            </Col>
                            <Col md={3} xs={3}>
                                <Button onClick={onClose}>No</Button>
                            </Col>
                        </Row>
                    }
                    onHide={onClose}>
                   <div>{ description }</div>
            </Dialog>
        );
    }
}
