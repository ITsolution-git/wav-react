import React from 'react';
import classNames from 'classnames';

import BaseComponent from '../shared/BaseComponent';
import Button from '../shared/Button';
import Icon from '../shared/Icon';

class SocialItem extends BaseComponent {

    connectedTextRender = () => {
        return (
            <div className={classNames('status', !this.isMobile() && 'status-center')}>
                Connected
            </div>
        );
    }

    connectButtonRender = () => {
        const buttonName = !this.isMobile() ? 'Connect' : '+';
        const { socialConnectHandler } = this.props;

        // TODO: Delete styling after modifying button by sergey
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

    render() {
        const { name, status } = this.props;
        const iconClassname = status ? name : 'default';

        return (
            <div className='btw-social-item'>
                <div className='main-container'>
                    <div className={classNames('icon', iconClassname)}>
                        <Icon name={`${name}-${status ? 'light' : 'grey'}`} />
                    </div>
                    <div className='controls'>
                        <div className='name'>
                            {name}
                        </div>
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