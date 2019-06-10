import React from 'react';
import { Modal } from 'react-bootstrap';

import BaseComponent from './BaseComponent';
import Typography from './Typography';

export default class Dialog extends BaseComponent {
    render() {
        const {
            show,
            onClose,
            onHide = onClose,
            title = '',
            children,
            actionButtons = null,
            closeButton,
            ...restProps
        } = this.props;
        return (
            <Modal show={show}
                onHide={onHide}
                className='btw-modal'
                {...restProps}>
                <Modal.Header closeButton={closeButton}>
                    <Typography>{title}</Typography>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    {actionButtons}
                </Modal.Footer>
            </Modal>
        );
    }
}
