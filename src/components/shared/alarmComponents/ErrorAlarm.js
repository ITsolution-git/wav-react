import React from 'react';
import classNames from 'classnames';

import { BaseComponent, Typography } from '../index';

class ErrorAlarm extends BaseComponent {
    render() {
        const { children, className } = this.props;

        return (
            <div className={classNames('btw-error-alarm btw-paper', className)}>
                <Typography className='congrats-title'>
                    Congrats!
                </Typography>
                {children}
            </div>
        );
    }
}

export default ErrorAlarm;