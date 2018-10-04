import React from 'react';
import Typography from '@material-ui/core/Typography';

import BaseComponent from '../../shared/BaseComponent';

export default class HowToRegister extends BaseComponent {
    render() {
        const {
            voterData: {
                firstname = '',
                lastname = '',
                state
            },
            stateInfo = {}
        } = this.props;

        return (
            <div>
                <Typography gutterBottom>
                    It looks like { firstname } { lastname }  isn’t registered to vote in { state }. The upcoming voter registration deadline is { stateInfo["inPersonRegistration"]}.
                    <br /><br />
                    Sometimes this is inaccurate because your friend just registered and the database hasn’t updated yet, or they’re registered under a different name.<br />
                    Occasionally states purge the voter registration list if someone hasn't voted in a while.
                </Typography>
            </div>
        );
    }
}
