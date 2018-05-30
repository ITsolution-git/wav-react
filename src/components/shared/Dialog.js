import React from 'react';
import {
    Modal
} from 'react-bootstrap';
import BaseComponent from './BaseComponent';

export default class Dialog extends BaseComponent {
    render() {
        const {
            show,
            onClose,
            title='',
            children,
            actionButtons = null,
            ...restProps
        } = this.props;
        return (
            <Modal show={show}
                   onHide={onClose}
                   className='btw-modal'
                   {...restProps}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { children }
                </Modal.Body>
                <Modal.Footer>
                    { actionButtons }
                </Modal.Footer>
            </Modal>
        );
    }
}