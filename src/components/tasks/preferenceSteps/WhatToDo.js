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
                    <b>Help { firstname } { lastname } vote in the { stateInfo['2018PrimaryElectionVotingDate'] } { stateInfo['state'] } election.</b>
                    <br /><br />
                    Voting options vary by state.
                    <br /><br />
                    In { stateInfo['state'] }, { firstname } { lastname } has the following options:
                    <br /><br />
                    <b>
                        <ul>
                        { stateInfo['earlyVotingAllowed'] && <li>Early voting.</li> }
                        { stateInfo['absenteeWithCause'] && <li>Absentee with cause.</li> }
                        { stateInfo['absenteeWithoutCause'] && <li>Absentee without cause.</li> }
                        </ul>
                    </b>
                </Typography>
            </div>
        );
    }
}
