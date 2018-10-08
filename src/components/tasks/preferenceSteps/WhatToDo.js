import React from 'react';
import Typography from '@material-ui/core/Typography';

import BaseComponent from '../../shared/BaseComponent';

export default class WhatToDo extends BaseComponent {
    renderOption = (option) => {
        return (
            <li>
                <Typography>
                    <b>{ option === 'x' ? 'Yes' : option }</b>
                </Typography>
            </li>
        )
    }

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
                    <b>Help { firstname } { lastname } vote in the { stateInfo['nextElection'] } election.</b>
                    <br /><br />
                    Voting options vary by state. In { stateInfo['state'] }, { firstname } { lastname } has the following options:
                    <br /><br />
                </Typography>
                <ul>
                    { stateInfo['earlyVoting'] && this.renderOption('Early voting.') }
                    { stateInfo['absenteeWithCause'] && this.renderOption('Absentee with cause.') }
                    { stateInfo['voteByMail'] && this.renderOption('Absentee without cause.') }
                </ul>
            </div>
        );
    }
}
