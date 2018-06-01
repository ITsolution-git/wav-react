import React from 'react';
import Typography from '@material-ui/core/Typography';

import BaseComponent from '../../shared/BaseComponent';

export default class HowToRegister extends BaseComponent {
    render() {
        return (
            <div>
                <Typography gutterBottom>
                    First, a little bit of background about voter registration.
                    <br /><br />
                    Each state sets its own rules and deadlines for voter registration. Most states allow online registration - some require that you mail in the form.
                    <br /><br />
                    California, for example, allows online registration. The deadline to register to vote in the upcoming primary is May 21.
                    <br /><br />
                    Here’s a complete list of <a target='_blank' onClick={this.props.onLinkClicked} href='https://www.vote.org/voter-registration-deadlines/'>state voter registration deadlines.</a>
                </Typography>
            </div>
        );
    }
}
