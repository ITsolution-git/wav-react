import React from 'react';

import { BaseComponent, Dialog, Button, Typography } from '../shared';

export default class ConfirmationDialog extends BaseComponent {
    render() {
        const {
            show,
            onClose,
            submitText='Ok',
            cancelText='Cancel',
            title='',
            description = '',
            onSubmit
        } = this.props;
        return (
            <Dialog show={show}
                    title={title}
                    onHide={onClose}
                    actionButtons={
                        <>
                            <Button fullWidth onClick={onSubmit}>{submitText}</Button>
                            <Button fullWidth onClick={onClose}>{cancelText}</Button>
                        </>
                    }
                    className='btw-confirmation-dialog'>
                   <Typography variant='body' fontWeight='600'>{ description }</Typography>
            </Dialog>
        );
    }
}
