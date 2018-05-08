import React from 'react';
import Typography from 'material-ui/Typography';

import BaseComponent from '../../shared/BaseComponent';

export default class HowToRegister extends BaseComponent {
    render() {
        return (
            <div>
                <Typography gutterBottom>
                    First, a little bit of background about voter registration.
                    Each state sets its own rules and deadlines for voter registration. Most states allow online registration - some require that you mail in the form.
                    California, for example, allows online registration. The deadline to register to vote in the upcoming primary is May 21.
                    Here’s a complete list of <a href='https://www.vote.org/voter-registration-deadlines/'>state voter registration deadlines.</a>
                </Typography>
            </div>
        );
    }
}
