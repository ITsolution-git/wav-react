import React from 'react';
import Typography from 'material-ui/Typography';

import BaseComponent from '../../shared/BaseComponent';

export default class WhatToDo extends BaseComponent {

    render() {
        const {
            voterData: {
                firstname = '',
                lastname = ''
            },
            stateInfo = {}
        } = this.props;

        return (
            <div>
                <Typography gutterBottom>
                    { firstname } { lastname } is interested in voting by mail.
                    <br /><br />
                    { firstname } { lastname } needs to register to vote by mail by { stateInfo['absenteeBallotApplicationDeadline']}.
                    <br /><br />
                    Remind your friend the deadline is fast approaching and ask them to send you a screenshot or email confirming that they registered to vote by mail.
                </Typography>
            </div>
        );
    }
}
