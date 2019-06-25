import React from 'react';

import { BaseComponent, Typography, SvgIcon } from '../index';

class CongratsAlarm extends BaseComponent {
    render() {
        const { children } = this.props;

        return (
            <div className='btw-congrats-alarm'>
                <Typography className='congrats-title'>
                    Congrats!
                </Typography>
                {children}
                <SvgIcon name='circle' className='ellipse-large' />
                <SvgIcon name='circle' className='ellipse-small' />
            </div>
        );
    }
}

export default CongratsAlarm;