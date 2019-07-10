import React from 'react';
import classNames from 'classnames';
import { OauthSender } from 'react-oauth-flow';

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
        if (this.props.name === 'google') {
            return (
                <OauthSender
                    authorizeUrl="https://accounts.google.com/o/oauth2/auth"
                    clientId="905671205791-jb00s4o9g6ckv2i1p5tlucu9f52u33ke.apps.googleusercontent.com"
                    // eslint-disable-next-line
                    redirectUri={`${location.origin}/connectGoogle`}
                    render={({ url }) => <a className='connect-button' href={url}>{buttonName}</a>}
                    args={{scope: 'https://www.googleapis.com/auth/contacts'}}
                />
            )
        }
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