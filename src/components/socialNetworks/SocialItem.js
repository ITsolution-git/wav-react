import React from 'react';
import classNames from 'classnames';

import BaseComponent from '../shared/BaseComponent';
import Button from '../shared/Button';
import SocialIcon from '../shared/SocialIcon';
import Typography from '../shared/Typography';

class SocialItem extends BaseComponent {

    connectedTextRender = () => {
        return (
            <Typography variant='functional' className={classNames('status', { 'status-center': this.isDesktop() })}>
                Connected
            </Typography>
        );
    }

    connectButtonRender = () => {
        const buttonName = !this.isMobile() ? 'Connect' : '+';
        const { socialConnectHandler } = this.props;

        // TODO: Delete styling after modifying button by sergey
        return (
            <Button
                size='small'
                className={this.isMobile() ? 'plus-button' : 'connect-button'}
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