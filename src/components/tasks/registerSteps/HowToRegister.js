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
                    It looks like { firstname } { lastname }  isn’t registered to vote in { stateInfo['state'] }. The upcoming voter registration deadline is { stateInfo["absoluteRegistrationDeadlineByMail"]} in order to vote in the November election.
                    <br /><br />
                    Note that it's possible your friend is registered already but doesn't appear in our database. <br />
                    Why? Your friend may have just registered and the database hasn’t updated yet, or they’re registered under a different name. <br />
                    Occasionally states purge the voter registration list if someone hasn't voted in a while.
                </Typography>
            </div>
        );
    }
}
