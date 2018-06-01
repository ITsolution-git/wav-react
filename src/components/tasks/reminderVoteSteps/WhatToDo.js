import React from 'react';
import Typography from '@material-ui/core/Typography';

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
                    { firstname } { lastname } should have received their mail-in ballot by now.
                    <br /><br />
                    Check in with { firstname } { lastname } to make sure they received it and remind them they can send in their ballot now.
                    <br /><br />
                    Their ballot must be mailed in by { stateInfo['inPersonRegistration']}.
                    <br /><br />
                    Ask { firstname } { lastname } to send you a photo of the stamped enveloped when they’re about to mail their ballot so you can confirm they voted.
                </Typography>
            </div>
        );
    }
}
