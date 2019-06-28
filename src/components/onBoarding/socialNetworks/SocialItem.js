import React from 'react';
import classNames from 'classnames';

import { BaseComponent, Button, Typography, SocialIcon } from '../../shared'

class SocialItem extends BaseComponent {

    connectedTextRender = () => {
        return (
            <Typography variant='functional' className={classNames('status', { 'status-center': this.isDesktop() })}>
                Connected
            </Typography>
        );
    }

    connectButtonRender = () => {
        const buttonName = !this.isMobileOnly() ? 'Connect' : '+';
        const { socialConnectHandler } = this.props;

        return (
            <Button
                size='small'
                className={this.isMobileOnly() ? 'plus-button' : 'connect-button'}
                onClick={socialConnectHandler}>
                {buttonName}
            </Button>
        );
    }

    render() {
        const { name, status } = this.props;

        return (
            <div className='btw-social-item'>
                <div className='main-container'>
                    <SocialIcon name={name} visible={status} size='large' />
                    <div className='controls'>
                        <Typography variant='body' fontWeight='600' className='name'>
                            {name}
                        </Typography>
                        {status ? this.connectedTextRender() : this.connectButtonRender()}
                    </div>
                </div>
                <div className='border-container'>
                    <div className='item-border' />
                </div>
            </div>
        );
    }
}

export default SocialItem;