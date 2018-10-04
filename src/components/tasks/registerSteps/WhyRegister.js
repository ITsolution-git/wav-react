import React from 'react';
import Typography from '@material-ui/core/Typography';

import BaseComponent from '../../shared/BaseComponent';

export default class WhyRegister extends BaseComponent {
    render() {
        const {
            voterData: {
                firstname = '',
                lastname = '',
                state = ''
            },
            stateInfo = {}
        } = this.props;

        return (
            <div>
                <Typography gutterBottom>
                    Get in touch with { firstname } about registering to vote. You can call, email, text, show up at their door.... Whatever works for you!
                    <br /><br />
                    Let them know that it only takes 2 minutes to register on Vote.org (they can also check their registration status there too if they think they’re registered).<br />
                    Remind them the deadline to register in { state } is { stateInfo["inPersonRegistration"]}.
                    <br /><br />
                    It's also a good idea to send them a link to vote.org afterward.
                    <br /><br />
                    After you talk with them, report back for next steps.
                </Typography>
            </div>
        );
    }
}
