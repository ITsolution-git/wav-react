import React from 'react';
import {
    Modal
} from 'react-bootstrap';
import classNames from 'classnames';

import BaseComponent from './BaseComponent';

export default class Dialog extends BaseComponent {
    render() {
        const {
            show,
            onClose,
            title='',
            children,
            actionButtons = null,
            closeButton,
            ...restProps
        } = this.props;
        return (
            <Modal show={show}
                   onHide={onClose}
                   className={classNames({'btw-modal': this.isDesktop(), 'btw-modal-mobile': this.isMobile()})}
                   {...restProps}>
                <Modal.Header closeButton={closeButton}>
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