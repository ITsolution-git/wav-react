import React, { Component } from 'react';
import { OauthSender } from 'react-oauth-flow';

export default class SendToGoogle extends Component {
    render() {
        return (
            <OauthSender
                authorizeUrl="https://accounts.google.com/o/oauth2/auth"
                clientId="905671205791-jb00s4o9g6ckv2i1p5tlucu9f52u33ke.apps.googleusercontent.com"
                // eslint-disable-next-line
                redirectUri={`${location.origin}/connectGoogle`}
                render={({ url }) => <a href={url}>Connect to Google</a>}
                args={{scope: 'https://www.googleapis.com/auth/contacts'}}
            />
        );
    }
}