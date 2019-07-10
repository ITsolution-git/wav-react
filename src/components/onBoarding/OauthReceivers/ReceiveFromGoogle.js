import React, { Component } from 'react';
import { OauthReceiver } from 'react-oauth-flow';
import history from '../../../utility/History';
import { importContactsFromGoogle} from "../../../actions/AuthActions";
import {withRouter} from "react-router-dom";

class ReceiveFromGoogle extends Component {
    handleSuccess = async (accessToken, { response, state }) => {
        console.log('Successfully authorized');
        console.log(await importContactsFromGoogle(accessToken));
        history.push('/social_connect');
    };

    handleError = error => {
        console.error('An error occured');
        console.error(error.message);
    };

    render() {
        return (
            <OauthReceiver
                authorizeUrl='https://accounts.google.com/o/oauth2/auth'
                tokenUrl="https://oauth2.googleapis.com/token"
                clientId="905671205791-jb00s4o9g6ckv2i1p5tlucu9f52u33ke.apps.googleusercontent.com"
                clientSecret="RhyX1KSLZXasbIosMPetrIvc"
                // eslint-disable-next-line
                redirectUri={`${location.origin}/connectGoogle`}
                onAuthSuccess={this.handleSuccess}
                onAuthError={this.handleError}
                render={({ processing, state, error }) => (
                    <div>
                        {processing && <p>Authorizing now...</p>}
                        {error && (
                            <p className="error">An error occured: {error.message}</p>
                        )}
                    </div>
                )}
            />
        );
    }
}

export default withRouter(ReceiveFromGoogle);