import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import BaseComponent from '../shared/BaseComponent';
import Button from '../shared/Button';
import Icon from '../shared/Icon';

class SocialItem extends BaseComponent {

    connectedTextRender = () => {
        return (
            <Typography className={classNames('status', !this.isMobile() && 'status-center')}>
                Connected
            </Typography>
        );
    }

    // TODO: Delete styling after modifying button by sergey
    connectButtonRender = () => {
        const buttonName = !this.isMobile() ? 'Connect' : '+';
        const { socialConnectHandler } = this.props;

        return (
            <Button
                size='medium'
                color='blue4'
                style={
                    this.isMobile() ?
                        { width: 24, fontSize: 18, height: 24, minWidth: 'unset', padding: 0 } :
                        { width: 94, fontSize: 13, height: 24, minWidth: 'unset', padding: 0 }
                }
                onClick={socialConnectHandler}>
                {buttonName}
            </Button>
        );
    }

    borderContainerRender = () => {
        return (
            <div className='border-container'>
                <div className='item-border' />
            </div>
        );
    }

    render() {
        const { name, status } = this.props;
        const iconClassname = status ? name : 'default';
        const isLast = name === 'linkedIn';

        return (
            <div className='btw-social-item'>
                <div className='main-container'>
                    <div className={classNames('icon', iconClassname)}>
                        <Icon name={`${name}-${status ? 'light' : 'grey'}`} />
                    </div>
                    <div className='controls'>
                        <Typography className='name'>
                            {name}
                        </Typography>
                        {status ? this.connectedTextRender() : this.connectButtonRender()}
                    </div>
                </div>
                {!isLast && this.borderContainerRender()}
            </div>
        );
    }
}

export default SocialItem;