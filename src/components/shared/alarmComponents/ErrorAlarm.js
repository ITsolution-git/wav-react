import React from 'react';
import classNames from 'classnames';

import { BaseComponent } from '../index';

class ErrorAlarm extends BaseComponent {
    render() {
        const { children, className } = this.props;

        return (
            <div className={classNames('btw-paper btw-error-alarm', className)}>
                {children}
            </div>
        );
    }
}

export default ErrorAlarm;