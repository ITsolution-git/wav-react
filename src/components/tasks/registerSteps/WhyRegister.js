import React from 'react';
import Typography from '@material-ui/core/Typography';

import BaseComponent from '../../shared/BaseComponent';

export default class WhyRegister extends BaseComponent {
    render() {
        const {
            voterData: {
                firstname = '',
                lastname = ''
            }
        } = this.props;

        return (
            <div>
                <Typography gutterBottom>
                    We couldn’t find { firstname } { lastname } on the voter registry last time we looked.
                    But sometimes this is inaccurate.
                    <br /><br />
                    Why? The best way to verify that { firstname } { lastname } isn’t registered is to ask.
                    <bt /><br />
                    Contact them and check if they think they’re registered to vote.
                    <br /><br />
                    You can call, email, text, show up at their door.... Whatever works for you! After you check with them, report back for next steps.
                </Typography>
            </div>
        );
    }
}
