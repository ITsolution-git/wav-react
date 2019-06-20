import auth0 from 'auth0-js';

import config from '../config/ApiConfig';

const authConfig = config.auth0;

class Auth0Service {
    constructor(redirectUrl) {
        this.auth0 = new auth0.WebAuth({
            domain: authConfig.domain,
            redirectUri: redirectUrl,
            clientID: authConfig.cliendId,
            responseType: 'token id_token'
        });
    }

    parseError = (response, error) => {
        const { description, original: { response: { body: { message } = {}} = {}} = {} } = response;
        return typeof description === 'string' ? description
            : message || error;
    };

    signUp = ({ firstname, lastname, email, password }) => {
        return new Promise((resolve, reject) => {
            this.auth0.signup({
                connection: authConfig.connection,
                email,
                password,
                firstname,
                lastname,
                social: false
            }, response => {
                if (response === null) {
                    resolve(response);
                } else {
                    reject(this.parseError(response, 'Error occurred while signing up.'));
                }
            });
        });
    };

    socialSignUp = () => {

    };

    signIn = ({ email, password }) => {
        return new Promise((resolve, reject) => {
            this.auth0.login({
                username: email,
                password: password
            }, response => {
                debugger;
                if (response === null) {
                    resolve();
                } else {
                    reject(this.parseError(response, 'Error occurred while signing in.'));
                }
            });
        });
    }

}

export default Auth0Service;

